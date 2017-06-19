<?php
//引入链接数据库文件
require_once('connect.php');
//选择表格,返回的数据是一个资源类型的。
$rs = mysqli_query($link,"select * from shopcar");
//接收从前端传来的数据
$id = $_POST["id"];
$username = $_POST["username"];

while($rows = mysqli_fetch_array($rs)){
    //先判断之前加过这件商品没有，如果加过，直接给这件商品的数量加1就行，如果没加过，就新插入。
    if($rows["id"] == $id && $rows["username"] == $username){
        //把数量取出来，加一次，再放回去
        $amount = $rows["amount"] + 1;
        mysqli_query($link,"update shopcar set amount='$amount' where id='$id'and username='$username'");
        mysqli_close($link);
        exit();
    }
}
//写一段sql语句
$sql = "insert into shopcar(id,username,amount) values('$id','$username','1')";
//如果找完了都没找到，就插入一条新的行进去
mysqli_query($link,$sql) or die("插入数据失败");



//关闭连接
mysqli_close($link);
	

?>