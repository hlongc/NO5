function showLocation(province , city , town) {
	
	var loc	= new Location();
	var title	= ['省份' , '地级市' , '市、县、区'];
	$.each(title , function(k , v) {
        console.log(k,v);
		title[k]	= '<option value="">'+v+'</option>';
	})
	console.log(title);
	$('#loc_province').append(title[0]);
	$('#loc_city').append(title[1]);
	$('#loc_town').append(title[2]);
	
	$("#loc_province,#loc_city,#loc_town").select2()
    //console.log($("#loc_province,#loc_city,#loc_town").select2());
	$('#loc_province').change(function() {
		$('#loc_city').empty();
		$('#loc_city').append(title[1]);
		loc.fillOption('loc_city' , '0,'+$('#loc_province').val());
		$('#loc_city').change()
	})
	
	$('#loc_city').change(function() {
		$('#loc_town').empty();
		$('#loc_town').append(title[2]);
		loc.fillOption('loc_town' , '0,' + $('#loc_province').val() + ',' + $('#loc_city').val());
	})
	
	$('#loc_town').change(function() {
		$('input[name=location_id]').val($(this).val());
	})
	
	if (province) {
		loc.fillOption('loc_province' , '0' , province);
		
		if (city) {
			loc.fillOption('loc_city' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('loc_town' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('loc_province' , '0');
	}
		
}
$(function() {
    showLocation();
    $('#btnval').click(function(){
        alert($('#loc_province').val() + ' - ' + $('#loc_city').val() + ' - ' +  $('#loc_town').val()) 
    })
    $('#btntext').click(function(){
        alert($('#loc_province').select2('data').text + ' - ' + $('#loc_city').select2('data').text + ' - ' +  $('#loc_town').select2('data').text) 
    })
	//进来先把所有input清空
	$("#address_form input").val("");
	$("#address_form .save").val("保存收货人地址");

	$("#address_form").validate({

		rules: {
			name: {
				required: true
			},
			phone: {
				required: true
			},
			email: {
				email: true
			},
			detail_address: {
				required: true
			}
		},
		messages: {
			name: {
				required: "必须填写姓名"
			},
			phone: {
				required: "必须填写手机号"
			},
			email: {
				email: "请填写正确的邮箱"
			},
			detail_address: {
				required: "必须填写详细地址！"
			}
		},
		submitHandler: function() {

		}
	});

	//加载全国城市信息
	/*$.post("../address.json", function(data) {
        console.log(data);
		$("#province").on("click", function(event) {
			//每次进来，把上次添加进来的都删了
			$("#province option:not(:eq(0))").remove();
			var aProvince = $(data.regions);
			$.each(aProvince, function(index, element) {

				//遍历出来这些数据，然后依次添加进选项里面
				var $option = $("<option>" + element.name + "</option>");
				$("#province").append($option);
			});

			//给省份的每个option加点击事件，将所对应的城市加入城市选项里面
			$("#province").on("click", "option", function(event) {
				//每次进来，把上次添加进来的都删了
				event.stopPropagation();
				$("#city option:not(:eq(0))").remove();
				city_index = $(this).index() - 1;
				var
					aCity = $(data.regions[city_index].regions);
				$.each(aCity, function(index, element) {
					//遍历出来这些数据，然后依次添加进选项里面
					var
						$option = $("<option>" + element.name + "</option>");
					$("#city").append($option);
				});
			});
			
			//给城市的每个option加点击事件，将所对应的城区加入城区选项里面
			$("#city").on("click", "option", function(event) {
				//每次进来，把上次添加进来的都删了
				event.stopPropagation();
				$("#zone option:not(:eq(0))").remove();
				var
					aZone = $(data.regions[city_index].regions[$(this).index() - 1].regions);
				$.each(aZone, function(index, element) {
					//遍历出来这些数据，然后依次添加进选项里面
					var
						$option = $("<option>" + element.name + "</option>");
					$("#zone").append($option);
				});
			});
		});
	})*/
})


