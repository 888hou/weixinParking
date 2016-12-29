mui.init();

$(function() {
    var state = initInquery();
    $('.bind-car').on('tap', '.bind-car-item', function() {
        console.log(state);
        var car = $(this).html();
        openWindow(state, car);
    })

    $('#ser-btn').on('tap', function() {
        var car = $('#ser-car').val();
        checkCar(state,car);
    })
})

function initInquery() {
    setList();
    var state = setTitle();
    return state;
}

function setTitle() {
	var state;
    var data = getData();
    var titleArr = ['停车费用查询', '欠费查询'];
    if (data.state == '1') {
        $('title').html(titleArr[0]);
        return state = 1;
    } else {
        $('title').html(titleArr[1]);
        return state = 2;
    }
}

function getData() {
    //测试传值是否成功
    var info = window.location.search.slice(1);
    return analysisUrl(info);
}

function analysisUrl(data) {
    var arr = data.split('&');
    var tempObj = {};
    for (var i=0;i<arr.length;i++) {
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

function checkCar(state,car) {
    var carReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    l(encodeURI(car))
    if (car == '') {
        mui.toast('车牌号不能为空');
    } else if (!carReg.test(car)) {
        mui.toast('请输入正确的车牌号');
    } else {
    	if(state==1){
    		var url = basePath1+"order-detail.html?carno="+encodeURIComponent(car);
    		//snsapi_base
			window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd9d668f0822793d3&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect';
    		//location.href = "order-detail.html?carno="+encodeURIComponent(car);
    	}else{
    		//下面网页进行授权之后进入。
    		var url = basePath1+"debt-record.html?carno="+encodeURIComponent(car);
			window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd9d668f0822793d3&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect';
    		//location.href = "debt-record.html";
    	}
    }
}


function setList() {
}

function getLocalInfo() {
    var phone = getCookie('phone');
    var data = JSON.parse(localStorage.getItem(phone));
    return data;
}