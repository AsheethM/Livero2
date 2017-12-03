<?php
    header('Content-Type: application/json');
    $response = array();
    if (isset($_POST['id_shop']) && !empty($_POST['id_shop']) && isset($_POST['product_id']) && !empty($_POST['product_id'])
        && isset($_POST['product_name']) && !empty($_POST['product_name'])
        && isset($_POST['product_price']) && !empty($_POST['product_price'])
        && isset($_POST['product_description']) && !empty($_POST['product_description'])) {
        $product_id = $_POST['product_id'];
        $shop_id = $_POST['id_shop'];
        $product_name = $_POST['product_name'];
        $product_price = $_POST['product_price'];
        $product_description = $_POST['product_description'];

        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare("UPDATE product SET product_name = ?, price = ?, description = ? WHERE id = ? AND shop_id = ?");
        $request->bindParam(1, $product_name, PDO::PARAM_STR);
        $request->bindParam(2, $product_price, PDO::PARAM_INT);
        $request->bindParam(3, $product_description, PDO::PARAM_STR);
        $request->bindParam(4, $product_id, PDO::PARAM_INT);
        $request->bindParam(5, $shop_id, PDO::PARAM_INT);

        $request->execute();

        if ($request->rowCount() > 0)
        {
            $response["success"] = true;
            $response["message"] = "Request Update Product : OK";
        }
        else
        {
            $response["success"] = false;
            $response["message"] = "Request Update Product : KO";
        }
    }
    else
    {
        $response["success"] = false;
        $response["message"] = "Request Update Product : KO";
    }
    echo json_encode($response)
?>