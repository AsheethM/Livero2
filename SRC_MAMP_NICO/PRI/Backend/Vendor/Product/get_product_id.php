<?php
    header('Content-Type: application/json');
    $response = array();
    if (isset($_POST['id_shop']) && !empty($_POST['id_shop']) && isset($_POST['product_id']) && !empty($_POST['product_id']))
    {
        $id_shop = $_POST['id_shop'];
        $product_id = $_POST['product_id'];



        require_once("../../Shared/connexion.php");

        $request = $pdo->prepare("SELECT p.id, p.product_name, p.description, p.price FROM product p WHERE p.id = ? AND p.shop_id = ?");
        $request->bindParam(1, $product_id, PDO::PARAM_INT);
        $request->bindParam(2, $id_shop, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $response["success"] = true;
            $response{"message"} = "Request Get Product With Id : OK";
            $response["results"] = $request->fetchAll();
        }
        else
        {
            $response["success"] = false;
            $response{"message"} = "Request Get Product With Id : KO";
        }

    }
    else
    {
        $response["success"] = false;
        $response{"message"} = "Request Get Product With Id : KO";
    }

    echo json_encode($response);


?>