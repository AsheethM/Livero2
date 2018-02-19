<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$response = array();
$success = false;
$message = "";

if (isset($_POST['user_id']) && !empty($_POST['user_id']))
{

    $user_id = $_POST['user_id'];

    require_once('../Shared/connexion.php');

    $req_str = 'SELECT transaction.id as id, shop_name, status, order_price, timer FROM transaction JOIN shop ON shop.id = transaction.shop_id WHERE customer_id = ?';
    $request = $pdo->prepare($req_str);
    $request->bindParam(1, $user_id, PDO::PARAM_INT);
    if ($request->execute())
    {
        $success = true;
        if ($request->rowCount() > 0)
        {
            $response['isTransactions'] = true;
            $message = 'Request Get Transactions : OK';
            $response['results'] = $request->fetchAll();
        }
        else
        {
            $response['isTransactions'] = false;
            $message = "No Orders available you";
        }
    }
    else
        $message = 'BDD Error';
}
else
    $message = "Parameters Error";

$response['success'] = $success;
$response['message'] = $message;

echo json_encode($response);

?>