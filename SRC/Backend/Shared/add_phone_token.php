<?php
    header('Content-Type: application/json');
    $response = array();
    $err = true;

    if (isset($_POST["user_id"]) && !empty($_POST["user_id"])
        && isset($_POST["phone_token"]) && !empty($_POST["phone_token"])) {
        $user_id = $_POST["user_id"];
        $phone_token = $_POST["phone_token"];

        require_once("connexion.php");

        $request = $pdo->prepare('UPDATE user SET phone_token = ? WHERE id = ?');
        $request->bindParam(1, $phone_token, PDO::PARAM_STR);
        $request->bindParam(2, $user_id, PDO::PARAM_INT);
        if ($request->execute()) {
            $err = false;
        }
    }

    if (!$err)
    {
        $response["success"] = true;
        $response["message"] = "Request UPDATE Phone Token : OK";
    }
    else
    {
        $response["success"] = false;
        $response["message"] = "Request UPDATE Phone Token : KO";
    }

    echo json_encode($response);

?>
