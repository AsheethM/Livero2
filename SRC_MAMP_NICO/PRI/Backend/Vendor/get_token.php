<?php

    header('Content-Type: application/json');
    $response = array();

    if (isset($_POST['email']))
    {
        $email = $_POST['email'];
        $pdo = new PDO('mysql:host=localhost:8889;dbname=PRI', 'root', 'root');
        $sql = "SELECT t_Shop
                FROM transaction 
                JOIN user 
                    ON transaction.id_shop = user.id 
                WHERE user.email  =\"".$email."\"";  
        $prepare = $pdo->prepare($sql);   
        $res = $prepare ->exec($sql);
    }
    if ($request->rowCount() == 0)
    {
        $response['success'] = true;
        $response['message'] = "Request token : OK";
        $response['result'] = $res->fetchAll();
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Request Connection Vendor : KO";
    }

    echo json_encode($response);
    // echo "{key: \"" . $_POST['email'] . "\"}";
?>