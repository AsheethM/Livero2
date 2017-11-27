<?php

try
{
    $pdo = new PDO('mysql:host=localhost;dbname=PRI;', 'root', 'Regis93130');
}
catch (Exception $e)
{
    echo "Connection failed";
}


?>