$(function () {
    var isAdd = true;
    /*var src = $("#uploadhead").attr("src");*/
    var iindex = "";//保存点击的当前行序号
    var father = "";
    /*if(!$.session.get('isHaveUser')){
     alert('请先登录');
     location.href='../adminIndex.html';
     }*/
    $.get('../admin.php', function (data) {

        var goods = $.parseJSON(data);
        //console.log(goods);
        $.each(goods, function (index, value) {
            $("#showgood").append("<tr><td class='goodid' goodsid=" + value.id + ">" + (index + 1) + "</td><td class='gn'>" + value.name + "</td><td class='gnow'>" + value.no5 + "</td><td class='gnor'>" + value.normal + "</td><td class='gs'>" + value.size + "</td><td class='gimg' style='text-align: center;'><img style='max-width: 30px;max-height: 30px;' src=" + value.src + "></td><td><button class='deletegood btn btn-danger btn-sm'>删除</button>&nbsp;<button class='editgood btn btn-warning btn-sm'>修改</button>&nbsp;<button class='addGoods btn btn-success btn-sm'>增加</button></td></tr>");
        });

        //利用委托方法删除商品
        $("#showgood").delegate('.deletegood', 'click', function () {

            var id = $(this).parent().parent().children('.goodid').attr('goodsid');
            var pp = $(this).parent().parent();
            var goods = $(this).parent().parent().children('.gn').text();
            if (confirm("确定要删除商品:" + goods)) {
                $.post('../deletegoods.php', {id: id}, function (data) {
                    if (data) {
                        pp.remove();
                        alert("删除成功");
                    }
                });
            }
        });
        //利用委托方法修改商品
        $("#showgood").delegate('.editgood', 'click', function () {
            //先获取要修改的值
            father = $(this).parent().parent();
            iindex = father.index();
            var id = father.children('.goodid').attr('goodsid');
            var name = father.children('.gn').text();
            var no5 = father.children('.gnow').text();
            var normal = father.children('.gnor').text();
            var size = father.children('.gs').text();
            var ssrc = father.children('td').children('img').attr('src');
            //console.log(ssrc);
            //console.log(id, name, no5, normal, size);
            //展示在修改框里
            $(".add").css({"display": "block"});
            $(".add .gname").val(name);
            $(".add .gvalue").val(normal);
            $(".add .gnowvalue").val(no5);
            $(".add .gsize").val(size);
            $(".add .gid").val(id);
            $(".add #uploadhead").attr('src', ssrc);
            //修改提示符 把添加改为修改
            if (isAdd) {
                $(".add p").text("修改商品数据");
                $(".gadd").text("提交");
                isAdd = false;
            }

        });
        //显示增加窗口
        $("#showgood").delegate('.addGoods', 'click', function () {
            $(".add").css({"display": "block"});
            if (!isAdd) {
                $(".add p").text('添加商品');
                $(".gadd").text("添加");
                isAdd = true;
            }
        })
    })
    //显示添加窗口
    /*$(".addGoods").click(function () {
        $(".add").css({"display": "block"});
        if (!isAdd) {
            $(".add p").text('添加商品');
            $(".gadd").text("添加");
            isAdd = true;
        }
    })*/
    //右上角x取消
    $(".cancel").click(function () {
        $(".add").css({"display": "none"});
        deletes();
    })
    //重新输入清空
    $(".reinput").click(function () {
        deletes();
    })
    //获取图片地址
    $("#imgUpload").change(function (e) {
        for (var i = 0; i < e.target.files.length; i++) {
            var file = e.target.files.item(i);
            var freader = new FileReader();
            freader.readAsDataURL(file);
            freader.onload = function (e) {
                var src = e.target.result;
                $("#uploadhead").attr("src", src);
            }
        }
    });

    // 添加/修改商品
    $(".gadd").click(function () {
        var name = $(".gname").val();
        var normal = $(".gvalue").val();
        var no5 = $(".gnowvalue").val();
        var size = $(".gsize").val();
        var num = $(".goodid").length + 1;
        var srcV = $("#imgUpload").val();
        var src = $("#uploadhead").attr("src");
        if (isAdd) { //添加的时候的操作
            if (name && normal && no5 && size && srcV) {

                console.log(name, normal, no5, size);
                $.post('../addGoods.php', {  //传递给php的文件
                    name: name,
                    normal: normal,
                    no5: no5,
                    size: size,
                    src: src
                }, function (data) {
                    if (data) {
                        console.log("添加成功" + data);
                        var id = data;
                        var htmls = "";
                        //把数据添加到页面
                        htmls += "<tr><td class='goodid' goodsid=" + id + ">" + num + "</td><td class='gn'>" + name + "</td><td class='gnow'>" + no5 + "</td><td class='gnor'>" + normal + "</td><td class='gs'>" + size + "</td><td class='gimg' style='text-align: center;'><img style='max-width: 30px;max-height: 30px;' src=" + src + "></td><td><button class='deletegood'>删除</button><button class='editgood'>修改</button></td></tr>";
                        $("#showgood").append(htmls);
                        //清空表单
                        deletes();
                        alert("添加成功!");
                    }
                })
            } else {
                alert("请输入完整");
            }
        } else { //修改的时候的代码
            if (name && normal && no5 && size) {
                //console.log(name,normal,no5,size);
                var id = $(".add .gid").val();
                $.post('../editGoods.php', {  //传递给php的文件
                    name: name,
                    normal: normal,
                    no5: no5,
                    size: size,
                    id: id,
                    src: src
                }, function (data) {
                    if (data) {
                        console.log(name,normal,no5,size);
                        console.log($("#showgood").children('tbody tr').eq(iindex).children('.goodid'));
                        //数据库修改成功以后刷新页面数据
                        father.children('.goodid').text(iindex);
                        father.children('.gn').text(name);
                        father.children('.gnow').text(no5);
                        father.children('.gnor').text(normal);
                        father.children('.gs').text(size);
                        father.children('.gimg img').attr('src', src);
                        alert("修改成功!");
                    }
                });
            } else {
                alert("请填写完整");
            }

        }

    })

    function deletes() {
        $(".gname").val("");
        $(".gvalue").val("");
        $(".gnowvalue").val("");
        $(".gsize").val("");
        $("#uploadhead").attr("src", "");
    }
})
