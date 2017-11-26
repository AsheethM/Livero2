
<?php

header('Content-Type: application/json');

$response = array();

try
{
    $pdo = new PDO('mysql:host=localhost;port=8889;dbname=PRI;', 'root', 'Regis93130');
    $request = $pdo->prepare("UPDATE transaction SET price = :new_price, id_transporter = :id_deliverer WHERE id = :i AND price > :new_price");
    $request->bindParam(':i', $id_transaction);
    $request->bindParam(':new_price', $new_price);
    $request->bindParam('id_deliverer', $id_deliverer);
    $id_transaction = intval($_GET["id_transaction"]);
    //$id_deliverer = $_GET["id_deliverer"];
    $new_price = intval($_GET["new_price"]);

    //$id_transaction = 4;
    $id_deliverer = 3;
    //$new_price = -1;

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
