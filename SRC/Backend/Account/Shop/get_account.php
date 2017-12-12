<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST["user_id"]) && !empty($_POST["user_id"])
        && isset($_POST["shop_id"]) && !empty($_POST["shop_id"]))
    {
        $user_id = $_POST["user_id"];
        require_once("../../Shared/connexion.php");
        $user_infos = "u.id as user_id, u.firstname, u.lastname, u.birthdate, u.email, u.phone as user_phone";
        $shop_infos = "s.shop_name, s.address , s.phone as shop_phone";
        $req_str = 'SELECT '.$user_infos.', '.$shop_infos.' FROM user u JOIN shop s'.
            ' ON u.id = s.id WHERE u.id = ?';

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