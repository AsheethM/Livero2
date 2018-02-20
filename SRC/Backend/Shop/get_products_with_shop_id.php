<?php
    header('Content-Type: application/json');
    require_once('../Shared/connexion.php');
    $response = array();
    $message = "";
    $success = false;

    if (isset($_POST["shop_id"]))
    {
        $id_shop = $_POST["shop_id"];
        $request = $pdo->prepare("SELECT  p.id, p.product_name, p.description, p.price FROM product p WHERE shop_id = ?");
        $request->bindParam(1, $id_shop, PDO::PARAM_INT);


        if ($request->execute()) {
            $success = true;
            if ($request->rowCount() > 0)
                $response['isProducts'] = true;
            else
                $response['isProducts'] = false;

            $message = "Request Get Products :  OK";
            $response["results"] = $request->fetchAll();
        } else {
            $message = "Bdd Request did not work";
        }
    }
    else
        $message = "Parameters Error";

        $response["success"] = $success;
        $response["message"] = $message;
    echo json_encode($response);

?>
