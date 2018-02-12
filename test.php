<?php
$happy = $_GET["t"];

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile, $happy);
fclose($myfile);
?>