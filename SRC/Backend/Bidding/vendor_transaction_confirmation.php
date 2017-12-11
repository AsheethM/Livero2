<?php

    header ('application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset ($_POST['shop_id']) &&  !empty($_POST['shop_id'])
        && isset ($_POST['transaction_id']) &&  !empty($_POST['transaction_id']))
    {
        $shop_id = $_POST['shop_id'];
        $transaction_id = $_POST['transaction_id'];

        require_once ('../Shared/connexion.php');
        $req_str = 'UPDATE transaction SET status = 2 WHERE id = ? AND vendor_id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $shop_id, PDO::PARAM_INT);

        if ($request->execute())
        {
            $success = true;
            $message = 'Request Update Transaction Status : OK';
        }
        else
            $message = "BDD Update did not work";
    }
    else
        $message = "Parameters Error";

    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);

    /*----------------------------------------------------------------------------------------------------------------*/

    if ($success)
    {
        sleep(5*60);
        $request = $pdo->prepare('SELECT * FROM bidding WHERE transaction_id = ? '.
            'AND bet = (SELECT MIN(bet) FROM bidding WHERE transaction_id = ?)');
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $transaction_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $res = $request->fetchAll();
            $deliverer_id = $res[0]['deliverer_id'];
            $deliverer_price = $res[0]['bet'];
            $request = $pdo->prepare('UPDATE transaction SET deliverer_id = ?, deliverer_price = ?, status = 3 '.
                    ' WHERE id = ?');
            $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);
            $request->bindParam(2, $deliverer_price);
            $request->bindParam(3, $transaction_id, PDO::PARAM_INT);

            if ($request->execute())
            {
                $req_str = 'SELECT client_id FROM transaction WHERE id = ?';
                $request = $pdo->prepare($req_str);
                $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
                $request->execute();
                if ($request->rowCount() >0) {
                    $client_id = $request->fetchAll()[0]['client_id'];
                    send_notification_with_id($pdo, $client_id, 'Confirmation Order', 'Order');
                }
            }
        }
        else
        {
            /* No deliverers What to do ? */
        }
    }



?>