<?php
/**
 * Default configuration for BMST notifications.
 *
 * Do NOT put real tokens or phone numbers in this file.
 * Copy the values you need into `config.local.php` (which is git-ignored).
 * That file is loaded automatically and overrides anything here.
 */

$config = [
    'whatsapp' => [
        // Set to true only after filling config.local.php.
        'enabled' => false,

        // Meta WhatsApp Cloud API credentials.
        'access_token' => '',
        'phone_number_id' => '',
        'api_version' => 'v21.0',
        'api_base' => 'https://graph.facebook.com',

        // Admin numbers in international format, e.g. '+201280313993'.
        'admin_recipients' => [],

        // Which form types should trigger a message: join, contact.
        'notify_on' => ['join', 'contact'],

        // Optional approved WhatsApp template. Leave empty to send plain text.
        // Plain text works for test recipients. Production recipients need an
        // approved template with four body variables: {{1}} {{2}} {{3}} {{4}}.
        'template' => [
            'name' => '',
            'language' => 'ar'
        ]
    ]
];

$localFile = __DIR__ . '/config.local.php';
if (file_exists($localFile)) {
    $local = require $localFile;
    if (is_array($local)) {
        $config = array_replace_recursive($config, $local);
    }
}

return $config;
