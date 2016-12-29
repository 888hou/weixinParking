
$(function() {
    var record = initDebtRecord();
    var count = 0;
    mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentnomore:'没有更多数据了',
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	if(mui.os.plus) {
		mui.plusReady(function() {
			setTimeout(function() {
				mui('#pullrefresh').pullRefresh().pullupLoading();
			}, 0);
		});
	} else {
		mui.ready(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		});
	}
	/*
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			getDebt(record,count);
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
			if (count*3+3 >= record.length) {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
				setTimeout(function() {
					mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
				},3000);
			}
			count++;
		}, 500);
	}

    //监听点击事件动态显示金额
    $('.debt-list').on('tap','label',function() {
        var num = parseFloat($('.select-num').html());
        var debt = parseFloat($('.select-price').html());
        var thisDebt = parseFloat($(this).find('.debt').html());
        if ($(this).find('input').attr('checked') == true) {
            $('.select-num').html(num - 1);
            $('.select-price').html((debt - thisDebt).toFixed(2));
        } else {
            $('.select-num').html(num+1);
            $('.select-price').html((debt + thisDebt).toFixed(2));
        }
    });
})

function initDebtRecord() {
	var car = getCar();
    var record = getDebtData(car);
    return record;
}

function getCar() {
    //测试传值是否成功
    return GetQueryString("carno");
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

function getDebtData(car) {
	var record = null;
	$.ajax({
		url: basePath+'pub/common/parkrec/arrears.do',
		data: {
			plateno: car
		},
		type: 'post',
		async: false, 
		success: function(res) {
			if (res.errno == '200') {
				var data = res.data.records;
		        //进行数据替换模板
		        var len = data.length;
		        if (len == 0) {
		        	$('.debt-list').append('<h3>该车牌号暂无欠费信息<br />请查询其他车牌</h3>');
		        	return;
		        }
		        $('.total-item').html(res.data.count.num);
		        $('.total-price').html((parseFloat(res.data.count.totalArrearAmount)).toFixed(2));
		        $('.foot-info').css('visibility','visible');
		        record = data;
			} else {
				mui.toast(res.errtext);
			}
	    }
	})
	return record;
}

function getDebt(data, count) {
	var htmlStr = '';
	var num = count*3;
	var len = data.length;
	var max = num + 3;
	if (num + 3 >= len) {
		max = len;
	}
    for (var i = num; i < max; i++) {
        var debt = $('#debtTemp').html().replace('{{parkName}}',data[i].parkname)
                                    .replace('{{orderNum}}',data[i].parkinglotno)
                                    .replace('{{carNum}}',data[i].carno)
                                    .replace('{{entrance}}',data[i].intime)
                                    .replace('{{departure}}',data[i].outtime)
                                    .replace('{{debt}}',data[i].arrear)
                                    .replace('{{num}}',num+1)
                                    .replace('{{num}}',num+1)
                                    .replace("{{parkingrecordid}}",data[i].parkingrecordid);
        htmlStr = htmlStr + debt;
    }
    $('.debt-data').append(htmlStr);
}
