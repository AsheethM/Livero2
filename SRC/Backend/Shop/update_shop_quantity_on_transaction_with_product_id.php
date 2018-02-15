<?php
    header ('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['shop_quantity']) && !empty($_POST['shop_quantity'])
      && isset($_POST['product_id']) && !empty($_POST['product_id'])
      && isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
      && isset($_POST['shop_id']) && !empty($_POST['shop_id']))
    {
        $shop_id = $_POST['shop_id'];
        $transaction_id = $_POST['transaction_id'];
        $product_id = $_POST['product_id'];
        $shop_quantity = $_POST['shop_quantity'];

        require_once ('../Shared/connexion.php');

        $verif_str = 'SELECT * FROM transaction WHERE id = ? AND shop_id = ?';
        $request = $pdo->prepare($verif_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        $request->bindParam(2, $shop_id, PDO::PARAM_INT);
        if ($request->execute() && $request->rowCount() > 0)
        {
            $req_str = 'UPDATE transaction_product SET shop_quantity = ? WHERE transaction_id = ?'.
                ' AND product_id = ?';

            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $shop_quantity, PDO::PARAM_INT);
            $request->bindParam(2, $transaction_id, PDO::PARAM_INT);
            $request->bindParam(3, $product_id, PDO::PARAM_INT);

            if ($request->execute())
            {
                $success = true;
                $message = 'Request Update Vendor Quantity : OK';
            }
            else
                $message = "BDD Update did not work";
        }
        else
            $message = 'No such transaction for this shop';
    }
    else
        $message = "Parameters Error";

    $response["success"] = $success;
    $response["message"] = $message;

    echo json_encode($response);
?>