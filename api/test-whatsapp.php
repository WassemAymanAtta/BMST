<?php
/**
 * Send a test WhatsApp notification to the configured admins.
 * Run from the terminal:  php api/test-whatsapp.php
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('CLI only.');
}

$config = require __DIR__ . '/config.php';
require_once __DIR__ . '/whatsapp.php';

$wa = $config['whatsapp'] ?? [];

echo "WhatsApp test\n";
echo "-------------\n";
echo 'Enabled: ' . (!empty($wa['enabled']) ? 'yes' : 'no') . PHP_EOL;
echo 'Phone ID: ' . (!empty($wa['phone_number_id']) ? $wa['phone_number_id'] : '(not set)') . PHP_EOL;
echo 'Recipients: ' . (count($wa['admin_recipients'] ?? []) ?: '(none)') . PHP_EOL;

if (empty($wa['enabled'])) {
    echo "\nSet 'whatsapp.enabled' to true in api/config.local.php first.\n";
    exit(1);
}

$record = [
    'type' => 'contact',
    'lang' => 'ar',
    'name' => 'اختبار BMST',
    'email' => 'test@example.com',
    'phone' => '+201280313993',
    'subject' => 'اختبار الإشعار',
    'message' => 'هذه رسالة اختبار للتأكد من وصول تنبيهات واتساب إلى المسؤولين.',
    'submitted_at' => gmdate('c')
];

$result = bmst_wa_notify($config, $record);

echo "\nResult:\n";
echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit(($result['sent'] ?? 0) > 0 ? 0 : 1);
