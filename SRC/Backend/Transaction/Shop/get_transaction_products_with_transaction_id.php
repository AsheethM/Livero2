<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST["transaction_id"]) && !empty($_POST["transaction_id"])
        && isset($_POST["shop_id"]) && !empty($_POST["shop_id"]))
    {
        $shop_id = $_POST["shop_id"];
        $transaction_id = $_POST["transaction_id"];
        require_once ('../../Shared/connexion.php');
        $req_str = 'SELECT * FROM transaction_product tp JOIN product p ON tp.product_id = p.id'.
            ' WHERE tp.transaction_id =  ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        //$request->bindParam(2, $shop_id, PDO::PARAM_INT);
        if ($request->execute())
        {
            if ($request->rowCount() > 0)
            {
                $success = true;
                $message = 'Request Get Transaction Items : OK';
                $response['results'] = $request->fetchAll();
            }
            else
                $message = "No items for this transaction";
        }
        else
            $message = "BDD Request did not work";
    }
    else
        $message = "Parameters Error";

    $response["success"] = $success;
    $response["message"] = $message;

    echo json_encode($response);

?>