<?php

header('Content-Type: application/json');
$response = array();

try
{
    require_once("../Shared/connexion.php");
    $request = $pdo->prepare("SELECT  t.id, s.shopname FROM transaction t INNER JOIN vendor s ON t.id_shop = s.id");
    $request->execute();

    if ($request->rowCount() > 0)
    {
        $response['success'] = true;
        $response['message'] = "Fetch all transaction";
        $response['results'] = $request->fetchAll();
    }
    else
    {
        $response['success'] = false;
        $response['message'] = "Get Orders : KO";
    }
}
catch (Exception $e)
{
    $response['success'] = false;
    $response['message'] = "Database Connection : KO";
}

echo json_encode($response);


?>