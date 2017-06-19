$(function () {
    //从json文件中读取模拟数据呈现到页面
    $.get(
        "../data/list.json",
        function (data) {
            var bk = data.isShow[0].bigKind;
            var sk = data.isShow[1].smallKind;
            for (var i = 0; i < bk.length; i++) {
                $("<h6 class='many'><b class='b1'></b>" + bk[i].item + "<span>(" + bk[i].count + ")</span></h6>").insertBefore($(".rank")[0]);
            }
            $(".many").each(function (index, ele) {
                $("<ul class='inside_detail'></ul>").insertAfter($(ele));
            });
            $(".inside_detail").each(function (index, ele) {
                for (var j = 0; j < sk[index].length; j++) {
                    $(ele).append("<li><a href='javascript:;'>" + sk[index][j].item + "</a><span>(" + sk[index][j].count + ")</span></li>");
                }
            });
            for (var i = 0; i < 5; i++) {
                $("<ul class='how'><p>" + data.friendlink[0].title[i] + "</p></ul>").insertAfter($(".contact"));
            }
            $(".how").each(function (index, ele) {
                for (var i = 0; i < data.friendlink[1].subtitle[index].length; i++) {
                    $(ele).append("<li><a href='javascript:;'>" + data.friendlink[1].subtitle[index][i] + "</a></li>")
                }
            })
            /*var com = data.commodity;
             console.log(com);
             var datas = {
             list : com
             }
             var html = template('commodity',datas);
             $("#listing").html(html);*/


        })
    $.get('../getList.php', function (res) {
        var data = $.parseJSON(res);
        console.log(data);
        // return;
        var datas = {
            list: data
        }
        var html = template('commodity', datas);
        $("#listing").html(html);
        //点击商品进入商品详情以前，把点击物品的ID存到cookie里面，在商品详情页面再读出来
        $("#listing img,#listing .join,#listing .cl").each(function (index, ele) {
            $(ele).click(function () {
                var par = $(ele).parents('dl');
                var id = par.find('.cl').attr('dataid');
                var infos = {"id": id};
                var linfo = JSON.stringify(infos);
                $.cookie("info", linfo);
                window.location.href = "detail.html";
            })
        })

    })
    $.cookie.json = true;
    //给每个h6添加点击事件,左边点击一次就展开那个效果
    var
        flag = true;
    $("#list_left").on("click", "h6", function () {

        if (flag) {
            flag = !flag;
            //藏起来
            $(this).next().show();
            //给<h6>下面的<b>换个背景,b1是+号,显示的时候应该是减号
            $(this).children("b").removeClass("b1").addClass("b2");
        } else {
            flag = !flag;
            //显示出来
            $(this).next().hide();
            //给<h6>下面的<b>换个背景
            $(this).children("b").removeClass("b2").addClass("b1");
        }

    });
    var num = [];


    //中间筛选部分
    $(".choose").on("click", "a", function () {
        //点到哪个,哪个就active
        $(this).addClass("active_a").siblings("a").removeClass("active_a");
        return false;
    });

    //购物车功能
    $(".join").click(function () {
        //先判断有用户登录没,如果有人登录了,则可以使用该功能
        if ($.cookie("user")) {
            $that = $(this);
            //每次点击，手动清除所有已经变了的蓝色
            $(".join").text("加入购物车").css({
                background: "#fc1c5a"
            });
            $that.text("已添加成功！").css({
                background: "deepskyblue"
            });
            timer = setTimeout(function () {
                $that.text("加入购物车").css({
                    background: "#fc1c5a"
                });
            }, 500);
            //首先连接上服务器，把这个东西加入数据库，在这之前先判断之前有这个商品没
            $.post("../list.php", {
                id: $(this).parents("dd").find(".id").text(),
                username: $.cookie("user")
            });
            //刷新右上角购物车显示数量
            $.post("../amount.php", {
                username: $.cookie("user")
            }, function (data) {
                $("#amount").text(data);
            });
        } else {
            alert("亲爱的客官，请先登录！")
        }
    });
});

















