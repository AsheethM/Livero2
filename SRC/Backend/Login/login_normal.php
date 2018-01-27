<?php
header("Access-Control-Allow-Origin: *");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pri";

$password_md5 = md5($_POST["password"]);
$email = $_POST['email'];
// Create connection

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "select email, id from user where email='".$email."' AND  password='".$password_md5."'";
$result = $conn->query($sql);
$conn->close();
$response = array();
$success = false;

if (null != $result && mysqli_num_rows($result) >= 1)
{
    $results = mysqli_fetch_all($result);
    $user_id = $results[0][0];
    $success = true;
    $response['message'] = 'Get Connection : OK';
    $response['results'] = array(array('user_id' => $user_id));

}
else
{
    $response['message'] = 'Get Connection : K0';
}

$response['success'] = $success;
echo json_encode($response);

?>