<?php
/**
 * Contact form endpoint using PHPMailer + SMTP.
 *
 * Config:
 *   CONTACT_TO_EMAIL   -> recipient of the contact messages
 *   CONTACT_FROM_EMAIL -> "From" address
 *   CONTACT_FROM_NAME  -> display name used in the "From" header
 *
 * SMTP settings:
 *   SMTP_HOST     -> SMTP server host (e.g. smtp.gmail.com)
 *   SMTP_PORT     -> SMTP port (465 for SSL, 587 for TLS)
 *   SMTP_USER     -> SMTP username (leave empty to skip SMTP auth)
 *   SMTP_PASS     -> SMTP password / app password (leave empty to skip SMTP auth)
 *   SMTP_SECURE   -> 'ssl' | 'tls' | '' (empty = no encryption)
 *   SMTP_DEBUG    -> 0 (off) | 1 (client) | 2 (client+server)
 *
 * Requirements: PHP extensions mbstring and openssl.
 */

define('CONTACT_TO_EMAIL', 'tumail@mail.com');
define('CONTACT_FROM_EMAIL', 'contacto@tumail.com');
define('CONTACT_FROM_NAME', 'Portfolio Contact Form');

define('SMTP_HOST', 'mail.tumail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'contacto@tumail.com');
define('SMTP_PASS', 'contaseña12345');
define('SMTP_SECURE', 'tls');
define('SMTP_DEBUG', 0);

require __DIR__ . '/vendor/phpmailer/Exception.php';
require __DIR__ . '/vendor/phpmailer/PHPMailer.php';
require __DIR__ . '/vendor/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

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
    http_response_code(500);
    $detail = SMTP_DEBUG > 0 ? ': ' . $mail->ErrorInfo : '';

    echo json_encode(['success' => false, 'error' => 'The message could not be sent. Please try again later.' . $mail->ErrorInfo]);
}
