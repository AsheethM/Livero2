<?php

    header('Content-Type: application/json');
    $response = array();

    require_once ("../Shared/connexion.php");

    if (isset($_POST['login']) && isset($_POST['password']))
    {
        $mail = $_POST['login'];
        $password = $_POST['password'];
        $request = $pdo->prepare("SELECT u.id as user_id, s.id as shop_id FROM user u JOIN shop s ON u.id = s.owner_id WHERE u.email = ?");
        $request->bindParam(1, $mail, PDO::PARAM_STR);
        $request->execute();
        if ($request->rowCount()  == 1)
        {
            $response['success'] = true;
            $response['message'] = "Request Connection Vendor : OK";
            $response['result'] = $request->fetchAll();
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Request Connection Vendor : KO";
        }
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Request Connection Vendor : KO";
    }

    echo json_encode($response);
?>