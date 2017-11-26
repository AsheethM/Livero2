<?php

header('Content-Type: application/json');

$response = array();

try
{
    $pdo = new PDO('mysql:host=localhost;port=8889;dbname=PRI;', 'root', '');
    $request = $pdo->prepare("SELECT * FROM TRANSACTION ");
    $exec = $request->execute();

    $response['success'] = false;
    $response['message'] = "Fetch all transaction";
    $response['results'] = $request->fetchAll();
}
catch (Exception $e)
{
    $response['success'] = false;
    $response['message'] = "Database Connection : KO";
}
echo json_encode($response);


?>