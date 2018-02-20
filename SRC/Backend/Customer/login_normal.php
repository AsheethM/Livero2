<?php
require_once("../Shared/connect_db.php");

$password_md5 = md5($_POST["password"]); 

$sql = "select id from user where email='".$_POST["email"]."' AND  password='".$password_md5."'";
$result = $conn->query($sql);

if (null != $result && mysqli_num_rows($result) >= 1)
{
	$sql2 = "SELECT id FROM user WHERE email = '".$_POST["email"]."'";
	$result = $conn->query($sql2);
	$response["customer_id"] = $result->fetch_array(MYSQLI_ASSOC)["id"];  
	$success = true;
	$message = "Request login normal : OK";
}
else
{
	$success = false;
	if($result == null)
		$message ="Error with Login/Password";
	else $message = "Request login normal : KO";
}
$response["success"] = $success;
$response["message"] = $message;
$conn->close();
print json_encode($response);

?>