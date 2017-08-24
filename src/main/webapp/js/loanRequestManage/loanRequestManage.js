/**
 * Created by dongChen on 2016/9/30.
 */
$(function () {
    /**
     * 搜索按钮
     */
    var $lendRequestManageForm = $('#lendRequestManageForm');
    var $lendRequestManageTable = $('#lendRequestManageTable');
    var WAIT_CONTRACT = 'WAIT_CONTRACT';
    var SIGN_LIST = new Array('WAIT_CONTRACT', 'WAIT_FOR_ELECTRONIC_SIGNATURE', 'WAIT_SIGN', 'PASS_FAILED');
    $('#requestManageSearchBtn').click(function () {
        if (!$lendRequestManageForm.form('validate')) {
            return false;
        }
        var data = $lendRequestManageForm.form('getDataObj');
        data.status = $('#status').combobox('getValues').join(',');
        $lendRequestManageTable.datagrid('load', data);
        $lendRequestManageTable.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#requestManageClearBtn').click(function () {
        $lendRequestManageForm.form('reset');
        $('#status').combobox('clear');
    });


    /**
     * 门店拒贷操作
     */
    $('#storesRejected').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $('<div id="storesRejectedDiv"></div>').dialog({
            title: '门店拒贷',
            width: 580,
            height: 'auto',
            closed: false,
            href: '../../page/loanRequestManage/storesRejected.html',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    callBackHandle('storesRejectedDiv', $rows);
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#storesRejectedDiv');
                }
            }],
            onLoad: function () {
                $.includeFile('#storesRejectedDiv', ['/js/loanRequestManage/storeRejected.js']);
            },
            onClose: function () {
                $.closeDialog('#storesRejectedDiv');
            }
        });
    });

    /**
     * 客户放弃操作
     */
    $('#cancelSign').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $('<div id="cancelSignDiv"></div>').dialog({
            title: '客户放弃',
            width: 580,
            height: 'auto',
            closed: false,
            href: '../../page/loanRequestManage/cancelSign.html',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    callBackHandle('cancelSignDiv', $rows);
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#cancelSignDiv');
                }
            }],
            onLoad: function () {
                $.includeFile('#cancelSignDiv', ['/js/loanRequestManage/cancelSign.js']);
            },
            onClose: function () {
                $.closeDialog('#cancelSignDiv');
            }
        });
    });

    /**
     * 修改客服
     */
    $('#submiterEdit').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $updateLendRequestData.submiterEdit($lendRequestManageTable, $rows[0]);
    });

    /**
     * 打开附件管理
     */
    $('#attachmentSearch').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs('附件管理' + $rows[0].lendRequestId, 'page/loanAttachment/viewAttachmentManager.jsp?loanRequestId='
            + $rows[0].loanRequestId + '&customerName=' + $rows[0].customerName);
    });

    /**
     * 签约操作
     */
    $('#sign').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        if (SIGN_LIST.indexOf($rows[0].lendRequestStatus.key) === -1) {
            $.messager.alert('提示信息', '请选择状态为等待合同,等待申请电子签章,等待签约或者放款失败进行操作！', 'warning');
            return false;
        }

        parent.addTabs('签约' + $rows[0].lendRequestId, 'page/lendRequestManage/sign/lendSign.jsp?lendRequestId=' + $rows[0].lendRequestId + '&videoStatus=' + $rows[0].videoStatus);
    });

    function callBackHandle(selector, rows) {
        if (!$('#' + selector).form('validate')) {
            return false;
        }
        $.messager.progress();
        var $rejectData = $('#' + selector).form('getDataObj');
        $rejectData.lendRequestId = rows[0].lendRequestId;
        $.post('../../lendRequestManage/storeRejectedOrCancelSign/save', $rejectData, function (data) {
            $.messager.progress('close');
            if (data.code === '200') {
                $.messager.alert('提示消息', '操作成功！', 'info');
                $.closeDialog('#' + selector);
                $lendRequestManageTable.datagrid('reload');
                $lendRequestManageTable.datagrid('clearSelections');
            } else {
                $.messager.alert('提示消息', '操作失败,请稍后再试！', 'error');
            }

        })
    }

    $('#reviewResult').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs('审核结果' + $rows[0].lendRequestId, 'page/lendRequestManage/ViewReview.jsp?lendRequestId=' + $rows[0].lendRequestId + '&name=' + $rows[0].customName + '&idNo=' + $rows[0].idNo + '&mobile=' + $rows[0].mobile);
    });
    $('#inputForm').click(function () {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs("查看进件" + $rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + $rows[0].lendRequestId + '&view=true');

    });


    /**
     * 查看客户放弃原因
     */
    $('#viewCancelSign').click(function () {
        viewRejectOrGiveUpReason('查看客户放弃原因');
    });

    $('#rejectOrGiveUpReason').click(function () {
        viewRejectOrGiveUpReason('查看门店拒贷原因');
    });


    function viewRejectOrGiveUpReason(message) {
        var $rows = $lendRequestManageTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $('<div id="rejectOrGiveUpReasonDiv"></div>').dialog({
            title: message,
            width: 680,
            height: 'auto',
            closed: false,
            href: '../../page/lendRequestManage/viewstoresRejected.html',
            modal: true,
            queryParams: {
                'lendRequestId': $rows[0].lendRequestId
            },
            onClose: function () {
                $.closeDialog('#rejectOrGiveUpReasonDiv');
            },
            onLoad: function () {
                $.includeFile('#rejectOrGiveUpReasonDiv', ['/js/lendRequestManage/viewCancelSignAndReject.js']);
            }
        });
    }

});