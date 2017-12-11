<?php
    header ('application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['vendor_quantity']) && !empty($_POST['vendor_quantity'])
        && isset($_POST['transaction_item_id']) && !empty($_POST['transaction_item_id'])
    //  && isset($_POST['product_id']) && !empty($_POST['product_id'])
    //    && isset($_POST['transaction_id']) && !empty($_POST['transaction_id'])
    )
    {
        $transaction_item_id = $_POST['transaction_item_id'];
        $transaction_id = $_POST['transaction_id'];
        $product_id = $_POST['product_id'];
        $vendor_quantity = $_POST['vendor_quantity'];

        require_once ('../../Shared/connexion.php');

        $req_str = 'UPDATE transaction_item SET vendor_quantity = ? WHERE id = ?';
        /*$req_str2 = 'UPDATE transaction_item SET vendor_quantity = ? WHERE transaction_id = ?'.
            ' AND product_id = ?';*/

        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $vendor_quantity, PDO::PARAM_INT);
        $request->bindParam(2, $transaction_item_id, PDO::PARAM_INT);

        // $request->bindParam(2, $transaction_id, PDO::PARAM_INT);
        // $request->bindParam(3, $product_id, PDO::PARAM_INT);

        if ($request->execute())
        {
            $success = true;
            $message = 'Request Update Vendor Quantity : OK';
        }
        else
            $message = "BDD Update did not work";
    }
    else {
        $message = "Parameters Error";
    }
    $response["success"] = $success;
    $response["message"] = $message;

    echo json_encode($response);
?>