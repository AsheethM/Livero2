<?php
    header('Content-Type: application/json');
    $response = array();

    if (isset($_POST["shop_id"]))
    {
        $id_shop = $_POST["shop_id"];
        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare("SELECT  p.id, p.product_name, p.description, p.price FROM product p WHERE shop_id = ?");
        $request->bindParam(1, $id_shop, PDO::PARAM_INT);


        if ($request->execute()) {
            $response["success"] = true;
            $response["message"] = "Request Get Products :  OK";
            $response["nbproducts"] = $request->rowCount();
            $response["results"] = $request->fetchAll();
        } else {
            $response["success"] = false;
            $response["message"] = "Request Get Products :  KO";
        }
    }
    else
    {
        $response["success"] = false;
        $response["message"] = "Request Get Products :  KO";
    }
    echo json_encode($response);

?>
