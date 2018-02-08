<?php
//header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

require_once("../../Shared/connexion.php");


//$password_md5 = md5($_POST["password"]);
//$email = $_POST['email'];

$password_md5 = md5('test');
$email = 'test@test.com';

$request = $pdo->prepare("select u.id as user_id from user u join deliverer d on u.id = d.id where u.email = ? AND u.password = ?");
$request->bindParam(1, $email, PDO::PARAM_STR);
$request->bindParam(2, $password_md5, PDO::PARAM_STR);

if ($request->execute() && $request->rowCount() > 0)
{
    $success = true;
    $message = "Connection OK";
    $response['results'] = $request->fetchAll();
}
else
{
    var_dump($request->errorInfo());
    var_dump($request->errorCode());
    $message = "COnnection KO";

}
$response['success'] = $success;
$response['message'] = $message;
echo json_encode($response);

?>