<?php
//引入链接数据库文件
require_once('connect.php');
//接收从前端传来的数据
$id = $_POST["id"];
//写删除的sql语句
$sql= "delete from goods where id=$id";
//执行删除操作
$rs = mysqli_query($link,$sql);
//判断是否删除成功
if($rs){
	echo true;
}else{
	echo false;
}
//关闭连接
mysqli_close($link);
?>