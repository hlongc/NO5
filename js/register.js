$(function() {
    
	//jquery.ui加日历
	$("#birthday").datepicker({
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dateFormat: 'yy-mm-dd',
		maxDate: 0,
		yearRange: '1920:2020',
		showOtherMonths: true,
		changeMonth: true,
		changeYear: true,
        autoSize: true
	});
	
    //产生验证码随机数
    var iVerify = "";
    function randomNumber(){
        for(var i = 0; i < 6; i++) {
            iVerify += Math.floor(Math.random() * 10) + "";
        }
    }
    
    //当点击了获取验证码以后切换显示文字和样式
    var wait = 60;
    function time(btn){
        if (wait===0) {
            btn.prop('disabled',false);
            btn.text('获取验证码');
            btn.removeClass('ban');
            wait = 60;
        }else{
            btn.prop("disabled",true);
            btn.text(wait + "秒后重试");
            btn.addClass('ban');
            wait--;
            setTimeout(function(){
                time(btn);
            },1000);
        }
    }

    //发送验证码
    $(".btn").click(function(){
        time($(this));
        randomNumber();
        $.post('../SUBMAIL.php',{phones:$("#phone").val(),num:iVerify},function(data){
            console.log(data);
        })
    })
    
    //自定义电话验证方法
    $.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");
    
        
	//调用验证插件
	$("#registerForm").validate({
		rules: {
			user: { //用户名必须填写
				required: true,
				rangelength: [3, 16]
			},
			psw: { //密码必须填写
				required: true,
				rangelength: [6, 16]
			},
			phone: { //手机号码必填，且格式必须正确
				required: true,
                rangelength: [11,11],
                isMobile: true
			},
			repsw: { //重复密码必须与第一次写的密码相同
				required: true,
				equalTo: "#psw",
			},
			verify: {
				required: true,
				rangelength: [6, 6]
			},
			birthday: {
				required: true
			}

		},
		messages: {
			user: {
				required: "账号不得为空！",
				rangelength: "账号长必须在{0}-{1}之间！"
			},
			psw: {
				required: "密码是必须的！",
				rangelength: "密码的长度应该为{0}-{1}个字符之间！！"
			},
			phone: {
				required: "请输入手机号码",
				rangelength:"手机号码只能为11位",
                isMobile : "请正确填写您的手机号码"
			},
			repsw: {
				required: "重复密码不能为空！",
				equalTo: "两次输入密码不相同！"
			},
			verify: {
				required: "必须输入验证码！",
				rangelength: "验证码必须为6位！"
			},
			birthday: {
				required: "请选择生日！"
			}
		},
		success: "showright",  //每个单项验证成功时候显示的样式
		highlight : function (element, errorClass) {// element验证出错时触发
			$(".error ").removeClass("showright");
			$(element).css({
				border:"1px solid #800000",
				backgroundColor:"#FFFDDF",
				color:"#800000"
			});
		},
		unhighlight : function (element, errorClass) {// element通过验证时触发
			$(element).css({
				border:"1px solid #2648C4",
				backgroundColor:"#EAF5FF",
				color:"1px solid #2648C4"
			});
		},
		debug: true,
		submitHandler: function(form) {//通过验证后运行的函数
			if(iVerify === $("#verify_txt").val()) {
				if($("#checkbox").prop("checked")) {
					$.post("../register.php", {
						username: $("#user").val(),
						password: $("#psw").val()
					}, function(data) {
                        console.log(data);
						if(data) {
							$("#show_success").show();
							setTimeout(function() {
								location.href = "login.html";
							}, 3000);
						} else {
							$("#sorry_already").show();
							setTimeout(function(){
								$("#sorry_already").hide();
							},2000);
						}
					});

				}
			} else {
				$("#verify_error").show();
			}
		}

	});
	$("#verify_txt").focus(function(){
		$("#verify_error").hide();
	});
});