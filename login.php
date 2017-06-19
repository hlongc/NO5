<?php

//引入链接数据库文件
require_once('connect.php');
$username = $_POST["username"];
$password = $_POST["password"];
//$role=$_POST['people'];
//选择表
/*if($role=="user"){
	$rs = mysqli_query($link,"select * from users");
}else{
	$rs = mysqli_query($link,"select * from manerger");
}*/
$rs = mysqli_query($link,"select * from users");
while($rows = mysqli_fetch_array($rs)){
    //查找有没有这个人
    if($rows["username"] == $username && $rows["password"] == $password){
        echo true;
        exit();
    }else{
        echo false;
    }
}
mysqli_close($link);
?>