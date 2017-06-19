<?php

//引入链接数据库文件
require_once('connect.php');
//建一个类，等会用于生成对象，然后将对象返回给前台
$name=$_POST['name'];
$normal=$_POST['normal'];
$no5=$_POST['no5'];
$size=$_POST['size'];
$id = $_POST['id'];
$src = $_POST['src'];
/*echo $name.$normal.$no5.$size.$id;
exit();*/
$sql="update goods set name='$name',normal='$normal',no5='$no5',size='$size',src='$src' where id='$id'";
$rs = mysqli_query($link, $sql);
if($rs){
	echo true;
}else{
	echo false;
}
mysqli_close($link);
?>