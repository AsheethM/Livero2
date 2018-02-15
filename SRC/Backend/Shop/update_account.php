<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['user_id']) && !empty($_POST['user_id'])
        && isset($_POST['user_firstname']) && !empty($_POST['user_firstname'])
        && isset($_POST['user_lastname']) && !empty($_POST['user_lastname'])
        && isset($_POST['user_email']) && !empty($_POST['user_email'])
        && isset($_POST['user_phone']) && !empty($_POST['user_phone'])
        && isset($_POST['user_birthdate']) && !empty($_POST['user_birthdate'])
        && isset($_POST['shop_id']) && !empty($_POST['shop_id'])
        && isset($_POST['shop_name']) && !empty($_POST['shop_name'])
        && isset($_POST['shop_street']) && !empty($_POST['shop_street'])
        && isset($_POST['shop_postcode']) && !empty($_POST['shop_postcode'])
        && isset($_POST['shop_town']) && !empty($_POST['shop_town'])
        && isset($_POST['shop_phone']) && !empty($_POST['shop_phone']))
    {
        $user_id = $_POST['user_id'];
        $shop_id = $user_id;
        $shop_address = $_POST['shop_street'].' , '.$_POST['shop_postcode'].' , '.$_POST['shop_town'];


        require_once("../Shared/connexion.php");

        $request = $pdo->prepare("UPDATE user SET firstname = ?, lastname = ?, email = ?, phone = ?, birthdate = ? WHERE id = ?");
        $request->bindParam(1, $_POST["user_firstname"], PDO::PARAM_STR);
        $request->bindParam(2, $_POST["user_lastname"], PDO::PARAM_STR);
        $request->bindParam(3, $_POST["user_email"], PDO::PARAM_STR);
        $request->bindParam(4, $_POST["user_phone"], PDO::PARAM_STR);
        $request->bindParam(5, $_POST["user_birthdate"]);
        $request->bindParam(6, $user_id, PDO::PARAM_INT);



        if ($request->execute())
        {
            $request = $pdo->prepare("UPDATE shop SET shop_name = ?, address = ?, phone = ? WHERE id = ?");
            $request->bindParam(1, $_POST["shop_name"], PDO::PARAM_STR);
            $request->bindParam(2, $shop_address, PDO::PARAM_STR);;
            $request->bindParam(5, $_POST["shop_phone"], PDO::PARAM_STR);
            $request->bindParam(6, $shop_id, PDO::PARAM_INT);

            if ($request->execute())
            {
                $success = true;
                $message = 'Request Update User Information : OK';
            }
            else
                $message = 'Update Shop did not work';
        }else
            $message = 'Update User did not work';
    }
    else
        $message = 'Parameters Error';

    $response["success"] = $success;
    $response["message"] = $message;
    echo json_encode($response);

?>