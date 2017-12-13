<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    $transaction_id = 0;
    $shop_id = 0;
    /**
     * First Part : Create a transaction with the user_id, shop_id, order_price
     * Then after creating the entry, the 2 tokens are created one for the use, one for the shop
    */
    /*if (isset($_POST["customer_id"]) && !empty($_POST['customer_id'])
        && isset($_POST["shop_id"]) && !empty($_POST['shop_id'])
        && isset($_POST["order_price"]) && !empty($_POST['order_price']))
    {*/

        /*$customer_id = $_POST["customer_id"];
        $shop_id = $_POST["shop_id"];
        $order_price = $_POST['order_price'];*/

        $customer_id = 3;
        $shop_id = 1;
        $order_price = 300;

        //$timer = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s")." +05 minutes"));
        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare('INSERT INTO transaction (customer_id, shop_id, order_price, status)'.
            ' VALUES (?, ?, ?, 1)');
        $request->bindParam(1, $customer_id, PDO::PARAM_INT);
        $request->bindParam(2, $shop_id, PDO::PARAM_INT);
        $request->bindParam(3, $order_price);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $request = $pdo->prepare('SELECT max(id) as id FROM transaction WHERE customer_id = ? AND shop_id = ?');
            $request->bindParam(1, $customer_id, PDO::PARAM_INT);
            $request->bindParam(2, $shop_id, PDO::PARAM_INT);
            $request->execute();
            $response['results'] = $request->fetchAll();
            $transaction_id = $response['results'][0]['id'];

            $customer_token = $shop_id.rand().rand()."-_-".$transaction_id;
            $shop_token = $customer_id.rand().rand()."-_-".$transaction_id;
            $request = $pdo->prepare('UPDATE transaction SET customer_token = ?, shop_token = ?'.
                ' WHERE id = ?');
            $request->bindParam(1, $customer_token, PDO::PARAM_STR);
            $request->bindParam(2, $shop_token, PDO::PARAM_STR);
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
    /*}
    else
        $message = "Parameters Error";*/


    $response['success'] = $success;
    $response['message'] = $message;
    echo json_encode($response);


    /**
     * Seconf part : Send a notification to the shop that he has received an order
     */
    if ($success)
    {
        require_once('../../Notification/notification.php');
        send_notification_with_id($pdo, $shop_id, 'New Order', 'Order');
    }

?>