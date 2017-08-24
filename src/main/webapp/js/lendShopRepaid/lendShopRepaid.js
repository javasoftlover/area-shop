/**
 * Created by yangzq on 2017/3/15 11:56.
 */

$(function(){

    /**
     * 初始化变量
     */
    var _grid = $('#lendShopRepaidTable'),
        _lendShopRepaidForm = $('#lendShopRepaidForm');


    /**
     * 搜索按钮
     */
    $('#lendShopRepaidSearchBtn').click(function () {
        var data = _lendShopRepaidForm.form('getDataObj');
        _grid.datagrid('load', data);
        _grid.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#lendShopRepaidClearBtn').click(function () {
        _lendShopRepaidForm.form('reset');
    });

    /**
     * 申请 结清
     */
    $('#lendRepaidApply').click(function () {
        var $rows = _grid.datagrid('getSelections');

        if ($rows[0].audStatus) {
            $.messager.alert('提示信息', '该进件不符合申请结清操作！', 'error');
            return false;
        }
        var confirm = '客户姓名为:'+$rows[0].customerName+',进件号为:'+$rows[0].lendRequestId+',身份证号为:'+$rows[0].idNo+'.您确定对该进件进行申请操作吗?';
        $.messager.confirm('警告',confirm , function (r) {
            if (r) {
                $.messager.progress();
                var $params = {'lendRequestId': $rows[0].lendRequestId};
                $.post(basePath + '/lendShopRepaid/lendShopRepaidApply', $params).success(function (data) {
                    $.messager.progress('close');
                    if (data.code === '200') {
                        $.messager.alert('提示', "申请结清成功！", 'info');
                        _grid.datagrid('load');
                        _grid.datagrid('clearSelections');
                    } else {
                        $.messager.alert('提示', data.result, 'error');
                    }
                }).fail(function (data) {
                    $.messager.progress('close');
                    var $data = $.parseJSON(data.responseText);
                    $.messager.alert('提示', $data.message, 'error');
                })
            }
        })
    });

    //结清证明 资料确认
    $('#confirmLendRepaid').click(function () {
        var $rows = _grid.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        if (!$rows[0].audStatus || !$rows[0].audStatus.key==='AUDITED') {
            $.messager.alert('提示信息', '该进件不能进行资料确认！', 'error');
            return false;
        }
        $('<div id="confirmLendRepaidDiv"></div>').dialog({
            title: '资料确认',
            width: 680,
            height: 'auto',
            closed: false,
            href: basePath + '/page/lendShopRepaid/confirmLendShopRepaid.html',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {

                    if (!$('#confirmLendShopRepaidForm').form('validate')) {
                        return;
                    }
                    $.messager.progress();
                    var data = $('#confirmLendShopRepaidForm').serializeObject();
                    $.ajax({
                        url: basePath + '/lendShopRepaid/confirmLendShopRepaid',
                        data: JSON.stringify(data),
                        contentType: 'application/json;charset=utf-8',
                        method: 'POST',
                        success: function (data) {
                            $.messager.progress('close');
                            $.closeDialog('#confirmLendRepaidDiv');
                            if (data.code === '200') {
                                $.messager.alert('提示消息', "资料确认成功!", 'info');
                                _grid.datagrid('load');
                                _grid.datagrid('clearSelections');
                            }else{
                                $.messager.alert('提示消息', data.result, 'warning');
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $.messager.progress('close');
                            $.messager.alert('提示消息',$.parseJSON(XMLHttpRequest.responseText).message, 'warning');
                        },
                        onLoadError: function (data) {
                            $.messager.progress('close');
                            $.messager.alert('提示消息', data.result, 'warning');
                        }
                    });

                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#confirmLendRepaidDiv');
                }
            }],
            onLoad: function () {
                $.includeFile('#confirmLendRepaidDiv', ['/js/lendShopRepaid/confirmLendRepaid.js']);
            },
            onClose: function () {
                $.closeDialog('#confirmLendRepaidDiv');
            }
        });
    });


    //预览打印
    $('#viewAndPrints').click(function () {
        var $rows = _grid.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }

        if (!$rows[0].audStatus || $rows[0].audStatus.key != 'AUDITED') {
            $.messager.alert('提示信息', '该进件不符合预览打印合同的规则！', 'error');
            return false;
        }
        $.get(basePath + '/lendShopRepaid/repaidContract/' + $rows[0].lendRequestId).success(function (data) {
           parent.addTabs(data.lendRequestId + data.contractTemplate.displayName, 'page/lendShopRepaid/viewContract.html?lendRequestId=' + data.lendRequestId + '&fileName=' + data.contractTemplate.name);

        }).fail(function (data) {
            $.messager.progress('close');
            var $data = $.parseJSON(data.responseText);
            $.messager.alert('提示', $data.message, 'error');
        });


    });

})