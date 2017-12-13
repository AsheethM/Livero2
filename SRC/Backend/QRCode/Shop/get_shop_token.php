<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message  = "";

    if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
        && isset($_POST['shop_id']) && !empty($_POST['shop_id']))
    {
        $transaction_id = $_POST['transaction_id'];
        $shop_id = $_POST['shop_id'];
        $req_str = 'SELECT shop_token FROM transaction WHERE id = ? AND shop_id = ?';

        require_once('../Shared/connexion.php');
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $shop_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $err = false;
            $response['results'] = $request->fetchAll();
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