	$(function(){
		//微信授权js
		getSignature();
	})
	
	//获取signature
	function config(map){
		var appid = map["appid"];
		var signature = map["configsign"];
		var timeStamp = map["timeStamp"];
		var nonceStr = map["nonceStr"];
		
		wx.config({
		    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: appid, // 必填，公众号的唯一标识
		    timestamp: timeStamp, // 必填，生成签名的时间戳
		    nonceStr: nonceStr, // 必填，生成签名的随机串
		    signature: signature,// 必填，签名，见附录1
		    jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		
		wx.ready(function(){
			if(!("openid" in sessionStorage)){
				getOpenid();
			}
		});
	}	
	
	function getSignature(){
		var map={};
		$.ajax({
			type : "Post",
			async : "false",
			url : basePath+"pub/common/auth/wx/getConfigSign.do?",
			dataType : "json",
			success : function(data) {
				if(data.errno=="200"){
					sessionStorage.appid = data.data.appid;
					map={
					"appid":data.data.appid,
					"timeStamp":data.data.timeStamp,
					"configsign":data.data.configsign,
					"nonceStr":data.data.nonceStr,
					};
					config(map);
				}else{
					mui.toast(data.errtext);
				}
				
			}
		});
	}

	function getOpenid(){
		var code = GetQueryString("code");
		$.ajax({
			type : "Post",
			async : "false",
			url : basePath+"pub/common/auth/getOpenid.do",
			data:{"type":9,"authCode":code},
			dataType : "json",
			success : function(data) {
				if(data.errno=="200"){
					sessionStorage.openid = data.data.openid;
				}else{
					mui.toast(data.errtext);
				}
			}
		});
	}

	