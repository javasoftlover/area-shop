/**
 * Created by dongchen on 2016/11/4.
 */
$(function () {

    function getRejectShowStatus($value) {
        return ($value === 'FINAL_AUDIT' || $value === 'INIT_AUDIT' || $value === 'DECISION_TCARD' || $value === 'ANTIFRAUD_AUDIT');
    }

    $('#lendReviewTable').datagrid({
        url: basePath + '/lendRequestManage/lendReviews/list',
        pagination: false,
        toolbar: '#lendReviewToolbar',
        columns: [
            [
                {
                    field: 'type',
                    title: '审核类型',
                    hidden: false,
                    width: 140,
                    align: 'center',
                    formatter: function (value, data) {
                        return data.type.value;
                    }
                },
                {
                    field: 'status', title: '审核状态', width: 240, align: 'center', formatter: function (value, data) {
                    return data.status.value;
                }
                },
                {
                    field: 'lendProductName', title: '产品', width: 170, align: 'center'
                },
                {
                    field: 'result', title: '审核结果', width: 240, align: 'center', formatter: function (value, data) {
                    return data.result.value;
                }
                },
                {
                    field: 'monthlyTotalRate', title: '服务费率', width: 140, align: 'center'
                }
                , {
                field: 'amount', title: '批核金额', width: 140, align: 'center', formatter: $.formatMoney
            },
                {
                    field: 'period', title: '批核期限', width: 180, align: 'center'
                },
                {
                    field: 'createTime', title: '创建时间', width: 220, align: 'center', formatter: $.formatDateTime
                }
            ]
        ],
        onBeforeLoad: function (param) {
            var $params = getIframeParams(window.document.location.href);
            var $lendRequestId = $params.lendRequestId;
            $('#lendRequestId').val($lendRequestId);
            $('#name').val(decodeURI($params.name));
            $('#idNo').val($params.idNo);
            $('#mobile').val($params.mobile);
            initData($lendRequestId);
            param.lendRequestId = $lendRequestId;
        },
        onLoadSuccess: function (data) {
            $('#lendReviewTable').datagrid('selectRow', 0);
        },
        onSelect: function (rowIndex, rowData) {
            if (rowData) {
                var $value = rowData.type.key;
                if (getRejectShowStatus($value) && rowData.status.key === 'LEND_REJECTED') {
                    $.get(basePath + "/lendRequestManage/reject/reason/" + rowData.lendRequestId).success(function (data) {
                        $('#rejectedDiv').show();
                        $('#rejectedMemo').textbox('setValue', data.result);
                    });
                } else {
                    $('#rejectedDiv').hide();
                }
                $('#serviceMemo').textbox('setValue', rowData.serviceMemo);
            }
        }
    });

    /**
     * 一次复议
     */
    $('#oneReconSideRationBtn').click(function () {
        oneReconsider('ONE_RECONSIDERTION', '一次复议');
    });

    /**
     * 二次复议
     */
    $('#twoReconsiderationBtn').click(function () {
        oneReconsider('TWO_RECONSIDERTION', '二次复议');
    });

    $('#returnBtn').click(function () {
        $.messager.confirm("提示", "APP进件退至交叉质检,线下进件退至草稿,<br><br>您确定要执行退件再进操作吗？", function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/lendRequestManage/returnRequest/' + $('#lendRequestId').val()).success(function (data) {
                    $.messager.progress('close');
                    if (data.code === '200') {

                        $.messager.alert('提示消息', '退件再进成功！', 'info', function () {
                            window.location.reload();
                        });
                    }
                }).fail(function (error) {
                    $.messager.progress('close');
                    var $responseText = $.parseJSON(error.responseText);
                    console.error($responseText.message);
                    $.messager.alert('提示消息', $responseText.message, 'error');
                });
            }
        });
    });


    /**
     * 核实信息
     */
    $('#verifyInfoBtn').click(function () {
        $('<div id="verifyInfoBtnDiv"></div>').dialog({
            title: '核实信息',
            width: 780,
            height: 'auto',
            closed: false,
            href: basePath + '/page/lendRequestManage/reconsider/verifyInfo.html',
            queryParams: {
                'lendRequestId': $('#lendRequestId').val()
            },
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    var data = $('#verifyInfoForm').serializeObject();
                    //
                    if (data.verificationConclusion === 'true') {
                        if (!data.remark) {
                            return false;
                        }
                    } else {
                        if (!$('#verifyInfoForm').form('validate')) {
                            return false;
                        }
                    }
                    $.messager.progress();
                    var $lendRequestId = $('#lendRequestId').val();
                    data.lendRequestId = $lendRequestId;
                    submitVerifyInfo(JSON.stringify(data), $lendRequestId);
                }
            },
                {
                    text: '取消',
                    handler: function () {
                        $.closeDialog('#verifyInfoBtnDiv');
                    }
                }
            ],
            onLoad: function () {
                $.includeFile('#verifyInfoBtnDiv', ['/js/lendRequestManage/verifyInfo.js']);
            }
            ,
            onClose: function () {
                $.closeDialog('#verifyInfoBtnDiv');
            }
        });
    });


    function oneReconsider(type, msg) {
        $('<div id="oneReconSideRationBtnDiv"></div>').dialog({
            title: msg,
            width: 780,
            height: 'auto',
            closed: false,
            href: basePath + '/page/lendRequestManage/reconsider/reconsider.html',
            queryParams: {
                'lendRequestId': $('#lendRequestId').val(),
                'lendProductId': $('#lendReviewTable').datagrid('getSelections')[0].lendProductId
            },
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    if (!$('#reconsiderForm').form('validate')) {
                        return false;
                    }
                    $.messager.progress();
                    var data = $('#reconsiderForm').serializeObject();
                    data.reconsiderationNumber = type;
                    var $lendRequestId = $('#lendRequestId').val();
                    data.lendRequestId = $lendRequestId;
                    submitReconsider(JSON.stringify(data), $lendRequestId);
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#oneReconSideRationBtnDiv');
                }
            }],
            onLoad: function () {
                $.includeFile('#oneReconSideRationBtnDiv', ['/js/lendRequestManage/reconsider.js']);
            },
            onClose: function () {
                $.closeDialog('#oneReconSideRationBtnDiv');
            }
        });
    }


    function submitReconsider(data, lendRequestId) {
        $.ajax({
            url: basePath + '/lendRequestManage/reconsider',
            data: data,
            contentType: 'application/json;charset=utf-8',
            method: 'POST',
            success: function (data) {
                $.messager.progress('close');
                if (data.code === '200') {
                    $.messager.alert('提示消息', '复议申请成功！', 'info', function () {
                        $.closeDialog('#oneReconSideRationBtnDiv');
                        window.location.reload();
                    });
                } else {
                    $.messager.alert('提示消息', data.message, 'error');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.messager.progress('close');
                $.messager.alert('提示消息', "复议申请失败,请稍后再试!", 'error');
            }
        });
    }


    function submitVerifyInfo(data, lendRequestId) {
        $.ajax({
            url: basePath + '/lendRequestManage/verifyInfo',
            data: data,
            contentType: 'application/json;charset=utf-8',
            method: 'POST',
            success: function (data) {
                $.messager.progress('close');
                $.closeDialog('#verifyInfoBtnDiv');
                if (data.code === '200') {
                    $.messager.alert('提示消息', '核实信息申请成功！', 'info', function () {
                        window.location.reload();
                    });
                } else {
                    $.messager.alert('提示消息', "核实信息失败,请稍后再试!", 'error');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.messager.progress('close');
                $.messager.alert('提示消息', "核实信息失败,请稍后再试!", 'error');
            }
        });
    }

    /**
     * 初始化按钮规则
     */
    function initData(lendRequestId) {
        $.get(basePath + '/lendRequestManage/lendReviews/buttonRule/' + lendRequestId).success(function (data) {
            for (var key in data) {
                if (data[key] === true) {
                    $('#' + key).linkbutton('enable');
                } else {
                    $('#' + key).linkbutton('disable');
                    //解绑click事件
                    $('#' + key).unbind();
                }
            }
        }).fail(function (error) {
            $.messager.progress('close');
            var $data = $.parseJSON(error.responseText);
            console.error($data);
        });
    }


})
;
//@ sourceURL=source.viewReview
