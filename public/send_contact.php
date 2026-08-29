<?php
/**
 * Contact form endpoint using PHPMailer + SMTP.
 *
 *  Config:
 *   CONTACT_TO_EMAIL   -> recipient of the contact messages
 *   CONTACT_FROM_EMAIL -> "From" address
 *   CONTACT_FROM_NAME  -> display name used in the "From" header
 *
 *  Secrets (SMTP credentials, ...) are loaded from
 *  config.secret.php in this folder (git-ignored, recommended) or from
 *  real server environment variables as a fallback.
 *
 * SMTP settings:
 *   SMTP_HOST     -> SMTP server host (e.g. smtp.gmail.com)
 *   SMTP_PORT     -> SMTP port (465 for SSL, 587 for TLS)
 *   SMTP_USER     -> SMTP username (leave empty to skip SMTP auth)
 *   SMTP_PASS     -> SMTP password / app password (leave empty to skip SMTP auth)
 *   SMTP_SECURE   -> 'ssl' | 'tls' | '' (empty = no encryption)
 *   SMTP_DEBUG    -> 0 (off) | 1 (client) | 2 (client+server)
 *
 *  Security:
 *   CORS_ALLOWED_ORIGINS -> comma-separated list of frontend origins allowed to call
 *                           this endpoint from a different domain (empty = same-origin only)
 *
 *  Google reCAPTCHA v2 (checkbox):
 *   RECAPTCHA_SECRET_KEY -> server-side secret key (leave empty to disable the check)
 *   RECAPTCHA_SITE_KEY   -> public site key (used by the frontend widget)
 *
 *  Requirements: PHP extensions mbstring and openssl.
 */

$secretFile = __DIR__ . '/config.secret.php';
if (is_file($secretFile)) {
    require $secretFile;
}

function secret(string $name, string $default = ''): string
{
    if (defined($name)) {
        return (string) constant($name);
    }
    $value = getenv($name);
    return $value === false || $value === '' ? $default : $value;
}

/**
 * Verifies a reCAPTCHA v2 token against Google's API.
 *
 * @return array{success: bool, error: string}
 */
function verify_recaptcha(string $token): array
{
    $postData = http_build_query([
        'secret'   => RECAPTCHA_SECRET_KEY,
        'response' => $token,
        'remoteip' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '',
    ]);

    $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = false;

    if (function_exists('curl_init')) {
        $ch = curl_init($verifyUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        $response = curl_exec($ch);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            return ['success' => false, 'error' => 'reCAPTCHA request failed: ' . $curlError];
        }
    } else {
        $context = stream_context_create(['http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $postData,
            'timeout' => 10,
        ]]);
        $response = @file_get_contents($verifyUrl, false, $context);

        if ($response === false) {
            return ['success' => false, 'error' => 'reCAPTCHA request failed.'];
        }
    }

    $result = json_decode($response, true);
    if (!is_array($result)) {
        return ['success' => false, 'error' => 'Invalid reCAPTCHA response.'];
    }

    $codes = isset($result['error-codes']) && is_array($result['error-codes'])
        ? implode(', ', $result['error-codes'])
        : '';

    return ['success' => !empty($result['success']), 'error' => $codes];
}

define('CONTACT_TO_EMAIL', secret('CONTACT_TO_EMAIL', 'victor.moralesherrera@gmail.com'));
define('CONTACT_FROM_EMAIL', secret('CONTACT_FROM_EMAIL', 'contacto@vmh.cl'));
define('CONTACT_FROM_NAME', secret('CONTACT_FROM_NAME', 'Portfolio Contact Form'));

define('CORS_ALLOWED_ORIGINS', secret('CORS_ALLOWED_ORIGINS', ''));

define('RECAPTCHA_SECRET_KEY', secret('RECAPTCHA_SECRET_KEY', ''));
define('RECAPTCHA_SITE_KEY', secret('RECAPTCHA_SITE_KEY', ''));

define('SMTP_HOST', secret('SMTP_HOST', 'mail.tumail.com'));
define('SMTP_PORT', (int) secret('SMTP_PORT', '587'));
define('SMTP_USER', secret('SMTP_USER', ''));
define('SMTP_PASS', secret('SMTP_PASS', ''));
define('SMTP_SECURE', secret('SMTP_SECURE', 'tls'));
define('SMTP_DEBUG', 0);

// When '1', the real SMTP error is shown to the client (diagnosis only).
$showErrors = secret('CONTACT_SHOW_ERRORS', '0');
define('CONTACT_SHOW_ERRORS', $showErrors === '1' || $showErrors === 'true');

require __DIR__ . '/vendor/phpmailer/Exception.php';
require __DIR__ . '/vendor/phpmailer/PHPMailer.php';
require __DIR__ . '/vendor/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// CORS: allow configured frontend origins (or same-origin) to call this endpoint.
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$corsOrigin = '';

if ($origin !== '') {
    if (CORS_ALLOWED_ORIGINS === '') {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
        if ($origin === $scheme . '://' . $host) {
            $corsOrigin = $origin;
        }
    } else {
        $allowed = array_map('trim', explode(',', CORS_ALLOWED_ORIGINS));
        if (in_array($origin, $allowed, true)) {
            $corsOrigin = $origin;
        }
    }
}

if ($corsOrigin !== '') {
    header('Access-Control-Allow-Origin: ' . $corsOrigin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!extension_loaded('mbstring') || !extension_loaded('openssl')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server is missing required extensions (mbstring, openssl).']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request payload.']);
    exit;
}

function field(string $key, array $data, int $max): string
{
    $value = isset($data[$key]) ? trim((string) $data[$key]) : '';
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max);
    }
    return substr($value, 0, $max);
}

// Google reCAPTCHA v2 verification (only when a secret key is configured).
if (RECAPTCHA_SECRET_KEY !== '') {
    $recaptchaToken = isset($input['g-recaptcha-response'])
        ? (string) $input['g-recaptcha-response']
        : (string) ($input['recaptcha_token'] ?? '');

    if ($recaptchaToken === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please complete the captcha before sending.']);
        exit;
    }

    $verification = verify_recaptcha($recaptchaToken);
    if (!$verification['success']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Captcha verification failed. Please try again.']);
        exit;
    }
}

$name    = field('name', $input, 100);
$email   = field('email', $input, 254);
$subject = field('subject', $input, 150);
$message = field('message', $input, 5000);

$errors = [];

if ($name === '') {
    $errors[] = 'Name is required.';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if ($subject === '') {
    $subject = 'Portfolio Contact Message';
}

if ($message === '') {
    $errors[] = 'Message is required.';
}

if (count($errors) > 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// Strip CR/LF from header-bound fields to prevent header injection.
$safeName    = str_replace(["\r", "\n"], '', $name);
$safeEmail   = str_replace(["\r", "\n"], '', $email);
$safeSubject = str_replace(["\r", "\n"], '', $subject);

$body = "New contact message from the portfolio.\n\n";
$body .= "Name:    " . $safeName . "\n";
$body .= "Email:   " . $safeEmail . "\n";
$body .= "Subject: " . $safeSubject . "\n\n";
$body .= "Message:\n" . $message . "\n";

$mail = new PHPMailer(true);

try {
    @set_time_limit(60);

    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->Port = SMTP_PORT;
    $mail->SMTPAuth = SMTP_USER !== '' && SMTP_PASS !== '';
    if ($mail->SMTPAuth) {
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
    }
    if (SMTP_SECURE !== '') {
        $mail->SMTPSecure = SMTP_SECURE;
    }
    // Pin TLS verification to the SMTP hostname (its certificate is issued for it,
    // not for the resolved IP), otherwise the TLS handshake fails with a CN mismatch.
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false,
            'peer_name' => SMTP_HOST,
        ],
    ];
    $mail->ConnectionTimeout = 15;
    $mail->Timeout = 15;
    $mail->SMTPDebug = SMTP_DEBUG;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom(CONTACT_FROM_EMAIL, CONTACT_FROM_NAME);
    $mail->addAddress(CONTACT_TO_EMAIL);
    $mail->addReplyTo($safeEmail, $safeName);

    $mail->Subject = $safeSubject;
    $mail->Body = $body;

    $mail->send();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    $detail = $mail->ErrorInfo !== '' ? $mail->ErrorInfo : $e->getMessage();

    // Log the real error server-side (git-ignored) so the SMTP issue can be diagnosed.
    $logLine = '[' . gmdate('Y-m-d H:i:s') . ' UTC] '
        . SMTP_HOST . ':' . SMTP_PORT . ' user=' . SMTP_USER . ' '
        . str_replace(["\r", "\n"], ' ', $detail) . PHP_EOL;
    @file_put_contents(__DIR__ . '/send_contact.log', $logLine, FILE_APPEND);

    http_response_code(500);
    $clientDetail = (SMTP_DEBUG > 0 || CONTACT_SHOW_ERRORS) ? ': ' . $detail : '';

    echo json_encode(['success' => false, 'error' => 'The message could not be sent. Please try again later.' . $clientDetail]);
}
