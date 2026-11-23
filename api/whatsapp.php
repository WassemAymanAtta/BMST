<?php
/**
 * WhatsApp Cloud API notifier for BMST form submissions.
 * Uses cURL (or stream fallback) — no third-party packages required.
 */

/**
 * Keep only digits for the WhatsApp API / wa.me links.
 */
function bmst_wa_digits(string $value): string
{
    $digits = preg_replace('/\D+/', '', $value) ?? '';
    if (str_starts_with($digits, '0020')) {
        $digits = substr($digits, 4);
    } elseif (str_starts_with($digits, '20') && strlen($digits) === 12) {
        $digits = substr($digits, 2);
    }
    return $digits;
}

/**
 * Short UTF-8-safe helper for message values.
 */
function bmst_wa_limit(string $value, int $max): string
{
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

/**
 * Build the alert content in the language used by the visitor.
 */
function bmst_wa_build_message(array $record): array
{
    $ar = ($record['lang'] ?? 'en') === 'ar';
    $join = ($record['type'] ?? 'join') === 'join';

    $title = $ar
        ? ($join ? 'طلب انضمام جديد - BMST' : 'رسالة تواصل جديدة - BMST')
        : ($join ? 'New membership application - BMST' : 'New contact message - BMST');

    $name = bmst_wa_limit((string) ($record['name'] ?? ''), 80) ?: '-';
    $phone = (string) ($record['phone'] ?? '');
    $email = bmst_wa_limit((string) ($record['email'] ?? ''), 120);
    $waLink = $phone !== '' ? 'https://wa.me/' . bmst_wa_digits($phone) : '';

    if ($ar) {
        $contactLines = [];
        if ($phone !== '') $contactLines[] = 'الهاتف: ' . $phone;
        if ($email !== '') $contactLines[] = 'الإيميل: ' . $email;
        if ($waLink !== '') $contactLines[] = 'محادثة واتساب: ' . $waLink;
        $contact = $contactLines ? implode("\n", $contactLines) : 'لا توجد بيانات تواصل';

        $detailLines = [];
        if ($join) {
            if (!empty($record['age'])) $detailLines[] = 'العمر: ' . $record['age'];
            if (!empty($record['address'])) $detailLines[] = 'الحي: ' . bmst_wa_limit((string) $record['address'], 120);
            if (!empty($record['reason'])) $detailLines[] = 'السبب: ' . bmst_wa_limit((string) $record['reason'], 700);
        } else {
            if (!empty($record['subject'])) $detailLines[] = 'الموضوع: ' . bmst_wa_limit((string) $record['subject'], 120);
            if (!empty($record['message'])) $detailLines[] = 'الرسالة: ' . bmst_wa_limit((string) $record['message'], 900);
        }
        $detailLines[] = 'الوقت: ' . ($record['submitted_at'] ?? gmdate('c'));
        $details = implode("\n", $detailLines);
    } else {
        $contactLines = [];
        if ($phone !== '') $contactLines[] = 'Phone: ' . $phone;
        if ($email !== '') $contactLines[] = 'Email: ' . $email;
        if ($waLink !== '') $contactLines[] = 'WhatsApp: ' . $waLink;
        $contact = $contactLines ? implode("\n", $contactLines) : 'No contact details';

        $detailLines = [];
        if ($join) {
            if (!empty($record['age'])) $detailLines[] = 'Age: ' . $record['age'];
            if (!empty($record['address'])) $detailLines[] = 'Area: ' . bmst_wa_limit((string) $record['address'], 120);
            if (!empty($record['reason'])) $detailLines[] = 'Reason: ' . bmst_wa_limit((string) $record['reason'], 700);
        } else {
            if (!empty($record['subject'])) $detailLines[] = 'Subject: ' . bmst_wa_limit((string) $record['subject'], 120);
            if (!empty($record['message'])) $detailLines[] = 'Message: ' . bmst_wa_limit((string) $record['message'], 900);
        }
        $detailLines[] = 'Time: ' . ($record['submitted_at'] ?? gmdate('c'));
        $details = implode("\n", $detailLines);
    }

    $body = "*{$title}*\n*{$name}*\n\n{$contact}\n\n{$details}";

    return [
        'title' => $title,
        'name' => $name,
        'contact' => bmst_wa_limit($contact, 900),
        'details' => bmst_wa_limit($details, 1000),
        'body' => bmst_wa_limit($body, 3500)
    ];
}

/**
 * Send one message through the WhatsApp Cloud API.
 */
function bmst_wa_send_one(array $wa, string $recipient, array $message): array
{
    $token = trim((string) ($wa['access_token'] ?? ''));
    $phoneId = trim((string) ($wa['phone_number_id'] ?? ''));
    $version = trim((string) ($wa['api_version'] ?? 'v21.0')) ?: 'v21.0';
    $to = bmst_wa_digits($recipient);

    if ($token === '' || $phoneId === '' || $to === '') {
        return ['ok' => false, 'status' => null, 'error' => 'WhatsApp config or recipient is missing'];
    }

    $templateName = trim((string) ($wa['template']['name'] ?? ''));
    $payload = [
        'messaging_product' => 'whatsapp',
        'to' => $to,
        'type' => $templateName !== '' ? 'template' : 'text'
    ];

    if ($templateName !== '') {
        $payload['template'] = [
            'name' => $templateName,
            'language' => ['code' => (string) ($wa['template']['language'] ?? 'ar')],
            'components' => [[
                'type' => 'body',
                'parameters' => array_map(function (string $text) {
                    return ['type' => 'text', 'text' => $text];
                }, [$message['title'], $message['name'], $message['contact'], $message['details']])
            ]]
        ];
    } else {
        $payload['text'] = [
            'preview_url' => true,
            'body' => $message['body']
        ];
    }

    $base = rtrim((string) ($wa['api_base'] ?? 'https://graph.facebook.com'), '/');
    $url = $base . '/' . rawurlencode($version) . '/' . rawurlencode($phoneId) . '/messages';
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $headers = [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json'
    ];

    $response = false;
    $status = null;
    $error = null;

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $json,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2
        ]);
        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = $response === false ? (curl_error($ch) ?: 'cURL request failed') : null;
        curl_close($ch);
    } elseif (ini_get('allow_url_fopen')) {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => implode("\r\n", $headers) . "\r\n",
                'content' => $json,
                'timeout' => 10,
                'ignore_errors' => true
            ],
            'ssl' => [
                'verify_peer' => true,
                'verify_peer_name' => true
            ]
        ]);
        $response = @file_get_contents($url, false, $context);
        if (isset($http_response_header[0]) && preg_match('/HTTP\/\S+\s+(\d{3})/', $http_response_header[0], $m)) {
            $status = (int) $m[1];
        }
        $error = $response === false ? 'HTTP request failed' : null;
    } else {
        return ['ok' => false, 'status' => null, 'error' => 'No HTTP client available on the server'];
    }

    $decoded = json_decode($response !== false ? $response : '', true);
    $ok = $status !== null && $status >= 200 && $status < 300 && $error === null;

    if (!$ok && $error === null) {
        $error = $decoded['error']['message'] ?? ('WhatsApp API returned HTTP ' . $status);
    }

    return [
        'ok' => $ok,
        'status' => $status,
        'error' => $ok ? null : $error,
        'message_id' => $decoded['messages'][0]['id'] ?? null
    ];
}

/**
 * Notify all configured admins about a stored submission.
 */
function bmst_wa_notify(array $config, array $record): array
{
    $wa = $config['whatsapp'] ?? [];

    if (empty($wa['enabled'])) {
        return ['enabled' => false, 'sent' => 0, 'results' => []];
    }

    $type = (string) ($record['type'] ?? 'join');
    $allowed = $wa['notify_on'] ?? ['join', 'contact'];
    if (!in_array($type, $allowed, true)) {
        return ['enabled' => true, 'sent' => 0, 'results' => [], 'skipped' => 'type not in notify_on'];
    }

    $recipients = array_filter((array) ($wa['admin_recipients'] ?? []), function ($value) {
        return is_string($value) && trim($value) !== '';
    });

    if (!$recipients) {
        return ['enabled' => true, 'sent' => 0, 'results' => [], 'error' => 'No admin recipients configured'];
    }

    $message = bmst_wa_build_message($record);
    $results = [];
    $sent = 0;

    foreach ($recipients as $recipient) {
        $result = bmst_wa_send_one($wa, $recipient, $message);
        $results[] = ['to' => bmst_wa_digits($recipient)] + $result;
        if ($result['ok']) $sent += 1;
    }

    return ['enabled' => true, 'sent' => $sent, 'results' => $results];
}
