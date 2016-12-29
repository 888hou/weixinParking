mui.init();

$(function () {
	initPay();
})

function initPay() {
	//对http传值进行转码
	var car = decodeURI(GetQueryString("carno"));
	getPayInfo(car);
}

function getData() {
    //测试传值是否成功
    var info = window.location.search.slice(1);
    return analysisUrl(info);
}

function analysisUrl(data) {
    var arr = data.split('&');
    var tempObj = {};
    for (var i in arr) {
        var j = arr[i];
        if (j.indexOf('=') !== -1) {
            var list = j.split('=');
            tempObj[list[0]] = list[1];
        } else {
            tempObj[j] = undefined;
        }
    }
    return tempObj;
}

function getPayInfo(car) {
	$.post(basePath+'pub/common/parkrec/currecord.do',{
		condition: car
	},function(res) {
		l(res)
		if (res.errno == '200') {
			//获得数据后更改模板信息导入dom
			var record = res.data.record;
			var fee = res.data.fee;
            var info = $('#orderInfo').html();
            var addList = info.replace('{{car}}',record.carno)
                        .replace('{{position}}',record.parkname)
                        .replace('{{num}}',record.parkingno)   
                        .replace('{{date}}',record.intime) 
                        .replace('{{time}}',fee.durations)
                        .replace('{{price}}',fee.totalAmount.toFixed(2))
                        .replace('{{yetPay}}',fee.receiptAmount.toFixed(2))  
                        .replace('{{pay}}',(fee.totalAmount - fee.receiptAmount).toFixed(2))
                        .replace('{{parkingrecordid}}',record.parkingrecordid);
            $('.mui-content').append(addList);      
            $('.foot-pay').css('visibility','visible');
		} else {
            //无停车费用信息
            mui.toast(res.errtext);
            $('.mui-content').append('<p class="no-info">未查询到当前车牌的停车费用</p>'); 
		}
	})
}