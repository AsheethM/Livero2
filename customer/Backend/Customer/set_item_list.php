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
	$response["success"] = true;	
	$response["message"] = "Insert query transaction: OK";
} else {
    $response["success"] = false;
	$response["message"] = "Insert query transaction: OK";
}

$sql="SELECT max(id) as id FROM `transaction` WHERE customer_id ='".$customer_id."' AND shop_id='".$vendor_id."' ";

    $result =  mysqli_query($conn, $sql);
	$transaction_id = $result["id"];
	$customer_token = $shop_id.rand().rand()."-_-".$transaction_id;
            $shop_token = $customer_id.rand().rand()."-_-".$transaction_id;
            $request = $pdo->prepare('UPDATE transaction SET customer_token = ?, shop_token = ?'.
                ' WHERE id = ?');
            $request->bindParam(1, $customer_token, PDO::PARAM_STR);
            $request->bindParam(2, $shop_token, PDO::PARAM_STR);
            $request->bindParam(3, $transaction_id, PDO::PARAM_INT);
	if($request->execute())
	{
		$response["success"] &= true;
		$response["message"] .= "\n\rUpdate query transaction for item ".$value["id"].": OK";
	} else {
		$response["message"] .= "\n\rUpdate query transaction for item ".$value["id"].": KO";
		$response["success"] &= false;
	}
	
foreach($product_id as $key => $value){
	if (is_array($value) || is_object($value)){
		$sql = "INSERT INTO `transaction_product`( `product_id`, `transaction_id`, `customer_quantity`,`shop_quantity`) VALUES ('".$value["id"]."','".$id."','".$value["qty"]."','".$value["qty"]."')";	
	}
	if ($conn->query($sql) === TRUE) {
		$response["success"] &= true;
		$response["message"] .= "\n\rInsert query transaction_product for item ".$value["id"].": OK";
	} else {
		$response["message"] .= "\n\rInsert query transaction_product for item ".$value["id"].": KO";
		$response["success"] &= false;
	}
}
	echo json_encode($response);
  $conn->close();

?>