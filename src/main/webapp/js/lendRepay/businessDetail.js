/**
 * Created by yangzq on 2017/4/5 21:13.
 */
$(function(){
    var _lendRequestId = $('#lendRequestIdBusinessDetail').val();
    $.ajax({
        url: basePath + '/lendRepay/queryLendRequestBusinessDetail/'+ _lendRequestId ,
        type: "get",
        success: function (data) {
            if(data.code == '200') {
                $('#resultCode').text(data.result);
            }

        },
        onLoadError: function (data) {
            var $data = $.parseJSON(data.responseText);
            $.messager.alert('提示消息', $data.message, 'warning');
        }
    });

})