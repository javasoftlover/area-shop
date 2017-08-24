// 银行卡变更
$(function () {

    $('#updateRecordTable').datagrid({
        url: basePath+'/bankCardChange/updateRecord/list?lendRequestId='+$('#lendRequestId').val(),
        method:'get',
        fixed:true

    });
});
//@ sourceURL=source.updateRecord