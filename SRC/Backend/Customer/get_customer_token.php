<?php
    header('Content-Type: application/json');
    $response = array();
    $success =  false;
    $message  = "";

    if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
        && isset($_POST['customer_id']) && !empty($_POST['customer_id']))
    {
        $transaction_id = $_POST['transaction_id'];
        $user_id = $_POST['customer_id'];

        $req_str = 'SELECT customer_token FROM TRANSACTION WHERE id = ? AND customer_id = ?';

        require_once('../Shared/connexion.php');
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $user_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $success = true;
            $response['results'] = $request->fetchAll();
            $message = "Request Get customer Token : OK";
        }
        else
            $message = "BDD Error";
    }
    else
        $message = "Parameters Error";



    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);
?>