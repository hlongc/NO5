<?php
//引入链接数据库文件
require_once('connect.php');
//选择表格,返回的数据是一个资源类型的。
$rs = mysqli_query($link,"select * from shopcar");
//接收从前端传来的数据
$id = $_POST["id"];
$username = $_POST["username"];
//写一段sql语句
$sql = "delete from shopcar where username='$username' and id='$id'";

mysqli_query($link,$sql) or die("插入数据失败");
//关闭连接
mysqli_close($link);
	

?>