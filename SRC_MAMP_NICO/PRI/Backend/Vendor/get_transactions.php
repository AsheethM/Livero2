<?php
    header('Content-Type: application/json');
    $response = array();

    require_once ("../Shared/connexion.php");

    $request = $pdo->prepare("SELECT t.id, t.status FROM transaction t WHERE shop_id = :id_shop ");
    $request->bindParam("id_shop", $id_shop);
    $id_shop = $_POST["id_shop"];
    $id_shop = 1;
    $request->execute();

    if ($request->rowCount() > 0)
    {
        $res = $request->fetchAll();
        $response["success"] = true;
        $request["message"] = "Request Get Products :  OK";
        //var_dump(res);
    }
    else
    {
        $response["success"] = false;
        $request["message"] = "Request Get Products :  KO";
    }

    echo json_encode($response);

?>