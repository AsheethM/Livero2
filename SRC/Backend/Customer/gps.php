<?php

require_once("../Shared/connect_db.php");

$sql = "UPDATE gps SET latitude='".$_POST["latitude"]."',  longitude='".$_POST["longitude"]."',  altitude='".$_POST["altitude"]."',accuracy='".$_POST["accuracy"]."',speed='".$_POST["speed"]."',heading='".$_POST["heading"]."' WHERE session_id='happy'";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>

