<?php

//引入链接数据库文件
require_once('connect.php');

//建一个类，等会用于生成对象，然后将对象返回给前台
class goods {
    //它有这五个属性
    var $name;
    var $size;
    var $no5;
    var $normal;
    var $id;
    var $src;
}

//创建一个数组用来保存商品
$result = array();
//选择表
$rs = mysqli_query($link, "select * from goods");
while ($rows = mysqli_fetch_array($rs)) {
    $obj = new goods();
    $obj->name = $rows['name'];
    $obj->size = $rows['size'];
    $obj->no5 = $rows['no5'];
    $obj->normal = $rows['normal'];
    $obj->id = $rows['id'];
    $obj->src = $rows['src'];
    /*print_r($obj) ;*/
    $result[] = $obj;
}
echo json_encode($result);
mysqli_close($link);
