<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "pri_user";
$password = "waswas1";
$dbname = "pri_data";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO `user`( `email`, `password`, `lastname`, `firstname`, `birthdate`, `phone`, `role`) VALUES ('".$_POST["email"]."','".md5($_POST["password"])."','".$_POST["last"]."','".$_POST["first"]."','".$_POST["dob"]."','".$_POST["phone"]."','".$_POST["actor"]."')";



if ($conn->query($sql) === TRUE) {
       print json_encode( 1);
} else {
    print json_encode( 0);

}

$conn->close();


?>
