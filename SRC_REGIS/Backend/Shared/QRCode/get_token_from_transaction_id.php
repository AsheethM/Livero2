<?php

    header('Content-Type: application/json');
    $response = array();
    $err = true;

    if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
        && isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id'])
        && isset($_POST['isClient_token']) && !empty($_POST['isClient_token']))
    {
        $transaction_id = $_POST['transaction_id'];
        $deliverer_id = $_POST['deliverer_id'];
        $isClientToken = $_POST['isClient_token'];

        if (is_bool($isClientToken))
        {
            $req_str ;
            if ($isClientToken)
                $req_str = 'SELECT client_token FROM TRANSACTION WHERE id = ? AND deliverer_id = ?';
            else
                $req_str = 'SELECT vendor_token FROM TRANSACTION WHERE id = ? AND deliverer_id = ?';

            require_once('../connexion.php');
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
            $request->bindParam(2, $deliverer_id, PDO::PARAM_INT);
            $request->execute();

            if ($request->rowCount() > 0)
            {
                $err = false;
                $response['results'] = $request->fetchAll();
            }
        }
    }

    if ($err)
    {
        $response['success'] = false;
        $response['message'] = "Request Get Client Token : KO";
    }
    else
    {
        $response['success'] = true;
        $response['message'] = "Request Get Client Token : OK";
    }

    echo json_encode($response);
?>