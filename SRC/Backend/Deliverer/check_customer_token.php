<?php
    header('Content-Type: application/json');
    require_once('../Shared/connexion.php');
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

        $req_str = 'SELECT customer_token FROM TRANSACTION WHERE id = ? AND deliverer_id = ?';


        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $deliverer_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0) {
            $dbb_token = $request->fetchAll()[0]['customer_token'];
            if ($dbb_token == $token)
            {
                $req_str = 'UPDATE TRANSACTION SET status = 6 WHERE id = ? AND deliverer_id = ?';
                $request = $pdo->prepare($req_str);
                $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
                $request->bindParam(2, $deliverer_id, PDO::PARAM_INT);

                if ($request->execute())
                {
                    $success = true;
                    $message = "Request Check Client Token : OK";
                }
                else
                    $message = "Request Check Client Token : K0";
            }
            else
            {
                $message = "Pas le même token";
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

?>