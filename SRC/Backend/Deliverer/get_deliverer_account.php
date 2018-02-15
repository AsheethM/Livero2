<?php
header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

if (isset($_POST["user_id"]) && !empty($_POST["user_id"]))
{
    $user_id = $_POST["user_id"];

    require_once("../Shared/connexion.php");
    $req_str = "SELECT * FROM user u JOIN deliverer d ON u.id = d.id WHERE u.id =  ?";
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