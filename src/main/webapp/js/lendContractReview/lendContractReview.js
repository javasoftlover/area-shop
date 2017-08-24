/**
 * Created by dongChen on 2016/12/10.
 */
$(function () {
    var $lendContractReviewTable = $('#lendContractReviewTable');
    var $lendContractReviewForm = $('#lendContractReviewForm');


    $('#contractReviewSearchBtn').click(function () {
        var data = $lendContractReviewForm.form('getDataObj');
        $lendContractReviewTable.datagrid('load', data);
        $lendContractReviewTable.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#contractReviewClearBtn').click(function () {
        $lendContractReviewForm.form('reset');
    });

    $('#inputForm').click(function () {
        var $rows = $lendContractReviewTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs("查看进件" + $rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + $rows[0].lendRequestId + '&view=true');

    });


    /**
     * 打开附件管理
     */
    $('#attachmentSearch').click(function () {
        var $rows = $lendContractReviewTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs('附件管理' + $rows[0].lendRequestId, 'page/lendAttachment/viewAttachmentManager.jsp?lendRequestId='
            + $rows[0].lendRequestId + '&customName=' + $rows[0].unCustomName);
    });

    /**
     * 签约合同下载
     */
    $('#downLoadSignPhoto').click(function () {
        var $rows = $lendContractReviewTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定下载已签约合同吗?', function (r) {
            if (r) {
                $.get(basePath + '/lendRequestUpload/lendRequestUploads/' + $rows[0].lendRequestId + '/SIGN_CONTRACT').success(function (data) {
                    if (data.code === '200') {
                        window.location.href = '../../lendRequestUpload/browseAttachment/' + data.result.id + '/download';
                    }
                }).fail(function (rror) {
                    var $responseText = $.parseJSON(error.responseText);
                    console.error($responseText.message);
                    $.messager.alert('提示消息', $responseText.message, 'error');
                })
            }
        })
    });

    /**
     * 签约审核通过
     */
    $('#signAuditingPass').click(function () {
        var $rows = $lendContractReviewTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定对该进件进行审核通过的操作吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/lendContractReview/lendRequests/update/' + $rows[0].lendRequestId + '/SIGN_AUDITING').success(function (data) {
                    if (data.code === '200') {
                        $.messager.progress('close');
                        $.messager.alert('提示', '审核通过成功', 'info');
                        $lendContractReviewTable.datagrid('load');
                        $lendContractReviewTable.datagrid('clearSelections');
                    }
                }).fail(function (error) {
                        $.messager.progress('close');
                        var $data = $.parseJSON(error.responseText);
                        console.error($data);
                        $.messager.alert('提示', $data.message, 'error');
                    }
                )
            }
        })
    });

    /**
     * 驳回重新制作合同
     */
    $('#reCreateContract').click(function () {
        var $rows = $lendContractReviewTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定要对该进件进行重新生成合同操作吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/lendContractReview/reCreateContract/' + $rows[0].lendRequestId).success(function (data) {
                    if (data.code === '200') {
                        $.messager.progress('close');
                        $.messager.alert('提示', '驳回成功！', 'info');
                        $lendContractReviewTable.datagrid('load');
                        $lendContractReviewTable.datagrid('clearSelections');
                    }
                }).fail(function (error) {
                        $.messager.progress('close');
                        var $data = $.parseJSON(error.responseText);
                        console.error($data);
                        $.messager.alert('提示', '驳回失败,请联系管理员！', 'error');
                    }
                )
            }
        })
    })

    /**
     * 签约审核驳回到等待签约
     */
    $('#reUploadSign').click(function () {
        var $rows = $lendContractReviewTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定要对该进件进行重新上传签约合同的操作吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/lendContractReview/lendRequests/update/' + $rows[0].lendRequestId + '/WAIT_SIGN').success(function (data) {
                    if (data.code === '200') {
                        $.messager.progress('close');
                        $.messager.alert('提示', '审核驳回成功', 'info');
                        $lendContractReviewTable.datagrid('load');
                        $lendContractReviewTable.datagrid('clearSelections');
                    }
                }).fail(function (error) {
                        $.messager.progress('close');
                        var $data = $.parseJSON(error.responseText);
                        console.error($data);
                        $.messager.alert('提示', '驳回失败,请联系管理员！', 'error');
                    }
                )
            }
        })
    });

});

