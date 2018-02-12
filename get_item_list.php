<?php
header("Access-Control-Allow-Origin: *");

include("database_connect.php");


$product_id = $_POST["items_and_quantity"];
$vendor_id = $_POST["shop_id"];
$customer_id = $_POST["customer_id"];
$customer_long = $_POST["user_lat"];
$customer_lat = $_POST["user_long"];
$description="go tot hell";

$quantity = $_POST["items_and_quantity"];
$transaction_id =rand(10,100);
$id="";
$price = $_POST["price"];


$sql="INSERT INTO `transaction`(`customer_id`, `customer_lat`, `customer_long`, `dest_address`, `description`, `shop_id`, `customer_token`, `shop_token`, `order_price`, `status`) VALUES ('".$customer_id."' ,'".$customer_lat."','".$customer_long."','house address bitch','".$description."','".$vendor_id."','nil','nil','".$price."',1)";


if ($conn->query($sql) === TRUE) {
       print json_encode( "done");
} else {
    print json_encode( "failed");

}
$count=sizeof($product_id);


$sql="SELECT id FROM `transaction` WHERE customer_id ='".$customer_id."'  AND shop_id='".$vendor_id."' ";

    $result =  mysqli_query($conn, $sql);

 while ($row = mysqli_fetch_array($result))
{
      $id= $row['id'];            
} 
 print json_encode( $id);


for($counter=0;$counter<$count;$counter++){

$sql = "INSERT INTO `transaction_product`( `product_id`, `transaction_id`, `customer_quantity`,`shop_quantity`) VALUES ('".$product_id[$counter]."','".$id."','".$quantity[$counter]."','1')";

if ($conn->query($sql) === TRUE) {
       print json_encode( "done_for");
} else {
    print json_encode( "failed");

}
    



}
 
  $conn->close();

/*
$results = array(
  "product" => $product_name,
  "des" => $description,
  "price" => $price,
  "id_items" => $id_items);
*/
    
?>