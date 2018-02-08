<?php
header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

require_once("../../Shared/connexion.php");


if (isset($_POST['email']) && !empty($_POST['email'])
    && isset($_POST['password']) && !empty($_POST['password'])) {

    $password_md5 = md5($_POST["password"]);
    $email = $_POST['email'];

    $request = $pdo->prepare("select u.id as user_id from user u join shop s on u.id = s.id where u.email = ? AND u.password = ?");
    $request->bindParam(1, $email, PDO::PARAM_STR);
    $request->bindParam(2, $password_md5, PDO::PARAM_STR);

    if ($request->execute() && $request->rowCount() > 0) {
        $success = true;
        $message = "Connection OK";
        $response['results'] = $request->fetchAll();
    } else {
        $message = "COnnection KO";
    }
}
else
    $message = $_POST;

$response['success'] = $success;
$response['message'] = $message;
echo json_encode($response);

?>