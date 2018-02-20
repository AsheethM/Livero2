<?php

header('Content-Type: application/json');
require_once('../Shared/connexion.php');


$response = array();
$success =  false;
$message  = "";

if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
    && isset($_POST['customer_id']) && !empty($_POST['customer_id']))
{
    $transaction_id = $_POST['transaction_id'];
    $user_id = $_POST['customer_id'];

    $req_str = 'SELECT  customer_token, s1.shop_name, s1.id as shop_id, u2.firstname, u2.lastname, u2.id as deliverer_id '
        .'FROM transaction t JOIN shop s1 ON t.shop_id = s1.id JOIN user u2 ON deliverer_id = u2.id WHERE t.id = ? AND t.customer_id = ?';

    $request = $pdo->prepare($req_str);
    $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
    $request->bindParam(2, $user_id, PDO::PARAM_INT);
    if ($request->execute())
    {
        if ($request->rowCount() > 0)
        {
            $success = true;
            $response['results'] = $request->fetchAll();
            $message = "Request Get Infos Abt Transaction With Token : OK";
        }
        else
            $message = "BDD Error 2";
    }
    else
        $message = "BDD Error 1";
}
else
    $message = "Parameters Error";



$response['success'] = $success;
$response['message'] = $message;

echo json_encode($response);

?>