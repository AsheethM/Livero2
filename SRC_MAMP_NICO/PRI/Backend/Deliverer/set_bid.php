<?php

header('Content-Type: application/json');

$response = array();

try
{
    require_once("connexion.php");
    $request = $pdo->prepare("UPDATE transaction SET price = :new_price, id_transporter = :id_deliverer WHERE id = :i AND price > :new_price");
    $request->bindParam(':i', $id_transaction);
    $request->bindParam(':new_price', $new_price);
    $request->bindParam('id_deliverer', $id_deliverer);
    $id_transaction = intval($_GET["id_transaction"]);
    //$id_deliverer = $_GET["id_deliverer"];
    $new_price = intval($_GET["new_price"]);

    $id_deliverer = 3;

    $request->execute();
    $count = $request->rowCount();
    if ($count == 0)
    {
        $response['success'] = false;
        $response['message'] = "Error in Updating Database";
    }
    else
    {
        $response['success'] = true;
        $response['message'] = "Database updated";
    }
}
catch(Exception $e)
{
    $response['success'] = false;
    $response['message'] = "Database Connection : KO";
}

echo json_encode($response);
?>
