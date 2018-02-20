<?php

    require_once('../Shared/connexion.php');
    $request = $pdo->prepare("SELECT phone_token FROM user WHERE id = 2");
    $request->execute();

    $res = $request->fetchAll();
    $token = $res[0]['phone_token'];


    require_once('notification.php');

    send_notification($token, "Test", 'Hello WOrld');
?>
