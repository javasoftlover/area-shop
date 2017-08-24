/**
 * Created by dongChen on 2016/11/28.
 */
$(function () {
    var $obj = $('#verifyInfoBtnDiv').dialog('options');
    var $lendRequestId = $obj["queryParams"].lendRequestId;
    $.get(basePath + '/lendRequestManage/finalTrial/' + $lendRequestId).success(function (data) {
        $('#remarks').val(data.result);
    });

    $('#rejectOrGiveUpReasonMaster').combobox({
        required: true,
        url: '../../lendRequestManage/storeRejected/0',
        prompt: '请选择主原因',
        onSelect: function (record) {

            loadNextData(record.value, 'rejectOrGiveUpReasonSub');
        }
    });


    $('#rejectOrGiveUpReasonSub').combobox({
        prompt: '请选择子原因',
        onSelect: function (record) {
            loadNextData(record.value, 'rejectOrGiveUpReasonThird');
        }
    });





    function loadNextData(value, id) {
        $.get('../../lendRequestManage/storeRejected/' + value, function (data) {
            var $isRequired = data.length > 0 ? true : false;
            $('#' + id).combobox({required: $isRequired});
            $('#' + id).combobox('loadData', data);
        })
    }

    $('#verificationConclusion').combobox({
        required: true,
        width: 160,
        panelHeight: 40,
        url: basePath + '/dictionary/option/49',
        prompt: '核实结论',
        onSelect: function (record) {
            if (record.value === 'false') {
                $('#rejectOrGiveUpReasonMasterDiv').show();
                $('#rejectOrGiveUpReasonSubDiv').show();
                $('#rejectOrGiveUpReasonThirdDiv').show();
            } else {
                $('#rejectOrGiveUpReasonMasterDiv').hide();
                $('#rejectOrGiveUpReasonSubDiv').hide();
                $('#rejectOrGiveUpReasonThirdDiv').hide();
            }
        }
    });
});
