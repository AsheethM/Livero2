<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pri";
$lat = array();
$long = array();
$name = array();
$logos = array();
$id = array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 



$sql  = "SELECT id, shop_name,logo, latitude, longitude, SQRT(
POW(69.1 * (latitude - ".$_POST["latitude"]."), 2) +
POW(69.1 * (".$_POST["longitude"]." - longitude) * COS(latitude / 57.3), 2)) AS distance
FROM shop HAVING distance < ".$_POST["distance"]." ORDER BY distance";

    $result =  mysqli_query($conn, $sql);


while ($row = mysqli_fetch_array($result))
{
      $lat[]= $row['latitude'];         
      $long[] = $row['longitude'];
      $name[] = $row['shop_name'];
      $logos[]= $row['logo'];
      $id[] = $row['id'];
 } 
  $conn->close();

$results = array(
  "latitude" => $lat,
  "longitude" => $long,
  "name" => $name,
  "logos" => $logos,
  "id" => $id
    );


    
print json_encode ($results);
?>