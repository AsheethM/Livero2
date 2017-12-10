<?php
    header('Content-Type: application/json');
    $response = array();
    $success = false;
    $message = "";

    if (isset($_POST['id_shop']) && !empty($_POST['id_shop'])
    && isset($_POST['product_name']) && !empty($_POST['product_name'])
    && isset($_POST['product_price']) && !empty($_POST['product_price'])
    && isset($_POST['product_description']) && !empty($_POST['product_description']))
    {
        $shop_id = $_POST['id_shop'];
        $product_name = $_POST['product_name'];
        $product_price = $_POST['product_price'];
        $product_description = $_POST['product_description'];
        require_once("../Shared/connexion.php");
        $request = $pdo->prepare("INSERT INTO product (product_name, price, vendor_id, description) VALUES (?, ?, ?, ?)");

        $request->bindParam(1, $product_name, PDO::PARAM_STR);
        $request->bindParam(2, $product_price, PDO::PARAM_INT);
        $request->bindParam(3, $shop_id, PDO::PARAM_INT);
        $request->bindParam(4, $product_description, PDO::PARAM_STR);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $success = true;
            $message =  "Request Add Product : OK";
        }
        else
            $message = "Bdd Insert did not work";
    }
    else
        $message ="Parameters Error";

    $response["success"] = $success;
    $response{"message"} = $message;

    echo json_encode($response);

?>



