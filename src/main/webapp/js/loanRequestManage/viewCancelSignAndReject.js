/**
 * Created by DongChen on 2016/12/8.
 */
$(function () {
    var $obj = $('#rejectOrGiveUpReasonDiv').dialog('options');
    var $lendRequestId = $obj["queryParams"].lendRequestId;
    $.get(basePath + '/lendRequestManage/rejectCancel/reason/' + $lendRequestId).success(function (data) {
        $('#reason').textbox('setValue', data.result.strRejectOrGiveUpReason);
        $('#remark').textbox('setValue', data.result.messageOfRejectOrGiveUp);
    });

});

