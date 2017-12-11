<?php

    header ('application/json');
    $response = array();
    $success = false;
    $message = "";
    
    if (isset ($_POST['client_id']) &&  !empty($_POST['client_id'])
        && isset ($_POST['transaction_id']) &&  !empty($_POST['transaction_id']))
    {
        $client_id = $_POST['client_id'];
        $transaction_id = $_POST['transaction_id'];
        require_once('../../Shared/connexion.php');
        
        
        /* Test if status is good */
        $req_str = 'SELECT status FROM transaction WHERE id = ? AND client_id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $client_id, PDO::PARAM_INT);
        $request->execute();
        /*------------------------------*/
        if ($request->rowCount() > 0 && $request->fetchAll()[0]['status'] == 3)
        {
            /* Updating status in BDD*/
            $req_str = 'UPDATE transaction SET status = 4 WHERE id = ? AND client_id = ?';
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
            $request->bindParam(2, $client_id, PDO::PARAM_INT);
            /*--------------------------------------*/
            if ($request->execute())
            {
                $success = true;
                $message = 'Request Update Transaction Status : OK';
            }
            else
                $message = "BDD Update did not work";
        }
        else
            $message = "Status is not good";
    }
    else
        $message = "Parameters Error";
    
    $response['success'] = $success;
    $response['message'] = $message;
    
    echo json_encode($response);


    if ($success)
    {
        $req_str = 'SELECT v.owner_id , t.deliverer_id FROM transaction t JOIN vendor v ON t.vendor_id = v.id WHERE id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->execute();
        if ($request->rowCount() >0) {
            $owner_id = $request->fetchAll()[0]['owner_id'];
            $deliverer_id = $request->fetchAll()[0]['deliverer_id'];
            send_notification_with_id($pdo, $owner_id, 'Client has confirmed for order n°'.$transaction_id,
                'Order Confirmation');
            send_notification_with_id($pdo, $deliverer_id, 'Client has confirmed for order n°'.$transaction_id,
                'Order Confirmation');
        }
    }
?>