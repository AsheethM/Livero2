<?php
    header('Content-Type: application/json');
    $response = array();
    $err = 0;

    if (isset($_POST['user_id']) && !empty($_POST['user_id'])
        && isset($_POST['user_firstname']) && !empty($_POST['user_firstname'])
        && isset($_POST['user_lastname']) && !empty($_POST['user_lastname'])
        && isset($_POST['user_email']) && !empty($_POST['user_email'])
        && isset($_POST['user_phone']) && !empty($_POST['user_phone'])
        && isset($_POST['user_birthdate']) && !empty($_POST['user_birthdate'])
        && isset($_POST['shop_id']) && !empty($_POST['shop_id'])
        && isset($_POST['shop_name']) && !empty($_POST['shop_name'])
        && isset($_POST['shop_address']) && !empty($_POST['shop_address'])
        && isset($_POST['shop_postcode']) && !empty($_POST['shop_postcode'])
        && isset($_POST['shop_town']) && !empty($_POST['shop_town'])
        && isset($_POST['shop_phone']) && !empty($_POST['shop_phone']))
    {
        $user_id = $_POST['user_id'];
        $shop_id = $_POST['shop_id'];


        require_once("../../Shared/connexion.php");

        $tmp = ", lastname = ?, email = ?, phone = ?, birthdate = ?";

        $request = $pdo->prepare("UPDATE user SET firstname = ?  WHERE id = ?");
        $request->bindParam(1, $_POST["user_firstname"], PDO::PARAM_STR);
        ///$request->bindParam(2, $_POST["user_lastname"], PDO::PARAM_STR);
        //$request->bindParam(3, $_POST["user_email"], PDO::PARAM_STR);
        //$request->bindParam(4, $_POST["user_phone"], PDO::PARAM_STR);
        //$request->bindParam(5, $_POST["user_birthdate"]);
        $request->bindParam(2, $user_id, PDO::PARAM_INT);

        $request->execute();

        if ($request->rowCount() == 1) {
            /*$request = $pdo->prepare("UPDATE shop SET shop_name = ?, address = ?, postcode = ?, town = ?, phone = ? WHERE id = ?");
            $request->bindParam(1, $_POST["shop_name"], PDO::PARAM_STR);
            $request->bindParam(2, $_POST["shop_address"], PDO::PARAM_STR);
            $request->bindParam(3, $_POST["shop_postcode"], PDO::PARAM_STR);
            $request->bindParam(4, $_POST["shop_town"], PDO::PARAM_STR);
            $request->bindParam(5, $_POST["shop_phone"], PDO::PARAM_STR);
            $request->bindParam(6, $shop_id, PDO::PARAM_INT);

            $request->execute();

            if ($request->rowCount() == 1)*/
                $err = 0;

        }
        else
        {
            $err = 1;
        }

    }
    else
        $err = -1;

    if ($err == -1)
    {
        $response["success"] = false;
        $response["message"] = "Request Update Account 1: KO";
    }
    else if ($err == 1)
    {
        $response["success"] = false;
        $response["message"] = "Request Update Account 2: KO";
    }
    else
    {
        $response["success"] = true;
        $response["message"] = "Request Update Account : OK";
    }

    echo json_encode($response);

?>