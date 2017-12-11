<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST["shop_id"]) && !empty($_POST["shop_id"]))
    {
        $id_shop = $_POST["shop_id"];
        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare("SELECT * FROM transaction t WHERE vendor_id = ? ");
        $request->bindParam(1, $id_shop, PDO::PARAM_INT);

        if ($request->execute())
        {
            $success = true;
            if ($request->rowCount() > 0)
                $response["isTransactions"] = true;
            else
                $response["isTransactions"] = false;
            $response["results"] = $request->fetchAll();
        }
    }
    else {
        $message = "Parameters Error";
    }
        $response["success"] = $success;
        $response["message"] = $message;

    echo json_encode($response);

?>