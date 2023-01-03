<?php
//---------------------------------------------------------------------------
// mailit.php
//    This script is intended to be the 'action' target for an HTML form
// with a 'POST' method. It receives a single field of text to be put into
// an email that is sent to the website business owner.
//---------------------------------------------------------------------------

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

date_default_timezone_set('Europe/London');

//---------------------------------------------------------------------------

function post_field($name, $default = "* Unknown *") {
   // Returns a 'sanitized' version of the given post field, replacing it
   // with the provided default if not provided by the client.
   return array_key_exists($name, $_POST) ?
      htmlspecialchars($_POST[$name]) : $default;
}

//---------------------------------------------------------------------------

function plain_text($html) {
   // Converts the given HTML message body to an equivalent plain text body,
   // stripping out most tags and adding appropriate white space for <br>
   // and <p>.
   $patterns = array( "/\n */", '/<br\/?>/', '/<\/p> */', '/<head>.*<\/head>/', '/<[^>]*>/' );
   $replace  = array( " ",      "\n",        "\n\n",      "",                   "" );
   return "\n" . wordwrap(preg_replace($patterns, $replace, $html));
}

//---------------------------------------------------------------------------

// Block incorrect access

session_id($_POST['session']);
session_start(array( 'use_cookies' => 0 ));

if (!isset($_SESSION['nonce']) || $_POST['nonce'] != $_SESSION['nonce']) {
   header('HTTP/1.1 400 Bad request');
   echo "Email not sent. Please return to the form and try again.";
   exit();
}

// All correct, but now block any repeat request with the same session & nonce.

unset($_SESSION['nonce']);

// Compose a new email

$name = post_field('name');
$email = post_field('email');
$now = date('H:i d/m/Y');

$body = <<<DOC
<html>
<head><title>Request Received</title></head>
<body>
   <h2>Request via your website's Get Notified form:</h2>
   <p>Request from: $email</p>
   <p>Add $email to your mailing list</p>
   <p>Received: $now</p>
</body>
</html>

DOC;

// Now send it.

try {
   $mail = new PHPMailer(true);
   $mail->isSMTP();
   // ---------------v- REPLACE THESE VALUES -v-------------------
   $mail->Host       = 'mail.jennicadman.co.uk'; // relay server
   $mail->SMTPAuth   = true;
   $mail->Username   = 'info@jennicadman.co.uk';
   $mail->Password   = 'IJC03callRe';
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
   $mail->Port       = 465;
   // ---------------^--------- END ----------^-------------------

   // ---------------v- REPLACE THESE VALUES -v-------------------
   $mail->setFrom('info@jennicadman.co.uk', 'Mailer');
   $mail->addReplyTo('info@jennicadman.co.uk', 'Mailer');
   // $mail->addAddress('jennicadman@gmail.com', 'Jenni'); // to whom it must go
   $mail->addAddress('info@saulnewbury.com', 'Jenni'); // to whom it must go
   // ---------------^--------- END ----------^-------------------

   $mail->isHTML(true);
   $mail->Subject = 'New Request';
   $mail->Body = $body;
   $mail->AltBody = plain_text($body);

   $mail->send();

   $result = "Success! Request registered.";
}
catch (Exception $e) {
   $result = "Email not sent: {$mail->ErrorInfo}";
}
?>
<?php echo $result ?>

