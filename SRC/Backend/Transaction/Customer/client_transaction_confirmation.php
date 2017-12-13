<?php

    header ('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";
    
    if (isset ($_POST['customer_id']) &&  !empty($_POST['customer_id'])
        && isset ($_POST['transaction_id']) &&  !empty($_POST['transaction_id']))
    {
        $customer_id = $_POST['customer_id'];
        $transaction_id = $_POST['transaction_id'];

        require_once('../../Shared/connexion.php');
        
        
        /* Test if status is good */
        $req_str = 'SELECT status FROM transaction WHERE id = ? AND customer_id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $customer_id, PDO::PARAM_INT);
        $request->execute();
        /*------------------------------*/
        if ($request->rowCount() > 0 && $request->fetchAll()[0]['status'] == 3)
        {
            /* Updating status in BDD*/
            $req_str = 'UPDATE transaction SET status = 4 WHERE id = ?';
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
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
    


    require_once ('../../Notification/notification.php');

    if ($success)
    {
        $req_str = 'SELECT shop_id , deliverer_id FROM transaction t WHERE id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->execute();
        if ($request->rowCount() >0) {
            $res = $request->fetchAll();
            $owner_id = $res[0]['shop_id'];
            $deliverer_id = $res[0]['deliverer_id'];
            send_notification_with_id($pdo, $owner_id, 'customer has confirmed for order n°'.$transaction_id,
                'Order Confirmation');
            send_notification_with_id($pdo, $deliverer_id, 'customer has confirmed for order n°'.$transaction_id,
                'Order Confirmation');
        }
    }

    echo json_encode($response);

?>