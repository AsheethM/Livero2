<?php

header('Content-Type: application/json');
require_once('../Shared/connexion.php');
$response = array();
$success = false;
$message = "";


if (isset($_POST['shop_id']) && !empty($_POST['shop_id'])
    && isset($_POST['opening_hour']) && !empty($_POST['opening_hour'])
    && isset($_POST['closing_hour']) && !empty($_POST['closing_hour'])
    && isset($_POST['day']) && !empty($_POST['day']))
{
    $shop_id = $_POST['shop_id'];
    $opening_hour = $_POST['opening_hour'];
    $closing_hour = $_POST['closing_hour'];
    $day = $_POST['day'];

    $request = $pdo->prepare("INSERT INTO shop_schedule(shop_id, shop_day, opening_hour, closing_hour) ".
    "VALUES (?,?, ?, ?)");
    $request->bindParam(1, $shop_id, PDO::PARAM_INT);
    $request->bindParam(2, $day);
    $request->bindParam(3, $opening_hour);
    $request->bindParam(4, $closing_hour);

    if ($request->execute() && $request->rowCount() > 0)
    {
        $success = true;
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