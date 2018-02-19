<?php

require_once("../Shared/connect_db.php");

$product_id = $_POST["items_and_quantity"];
$vendor_id = $_POST["shop_id"];
$customer_id = $_POST["customer_id"];
$customer_long = $_POST["user_lat"];
$customer_lat = $_POST["user_long"];
$address = $_POST["address"];
$description="go to hell";

$quantity = $_POST["items_and_quantity"];
$id="";
$price = $_POST["price"];
$timer = date('Y-m-d H:i:s');

$sql="INSERT INTO transaction (customer_id, customer_lat, customer_long, dest_address, description, shop_id, order_price, status, timer) VALUES (".$customer_id.",'".$customer_lat."','".$customer_long."','".$address."','".$description."',".$vendor_id.",".$price.",1, '".$timer."')";

if ($conn->query($sql) === TRUE) {
       print json_encode( "done");
} else {
    print json_encode("fail");

}

$sql="SELECT max(id) as id FROM `transaction` WHERE customer_id ='".$customer_id."' AND shop_id='".$vendor_id."' ";

    $result =  mysqli_query($conn, $sql);

 while ($row = mysqli_fetch_array($result))
{
      $id = $row['id'];            
}

foreach($product_id as $key => $value){
	if (is_array($value) || is_object($value)){
		$sql = "INSERT INTO `transaction_product`( `product_id`, `transaction_id`, `customer_quantity`,`shop_quantity`) VALUES ('".$value["id"]."','".$id."','".$value["qty"]."','1')";	
	}
	if ($conn->query($sql) === TRUE) {
		print json_encode("done_for");
	} else {
		print json_encode( "failed");
	}
}
 
  $conn->close();

?>