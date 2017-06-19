$(function() {
	$.cookie.json = true;
	$("#username").val("");
	//随机产生四位数验证码
	var
		iVerify = "";
	for(var i = 0; i < 4; i++) {
		iVerify += Math.floor(Math.random() * 10) + "";
	}
	$("#verify").text(iVerify);
	//点击换验证码
	$("#verify").click(function() {
		var
			iVerify = "";
		for(var i = 0; i < 4; i++) {
			iVerify += Math.floor(Math.random() * 10) + "";
		}
		$("#verify").text(iVerify);
	});

	$("#form0").validate({
		//阻止默认提交
		debug: true,
		rules: {
			user: {
				required: true
			},
			password: {
				required: true
			},
			verify: {
				required: true
			}
		},
		messages: {
			user: {
				required: "请输入用户名！"
			},
			password: {
				required: "请输入密码！"
			},
			verify: {
				required: "请输入验证码！"
			}
		},
		submitHandler: function(form) {
			if(!$.cookie("user")) {
				//验证码要对
			//	console.log($("#verify").text(),$("#verify_txt").val())
				if($("#verify").text() == $("#verify_txt").val()) {
					
					$.post("../login.php", {
						username: $("#username").val(),
						password: $("#password").val()/*,
						people:"user"*/
					}, function(data) {
						console.log(data);
						console.log(typeof data);
						if(data) {
							$("#success").show();
							$.cookie("user", $("#username").val(), {
//								expires: 7,
								path: "/"
							});
							setTimeout(function() {
								location.href = "../index.html";
							}, 3000);

						} else {
							alert("用户名或密码错误！");
						}
					});
				}else{
					alert("验证码错了！");
				}
			} else {
				alert("当前已有用户登录！")
			}
		}
	});
});