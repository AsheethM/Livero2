<?php

$results = array();

require_once("../Shared/connect_db.php");

$sql = "SELECT *  FROM gps where session_id = 'happy'";
    $result =  mysqli_query($conn, $sql);
 while ($row = mysqli_fetch_array($result))
{
    $results[]= $row['latitude'];
    $results[]= $row['longitude'];
    $results[]= $row['speed'];
    $results[]= $row['altitude'];
    $results[]= $row['accuracy'];
                
 } 
  $conn->close();
  /*
$results = array(
  "latitude" => $latitude,
   "longitude" => $longitude,
   "speed" => $speed,
   "altitude" => $altitude,
   "accuracy" => $accuracy,
    );
 */
    
print json_encode ($results);
?>