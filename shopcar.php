<?php
//引入链接数据库文件
require_once('connect.php');
//选择表
$rs = mysqli_query($link,"select * from shopcar");
//通过用户名获取商品id,用一个数组来存放这些id
$username = $_POST["username"];
$i = 0;
$arr_id = array();
//存放id
$arr_amount = array();
//存放物品
while ($rows = mysqli_fetch_array($rs)) {
	if ($rows["username"] == $username) {
		$arr_id[$i] = $rows["id"];
		$arr_amount[$i] = $rows["amount"];
		$i++;
	}
}
//拿到这些id以后，去仓库把这些货物的信息调出来，把这些信息做成对象，然后放入一个数组，最后把这个数组,发送回前端
$rs = mysqli_query($link,"select * from goods");
$shopcar = array();
//创建一个类，等会用类来创建对象
class goods {
	//它有这五个属性
	var $name;
	var $size;
	var $no5_price;
	var $normal_price;
	var $amount;
	var $id;
}

while ($rows = mysqli_fetch_array($rs)) {
	//取出这一行,与上面id数组里面的所有值比较，相同就把它拿出来
	//如果这一行的id，在我数组里面有，我就把它的相应数据都拿出来
	for ($k = 0; $k < count($arr_id); $k++) {
		if ($rows["id"] == $arr_id[$k]) {
			//每次都要实例化一次,要不然会覆盖！
			$obj = new goods();
			$obj -> name = $rows["name"];
			$obj -> size = $rows["size"];
			$obj -> no5_price = $rows["no5"];
			$obj -> normal_price = $rows["normal"];
			$obj -> amount = $arr_amount[$k];
			$obj -> id = $arr_id[$k];
			array_push($shopcar, $obj);
		}
	}
}
echo json_encode($shopcar);
mysqli_close($link);
?>