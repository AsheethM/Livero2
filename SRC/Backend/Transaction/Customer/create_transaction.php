<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    $transaction_id = 0;
    $vendor_id = 0;
    /**
     * First Part : Create a transaction with the user_id, shop_id, order_price
     * Then after creating the entry, the 2 tokens are created one for the use, one for the vendor
    */
    if (isset($_POST["client_id"]) && !empty($_POST['client_id'])
        && isset($_POST["vendor_id"]) && !empty($_POST['vendor_id'])
        && isset($_POST["order_price"]) && !empty($_POST['order_price']))
    {

        $client_id = $_POST["client_id"];
        $vendor_id = $_POST["vendor_id"];
        $order_price = $_POST['order_price'];

        //$timer = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s")." +05 minutes"));
        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare('INSERT INTO transaction (client_id, vendor_id, order_price, status)'.
            ' VALUES (?, ?, ?, ?, 1)');
        $request->bindParam(1, $client_id, PDO::PARAM_INT);
        $request->bindParam(2, $vendor_id, PDO::PARAM_INT);
        $request->bindParam(3, $order_price);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $request = $pdo->prepare('SELECT max(id) as id FROM transaction WHERE client_id = ? AND vendor_id = ?');
            $request->bindParam(1, $client_id, PDO::PARAM_INT);
            $request->bindParam(2, $vendor_id, PDO::PARAM_INT);
            $request->execute();
            $request['results'] = $request->fetchAll();
            $transaction_id = $request['results'][0]['id'];

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


    /**
     * Seconf part : Send a notification to the vendor that he has received an order
     */
    if ($success)
    {

        $req_str = 'SELECT phone_token FROM user u JOIN vendor v ON u.id = v.owner_id'.
            ' WHERE v.id = ? ';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $vendor_id, PDO::PARAM_INT);
        $request->execute();
        if ($request->rowCount() > 0)
        {
            require_once('../Notification/notification.php');
            $phone_token = $request->fetchAll()[0]['phone_token'];
            send_notification($phone_token, 'New Order', 'Order');
        }
    }

?>