$(function() {
	$.cookie.json = true;
	var
		total = 0;
	//地址，要发送的数据，回调
	if($.cookie("user")) {
		$.post("../shopcar.php", {
			//根据username找到这个用户的所有已加入购物车商品,返回这些商品的id和数量
			username: $.cookie("user")
		}, function(data) {
			var
				data = JSON.parse(data);
			$.each(data, function(index, element) {
				//循环将取得的数据添加进页面
				addRow(element, index + 1);
			});
		});
	}

	//通过委托事件,为新的旧的"删除"按钮添加事件,删除该行
	$("body").on("click", ".del a", function() {
		//将页面的该行删除
		$(this).parents(".car_tip").remove();
		//将购物车里面的这一件物品删除,将该用户的这个商品id，从数据库中删除
		$.post("../delrow.php", {
			id: $(this).parents(".car_tip").find(".del .id").text(),
			username: $.cookie("user")
		});
		//刷新一下序号页面
		for(var i = 1, len = $(".car_tip").length; i < len; i++) {
			$(".car_tip .num").eq(i).text(i);
		}
		//删了以后，刷新一下总计页面
		//总计金额累加		
		total -= parseFloat($(this).parents(".car_tip").find(".sub_total").text());
		$(".total span").text(total);
	});

	//清空购物车，把这个用户名下的所有商品都删除掉
	$(".operate .clear").click(function() {
		$.post("../delAll.php", {
			username: $.cookie("user")
		}, function(data) {
			console.log(data);
		});
		//页面上做一些处理
		$(".car_tip:not(:eq(0))").remove();
		$(".total span").text(0);
	});

	//在本页面添加商品
	$(".recommend").on("click", ".btn_add", function() {
		if($.cookie("user")) {
			$(this).parents(".choose").find("input[type=radio]").each(function(index, element) {
				if($(element).prop("checked")) {
					/*//如果有被选中的商品，那么提交给后台,将
					$.post("../list.php", {
						id: $(element).parents("p").find(".id").text(),
						username: $.cookie("user")
					});*/
					//在页面中显示，从数据库中调出该物品的信息
					$.post("../addRow.php", {
						//根据id找到这个物品的信息，再返还回来,由于这里只添加一件商品，所以指定id
						username: $.cookie("user"),
						id: $(element).parents("p").find(".id").text()
					}, function(data) {
						var
							data = JSON.parse(data);
						//将取得的数据添加进页面
						console.log(data.amount);
						if(data.amount == 1) {
							//如果返回的数量等于1，就新增一行
							var
								index = $(".car_tip").length;
							addRow(data, index);
						} else {
							//如果不等于1，刷新对应行的数量
							//	$(".del .id").text() == data.id
							$(".del .id").each(function(index, element) {
								if($(element).text() == data.id) {
									//刷新数量
									$(element).parents(".car_tip").find(".amount").text(data.amount);
									//刷新小计
									var
										sub_total = data.amount * parseFloat($(element).parents(".car_tip").find(".no5_price").text());
									$(element).parents(".car_tip").find(".sub_total").text(sub_total);
									//刷新总计
									total += parseFloat($(element).parents(".car_tip").find(".no5_price").text());
									$(".total span").text(total);
								}
							});
						}

					});

				}
			});

		} else {
			alert("亲爱的客官！请先登录！");
		}
	});

	//为购物车添加一行
	function addRow(obj, index) {
		$row = $(".car_tip:first").clone();
		$($row).css({
			background: "#fff",
			borderBottom: "1px dashed #ccc"
		});
		//序号:
		$($row).find(".num").text(index);
		//商品名称:
		$($row).find(".goods_name").text(obj.name);
		//规格：
		$($row).find(".standard").text(obj.size);
		//一般价:
		$($row).find(".normal_price").text(obj.normal_price);
		//No5价：
		$($row).find(".no5_price").text(obj.no5_price);
		//数量:
		$($row).find(".amount").text(obj.amount);
		//付款小计:
		var
			sub_total = parseFloat(obj.amount) * parseFloat(obj.no5_price);
		$($row).find(".sub_total").text(sub_total);
		//转入收藏夹
		$($row).find(".favorite").html("<a href='javascript:;'>转入收藏夹</a>");
		//删除:
		$($row).find(".del").html("<a href='javascript:;'>删除</a><span class='id'>" + obj.id + "</span>");

		//全部改完了以后,将之放入页面
		$($row).insertBefore($(".total"));

		//总计金额累加		
		total += sub_total;
		$(".total span").text(total);
	}
});