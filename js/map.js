	var map, geolocation, district;
    /*加载地图，调用浏览器定位服务*/
	map = new AMap.Map('container', {
        zoom: 11,
        resizeEnable: true
    });
    
    map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                //zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
        });

        var viewModel={  //Model格式数据
            resultCode:"",
            resultMsg:"",
            data:[]
        }
        var areaInfo=[];
        
	 	data =[];
		function setMark(data){
			$.each(data,function(){
				if(this.lon!=""){
					areaInfo.push({
		                "name":this.name,
		                "location":[this.lon,this.lat],
		                "berthTotal":this.total,
		                "berthLeft":this.remain
		            })
				}
	        });
	        /*添加注点*/
	        var arr = [];
	        for (var i = 0; i < areaInfo.length; i++) {
	            var iconUrl = "";
	            if(areaInfo[i].berthLeft == null){  //根据剩余率选择图标
	                iconUrl = "imgs/gray.png";
	            } else if (areaInfo[i].berthLeft == 0) {
	                iconUrl = "imgs/red.png";
	            } else if (areaInfo[i].berthLeft <= 50) {
	                iconUrl = "imgs/orange.png";
	            } else {
	                iconUrl = "imgs/green.png";
	            }
	            marker = new AMap.Marker({  //注点
	                icon: iconUrl,
	                position: areaInfo[i].location,
	                title: areaInfo[i].name,
	                map: map
	            });
	            arr.push(marker);
	        }
	        
	    /*信息窗口内容*/
        var info = [];
        var infoWindow = new Array();
        for (var i = 0; i < arr.length; i++) {
            infoWindow[i] = new Array();
            for (var j = 0; j < 2; j++) {
                infoWindow[i][j] = "";
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if(areaInfo[i].berthTotal!=null){
                info[i] = "<div style=\"padding:0px 0px 0px 4px;line-height:27px;width:230px;\"><b style=\"color:#03a9f5;\">" + areaInfo[i].name + "</b><br/>" +
                          "泊位：剩余<span style=\"color:#00b30d;\">" + areaInfo[i].berthLeft + "</span>个，总共<span style=\"color:red;\">" + areaInfo[i].berthTotal + "</span>个<br/>" +
                          "一类区域：首小时3元/小时&nbsp&nbsp  其他4元/小时&nbsp&nbsp 25元/天&nbsp&nbsp  0-15分钟免费<br/>"+
                          "二类区域：2元/小时&nbsp&nbsp  8元/天&nbsp&nbsp  0-15分钟免费</div>";
            }else{
                info[i]="<div style=\"padding:0px 0px 0px 4px;line-height:32px\"><b style=\"color:#03a9f5;\">" + areaInfo[i].name + "</b><br/>" +
                          "此地区暂未部署停车位 敬请期待！</div>";
            }
            infoWindow[i][0] = areaInfo[i].name;
            infoWindow[i][1] = new AMap.InfoWindow({
                content: info[i],
                offset: new AMap.Pixel(10, -20)
            });
        }

        for (var i = 0; i < arr.length; i += 1) {  //所有marker绑定事件
            arr[i].on("click", function (e) {
                var j = 0;
                while (infoWindow[j][0] != e.target.getTitle()) {
                    j++;
                }
                infoWindow[j][1].open(map, e.target.getPosition());  //添加信息窗口
            })
            /*
            arr[i].on("click", function (e) {
                var j = 0;
                while (infoWindow[j][0] != e.target.getTitle()) {
                    j++;
                }
                infoWindow[j][1].close();  //关闭信息窗口
            })
            */
        }
	}
