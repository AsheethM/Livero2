<?php
/* File that shows to the deliverer the different transaction in a shop */
header('Content-Type: application/json');
require_once('../Shared/connexion.php');
$response = array();
$success = false;
$message = "";

if (isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id']))
{
    $deliverer_id = $_POST['deliverer_id'];

     $req_str = 'SELECT * FROM transaction WHERE deliverer_id = ? AND status >= 4 AND status < 6';
     $request = $pdo->prepare($req_str);
     $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);
     if ($request->execute())
     {
         $success = true;
         if ($request->rowCount() > 0)
         {
             $response['isTransactions'] = true;
             $message = 'Request Get Current Orders: OK';
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