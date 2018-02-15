<?php
    header('Content-Type: application/json');
    $response = array();
    $message = "";
    $success =false;

    if (isset($_POST['id_shop']) && !empty($_POST['id_shop'])
        && isset($_POST['product_id']) && !empty($_POST['product_id']))
    {
        $id_shop = $_POST['id_shop'];
        $product_id = $_POST['product_id'];

        require_once("../Shared/connexion.php");

        $request = $pdo->prepare("SELECT p.id, p.product_name, p.description, p.price FROM product p WHERE p.id = ? AND p.shop_id = ?");
        $request->bindParam(1, $product_id, PDO::PARAM_INT);
        $request->bindParam(2, $id_shop, PDO::PARAM_INT);
        $request->execute();

        if ($request->rowCount() > 0)
        {
            $success = true;
            $message = "Request Get Product With Id : OK";
            $response["results"] = $request->fetchAll();
        }
        else
            $message = "Bdd Request did not work";
    }
    else {
        $message = "Parameters Error";
    }

    $response["success"] = $success;
    $response{"message"} = $message;
    echo json_encode($response);


?>