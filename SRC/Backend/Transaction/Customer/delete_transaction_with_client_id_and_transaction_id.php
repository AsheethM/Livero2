<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['user_id']) && !empty($_POST['user_id'])
        && isset($_POST['transaction_id']) && !empty($_POST['transaction_id']))
    {
        $customer_id = $_POST['user_id'];
        $transaction_id = $_POST['transaction_id'];

        require_once('../../Shared/connexion.php');
        $req_str = 'DELETE FROM transaction WHERE id = ? AND customer_id = ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $customer_id, PDO::PARAM_INT);
        if ($request->execute())
        {
            $success = true;
        }
        else
            $message = "BDD Delete did not work";
    }
    else
        $message = 'Parameters Error';

    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);

?>