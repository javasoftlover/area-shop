/**
 * Created by dongChen on 2017/2/21.
 */
$(function () {
    var $obj = $('#infoEditDiv').dialog('options');
    var $lendRequestId = $obj["queryParams"].lendRequestId;
    $.get(basePath + '/systemInteraction/baseInfo/'+$lendRequestId).success(function (data) {
     var $result= data.result;
        $("#oldIdNo").val($result.lendCustomer.idNo);
        $("#oldAuditedTime").datebox("setValue",$result.auditedTime);
        $('#oldLendRequestStatus').combobox("setValue",$result.status);
        $('#oldSubmitTime').datebox("setValue",$result.submitTime);
        $('#oldLendLoanChannelType').combobox("setValue",$result.lendLoanChannelType);
        $('#callCenter').combobox("setValue",$result.callCenter);
        $('#oldRequestVersion').val($result.requestVersion);
    })


});