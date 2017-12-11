<?php

    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['deliverer_id']) && !empty($_POST['deliverer_id'])
        && isset($_POST['transaction_id']) && !empty($_POST['transaction_id_id'])
        && isset($_POST['bid']) && !empty($_POST['bid']))
    {
        $deliverer_id = $_POST['deliverer_id'];
        $transaction_id = $_POST['transaction_id'];
        $bid = $_POST['bid'];

        require_once('../../Shared/connexion.php');
        $request = $pdo->prepare('SELECT role FROM user WHERE id = ?');
        $request->bindParam(1, $deliverer_id, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $role = $request->fetchAll()[0]['role'];
            if ($role == 4 || $role == 5 || $role == 7)
            {
                $request = $pdo->prepare('SELECT status FROM transaction WHERE id = ?');
                $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
                $request->execute();

                if ($request->rowCount() > 0)
                {
                    $status = $request->fetchAll()[0]['status'];
                    if ($status == 2)
                    {
                        $req_str = 'SELECT  bid FROM bidding WHERE transaction_id = ?'.
                            ' AND deliverer_id = ?';
                        $request = $pdo->prepare($req_str);
                        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
                        $request->bindParam(2, $deliverer_id, PDO::PARAM_INT);
                        $request->execute();
                        if ($request->rowCount() > 0)
                        {
                            $current_bid = $request->fetchAll()[0]['bid'];
                            if ($bid < $current_bid)
                            {
                                $req_str = 'UPDATE bidding SET bid = ? WHERE transaction_id = ?'.
                                    ' AND deliverer_id = ?';
                                $request = $pdo->prepare($req_str);
                                $request->bindParam(1, $bid, PDO::PARAM_INT);
                                $request->bindParam(2, $transaction_id, PDO::PARAM_INT);
                                $request->bindParam(3, $deliverer_id, PDO::PARAM_INT);
                                if ($request->execute())
                                {
                                    $success = true;
                                    $message = 'Request Update Bidding : OK';
                                }
                            }
                        }
                        else
                        {
                            $request = $pdo->prepare('INSERT INTO  bidding (transaction_id, dellverer_id, bid)'.
                                ' VALUES (?, ?, ?)');
                            $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
                            $request->bindParam(2, $deliverer_id, PDO::PARAM_INT);
                            $request->bindParam(3, $bid);
                            $request->execute();
                            if ($request->rowCount() > 0)
                            {
                                $success = true;
                                $message = "Request Set Bid : OK";
                            }
                            else
                                $message = "Insert did not work";
                        }

                    }
                    else
                        $message = "Transaction is finished or the bidding has not started";
                }
                else
                    $message = "No such transaction";
            }
            else
                $message = "User is not a deliverer";
        }
        else
            $message = "No such User";
    }
    else
        $message = "Parameters Error";

    $response['success'] = $success;
    $response['message'] = $message;
    echo json_encode($response);
?>
