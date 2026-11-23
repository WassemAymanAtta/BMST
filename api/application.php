<?php
/**
 * BMST form endpoint.
 *
 * Accepts JSON POST requests from the public site, validates them, applies a
 * lightweight rate limit, and appends the submission to a local store.
 * No database or third-party service is required.
 *
 * Stored files begin with `<?php exit; ?>` so they cannot be read directly
 * when the project is exposed through a PHP-capable web server.
 */

declare(strict_types=1);

const DATA_DIR   = __DIR__ . '/../data';
const GUARD      = "<?php exit; ?>\n";
const RATE_WINDOW = 600; // 10 minutes
const RATE_LIMIT  = 6;   // submissions per window per client + form type

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

$bmstConfig = require __DIR__ . '/config.php';
require_once __DIR__ . '/whatsapp.php';

/**
 * Send a JSON response and stop execution.
 */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Log a server-side error without exposing it to the visitor.
 */
function log_error(string $message): void
{
    $line = '[' . gmdate('c') . '] ' . preg_replace('/\R/u', ' ', $message) . PHP_EOL;
    @file_put_contents(DATA_DIR . '/error.log', $line, FILE_APPEND | LOCK_EX);
}

/**
 * Return a translated message for the submitted language.
 */
function msg(string $lang, string $en, string $ar): string
{
    return $lang === 'ar' ? $ar : $en;
}

/**
 * Remove control characters and surrounding whitespace from a string.
 */
function clean(mixed $value): string
{
    $value = is_scalar($value) ? (string) $value : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return trim($value);
}

/**
 * Multibyte-safe length helper (falls back when ext-mbstring is absent).
 */
function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

/**
 * Normalise an Egyptian mobile number to +20XXXXXXXXXX.
 */
function normalise_phone(string $value): string
{
    $digits = preg_replace('/\D+/', '', $value) ?? '';

    if (str_starts_with($digits, '0020')) {
        $digits = substr($digits, 4);
    } elseif (str_starts_with($digits, '20') && strlen($digits) === 12) {
        $digits = substr($digits, 2);
    } elseif (str_starts_with($digits, '0')) {
        $digits = substr($digits, 1);
    }

    return preg_match('/^1\d{9}$/', $digits) ? '+20' . $digits : '';
}

/**
 * Make sure the data directory and guarded files exist.
 */
function prepare_store(): void
{
    if (!is_dir(DATA_DIR) && !mkdir(DATA_DIR, 0755, true) && !is_dir(DATA_DIR)) {
        throw new RuntimeException('Could not create the data directory.');
    }

    foreach (['applications.php', 'rate-limit.php'] as $file) {
        $path = DATA_DIR . '/' . $file;
        if (!file_exists($path)) {
            if (file_put_contents($path, GUARD, LOCK_EX) === false) {
                throw new RuntimeException('Could not initialise the data store.');
            }
        }
    }
}

/**
 * Read the data lines of a guarded store file.
 *
 * @return array<int, string>
 */
function read_lines(string $path): array
{
    $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!$lines) {
        return [];
    }
    array_shift($lines); // remove the PHP guard line
    return $lines;
}

/**
 * Read the JSON object stored in a guarded file.
 */
function read_json_store(string $path): array
{
    $lines = read_lines($path);
    if (!$lines) {
        return [];
    }
    $data = json_decode((string) end($lines), true);
    return is_array($data) ? $data : [];
}

/**
 * Replace the JSON object stored in a guarded file.
 */
function write_json_store(string $path, array $data): void
{
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        throw new RuntimeException('Could not encode the rate-limit store.');
    }
    if (file_put_contents($path, GUARD . $json . PHP_EOL, LOCK_EX) === false) {
        throw new RuntimeException('Could not write the rate-limit store.');
    }
}

/**
 * A stable, privacy-friendly identifier for rate limiting.
 */
function client_key(string $type): string
{
    $forwarded = clean($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
    $ip = $forwarded !== '' ? explode(',', $forwarded)[0] : clean($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $agent = clean($_SERVER['HTTP_USER_AGENT'] ?? '');

    return substr(hash('sha256', $ip . '|' . $agent . '|' . $type), 0, 24);
}

/**
 * Reject cross-origin form posts when the browser supplies an Origin header.
 */
function check_origin(string $lang): void
{
    $origin = clean($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin === '') {
        return;
    }

    $originHost = parse_url($origin, PHP_URL_HOST);
    $host = clean($_SERVER['HTTP_HOST'] ?? '');
    $hostName = $host !== '' ? explode(':', $host)[0] : '';

    if (!is_string($originHost) || $originHost === '' || strtolower($originHost) !== strtolower($hostName)) {
        respond(403, [
            'success' => false,
            'message' => msg($lang, 'Invalid request origin.', 'مصدر الطلب غير صالح.')
        ]);
    }
}

try {
    prepare_store();

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        respond(405, [
            'success' => false,
            'message' => msg('en', 'Invalid request method.', 'طريقة الطلب غير صالحة.')
        ]);
    }

    $raw = file_get_contents('php://input');
    $data = json_decode($raw !== false ? $raw : '', true);

    if (!is_array($data)) {
        $data = $_POST;
    }

    $lang = clean($data['lang'] ?? '') === 'ar' ? 'ar' : 'en';
    check_origin($lang);

    // Honeypot: silently accept bot submissions without storing them.
    if (clean($data['website'] ?? '') !== '') {
        respond(200, [
            'success' => true,
            'message' => msg($lang, 'Thanks! We will be in touch.', 'شكراً لك! سنتواصل معك قريباً.')
        ]);
    }

    $type = clean($data['type'] ?? 'join') === 'contact' ? 'contact' : 'join';

    // --- Rate limit -------------------------------------------------------
    $ratePath = DATA_DIR . '/rate-limit.php';
    $limits = read_json_store($ratePath);
    $limitKey = client_key($type);
    $now = time();
    $entry = isset($limits[$limitKey]) && is_array($limits[$limitKey])
        ? $limits[$limitKey]
        : ['start' => $now, 'count' => 0];

    if (($now - (int) ($entry['start'] ?? $now)) > RATE_WINDOW) {
        $entry = ['start' => $now, 'count' => 0];
    }

    if ((int) ($entry['count'] ?? 0) >= RATE_LIMIT) {
        respond(429, [
            'success' => false,
            'message' => msg(
                $lang,
                'Too many submissions. Please try again in a few minutes.',
                'عدد الطلبات كثير. يرجى المحاولة بعد بضع دقائق.'
            )
        ]);
    }

    $entry['count'] = (int) ($entry['count'] ?? 0) + 1;
    $limits[$limitKey] = $entry;

    // Prune stale entries occasionally so the file stays small.
    if (count($limits) > 500) {
        foreach ($limits as $key => $value) {
            if (is_array($value) && ($now - (int) ($value['start'] ?? $now)) > (RATE_WINDOW * 4)) {
                unset($limits[$key]);
            }
        }
    }

    write_json_store($ratePath, $limits);

    // --- Validate ---------------------------------------------------------
    $name    = clean($data['name'] ?? '');
    $email   = clean($data['email'] ?? '');
    $address = clean($data['address'] ?? '');
    $reason  = clean($data['reason'] ?? '');
    $subject = clean($data['subject'] ?? '');
    $message = clean($data['message'] ?? '');
    $ageRaw  = clean($data['age'] ?? '');
    $phone   = normalise_phone(clean($data['phone'] ?? ''));

    $invalidMessage = msg(
        $lang,
        'Please check the highlighted fields and try again.',
        'يرجى مراجعة الحقول المحددة والمحاولة مرة أخرى.'
    );

    if (text_length($name) < 2 || text_length($name) > 80) {
        respond(422, ['success' => false, 'message' => $invalidMessage]);
    }

    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(422, ['success' => false, 'message' => $invalidMessage]);
    }

    if ($type === 'contact') {
        $contactPhoneRaw = clean($data['phone'] ?? '');
        if (
            $email === '' ||
            text_length($subject) < 3 || text_length($subject) > 120 ||
            text_length($message) < 10 || text_length($message) > 2000 ||
            ($contactPhoneRaw !== '' && $phone === '')
        ) {
            respond(422, ['success' => false, 'message' => $invalidMessage]);
        }
    } else {
        $age = filter_var($ageRaw, FILTER_VALIDATE_INT);
        if ($age === false || $age < 10 || $age > 100 || $phone === '') {
            respond(422, ['success' => false, 'message' => $invalidMessage]);
        }
        if (text_length($address) > 160 || text_length($reason) > 1000) {
            respond(422, ['success' => false, 'message' => $invalidMessage]);
        }
    }

    // --- Store ------------------------------------------------------------
    $record = [
        'id'           => bin2hex(random_bytes(8)),
        'type'         => $type,
        'name'         => $name,
        'age'          => $type === 'join' ? (int) filter_var($ageRaw, FILTER_VALIDATE_INT) : null,
        'phone'        => $phone !== '' ? $phone : null,
        'email'        => $email,
        'address'      => $type === 'join' ? $address : null,
        'reason'       => $type === 'join' ? $reason : null,
        'subject'      => $type === 'contact' ? $subject : null,
        'message'      => $type === 'contact' ? $message : null,
        'lang'         => $lang,
        'submitted_at' => gmdate('c'),
        'client'       => substr(client_key($type), 0, 16)
    ];

    $json = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || file_put_contents(DATA_DIR . '/applications.php', $json . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
        throw new RuntimeException('Could not store the submission.');
    }

    // Notify admins via WhatsApp. Delivery failure must never fail the user's submission.
    $notification = bmst_wa_notify($bmstConfig, $record);
    if (!empty($notification['enabled']) && (int) ($notification['sent'] ?? 0) === 0) {
        log_error('WhatsApp notification not delivered: ' . json_encode($notification, JSON_UNESCAPED_UNICODE));
    }

    respond(200, [
        'success' => true,
        'message' => $type === 'contact'
            ? msg($lang, 'Message sent successfully! Thanks for reaching out.', 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.')
            : msg($lang, 'Application sent successfully! We will be in touch soon.', 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.')
    ]);
} catch (Throwable $e) {
    log_error($e->getMessage());
    respond(500, [
        'success' => false,
        'message' => msg('en', 'Something went wrong. Please try again later.', 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.')
    ]);
}
