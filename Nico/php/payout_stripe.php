<?php
    header('Content-Type: application/json');
    $response = array();

    require_once("../www/stripe-php/init.php");

	if (isset($_POST["CardToken"]))
    {
		\Stripe\Stripe::setApiKey("sk_test_Dimd5VjTPbIgIfZD6Ofmfqyp");

		/*\Stripe\Payout::create(array(
		  "amount" => 400,
		  "currency" => "eur",
		  "type" => "bank_account",
		  "destination" => $_POST["CardToken"]
		));*/

		$account = \Stripe\Account::retrieve("acct_1BYZgYJsr1zPbw7E");
		$account->external_accounts->create(array("external_account" => "btok_1BaPkHJsr1zPbw7EuXvujaQn"));
    }

    echo json_encode($response);
?>