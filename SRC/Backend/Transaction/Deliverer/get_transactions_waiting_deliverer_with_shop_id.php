<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['shop_id']) && !empty($_POST['shop_id']))
    {
        $shop_id = $_POST['shop_id'];
        $req_str = 'SELECT * FROM transaction WHERE vendor_id = ? AND status = 2';
        require_once('../../Shared/connexion.php');

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
                $response['isTransactions'] = false;
        }
        else
            $message = 'No transactions for this shop';
    }
    else
        $message = "Parameters Error";

    $response['success'] = $success;
    $response['message'] = $message;

    echo json_encode($response);
?>