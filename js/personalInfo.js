(function(mui, doc) {
	mui.init({
		statusBarBackground: '#f7f7f7'
	});
}(mui, document));

$(function() {
	//性别选取事件
	$('.sexy').on('tap','label',function(){
		$('.sexy label').removeClass('active');
		$(this).addClass('active');
	})
	
	//保存事件
	$('.save-info').on('tap',function(){
		$(this).css('border','none');
		mui.toast('保存成功');
	})
	
	//选取头像弹出事件
	$('#head').on('tap',function() {
		mui('#picture').popover('toggle');
	})
	
	
	mui.plusReady(function() {
		//调用摄像头
		$('#takePhoto').on('tap',function() {
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(capturedFile){
				console.log(capturedFile);
			}, function(error){
				
			}, {} );
		})
	})
})
