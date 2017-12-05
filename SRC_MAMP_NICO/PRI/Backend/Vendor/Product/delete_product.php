<?php
    header('Content-Type: application/json');
    $response = array();
    if (isset($_POST['id_shop']) && !empty($_POST['id_shop']) && isset($_POST['product_id']) && !empty($_POST['product_id']))
    {
        $product_id = $_POST['product_id'];
        $shop_id = $_POST['id_shop'];

        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare("DELETE FROM product WHERE id = ? AND shop_id = ?");
        $request->bindParam(1, $product_id, PDO::PARAM_INT);
        $request->bindParam(2, $shop_id, PDO::PARAM_INT);

        $request->execute();

        if ($request->rowCount() > 0)
        {
            $response["success"] = true;
            $response["message"] = "Request Delete Product : OK";
        }
        else
        {
            $response["success"] = false;
            $response["message"] = "Request Delete Product : KO";
        }
    }
    else
    {
        $response["success"] = false;
        $response["message"] = "Request Delete Product : KO";
    }

    echo json_encode($response)
?>