$(function() {
    $.get(
        'data/index.json',
        function(data){
            for(var i=0;i<data.banner.length;i++){
                $("#banner_img").append("<li><a href='javascript:;'><img src="+data.banner[i]+"></a></li>");
            }
            for(var i=0;i<data.subbanner.length;i++){
                $(".subbanner").append("<ul class='subbanner_img'></ul>");
                
            }
            $.each($(".subbanner_img"),function(index,element){
                $(element).append("<li><a href='javascript:;'><img src="+data.subbanner[index][0]+"></a></li>");
                $(element).append("<li><a href='javascript:;'><img src="+data.subbanner[index][1]+"></a></li>");
                $(element).append("<li><a href='javascript:;'><img src="+data.subbanner[index][2]+"></a></li>");
            });
            for(var i=0;i<data.bannerBottom.length;i++){
                $(".banner_pic").append("<div class='pic'><a href='javascript:;'><img src="+data.bannerBottom[i]+" /></a></div>");
            }
            for(var i=0;i<data.pics_box.length;i++){
                $(".pics_box").append("<div class='pics'><a href='javascript:;'><img src="+data.pics_box[i]+" /></a</div>");
            }
            $.each($(".logos"),function(index,element){
                var arr=[0,1,2,3,4,5,6,7,8,9,10,11];
                for(var i=0;i<12;i++){
                    var r = Math.floor(Math.random()*arr.length);
                    //console.log(Math.random(0,arr.length));
                    $(element).append("<a href='javascript:;'><img src="+data.logs[arr[r]]+" /><span></span></a>");
                    arr.splice(r,1);
                }
            })
        }
    )
    
	$.cookie.json = true;
	//左侧ul列表
	$(".detail_good li").hover(function() {
		$(this).children(".subchoose").show().end().addClass("li_active");
	}, function() {
		$(this).children(".subchoose").hide().end().removeClass("li_active");
	});

	//轮播
	//初始化图片与圆圈
	var
		timer_banner = null,
		timer_forecast = null,
		count_banner = 0,
		count_forecast = 0;
	(function init() {
		$(".banner_num li").eq(0).addClass("active").siblings().removeClass("active");
		$("#banner_img li").eq(0).fadeIn().siblings().fadeOut();
	})();
	//手动,给每个圆圈添加事件
	$("#banner_num").on("mouseover", "li", function() {
		clearInterval(timer_banner);
		//指到哪个圆圈，哪个圆圈就变色
		$(this).addClass("active").siblings().removeClass("active");
		//指到哪个圆圈，对应的图片显示出来，在换图片之前，先把前面所有的图片运动都停下来
		$("#banner_img li").stop(true).eq($(this).index()).fadeIn().siblings().fadeOut();
		//还有旁边的subbanner
		$(".subbanner_img").eq($(this).index()).show().siblings().hide();

		count_banner = $(this).index();
	});
	//自动
	timer_banner = setInterval(function() {
		autoMove();
	}, 3000);
	//运动函数
	function autoMove() {
		//圆圈变色
		$(".banner_num li").eq(count_banner).addClass("active").siblings().removeClass("active");
		//图片显现
		$("#banner_img li").eq(count_banner).fadeIn().siblings().fadeOut();
		//subbanner改变
		$(".subbanner_img").eq(count_banner).show().siblings().hide();
		count_banner++;
		if(count_banner >= $(".banner_num li").length) {
			count_banner = 0;
		}
	}
	//鼠标移上banner,定时器关闭，离开，再开启
	$(".banner").hover(function(e) {
		clearInterval(timer_banner);
	}, function(e) {
	timer_banner = setInterval(autoMove, 3000);
	});

	//预报预警
	timer_forecast = setInterval(function() {
		$("#forecast").animate({
			top: -count_forecast * $("#forecast li").outerHeight()
		}, 1000, function() {
			count_forecast++;
			if(count_forecast > $("#forecast li").length - 1) {
				count_forecast = 1;
				$("#forecast").css("top", 0)
			}
		});
	}, 2000);

	//选项卡
	$("#tab").on("mouseover", "li", function() {
		//选项卡border变色
		$(this).addClass("tab_li_active").siblings().removeClass("tab_li_active");
		//对应选项卡显现
		$(".tabs").hide().eq($(this).index()).show();
	});

	//热销list
	function Tab(obj_id) {
		$("#" + obj_id + " li").hover(function() {
			$("#" + obj_id + " li .img").hide().next().show();
			$(this).children(".img").show().next().hide();

		}, function() {
			//离开时，所有图片隐藏，字显示出来
			$("#" + obj_id).find(".img").hide().next().show();
			$(this).children(".img").show().next().hide();
		});

	}
	new Tab("care_self1");
	new Tab("care_self2");
	new Tab("care_self3");
	new Tab("care_self4");
	new Tab("care_self5");

	//让nav动起来
	$(document).scroll(function() {
		if($(document).scrollTop() > $("#conetent").offset().top) {
			//改变nav的位置
			$("#nav").css({
				position: "fixed",
				left: 0,
				top: 0
			});
			//先隐藏它,改变detail_good的位置,同时给"全部物品分类"(#good_list)添加事件
			$("#detail_good").hide();
			$("#good_list").hover(function() {
				//它的位置在nav正下方
				$("#detail_good").show().offset({
					left: $("#good_list").offset().left,
					top: $("#good_list").offset().top + $("#good_list").outerHeight()
				});
			}, function() {
				$("#detail_good").hide();
			});
			//当鼠标在detail_good上面时,不应该消失
			$("#detail_good").hover(function() {
				$("#detail_good").show();
			}, function() {
				$("#detail_good").hide();
			});
		} else {
			//恢复nav的位置
			$("#nav").css({
				position: "absolute",
				left: $("#navbox_repalce").offset().left,
				top: $("#navbox_repalce").offset().top
			});
			//显现出来,归位
			$("#detail_good").show();
			$("#detail_good").css({
				position: "absolute",
				left: $("#detail_good_replace").offset().left,
				top: $("#detail_good_replace").offset().top
			});
			//清除good_list和detail_good上面的事件
			$("#good_list").unbind();
			$("#detail_good").unbind();
		}
	});
	
	//公共部分，由于有些路径不一样，拿这里来用
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
					href: "html/login.html"
				});
				return false;
			}
		});
		//刷新右上角购物车显示数量
		$.post("amount.php", {
			username: $.cookie("user")
		}, function(data) {
			$("#amount").text(data);
		});
	}
});