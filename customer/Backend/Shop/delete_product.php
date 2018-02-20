<?php
    header('Content-Type: application/json');
    require_once('../Shared/connexion.php');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['id_shop']) && !empty($_POST['id_shop'])
        && isset($_POST['product_id']) && !empty($_POST['product_id']))
    {
        $product_id = $_POST['product_id'];
        $shop_id = $_POST['id_shop'];

        $request = $pdo->prepare("DELETE FROM product WHERE id = ? AND shop_id = ?");
        $request->bindParam(1, $product_id, PDO::PARAM_INT);
        $request->bindParam(2, $shop_id, PDO::PARAM_INT);

        $request->execute();

        if ($request->rowCount() > 0)
        {
            $success = true;
            $message = "Request Delete Product : OK";
        }
        else
        {
            $message = "Bdd delete did not work";
        }
    }
    else
        $message = "Parameters Error";

    $response["success"] = $success;
    $response["message"] = $message;

    echo json_encode($response)
?>