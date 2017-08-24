/**
 * Created by yangzq on 2017/3/21 10:11.
 */

$(function () {

    var _lendRequestId = $('#lendShopRepaidTable').datagrid('getSelections')[0].lendRequestId;

   //获取结清金额及相关信息
    $.get(basePath + '/lendShopRepaid/confirmRepaidContract/' + _lendRequestId).success(function (data) {
        $('#customerName').val(data.customerName);
        $('#idNo').val(data.idNo);
        $('#lendRequestId').val(data.lendRequestId);
        $("#repaidDate").datebox("setValue",data.repaidDate);
        $('#isEarlySettlement').val(data.isEarlySettlement);
        $('#shouldRepayAmount').val(data.shouldRepayAmount);
        $('#contractCode').val(data.contractCode);
        //是否为提前结清减免
        if(data.isEarlySettlement === 1){
            $('#reductionDiv').show();
            $('#reductionDiv1').show();
            $('#reductionAmountDiv').show();
            $('#repaidAmount').val(data.repaidAmount);
            $('#reductionAmount').val(data.reductionAmount);

        }
    });
})
//@ sourceURL=source.confirmLendRepaid