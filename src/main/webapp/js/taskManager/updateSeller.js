$(function () {
    $('#updateCloseBtn').click(function () {
    	$.closeDialog('#updateSellerDiv');
    });

    $('#updateSellerSubmit').click(function () {
        var $updateSeller = $('#updateSeller');
        if (!$updateSeller.form('validate')) {
            $.messager.alert('提示消息', '请将所有项填完提交。', 'info');
            return false;
        }
        var data = $updateSeller.form('getDataObj');
        $.post(basePath + '/userManager/updateSeller', data)
            .success(function (data) {
                $.messager.alert('提示消息', data.result, 'info',function () {
                    $("#updateSellerDiv").dialog('close');
                });
            })
            .error(function (data) {
                var $responseText = $.parseJSON(data.responseText);
                $.messager.alert('提示消息', $responseText.message, 'error',function () {
                    $("#updateSellerDiv").dialog('close');
                });
            });
    });

});