(function($) {
    $(function() {
        $("#videoSign").click(function(e) {
        	/**
        	 * 判断客服是否填写了银行流水的电话
        	 * 如果没有填写，直接return;
        	 */
        	var lendRequestId = $('#lendRequestId').val();
        	if(lendRequestId === null || lendRequestId === ''){
        		 $.messager.alert('提示消息', '进件编号不能为空！','info');
                 return;
        	}
            $.get(basePath+'/lendVideoSign/bankPhone/queryByLendRequestId/' + lendRequestId).success(function (data) {
                if (data!==null && data.bankPhone !== null && data.bankPhone !== undefined && data.bankPhone !== '') {
                	if(data.lendVideoStatus === null || !(data.lendVideoStatus ==='WAIT_VIDEO_SIGN' || data.lendVideoStatus === 'VIDEO_SIGN')){
                		 $.messager.alert('提示消息', '只有视频签约中或者等待视频签约状态才可以获取频道号！','info');
                         return;
                	}
                	var tmpChannel =  $('#appLendRequestId').val();
                    if (tmpChannel !== null && tmpChannel !== undefined && tmpChannel !== ''){
                        //根据tmpChannel获取频道号
                    	setChannelNumber(tmpChannel);
                    } else {
                        $.messager.alert('提示消息', '不是app进件！','warning');
                        return;
                    }
                }else{
                	$.messager.alert('提示', '银行流水电话未填写，请先填写银行流水电话信息', 'info');
                	return;
                }
            }).fail(function (error) {
                $.messager.alert('提示', '获取银行流水电话失败！', 'error');
                return;
            });
        });
    });
    
    function setChannelNumber(tmpChannel){
    	$.get(basePath+'/lendVideoSign/getChannelNumber/' + tmpChannel).success(function (data) {
            $("#channelNum").html(data);
            $("#channelNum").show();
            $("#channel_ok").show();
        }).fail(function (error) {
            $.messager.alert('提示', '获取频道号失败！', 'error');
            return;
        });
    }
}(jQuery));