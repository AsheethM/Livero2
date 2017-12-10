<?php
  header('Content-Type: application/json');
  $response = array();
  $success = false;
  $message = "";


  if (isset($_POST['user_id']) && !empty($_POST['user_id'])
      && isset($_POST['transaction_id']) && !empty($_POST['transaction_id']))
  {

      $transaction_id = $_POST['transaction_id'];
      require_once("../Shared/connexion.php");

      $request = $pdo->prepare('SELECT status FROM transaction WHERE id = ?');
      $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
      $request->execute();

      if ($request->rowCount() == 1)
      {
          $status = $request->fetchAll()[0]['status'];
          if ($status == 2) {
              $request = $pdo->prepare("SELECT bet FROM bidding WHERE transaction_id = ?");
              $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
              $request->execute();
              $success = true;
              if ($request->rowCount() == 0)
                  $message = "Wait's for a bid";
              else
              {
                  $message = "Request Get Bid : OK";
                  $response['results'] = $request->fetchAll();
              }
          }
          else
              $message = "No such transaction";
      }
      else
        $message = "No such transaction";
  }
  else
    $message = "Parameters Error";

  $response['success'] = $success;
  $response['message'] = $message;
  echo json_encode($response);
?>
