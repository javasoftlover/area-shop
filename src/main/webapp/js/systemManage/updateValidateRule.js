/**
 * Created by dongChen on 2016/12/13.
 */

$(function () {
    var $obj = $('#updateValidateRuleDiv').dialog('options');
    var $id = $obj["queryParams"].id;
    $('#id').val($id);
    $.get(basePath + '/validateConfig/lendValidateRule/' + $id).success(function (data) {
        if (data.code === '200') {
            $('#validateRuleForm').form('load', data.result);
            $('#validateCache').combobox('setValue', data.result.validateCache.toString());
            $('#validateBlacklist').combobox('setValue', data.result.validateBlacklist.toString());
            $('#validateThirdblack').combobox('setValue', data.result.validateThirdblack.toString());
            $('#validateTongdun').combobox('setValue', data.result.validateTongdun.toString());
            $('#validateGiveup').combobox('setValue', data.result.validateGiveup.toString());
            $('#validateReject').combobox('setValue', data.result.validateReject.toString());
            $('#validateLoanCar').combobox('setValue', data.result.validateLoanCar.toString());
            $('#validateLessthan60Reject').combobox('setValue', data.result.validateLessthan60Reject.toString());
            $('#validateIsexist').combobox('setValue', data.result.validateIsexist.toString());
            $('#validateEmail').combobox('setValue', data.result.validateEmail.toString());
        }
    })
});
