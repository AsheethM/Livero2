<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
        && isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id'])
        && isset($_POST['token']) && !empty($_POST['token']))
    {
        $transaction_id = $_POST['transaction_id'];
        $deliverer_id = $_POST['deliverer_id'];
        $token = $_POST['token'];

        $req_str = 'SELECT shop_token FROM TRANSACTION WHERE id = ? AND deliverer_id = ?';

        require_once('../Shared/connexion.php');
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $deliverer_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0) {
            $dbb_token = $request->fetchAll()[0]['shop_token'];
            if ($dbb_token == $token)
            {
                $success = true;
                $message = "Request Check Client Token : OK";
            }
            else
            {
                $message = "Request Check Client Token : KO";
            }
        }
        else
        {
            $message = "BDD error";

        }
    }
    else
    {
        $message = "Parameters Error";
    }
$response['success'] = $success;
$response['message'] = $message;

echo json_encode($response);