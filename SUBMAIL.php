<?php
require 'app_config.php';

require_once('SUBMAILAutoload.php');
$phones = $_POST['phones'];
$number = $_POST['num'];
$submail=new MAILSend($message_configs);

$submail=new MESSAGEXsend($message_configs);
$submail->SetTo($phones);
$submail->SetProject("BIb2U1");
$submail->AddVar('number',$number);
$send=$submail->xsend();
print_r($send);
?>