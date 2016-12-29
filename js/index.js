(function($, doc) {
	$.init({
		statusBarBackground: '#f7f7f7'
	});
	var gallery = $('.mui-slider');
	gallery.slider({
	    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
	});
}(mui, document));