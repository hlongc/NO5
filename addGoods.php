<?php

//引入链接数据库文件
require_once('connect.php');
//接收数据
$name = $_POST['name'];
$normal = $_POST['normal'];
$no5 = $_POST['no5'];
$size = $_POST['size'];
$src = $_POST['src'];
//插入语句
$sql = "insert into goods(name,size,no5,normal,src) values('$name','$size','$no5','$normal','$src')";
$rs = mysqli_query($link, $sql);
//插入成功时返回的ID
$id = mysqli_insert_id($link);
if ($rs) {
    echo $id;//返回到JS中
} else {
    echo false;
}
mysqli_close($link);
?>