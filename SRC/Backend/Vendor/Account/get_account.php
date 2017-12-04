<?php
    header('Content-Type: application/json');
    $response = array();

    if (isset($_POST["user_id"]) && !empty($_POST["user_id"])
        && isset($_POST["shop_id"]) && !empty($_POST["shop_id"]))
    {
        $user_id = $_POST["user_id"];
        require_once ("../../Shared/connexion.php");
        $user_infos = "u.id as user_id, u.firstname, u.lastname, u.birthdate, u.email, u.phone as user_phone";
        $shop_infos = "s.id as shop_id, s.shop_name, s.address, s.postcode, s.town, s.phone as shop_phone";

        $request = $pdo->prepare('SELECT '.$user_infos.', '.$shop_infos.' FROM user u JOIN shop s ON u.id = s.owner_id WHERE u.id = ?');
        $request->bindParam(1, $user_id, PDO::PARAM_INT);
        $request->execute();
        if ($request->rowCount() > 0)
        {
            $response["success"] = true;
            $response["message"] = "Request Get Account : OK";
            $response["results"] = $request->fetchAll();
        }
        else
        {
            $response["success"] = false;
            $response["message"] = "Request Get Account 2 : KO";
        }
    }
    else
    {
        $response["success"] = false;
        $response["message"] = "Request Get Account 1: KO";
    }

    echo json_encode($response);

?>