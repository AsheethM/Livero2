<?php
    header ('Content-Type: application/json');
    require_once('../Shared/connexion.php');
    $response = array();
    $success = false;
    $message = "";

    if (isset ($_POST['shop_id']) &&  !empty($_POST['shop_id'])
        && isset ($_POST['transaction_id']) &&  !empty($_POST['transaction_id'])
        && isset ($_POST['same']) &&  !empty($_POST['same'])
        && isset ($_POST['total_price']) &&  !empty($_POST['total_price']))
    {
        $shop_id = $_POST['shop_id'];
        $transaction_id = $_POST['transaction_id'];
        $isComplete = ($_POST["same"] === '2') ? 0 : 1;
        $total_price = $_POST['total_price'];

        $timer = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s")." +05 minutes"));

        $req_str = 'UPDATE transaction SET status = 2, isComplete = ?, order_price = ?, timer = ? WHERE id = ? AND shop_id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $isComplete, PDO::PARAM_INT);
        $request->bindParam(2, $total_price);
        $request->bindParam(3, $timer);
        $request->bindParam(4, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(5, $shop_id, PDO::PARAM_INT);

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



?>