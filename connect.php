<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/28
 * Time: 14:55
 */
//引入配置文件
require_once('config.php');
//链接数据库
$link = mysqli_connect(HOST,USER,PASSWORD,'no5');
//设置字符格式避免出现乱码
mysqli_query($link,"set names utf8");