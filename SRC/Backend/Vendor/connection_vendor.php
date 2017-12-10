<?php

    header('Content-Type: application/json');
    $response = array();

    require_once ("../Shared/connexion.php");

    if (isset($_POST['login']) && isset($_POST['password']))
    {
        $mail = $_POST['login'];
        $password = $_POST['password'];
        $req_str = "SELECT u.id as user_id, v.id as shop_id ".
            "FROM user u JOIN vendor v ON u.id = v.owner_id WHERE u.email = ?";
        $request = $pdo->prepare($req_str);
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
            $response['message'] = "Request Connection Vendor2 : KO";
        }
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Request Connection Vendor 1: KO";
    }

    echo json_encode($response);
?>