<?php

header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

require_once ("../Shared/connexion.php");

    $req_str = "SELECT * FROM shop ";
    $request = $pdo->prepare($req_str);
    $request->execute();
    if ($request->rowCount()  > 0)
    {
        $success = true;
        $message = "Get shops : OK";
        $response['results'] = $request->fetchAll();
    }
    else
    {
        $message = "Get shops : KO";
    }

    $response['success'] = $success;
    $response['message'] = $message;
    echo json_encode($response);
?>