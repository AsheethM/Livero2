<?php

$lat = array();
$long = array();
$name = array();
$logos = array();
$id = array();
$email = array();

require_once("../Shared/connect_db.php");

$sql  = "SELECT shop.id, email, shop_name, logo, latitude, longitude, SQRT(POW(69.1 * (latitude - ".$_POST["latitude"]."), 2) + POW(69.1 * (".$_POST["longitude"]." - longitude) * COS(latitude / 57.3), 2)) AS distance 
FROM shop JOIN user ON user.id = shop.id 
HAVING distance < ".$_POST["distance"]." ORDER BY distance";
 
$result =  $conn->query($sql);

while ($row = $result->fetch_array(MYSQLI_ASSOC))
{
      $lat[]= $row['latitude'];         
      $long[] = $row['longitude'];
      $name[] = $row['shop_name'];
      $logos[] = $row['logo'];
	  $id[] = $row['id'];
	  $email[] = $row["email"];

 } 
  $conn->close();

$results = array(
  "latitude" => $lat,
  "longitude" => $long,
  "name" => $name,
  "logos" => $logos,
"id" => $id,
"email" => $email
    );


    
print json_encode ($results);

?>