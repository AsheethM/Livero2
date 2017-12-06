<?php

try
{
    $pdo = new PDO('mysql:host=localhost;dbname=PRI;', 'root', 'Regis93130');
    //é$pdo = new PDO('mysql:host=localhost;dbname=PRI;', 'root', '');
}
catch (Exception $e)
{
    echo "Connection failed";
}


?>