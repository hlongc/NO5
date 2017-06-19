<?php
//引入链接数据库文件
require_once('connect.php');
//选择表格,返回的数据是一个资源类型的。
$rs = mysqli_query($link,"select * from shopcar");
//接收从前端传来的数据
$username = $_POST["username"];
$amount = 0;
//通过该用户名，获取他加入购物车的数量
while($rows = mysqli_fetch_array($rs)){
	if($rows["username"] == $username)
		$amount++;
}
echo $amount;

//关闭连接
mysqli_close($link);
?>