<?php
header('Content-Type: application/json');
$response = array();
$success = false;
$message = "";

require_once("../Shared/connexion.php");

if (isset($_POST["email"]) && !empty($_POST["email"])
    && isset($_POST["password"]) && !empty($_POST["password"])
    && isset($_POST["lastname"]) && !empty($_POST["lastname"])
    && isset($_POST["firstname"]) && !empty($_POST["firstname"])
    && isset($_POST["birthdate"]) && !empty($_POST["birthdate"])
    && isset($_POST["phone"]) && !empty($_POST["phone"])) {


    $email = $_POST["email"];
    $password = md5($_POST["password"]);
    $lastname = $_POST["lastname"];
    $firstname = $_POST["firstname"];
    $phone = $_POST["phone"];
    //$birthdate = $_POST["birthdate"];
    $birthdate = "1995-01-01";

    $request = $pdo->prepare("INSERT INTO user(email, password, lastname, firstname, birthdate, phone)" .
        " VALUES (?,?,?,?,?,?)");

    $request->bindParam(1, $email, PDO::PARAM_STR);
    $request->bindParam(2, $password, PDO::PARAM_STR);
    $request->bindParam(3, $lastname, PDO::PARAM_STR);
    $request->bindParam(4, $firstname, PDO::PARAM_STR);
    $request->bindParam(5, $birthdate);
    $request->bindParam(6, $phone, PDO::PARAM_STR);

    if ($request->execute()) {
        $request = $pdo->prepare("SELECT id FROM user WHERE email = ?");
        $request->bindParam(1, $email, PDO::PARAM_STR);
        if ($request->execute() && $request->rowCount() > 0) {
            $results = $request->fetchAll();
            $user_id = $results[0]['id'];
            $pieton = 'pedestrian';
            $request = $pdo->prepare("INSERT INTO deliverer(id, vehicule, licence, picture)" .
                " VALUES (?, ?, ?, ?)");
            $void = "";
            $licence = 0;
            $request->bindParam(1, $user_id, PDO::PARAM_INT);
            $request->bindParam(2, $pieton, PDO::PARAM_STR);
            $request->bindParam(3, $licence, PDO::PARAM_INT);
            $request->bindParam(4, $void, PDO::PARAM_STR);

            if ($request->execute()) {
                $success = true;
                $message = "Insert Deliverer : OK";
            } else {
                var_dump($request->errorInfo());
            }
        } else
            $message = "Error In Reuest";
    } else {
        $message = "Error when insert";
    }
}else
    $message = "Parameters Error";

$response['success'] = $success;
$response['message'] = $message;
echo json_encode($response);

?>
