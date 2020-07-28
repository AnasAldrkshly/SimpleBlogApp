<?php
//'Access-Control-Allow-Origin', '*'
//'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT ,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');
$con = mysqli_connect("localhost:3308","root","","blogappdb");
mysqli_set_charset($con, "utf8mb4_general_ci");

$sql = "SELECT image FROM articles where id = 1";
$result = mysqli_query($con,$sql)

$row = mysqli_fetch_assoc($result);
echo $row['imagefile'];

?>