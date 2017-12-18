<?php
    header('Content-Type: application/json');
    $response = array();


    require_once("../www/stripe-php/init.php");

	if (isset($_POST["ChargeToken"]))
    {
		\Stripe\Stripe::setApiKey("sk_test_Dimd5VjTPbIgIfZD6Ofmfqyp");

		$response = \Stripe\Refund::create(array(
		  "charge" => $_POST["ChargeToken"]
		));
    }


    echo json_encode($response);
?>