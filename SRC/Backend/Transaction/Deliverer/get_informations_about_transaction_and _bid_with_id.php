<?php
    /* This file allows for a deliverer to get information about the current best bid on a transaction and get the transaction_time */
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if ( isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
        && isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id']))
    {
        $deliverer_id = $_POST['deliverer_id'];
        $transaction_id = $_POST['transaction_id'];
        require_once('../../Shared/connexion.php');

        $verif_str = 'SELECT * FROM deliverer WHERE id = ?';
        $request = $pdo->prepare($verif_str);
        $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);

        if ($request->execute() && $request->rowCount() > 0)
        {
            $req_str = 'SELECT * FROM transaction t JOIN bidding b ON  t.id = b.transaction_id WHERE id = ? '.
                ' AND status = 2 AND bid = (SELECT MIN(bid) FROM bidding WHERE transaction_id = ?)';
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
            $request->bindParam(2, $transaction_id, PDO::PARAM_INT);

            if ($request->execute())
            {
                if ($request->rowCount() > 0)
                {
                    $success = true;
                    $message = 'Request Get Info Abt Transaction With Id : OK';
                    $response['results'] = $request->fetchAll();
                }
            }
            else
                $message = 'BDD Request did not work';
        }
        else
            $message = 'User is not a deliverer';

    }
    else
        $message = 'Parameters Error';


    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);
?>