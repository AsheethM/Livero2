<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST["transaction_id"]) && !empty($_POST["transaction_id"]))
    {
        $transaction_id = $_POST["transaction_id"];
        require_once ('../../Shared/connexion.php');
        $req_str = 'SELECT * FROM transaction_item WHERE transaction_id =  ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
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