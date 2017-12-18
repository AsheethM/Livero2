<?php
    header('Content-Type: application/json');
    $response = array();


    require_once("../www/stripe-php/init.php");

	if (isset($_POST["StripeToken"]))
    {

    	\Stripe\Stripe::setApiKey("sk_test_Dimd5VjTPbIgIfZD6Ofmfqyp");

		$response = \Stripe\Customer::create(array(
		  "description" => "Customer Create Test",
		  "source" => $_POST["StripeToken"] // obtained with Stripe.js
		));
    }


    echo json_encode($response);
?>