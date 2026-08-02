<?php
$dsn="mysql:host=localhost;dbname=bmst";
$username="root";
$pass="";
$option=array(
    PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES UTF8"
);
try 
{
    $con=new PDO($dsn,$username,$pass,$option);//code...
    $con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    include"security.php";
} catch (PDOException $e) {
echo $e->getMessage(); //throw $th;
}