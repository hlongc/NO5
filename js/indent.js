$(function() {
//只是读cookie的时候，不需要$.cookie.json = true;
	$.cookie.json = true;
	//左边a标签的点击事件
	$(".more_operate").on("click", "a", function() {
		$(".more_operate").find("a").removeClass("active");
		$(this).addClass("active");
		return false;
	});
	//中间一堆订单的事件
	$(".indent_list").on("click", "div", function() {
		$(".indent_list").find("div").removeClass("indent_active");
		$(this).addClass("indent_active");
		return false;
	});


	//克隆第一行
	var
		$oIndent = $("#indent_detail:first").clone();
		$oIndent.appendTo($(".indent_lists"));
	var
	//获取当前时间:年，月，日，时，分，秒
		oDate = new Date(),
		iYear = oDate.getFullYear(),
		iMonth = oDate.getMonth() + 1,
		iDate = oDate.getDate(),
		iHour = oDate.getHours(),
		iMinute = oDate.getMinutes(),
		iSecond = oDate.getSeconds(),
		sNowTime = "";
	//串接时间
	sNowTime = iYear + "-" + iMonth + "-" + iDate + " " + iHour + ":" + iMinute + ":" + iSecond;
	//刷新当前日期
	$(".indent_lists .indent_time").text(sNowTime);
	$(".indent_lists .person").text($.cookie("user"));
	$(".indent_lists .indent_num").text(oDate.getTime());
	$(".indent_lists .pay_method").text("支付宝");
	$(".indent_lists .status").text("未支付");
	$(".indent_lists .handle").html("<a href='javascript:;'>去支付</a><a href='shopcar.html'>修改</a><a href='javascript:;'>取消</a>");
	
	//获取需要支付的金额,求后台帮忙算一下。
	$.post("../indent.php",{
		username:$.cookie("user")
	},function(data){
		$(".indent_lists .should_pay").text(data);
	});
	
	
});