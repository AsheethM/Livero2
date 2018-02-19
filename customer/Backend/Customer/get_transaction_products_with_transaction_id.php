<?php
header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

if (isset($_POST["transaction_id"]) && !empty($_POST["transaction_id"])
    && isset($_POST["user_id"]) && !empty($_POST["user_id"]))
{
    $user_id = $_POST["user_id"];
    $transaction_id = $_POST["transaction_id"];

    require_once ('../Shared/connexion.php');

    $req_str = 'SELECT * FROM transaction WHERE customer_id = ? AND id = ?';
    $request = $pdo->prepare($req_str);
    $request->bindParam(1, $user_id, PDO::PARAM_INT);
    $request->bindParam(2, $transaction_id, PDO::PARAM_INT);
    if ($request->execute() && $request->rowCount() > 0)
    {
        $req_str = 'SELECT * FROM transaction_product tp JOIN product p ON tp.product_id = p.id' .
            ' WHERE tp.transaction_id =  ?';
        $request = $pdo->prepare($req_str);
        $request->bindParam(1, $transaction_id, PDO::PARAM_INT);
        if ($request->execute()) {
            if ($request->rowCount() > 0) {
                $success = true;
                $message = 'Request Get Transaction Items : OK';
                $response['results'] = $request->fetchAll();
            } else
                $message = "No items for this transaction";
        } else
            $message = "BDD Request did not work";
    }
    else
        $message = "Transaction id is not associated to this user";
}
else
    $message = "Parameters Error";

$response["success"] = $success;
$response["message"] = $message;

echo json_encode($response);

?>