
<?php

  header('Content-Type: application/json');	

  $response = array();

  try
  {
    $pdo = new PDO('mysql:host=localhost;port=8889;dbname=PRI;', 'root', 'Regis93130');
	$response['success'] = true;
    $response['message'] = "Database Connection : OK";
	/*
	$request = $pdo->prepare("SELECT price FROM `transaction` WHERE `id_transaction` = :i");
    $request->bindParam(':i', $POST["id_transaction"]);
    $request->execute();
    $nb_res = count($request->fetchAll());
    if ($nb_res == 0)
    {
      $response['success'] = false;
      $response['message'] = "Request Transaction Price : KO"; 
    }
    else
    {
	  $response['success'] = true;
      $response['message'] = "Request Transaction Price: OK";
      $response['results'] = $request->fetchAll();
	}
	
    */
  }
  catch(Exception $e)
  {
    $response['success'] = false;
    $response['message'] = "Database Connection : KO";
  }

  echo json_encode($response);

?>
