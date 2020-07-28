<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');
$con = mysqli_connect("localhost:3308","root","","blogappdb");
mysqli_set_charset($con, "utf8mb4_general_ci");

$conn = mysqli_connect('localhost:3308', 'root','','blogappdb' );

if(!$conn) {
    die('can not connect:'. mysqli_error($conn));
}
if(!mysqli_select_db($conn,'blogappdb')) {
    die('cannot select db: '.mysqli_error($conn));
}

   
//echo 


// Check connection
//if (!$con) {
//	echo "Connected Failed";
//  die("Connection failed: " . mysqli_connect_error());
//}
//echo "Connected successfully";

	if($_FILES["stphoto"])  
	{  
		$tmporary = $_FILES["stphoto"]["tmp_name"];
		$file_name = $_FILES["stphoto"]["name"];
      if(move_uploaded_file($tmporary,"../images/_"."$file_name"))
		//C:\Users\asus\AppData\Local\
		{

       if($file = addslashes(file_get_contents("../images/_"."$file_name")))
       {
		// echo json_encode("1");
		//echo $file;
            $sql = "update articles  set image = '$file' where id = 1 ";
		//   $varres = 
	  
		//	 if ($conn->query($sql) === TRUE) {
		//	  echo json_encode("New record created successfully");
		//	} else {
		//	  echo json_encode("Error: " . $sql . "<br>" . $conn->error);
		//	}

		 if(mysqli_query($con,$sql)){
			 			  echo json_encode("successfully injected");
		 }
			//echo $varres;
			//mysqli_query($con,"ALTER TABLE articles AUTO_INCREMENT = 1");
			//  echo json_encode("successfully injected");
		}
       }
	   
       else
        echo json_encode("error");
 }
?>