<?php

    header('application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
        && isset($_POST['client_id']) && !empty($_POST['client_id']))
    {
        $transaction_id = $_POST['transaction_id'];
        $client_id = $_POST['client_id'];
        require_once ('../Shared/connexion.php');

        /* Test if the transaction is associated with the good client */
        $req_str = 'SELECT * FROM transaction WHERE id = ? AND client_id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id,PDO::PARAM_INT);
        $request->bindParam(2, $client_id,PDO::PARAM_INT);
        $request->execute();
        /*------------------------------------------------------------*/
        if ($request->rowCount())
        {
            /* Deleting every order items */
            $req_str = 'DELETE FROM command WHERE transaction_id = ?';
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $transaction_id,PDO::PARAM_INT);
            /*-----------------------------------------------------------------------*/
            if ($request->execute())
            {
                /* Deleting the transaction */
                $req_str = 'DELETE FROM transaction WHERE id = ?';
                $request = $pdo->prepare($req_str);
                $request->bindParam(1, $transaction_id,PDO::PARAM_INT);
                if ($request->execute())
                {
                    $success = true;
                    $message = "Request Delete transaction : OK";
                }
                else
                    $message = "Bdd Delete transaction did not work";
                /*-------------------------------------------------------------------*/
            }
            else
                $message = "Bdd Delete command did not work";
        }
        else
            $message = "No transaction with this client";
    }
    else
        $message = "Parameters Error";

    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);

?>