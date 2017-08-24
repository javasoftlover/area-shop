$(function () {

    $("#lendRequestId").next("span").children().first().keyup(function () {
        var val = $("#lendRequestId").next("span").children().first().val();
        if (val) {
            $('#billDateDiv').hide();
        } else if (!val && !$('#customerName').val() && !$('#idNo').val()) {
            $('#billDateDiv').show();
        }
    });

    $('#customerName').keyup(function () {
        if ($('#customerName').val()) {
            $('#billDateDiv').hide();
        } else if (!$("#lendRequestId").numberbox('getValue') && !$('#customerName').val() && !$('#idNo').val()) {
            $('#billDateDiv').show();
        }
    });

    $('#idNo').keyup(function () {
        if ($('#idNo').val()) {
            $('#billDateDiv').hide();
        } else if (!$("#lendRequestId").numberbox('getValue') && !$('#customerName').val() && !$('#idNo').val()) {
            $('#billDateDiv').show();
        }
    });

// 初始化账单日默认当天
    $("#billDate").datebox("setValue", $.formatDate(new Date()));

    $('#lendRepaymentType').combobox({
        required: true,
        url: '../../dictionary/option/38',
        onLoadSuccess: function () {
            $('#lendRepaymentType').combobox('setValue', 'UNREPAID');
            loadDatagrid();
        }
    });

    function loadDatagrid() {
        $('#repayTable').datagrid({
            url: basePath + '/lendRepay/list',
            toolbar: '#repayToolbar',
            fitColumns: true,
            queryParams: {
                billDate: DateUtil.format(new Date(), 'yyyy-MM-dd'),
                lendRepaymentType: $('#lendRepaymentType').combobox('getValue')
            },
            columns: [
                [

                    {
                        field: 'lendRequestId', title: '进件编号', width: 100, align: 'center'
                    },
                    {
                        field: 'encryptCustomName', title: '姓名', width: 90, align: 'center'
                    },
                    {
                        field: 'loanPeriod', title: '期限', width: 80, align: 'center'
                    },
                    {
                        field: 'phase', title: '当前期数', width: 100, align: 'center'
                    }
                    , {
                    field: 'billDate', title: '账单日', width: 140, align: 'center'
                },
                    {
                        field: 'amount', title: '月还款额', width: 180, align: 'center', formatter: $.formatMoney
                    },
                    {
                        field: 'customerAmount', title: '账户余额', width: 100, align: 'center', formatter: $.formatMoney
                    },
                    {
                        field: 'activityAmount', title: '红包余额', width: 100, align: 'center', formatter: $.formatMoney
                    },
                    {
                        field: 'payType',
                        title: '申请还款方式',
                        width: 150,
                        align: 'center',
                        formatter: function (value, data) {
                            var payType = data.payType;
                            if (payType) {
                                return payType.value;
                            }
                            return null;
                        }
                    },
                    {
                        field: 'repayRequestStatus',
                        title: '汇款状态',
                        width: 140,
                        align: 'center',
                        formatter: function (value, data) {
                            var repayRequestStatus = data.repayRequestStatus;
                            if (repayRequestStatus) {
                                return repayRequestStatus.value;
                            }
                            return null;
                        }
                    }, {
                    field: 'lendRepaymentType',
                    title: '还款状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value, data) {
                        var lendRepaymentType = data.lendRepaymentType;
                        if (lendRepaymentType) {
                            return lendRepaymentType.value;
                        }
                        return null;
                    }
                },
                    {
                        field: 'recharge',
                        title: '充值状态',
                        width: 100,
                        align: 'center',
                        formatter: function (value, data) {
                            var recharge = data.recharge;
                            if (recharge) {
                                return recharge.value;
                            }
                            return null;
                        }
                    },
                    {
                        field: 'lendRepaidType',
                        title: '申请还款类型',
                        width: 140,
                        align: 'center',
                        formatter: function (value, data) {
                            var lendRepaidType = data.lendRepaidType;
                            if (lendRepaidType) {
                                return lendRepaidType.value;
                            }
                        }
                    },
                    {
                        field: 'remainedType',
                        title: '提醒状态',
                        width: 100,
                        align: 'center',
                        formatter: function (value, data) {
                            var remainedType = data.remainedType;
                            if (remainedType) {
                                return remainedType.value;
                            }
                        }
                    },
                    {
                        field: 'shopName', title: '门店', width: 200, align: 'center'
                    },
                    {
                        field: 'groupName', title: '团队', width: 100, align: 'center'
                    },
                    {
                        field: 'sellerName', title: '销售', width: 100, align: 'center'
                    },
                    {
                        field: 'submitName', title: '客服', width: 100, align: 'center'
                    }
                ]
            ]

        });
    }


    $('#sampleSearchBtn').click(function () {
        var $sampleSearchForm = $('#sampleSearchForm');
        var valid = $sampleSearchForm.form('validate');
        if (!valid)return;
        var data = $('#sampleSearchForm').form('getDataObj');
        $('#repayTable').datagrid('load', data);
    });
    $('#sampleClearBtn').click(function () {
        $('#billDateDiv').show();
        $('#sampleSearchForm').form("reset");
        $("#billDate").datebox("setValue", $.formatDate(new Date()));
        $('#lendRepaymentType').combobox('setValue', 'UNREPAID');
    });


// 查看详情按钮
    $('#repayDetail').click(function () {
        var rows = $('#repayTable').datagrid('getSelections');
        if (rows.length === 0 || rows.length > 1) {
            $.messager.alert('提示消息', '请选择要查看的记录!', 'warning');
            return;
        }
        var lendRequestId = rows[0].lendRequestId;
        var firstBillDate = $.formatDate(rows[0].firstBillDate);
        parent.addTabs("还款详情" + rows[0].lendRequestId, "page/lendRepay/repayDetail.jsp?id=" + lendRequestId + "&firstBillDate=" + firstBillDate);
    });

// 查看进件按钮
    $('#checkReview').click(function () {
        var rows = $('#repayTable').datagrid('getSelections');
        if (rows.length !== 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs("查看进件" + rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + rows[0].lendRequestId + '&view=true');
    });

// 申请还款按钮
    $('#applyRepay').click(function () {
        var _rows = $('#repayTable').datagrid('getSelections');
        if (_rows.length !== 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }


        if (_rows[0].lendRepaymentType.key === 'REPAID' || _rows[0].status.key==='OVER_DUE') {
            $.messager.alert('提示信息', '请选择未偿还进行还款申请！', 'warning');
            return false;
        }

     if(!checkStatus(_rows[0].lendRepayRecordId)){
    return false;
     }


        $('<div id="applyDiv"></div>').dialog({
            title: '申请还款',
            width: 800,
            height: 'auto',
            closed: false,
            cache: false,
            href: basePath + '/page/lendRepay/repaymentApply.jsp',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    if ($('#applyForm').form('validate')) {
                        $.messager.progress();
                        var $obj = $('#applyForm').form('getDataObj');

                        $obj.accountAmount=DecimalUtil.parse($('#accountAmount').val());
                        $.post(basePath + '/lendRepay/apply', $obj, function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.messager.alert('提示消息', '申请还款成功！', 'info');
                                $("#applyDiv").dialog('close');
                                $("#repayTable").datagrid("reload");
                                $("#repayTable").datagrid('clearSelections');
                            } else {
                                $.messager.alert('提示消息', data.message, 'error');
                            }

                        }).fail(function (error) {
                            $.messager.progress('close');
                            var $responseText = $.parseJSON(error.responseText);
                            $.messager.alert('提示消息', $responseText.message, 'error');
                        })
                    }
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#applyDiv');
                }
            }],
            onLoad: function () {
                $('#repayLendRequestId').val(_rows[0].lendRequestId);
                $('#repayLendRepayRecordId').val(_rows[0].lendRepayRecordId);
                $('#repaybillDate').val(_rows[0].billDate);
                $('#repayPhase').val(_rows[0].phase);

                $.includeFile("#applyDiv", ['/js/lendRepay/repaymentApply.js']);
            },
            onClose: function () {
                $.closeDialog('#applyDiv');
            }
        });
    });


    function checkStatus(lendRepayRecordId) {
        var repaid = true;
        $.ajax({
            url: basePath + '/lendRepay/checkRepayStatus/' + lendRepayRecordId,
            method: 'get',
            async: false,
            success: function (data) {
                if (data.code === '200') {
                    repaid = data.result;
                    if (!repaid) {
                        $.messager.alert('提示信息', '该客户已经还款成功，请稍后刷新查看还款状态！', 'warning');
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.messager.progress('close');
                $.messager.alert('提示信息', XMLHttpRequest.responseText);
            }
        });
        return repaid;
    }

// 提醒还款按钮
    $('#seeRemindNote').click(function () {
        var _rows = $('#repayTable').datagrid('getSelections');
        if (_rows.length !== 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $('<div id="remindDiv"></div>').dialog({
            title: '提醒还款',
            width: 800,
            height: 'auto',
            closed: false,
            cache: false,
            href: basePath + '/page/lendRepay/repaymentRemind.jsp',
            modal: true,
            onLoad: function () {
                $('#lendRequestIdRemind').val(_rows[0].lendRequestId);
                $('#phaseRemind').val(_rows[0].phase);
                $.includeFile("#remindDiv", ['/js/lendRepay/repaymentRemind.js']);
            },
            onClose: function () {
                $.closeDialog('#remindDiv');
            }
        });
    });

// 提前结清减免按钮
    $('#inRepayForReduction').click(function () {
        var _rows = $('#repayTable').datagrid('getSelections');
        if (_rows.length !== 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('提前结清减免', '此进件信息会推送到贷后系统,请在贷后系统中进行提前结清减免的申请操作!是否确认操作？', function (r) {
            if (r) {
                $.messager.progress();
                $.ajax({
                    url: basePath + '/lendRepay/inRepayForReduction',
                    method: 'post',
                    data: {lendRequestId: _rows[0].lendRequestId},
                    success: function (data) {
                        $.messager.progress('close');
                        if (data.code === "200") {
                            $.messager.alert("成功", "提前结清减免申请成功！", "info");
                            $('#repayTable').datagrid("reload");
                            $('#repayTable').datagrid('clearSelections');
                        } else {
                            $.messager.alert("错误", data.message, "error");
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.messager.progress('close');
                        $.messager.alert('提示信息', XMLHttpRequest.responseText);
                    }
                });
            }
        });
    });


    $('#businessDetail').click(function () {
        var _rows = $('#repayTable').datagrid('getSelections');

        if (_rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $('<div id="businessDetailDiv"></div>').dialog({
            title: '划扣详情',
            width: 580,
            height: 300,
            closed: false,
            href: '../../page/lendRepay/queryBusinessDetail.html',
            modal: true,
            onLoad: function () {
                $('#lendRequestIdBusinessDetail').val(_rows[0].lendRequestId);

                $('#lendRepayRecordIdBusinessDetail').val(_rows[0].lendRepayRecordId);
                $.includeFile("#businessDetailDiv", ['/js/lendRepay/businessDetail.js']);
            },
            onClose: function () {
                $.closeDialog('#businessDetailDiv');
            }
        });
    });
})
;
//@ sourceURL=source.repay