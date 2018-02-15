<?php
header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";
$isTransaction = false;

if (isset($_POST["user_id"]) && !empty($_POST["user_id"]))
{
    $user_id = $_POST["user_id"];

    require_once("../Shared/connexion.php");
    $req_str = "SELECT * FROM transaction t WHERE t.shop_id = ? AND status = 6 ORDER BY t.id DESC LIMIT 5";
    $request = $pdo->prepare($req_str);
    $request->bindParam(1, $user_id, PDO::PARAM_INT);
    if ($request->execute())
    {
        $success = true;
        if ($request->rowCount() > 0)
        {
            $message = "Request Get Account : OK";
            $response["results"] = $request->fetchAll();
            $isTransaction = true;
        }
        else
            $message = 'BDD Request returned null';
    }
    else
        $message = "Select did not work";

}
else
    $message = "Parameters Error";

$response["isTransaction"] = $isTransaction;
$response["success"] = $success;
$response["message"] = $message;

echo json_encode($response);

?>