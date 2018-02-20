<?php

    header('Content-Type: application/json');
    require_once('../Shared/connexion.php');
    $response = array();

    if (isset($_POST['login']) && isset($_POST['password']))
    {
        $mail = $_POST['login'];
        $password = $_POST['password'];
        $req_str = "SELECT u.id as user_id, v.id as shop_id ".
            "FROM user u JOIN shop v ON u.id = v.id WHERE u.email = ?";
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $mail, PDO::PARAM_STR);
        $request->execute();
        if ($request->rowCount()  == 1)
        {
            $response['success'] = true;
            $response['message'] = "Request Connection shop : OK";
            $response['result'] = $request->fetchAll();
        }
        else
        {
            $response['success'] = false;
            $response['message'] = "Request Connection shop2 : KO";
        }
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Request Connection shop 1: KO";
    }

    echo json_encode($response);
?>