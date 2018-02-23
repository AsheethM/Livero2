<?php

require_once("../Shared/connect_db.php");

$sql = "select * from shop join product on product.shop_id = shop.id where shop.id='".$_POST["vendor_id"]."'";
$result = $conn->query($sql);

if (null != $result && mysqli_num_rows($result) >= 1)
{
	$response["product"] = array();
	while ($row = $result->fetch_array(MYSQLI_ASSOC))
	{
		$response["product"][] = $row;  
	}
	$success = true;
	$message = "Request fetch_shop_item : OK";
}
else
{
	if ($result == null || mysqli_num_rows($result) < 1)
		$message = "No items to search for in this shop, Sorry!";
	else
		$message = "Request fetch_shop_item : KO";
	$success = false;
}
$response["vendor"] = $_POST["vendor_id"];
$response["success"] = $success;
$response["message"] = $message;
$conn->close();
print json_encode($response);
?>