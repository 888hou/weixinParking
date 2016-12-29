var localurl = (window.location+'').split('/');
var basePath = localurl[0]+"//"+localurl[2]+"/"+localurl[3]+"/";
var basePath1 = localurl[0]+"//"+localurl[2]+"/"+localurl[3]+"/"+localurl[4]+"/"+localurl[5]+"/";
//var basePath="http://192.168.10.35:8080/stp_apps/";
//调试用
function l(obj){
	console.log(obj);
}

//array remove
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};



//缴费方式
function getPayType(paytype){
	var type = '';
	if(paytype==0){
		type="现金"
	}
	return type;
}

//倒计时
function countDown(el) {
	var count = 60;
	var timer = setInterval(function() {
		count--;
		if (count === 0) {
			clearInterval(timer);
			$(el).html('重新获取').removeAttr('disabled');
		} else {
			$(el).html(count + '秒后重新获取').attr('disabled',true);
		}
	},1000);
}

//获取search方法
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURIComponent(r[2]) ; return null;
}

//验证手机号
function checkPhoneNum(val) {
	var phoneReg = /^1[34578]\d{9}$/;
	if(!(phoneReg.test(val))){ 
        mui.toast('请输入正确的手机号');  
        return false; 
    } 
    return true;
}



/*
 * cookie相关模块
 */

function setCookie(name,value,time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function getCookie(name) {
	var arr = document.cookie.split('; ');
	for(var i = 0; i < arr.length; i++) {
		var arrName = arr[i].split('=');
		if(arrName[0] == name) {
			return arrName[1];
		}
	}
	return '';
}

function getsec(str) {
	var str1=str.substring(1,str.length)*1;
	var str2=str.substring(0,1);
	if (str2=="s") {
		return str1*1000;
	} else if (str2=="h") {
		return str1*60*60*1000;
	} else if (str2=="d") {
		return str1*24*60*60*1000;
	}
}

//验证码验证
function checkCode(code) {
	var codeReg = /^\d{6}$/;
	if (code == '') {
		mui.toast('验证码不能为空');
		return false;
	} else if (!(codeReg.test(code))) {
		mui.toast('验证码错误');
		return false;
	}
	return true;
}