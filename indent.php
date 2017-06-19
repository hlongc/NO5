<?php
//引入链接数据库文件
require_once('connect.php');
//选择表
$rs = mysqli_query($link,"select * from shopcar");
//获取用户
$username = $_POST["username"];
class goods{
    var	$id;
    var $amount;
}
$arr = array();
//根据用户名，查找他的商品id以及他们的数量
while($rows = mysqli_fetch_array($rs)){
    if($rows["username"] == $username)
    {
        $obj = new goods();
        $obj -> id = $rows["id"];
        $obj -> amount = $rows["amount"];
        array_push($arr,$obj);
    }
}
$total = 0;
//通过这些id，来获取这些物品的价格，然后把算出来的价格加起来
//从所有货物中去读取价格
$rs = mysqli_query($link,"select * from goods");
while($rows = mysqli_fetch_array($rs) ){
    for($i = 0;$i < count($arr);$i++){
        if($rows["id"] == $arr[$i]->id){
            //累加总价,单价乘以数量
            $total += $rows["no5"] * $arr[$i] -> amount;
        }
    }
}
echo $total;

mysqli_close($link);
?>