<?php

//获取传过来的用户名
$username = $_POST["username"];
$password = $_POST["password"];

//引入链接数据库文件
require_once('connect.php');
//选择表
$rs = mysqli_query($link,"select * from users");

while ($rows = mysqli_fetch_array($rs)) {
	if ($rows["username"] == $username) {
	//	echo "该用户名已经被注册！";
		echo false;
		exit();
	}
}
//注册成功时，将新用户放入数据库
$newUser = "insert into users(username,password) values('$username','$password')";
mysqli_query($link,$newUser) or die(mysqli_error());
//echo "恭喜你注册成功！";
echo true;
mysqli_close($link);
?>