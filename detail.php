<?php
//引入链接数据库文件
require_once('connect.php');
//选择表
$rs = mysqli_query($link,"select * from shopcar");
//把前台发来的东西接收一下
$id = $_POST["id"];
$username = $_POST["username"];
$amount = $_POST["amount"];
$flag = true;
//进来做什么？把该商品的数量刷新一下
//首先看这个商品以前这个人添加过没有，要是没有的话，就先放进去
while($rows = mysqli_fetch_array($rs)){
    //根据ID和用户名找这个人有木有加入过这个商品进购物车
    if($rows["id"] == $id && $rows["username"] == $username){
        //如果找到了，就不用新增了
        $amounts = $amount + $rows["amount"];
        $flag = false;
        //刷新一下这个商品的数量就行
        mysqli_query($link,"update shopcar set amount='$amounts' where id='$id' and username='$username'");
    }
}
if($flag){
    //如果没找到，就新增一行
    $sql = "insert into shopcar(id,username,amount) values('$id','$username','$amount')";
    mysqli_query($link,$sql);
}
echo $id;
echo $username;
echo $amount;
mysqli_close($link);
?>