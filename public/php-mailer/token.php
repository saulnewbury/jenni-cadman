<?php
//---------------------------------------------------------------------------
// token.php
//    This script is used in a client 'get' request. It creates a PHP session
// object and stores a new nonce value within it
//---------------------------------------------------------------------------

session_start(array( 'use_cookies' => 0 ));
$_SESSION['nonce'] = $nonce = md5(date('r') . __FILE__);

// Now send a JSON response containing these values.

echo json_encode(array(
   'session' => session_id(),
   'nonce'   => $_SESSION['nonce']
));
