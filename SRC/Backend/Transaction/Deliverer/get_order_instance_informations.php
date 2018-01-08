<?php
//header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
    && isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id']))
{
    $deliverer_id = $_POST['deliverer_id'];
    $transaction_id = $_POST['transaction_id'];

    require_once('../../Shared/connexion.php');

    $req_str = 'SELECT * FROM transaction WHERE deliverer_id = ? AND id = ?';
    $request = $pdo->prepare($req_str);
    $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);
    $request->bindParam(2, $transaction_id, PDO::PARAM_INT);
    if ($request->execute() && $request->rowCount() > 0)
    {
        $success = true;
        $message = 'Request Get Order Instance Information: OK';
        $response['results'] = $request->fetchAll();

        $customer_id = $response['results'][0]['customer_id'];
        $shop_id= $response['results'][0]['shop_id'];

        $req_str = 'SELECT  s.shop_name, s.address , s.phone FROM shop s '.
        'WHERE s.id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $shop_id, PDO::PARAM_INT);
        $request->execute();

        $response['shop'] = $request->fetchAll();

        $req_str = 'SELECT  u.firstname, u.lastname, u.phone FROM user u '.
            'WHERE u.id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $customer_id, PDO::PARAM_INT);
        $request->execute();

        $response['customer'] = $request->fetchAll();
    }
    else
        $message = 'BDD Error';
}
else
    $message = "Parameters Error";

$response['success'] = $success;
$response['message'] = $message;

echo json_encode($response);
