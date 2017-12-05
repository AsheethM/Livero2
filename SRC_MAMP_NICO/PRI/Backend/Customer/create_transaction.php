<?php
    header('Content-Type: application/json');
    $response = array();

    // Use GET to test without a client but will be changed to a POST method

    if (isset($_POST["id_customer"]) && isset($_POST["id_shop"]))
    {
        if (is_int($_POST["id_customer"]) && is_int($_POST["id_shop"]))
       {
            try
            {
                require_once("connexion.php");
                $bdd_request = $pdo->prepare("INSERT INTO  transaction(id_client, id_shop, timer, price, is_OK) VALUES (:customer, :shop, :timer, 0, 0)");
                $bdd_request->bindParam(':customer', $customer_id);
                $bdd_request->bindParam(':shop', $shop_id);
                $bdd_request->bindParam(':timer', $timer);

                $timer = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s")." +05 minutes"));
                $customer_id = 1;
                $shop_id = 1;
                $bdd_request->execute();

                if ($bdd_request->rowCount() > 0)
                {
                    $response['success'] = true;
                    $response['message'] = "Request creation transaction : OK";
                }
                else
                {
                    $response['success'] = false;
                    $response['message'] = "Request creation transaction : KO";
                }
            }
            catch (Exception $e)
            {
                $response['success'] = false;
                $response['message'] = "Request creation transaction 2 : KO";
            }
       }
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Request creation transaction 1 : KO";
    }

    echo json_encode($response);
?>