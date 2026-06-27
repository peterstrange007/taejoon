<?php
// Simple contact form handler (contact.php)
// Saves submissions to contacts.csv and sends notification emails.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: contact.html');
  exit;
}

function safe($v){ return trim(substr(strip_tags($v ?? ''),0,2000)); }

$name = safe($_POST['name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ? $_POST['email'] : '';
$message = safe($_POST['message'] ?? '');
$time = date('c');

if (!$name || !$email || !$message) {
  // missing required fields -> redirect back with error
  header('Location: contact.html?error=1');
  exit;
}

$csvFile = __DIR__ . DIRECTORY_SEPARATOR . 'contacts.csv';
$first = !file_exists($csvFile) || filesize($csvFile) === 0;
$fh = fopen($csvFile, 'a');
if ($first) {
  fputcsv($fh, ['timestamp','name','email','message']);
}
// normalize newlines in message
$message_clean = str_replace(["\r\n", "\r"], "\n", $message);
fputcsv($fh, [$time, $name, $email, $message_clean]);
fclose($fh);

// send email to site owner
$toAdmin = 'contact@taejoon.in';
$subjectAdmin = 'New contact form submission';
$bodyAdmin = "Time: $time\nName: $name\nEmail: $email\n\nMessage:\n$message_clean\n";
$headersAdmin = "From: contact@taejoon.in\r\nReply-To: $email\r\n";
// Suppress errors if mail isn't configured locally
@mail($toAdmin, $subjectAdmin, $bodyAdmin, $headersAdmin);

// send confirmation to user
$subjectUser = 'Thanks for contacting Taejoon';
$bodyUser = "Hi $name,\n\nThanks for reaching out to Taejoon. We received your message and will respond shortly.\n\nYour message:\n$message_clean\n\n— Taejoon";
$headersUser = "From: contact@taejoon.in\r\n";
if ($email) {
  @mail($email, $subjectUser, $bodyUser, $headersUser);
}

header('Location: contact-success.html');
exit;
