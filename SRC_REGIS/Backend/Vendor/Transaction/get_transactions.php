<?php
    header('Content-Type: application/json');
    $response = array();
    $err = true;

    if (isset($_POST["shop_id"]) && !empty($_POST["shop_id"]))
    {
        $id_shop = $_POST["shop_id"];
        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare("SELECT t.id, t.status FROM transaction t WHERE shop_id = ? ");
        $request->bindParam(1, $id_shop, PDO::PARAM_INT);

        if ($request->execute())
        {
            $err = false;
            if ($request->rowCount() > 0)
                $response["isTransactions"] = true;
            else
                $response["isTransactions"] = false;
            $response["results"] = $request->fetchAll();
        }
    }

    if ($err)
    {
        $response["success"] = false;
        $response["message"] = "Request Get Products :  KO";
    }
    else
    {
        $response["success"] = true;
        $response["message"] = "Request Get Products :  OK";
    }

    echo json_encode($response);

?>