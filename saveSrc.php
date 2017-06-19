<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/05/28
 * Time: 14:19<?php
 */
//引入链接数据库文件
require_once('connect.php');
$src = $_POST['src'];
/*echo $src;
exit();*/
//选择表
$insert = "update goods set src = '$src' where id=8";
/*echo $insert;
exit();*/
$rs = mysqli_query($link, $insert);
if ($rs) {
    echo "插入成功";
} else {
    echo mysqli_error($link);
}
mysqli_close($link);
?>
