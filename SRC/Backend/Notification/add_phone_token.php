<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST["user_id"]) && !empty($_POST["user_id"])
        && isset($_POST["phone_token"]) && !empty($_POST["phone_token"])) {
        $user_id = $_POST["user_id"];
        $phone_token = $_POST["phone_token"];

        require_once("../Shared/connexion.php");

        $request = $pdo->prepare('UPDATE user SET phone_token = ? WHERE id = ?');
        $request->bindParam(1, $phone_token, PDO::PARAM_STR);
        $request->bindParam(2, $user_id, PDO::PARAM_INT);
        if ($request->execute()) {
            $success = true;
            $message = "Request Update Phone_token : OK";
        }
        else
            $message = "Error on Updating the phone_token";
    }
    else
        $message = "Parameters Erroe";


    $response["success"] = $success;
    $response["message"] = $message;

    echo json_encode($response);

?>
