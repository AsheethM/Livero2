<?php

header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

if (isset($_POST['shop_id']) && !empty($_POST['shop_id']))
{
    $shop_id = $_POST['shop_id'];
    require_once("../Shared/connexion.php");
    $req_str = 'SELECT t.id, s.shopname FROM transaction t INNER JOIN vendor s ON t.vendor_id = s.id WHERE vendor_id = ?';
    $request = $pdo->prepare($req_str);
    $request->execute();

    if ($request->rowCount() > 0) {
        $success = true;
        $message = "Request Get Transaction from shop id :OK";
        $response['results'] = $request->fetchAll();
    }
    else
        $message = "Bdd Request did not work";
}
else
    $message = "Parameters Error";


echo json_encode($response);

$response['success'] = $success;
$response['message'] = $message;

?>