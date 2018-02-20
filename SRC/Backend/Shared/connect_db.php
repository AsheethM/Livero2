<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pri";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
try
{
    $pdo = new PDO('mysql:host=localhost;dbname=pri;', 'root', '');
}
catch (Exception $e)
{
    echo "Connection failed";
}

?>