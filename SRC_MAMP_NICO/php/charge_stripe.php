<?php
    header('Content-Type: application/json');
    $response = array();


    require_once("../www/stripe-php/init.php");

	if (isset($_POST["Customer"]))
    {

    	\Stripe\Stripe::setApiKey("sk_test_Dimd5VjTPbIgIfZD6Ofmfqyp");

		$response = \Stripe\Charge::create(array(
		  "amount" => 2000,
		  "currency" => "eur",
		  "customer" => $_POST["Customer"], // obtained with Stripe.js
		  "description" => "Charge Test from php"
		));
    }

    echo json_encode($response);
?>