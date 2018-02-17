<?php
require_once("../Shared/connect_db.php");

$sql = "INSERT INTO `user`( `email`, `password`, `lastname`, `firstname`, `birthdate`, `phone`) 
VALUES ('".$_POST["email"]."','"
.md5($_POST["password"])."','"
.$_POST["last"]."','"
.$_POST["first"]."','"
.$_POST["dob"]."','"
.$_POST["phone"]."')";

if ($conn->query($sql) === TRUE) {
		$success = true;
		$message = "Request registration normal : OK";
} else {
    $success = false;
	$message = "Request registration normal : KO";	
}
	$response["success"] = $success;
    $response["message"] = $message;
	print json_encode($response);
$conn->close();


?>
