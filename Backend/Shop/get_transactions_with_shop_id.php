<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST["shop_id"]) && !empty($_POST["shop_id"]))
    {
        $shop_id = $_POST["shop_id"];
        require_once("../Shared/connexion.php");

        $request = $pdo->prepare("SELECT * FROM transaction t WHERE shop_id = ? ");
        $request->bindParam(1, $shop_id, PDO::PARAM_INT);

        if ($request->execute())
        {
            $success = true;
            if ($request->rowCount() > 0)
                $response["isTransactions"] = true;
            else
                $response["isTransactions"] = false;
            $response["results"] = $request->fetchAll();
        }
        else
            $message = "BDD Error";
    }
    else {
        $message = "Parameters Error";
    }
        $response["success"] = $success;
        $response["message"] = $message;

    echo json_encode($response);

?>