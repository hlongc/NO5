<?php
//连接数据库
//引入链接数据库文件
require_once('connect.php');
//选择表格,返回的数据是一个资源类型的。
$rs = mysqli_query($link,"select * from shopcar");
//接收从前端传来的数据
$username = $_POST["username"];
//写一条SQL语句
$sqlDel = "delete from shopcar where username='$username'";
//调用SQL语句，删除该用户名下所有行
mysqli_query($link,$sqlDel);
//关闭连接
mysqli_close($link);
?>