<?php
    header('Content-Type: application/json');
    $response = array();
    $err = true;

    /*if (isset($_POST["shop_id"]) && !empty($_POST["shop_id"])
        && isset($_POST["transaction_id"]) && !empty($_POST["transaction_id"]))
    {*/
        $shop_id = $_POST["shop_id"];
        $transaction_id = $_POST["transaction_id"];

        $shop_id = 1;
        $transaction_id = 1;

        require_once("../Shared/connexion.php");
        $request = $pdo->prepare("SELECT shop_id FROM transaction WHERE id = ?");
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->execute();

        $res = $request->fetchAll();

        if ($res[0]['shop_id'] == $shop_id)
        {
            $sql_req = "SELECT p.id, p.product_name, p.price, c.quantity"
                        ." FROM command c JOIN product p ON c.product_id = p.id WHERE c.transaction_id = ?";
            $request = $pdo->prepare($sql_req);
            $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
            $request->execute();
            $err = false;
            $response["results"] = $request->fetchAll();
        }
    //}

    if ($err)
    {
        $response["success"] = false;
        $response["message"] = "Request Get Command : KO";
    }
    else
    {
        $response["success"] = true;
        $response["message"] = "Request Get Command : OK";
    }

    echo json_encode($response);

?>