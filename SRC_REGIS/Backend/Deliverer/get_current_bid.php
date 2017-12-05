
<?php

  header('Content-Type: application/json');

  $response = array();

  try
  {
    require_once("connexion.php");
	//$response['success'] = true;
    //$response['message'] = "Database Connection : OK";

	$request = $pdo->prepare("SELECT * FROM transaction WHERE id = :i");
    $request->bindParam(':i', $id_transaction);

    $id_transaction = intval($_GET["id_transaction"]);

    $request->execute();
    if ($request->rowCount() == 0)
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
	

  }
  catch(Exception $e)
  {
    $response['success'] = false;
    $response['message'] = "Database Connection : KO";
  }

  echo json_encode($response);


?>
