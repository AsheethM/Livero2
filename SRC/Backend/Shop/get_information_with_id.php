<?php
header('Content-Type: application/json');
require_once('../Shared/connexion.php');
$response = array();
$success = false;
$message = "";

if (isset($_POST["user_id"]) && !empty($_POST["user_id"]))
{
    $user_id = $_POST["user_id"];

    $req_str = "SELECT * FROM user u WHERE u.id =  ?";
    $request = $pdo->prepare($req_str);
    $request->bindParam(1, $user_id, PDO::PARAM_INT);
    $request->execute();
    if ($request->rowCount() > 0)
    {
        $success= true;
        $message = "Request Get Account : OK";
        $response["results"] = $request->fetchAll();
    }
    else
        $message = 'BDD Request did not work';
}
else
    $message = "Parameters Error";

$response["success"] = $success;
$response["message"] = $message;

echo json_encode($response);

?>