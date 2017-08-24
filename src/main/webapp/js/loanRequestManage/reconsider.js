/**
 * Created by dongChen on 2016/11/23.
 */

$(function () {
    var $obj = $('#oneReconSideRationBtnDiv').dialog('options');
    var $id = $obj["queryParams"].lendRequestId;
    var $lendProductId = $obj["queryParams"].lendProductId;
    $('#reconsiderType').combobox({
        required: true,
        url: basePath + '/lendRequestManage/reconsiderationType/' + $id,
        prompt: '复议类型',
        onSelect: function (record) {
            if (record.value === 'PERIOD_CHANGE') {
                $('#periodDiv').show();
                $('#amountDiv').hide();
                $('#amount').numberbox({required:false});
                getPeriod($lendProductId);
            } else if (record.value === 'ADD_AMOUNT') {
                $('#periodDiv').hide();
                $('#amountDiv').show();
                $('#amount').numberbox({required:true});
            }
        }
    });

    function getPeriod(id) {
        $('#period').combobox({
            required: true,
            url: basePath + '/lendRequestManage/periods/' + id,
            prompt: '复议申请期数'
        });
    }
});
