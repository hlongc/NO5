<?php
//引入链接数据库文件
require_once('connect.php');

//接收从前端传来的数据
$id = $_POST["id"];
$username = $_POST["username"];
//建一个类，等会用于生成对象，然后将对象返回给前台
class goods {
	//它有这五个属性
	var $name;
	var $size;
	var $no5_price;
	var $normal_price;
	var $amount;
	var $id;
}

$theAmount = 0;
$flag = true;
//选择表格,返回的数据是一个资源类型的。
$rs = mysqli_query($link,"select * from shopcar");
//根据ID和username,获取这件商品的数量
while ($rows = mysqli_fetch_array($rs)) {
	//先判断之前加过这件商品没有，如果加过，直接给这件商品的数量加1就行。
	if ($rows["id"] == $id && $rows["username"] == $username) {
		//如果有，就把数据读出来就行，因为前面那个list.php里面已经把它加过一次了
		//把数量取出来，加一次，再放回去
		$theAmount = $rows["amount"] + 1;
		mysqli_query($link,"update shopcar set amount='$theAmount' where id='$id'and username='$username'");
		$flag = false;
	}
}
if ($flag) {
	$sql = "insert into shopcar(id,username,amount) values('$id','$username','1')";
	//如果找完了都没找到，就插入一条新的行进去
	mysqli_query($link,$sql) or die("插入数据失败");
	$theAmount = 1;
}
//现在根据ID获取商品信息
//选择商品表
$rs = mysqli_query($link,"select * from goods");
while ($rows = mysqli_fetch_array($rs)) {
	if ($rows["id"] == $id) {
		$obj = new goods();
		$obj -> name = $rows["name"];
		$obj -> size = $rows["size"];
		$obj -> no5_price = $rows["no5"];
		$obj -> normal_price = $rows["normal"];
		$obj -> amount = $theAmount;
		$obj -> id = $id;
		echo json_encode($obj);
		exit();
	}
}


//关闭连接
mysqli_close($link);
?>