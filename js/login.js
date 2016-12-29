(function(mui, doc) {
	mui.init({
		statusBarBackground: '#f7f7f7'
	});
}(mui, document));

$(function() {
	$('.get-code').on('tap',function() {
		var phoneNum = document.getElementById('account1').value;
		checkPhoneNum(phoneNum);
	})
	
	if(window.location.href.indexOf("login")>=0){  //在登录页的时候，判断是否登录。
//		if("loginname" in sessionStorage){
//			location.href = basePath1+"authority/personal.html";
//		}
	}
	
})

//登录页手机号验证
function checkPhoneNum(val) {
	var phoneReg = /^1[34578]\d{9}$/;
	if(!(phoneReg.test(val))){ 
        mui.toast('请输入正确的手机号');  
        return false; 
    } 
    return true;
}

//密码登录
function pslogin(){
	var phoneno = $("#account0").val();
	var pw = $("#password0").val();
	checkPhoneNum(phoneno);
	$.ajax({
        url: basePath+"pub/app/login.do",
        type: 'post',
        async: true,
        data: { "loginname":phoneno,"password":pw},
        success: function (ResultData) {
        	l(ResultData);
        	if(ResultData.errno=="200"){
        		//跳转到登录个人中心页
        		sessionStorage.loginname = ResultData.data.loginname;
        		sessionStorage.name = ResultData.data.name;;
        		location.href= "authority/personal.html"
            }else{
            	mui.toast(ResultData.errtext);  
            }
        }
    });
}

//是否登录
function islogin(){
	
	 $.ajax({
	   type: "POST",
	   url: basePath + "user/show.do",
	   dataType: 'json',
	   async:false,
	   success: function(data){
		   if(data.errno=="408"){
			   mui.toast(data.errtext);
		   }else if(data.errno=="200"){
			   sessionStorage.loginname = data.data.loginname;
		   }
	   }
	});
}

//baseinfo
function getUserInfo(){
	var user;
	$.ajax({
        url: basePath+"user/show.do",
        type: 'get',
        async: false,
        success: function (ResultData) {
            if(ResultData.errno!="200"){
            	user = null;
            }else{
            	user = ResultData.data;
            }
        }
    });
	return user;
}