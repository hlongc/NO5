//公共文件,判断是否已经有用户登录
$(function() {
	$.cookie.json = true;
	if($.cookie("user")) {
		//如果有,首先刷新左上角[登录]二字,变成:欢迎回来！XX;
		$("#welcome").text("欢迎回来！" + $.cookie("user") + " 退出登录");
		$("#welcome").attr({
			href: ""
		});
		//给"登录"按钮写事件
		$("#welcome").click(function() {
			$.removeCookie("user", {
				path: "/"
			});
			$("#welcome").text("登录");
			//当为空字符串时即处于登录状态时：点击退出登录，阻止跳转页面,并把地址给它
			if(!$("#welcome").attr("href")) {
				$("#welcome").attr({
					href: "login.html"
				});
				//退出登录后，回到主页
			location.href = "../index.html";
				return false;
			}
			
		});
		//刷新右上角购物车显示数量
		$.post("../amount.php", {
			username: $.cookie("user")
		}, function(data) {
			$("#amount").text(data);
		});
	}
})