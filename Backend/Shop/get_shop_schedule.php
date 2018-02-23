<?php

header('Content-Type: application/json');
require_once('../Shared/connexion.php');
$response = array();
$success = false;
$message = "";


if (isset($_POST['shop_id']) && !empty($_POST['shop_id']))
{
    $shop_id = $_POST['shop_id'];

    $request = $pdo->prepare("SELECT * FROM shop_schedule WHERE shop_id = ?");
    $request->bindParam(1, $shop_id, PDO::PARAM_INT);

    if ($request->execute())
    {
        $success = true;
        if ($request->rowCount() > 0)
        {
            $response['isDays'] = true;
            $response['results'] = $request->fetchAll();
        }
        else
            $response['isDays'] = false;

        $message = "Request Add Shop Schedule : OK";
    }
    else
        $message = "Request Add Shop Schedule : KO";
}
else
{
    $message = "Parameters Error";
}

$response["success"] = $success;
$response{"message"} = $message;

echo json_encode($response);


?>