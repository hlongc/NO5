$(function () {
    $(".adminLogin").click(function () {
        if ($(".adminzh").val() && $(".adminmm").val()) {
            var zh = $(".adminzh").val();
            var mm = $(".adminmm").val();
            var people="admin";
            $.post('../NO5/login.php', {
                username: zh,
                password: mm/*,
                people:people*/
            }, function (data) {
                /*$.session.set('isHaveUser','yes');
                console.log($.session.get('isHaveUser'));
                return;*/
                alert("登录成功，三秒后跳转到管理页面!");
                setTimeout(function () {
                    location.href = "../NO5/html/manerger.html";
                }, 3000);
            })
        } else {
            alert("账号或者密码未输入,请填写")
        }
    })
})
