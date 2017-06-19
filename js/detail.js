$(function () {
    $.cookie.json = true;
    //读取上个页面传过来的cookie
    var info = $.parseJSON($.cookie("info")).id;
    $.post('../getGoodById.php', {id: info}, function (data) {
        var res = JSON.parse(data);
        $(".title").text(res[0].name);
        $(".title").attr('dataid', res[0].id);
        $(".price_no5").text(Number(res[0].no5).toFixed(2));
        $(".srcImg").attr('src', res[0].src);
        $(".price_market").text(Number(res[0].normal).toFixed(2));
        $(".discount").text((Number(res[0].no5) * 10 / Number(res[0].normal)).toFixed(1)+"折");
        console.log("1");
    })
    //放大镜部分
    $(".little_case").on("mouseenter", "img", function () {
        //换图片
        $(".middle_size img,.big_size img").attr({
            src: $(this).attr("src")
        });
    });
    //遮罩层动起来
    $("#middle_size").on("mousemove", function (e) {
        //让遮罩层的中心始终跟着鼠标移动
        $("#mask").offset({
            left: e.pageX - $("#mask").width() / 2,
            top: e.pageY - $("#mask").height() / 2
        });
        //限定范围
        //找到四个边界,缓存一下
        var
            iBoundaryL = $("#middle_size").offset().left,
            iBoundaryR = $("#middle_size").offset().left + $("#middle_size").width() - $("#mask").width(),
            iBoundaryT = $("#middle_size").offset().top,
            iBoundaryB = $("#middle_size").offset().top + $("#middle_size").height() - $("#mask").height(),
            //计算一下移动比率
            iRate = $("#big_size").innerWidth() / $("#mask").innerWidth();
        //左右
        if ($("#mask").offset().left < iBoundaryL) {
            $("#mask").offset({
                left: iBoundaryL
            });
        } else if ($("#mask").offset().left > iBoundaryR) {
            $("#mask").offset({
                left: iBoundaryR
            });
        }
        if ($("#mask").offset().top < iBoundaryT) {
            $("#mask").offset({
                top: iBoundaryT
            });
        } else if ($("#mask").offset().top > iBoundaryB) {
            $("#mask").offset({
                top: iBoundaryB
            });
        }
        //大图片运动起来
        $("#big_size img").css({
            left: $("#mask").position().left * iRate * -1,
            top: $("#mask").position().top * iRate * -1
        });
    });
    //让遮罩层和大盒子隐藏/显示
    $("#middle_size").hover(function () {
        //移入时显示
        $("#mask,#big_size").show();
    }, function () {
        //移除时隐藏
        $("#mask,#big_size").hide();
    });

    //选项卡
    $(".bts").on("click", ".ptab", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    //给"返回顶部"加功能
    $(document).scroll(function () {
        if ($(document).scrollTop() > 0) {
            $(".return_top").show();
        } else {
            $(".return_top").hide();
        }
    });


    //只有当登录过后, 才能评论

    if ($.cookie("user")) {
        //给"我要评价"添加功能
        $("#btn_comment").click(function () {
            $("#to_comment").dialog({
                title: "评  价",
                buttons: {
                    "提交": function () {
                        var
                            $cus = $("#cus_comment").clone();
                        //改变评论内容
                        $cus.find(".letters").text($("#to_comment textarea").val());
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

                        sNowTime = iYear + "-" + iMonth + "-" + iDate + " " + iHour + ":" + iMinute + ":" + iSecond;
                        //刷新当前日期
                        $cus.find(".comment_time").text(sNowTime);
                        //改变用户名称
                        $cus.find(".names").text($.cookie("user"));
                        //将新列表插入
                        $cus.insertBefore("#btn_comment");
                        //更新评论的条数
                        var numbers = parseInt($(".intro .comment_count").text());
                        $(".intro .comment_count").text(numbers + 1);
                        var
                            oNewComment = {
                                comment: $("#to_comment textarea").val(),
                                time: sNowTime,
                                name: $.cookie("user")
                            }
                        if (!$.cookie("comment")) {
                            var
                                aComment = [];
                        } else {
                            aComment = $.cookie("comment");
                        }
                        aComment.push(oNewComment);
                        $.cookie("comment", aComment, {
                            expires: 365,
                            path: "/"
                        });
                        //完成评论后,关闭评论框
                        $("#to_comment").dialog("close");

                    }
                },
                minWidth: 500,
                minHeight: 300,
                resizable: false,
                open: function () {
                    //清空textarea中的值
                    $("#to_comment textarea").val("");
                    $("#to_comment textarea").show();
                },
                close: function () {
                    $("#to_comment textarea").hide();
                }

            });
        });
    } else {
        $("#btn_comment").click(function () {
            alert("请先登录再评论！")
        });
    }

    //从cookie中读取评论数据
    if (!$.cookie("comment")) {
        var
            aComment = [];
    } else {
        aComment = $.cookie("comment");
    }
    $.each(aComment, function (index, element) {
        var
            $cus = $("#cus_comment").clone();

        $cus.find(".letters").text(element.comment);
        $cus.find(".comment_time").text(element.time);
        $cus.find(".names").text(element.name);

        $cus.insertBefore("#btn_comment");

    });
    //评论条数
    var len = $(".cus_comment").length;
    console.log(len);
    $(".intro .comment_count").text(len);
    //给加减号写事件
    $(".btn_pre").on("click", function () {
        $("#amount_txt").val($("#amount_txt").val() - 1);
        if ($("#amount_txt").val() < 1) {
            $("#amount_txt").val(1);
        }
    });
    $(".btn_next").on("click", function () {
        $("#amount_txt").val(parseInt($("#amount_txt").val()) + 1);
    });

    //将本页商品加入购物车,在后台，就是刷新该用户下这个商品的数量
    $("#add").on("click", function () {
        console.log($(".title").attr("dataid"));
        /*return;*/
        if ($.cookie("user")) {
            //	console.log($(".choose_style .id").text(),$.cookie("user"),$("#amount_txt").val())
            $.post("../detail.php", {
                id: $(".title").attr("dataid"),
                username: $.cookie("user"),
                amount: $("#amount_txt").val()
            }, function (data) {
                console.log(data);
                //刷新右上角购物车显示数量
                $.post("../amount.php", {
                    username: $.cookie("user")
                }, function (data) {
                    $("#amount").text(data);
                });
            });
        } else {
            alert("亲爱的客官，请先登录！");
        }
    });


});