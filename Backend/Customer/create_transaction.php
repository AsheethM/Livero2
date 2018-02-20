<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    $transaction_id = 0;

    if (isset($_POST["client_id"]) && !empty($_POST['client_id'])
        && isset($_POST["vendor_id"]) && !empty($_POST['vendor_id'])
        && isset($_POST["order_price"]) && !empty($_POST['order_price']))
    {

        $client_id = $_POST["client_id"];
        $vendor_id = $_POST["vendor_id"];
        $order_price = $_POST['order_price'];

        $timer = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s")." +05 minutes"));
        require_once("../Shared/connexion.php");

        $request = $pdo->prepare('INSERT INTO transaction (client_id, vendor_id, order_price, bidding_time, status)'.
            ' VALUES (?, ?, ?, ?, 1)');
        $request->bindParam(1, $client_id, PDO::PARAM_INT);
        $request->bindParam(2, $vendor_id, PDO::PARAM_INT);
        $request->bindParam(3, $order_price);
        $request->bindParam(4, $timer);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $request = $pdo->prepare('SELECT max(id) as id FROM transaction WHERE client_id = ? AND vendor_id = ?');
            $request->bindParam(1, $client_id, PDO::PARAM_INT);
            $request->bindParam(2, $vendor_id, PDO::PARAM_INT);
            $request->execute();
            $transaction_id = $request->fetchAll()[0]['id'];

            $client_token = $vendor_id.rand()."-_-".rand().$transaction_id;
            $vendor_token = $client_id.rand()."-_-".rand().$transaction_id;
            $request = $pdo->prepare('UPDATE transaction SET client_token = ?, vendor_token = ?'.
                ' WHERE id = ?');
            $request->bindParam(1, $client_token, PDO::PARAM_STR);
            $request->bindParam(2, $vendor_token, PDO::PARAM_STR);
            $request->bindParam(3, $transaction_id, PDO::PARAM_INT);

            if ($request->execute())
            {
                $success = true;
                $message = "Request Create Transaction : OK";
            }
            else
                $message = "Create tokens did not work";
        }
        else
            $message = "Insert did not work";
    }
    else
        $message = "Parameters Error";


    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);

    if ($success)
    {
        sleep(5*60);
        $request = $pdo->prepare('SELECT * FROM bidding WHERE transaction_id = ?');
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() == 0)
        {
            /**/
        }
        else
        {
            $res  = $request->fetchAll();
            $deliverer_id = $res[0]['deliverer_id'];
            $deliverer_price = $res[0]['bet'];

            $request = $pdo->prepare('UPDATE transaction SET deliverer_id = ?, deliverer_price = ?, status = 3 '.
                ' WHERE id = ?');
            $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);
            $request->bindParam(2, $deliverer_price);
            $request->bindParam(3, $transaction_id, PDO::PARAM_INT);

            if ($request->execute())
            {
                /**/
            }
        }
    }



?>