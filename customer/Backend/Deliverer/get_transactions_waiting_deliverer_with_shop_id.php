<?php
    /* File that shows to the deliverer the different transaction in a shop */
    header('Content-Type: application/json');
    require_once('../Shared/connexion.php');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['shop_id']) && !empty($_POST['shop_id'])
        && isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id']))
    {
        $deliverer_id = $_POST['deliverer_id'];
        $shop_id = $_POST['shop_id'];


        $verif_str = 'SELECT * FROM deliverer WHERE id = ?';
        $request = $pdo->prepare($verif_str);
        $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);

        if ($request->execute() && $request->rowCount() > 0)
        {
            $req_str = 'SELECT * FROM transaction WHERE shop_id = ? AND status = 2';
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $shop_id, PDO::PARAM_INT);
            if ($request->execute())
            {
                $success = true;
                if ($request->rowCount() > 0)
                {
                    $response['isTransactions'] = true;
                    $message = 'Request Get Transactions Waiting deliverer With Shop Id: OK';
                    $response['results'] = $request->fetchAll();
                }
                else
                {
                    $response['isTransactions'] = false;
                    $message = "No Transaction available for this shop";
                }
            }
            else
                $message = 'No transactions waiting for a deliverer for this shop';
        }
        else
            $message = 'User is not a deliverer';
    }
    else
        $message = "Parameters Error";

    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);
?>