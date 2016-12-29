$('.add-car').on('tap',function() {
	var carNum = $('#carNum').val();
	var carReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
	if(!carReg.test(carNum)) {
		mui.toast('请输入正确的车牌号');
		return false;
	} else{
		var carHtml = '<div class="car-num">' + carNum + '</div>';
		$('#car-form').append(carHtml)
	}
	
})
