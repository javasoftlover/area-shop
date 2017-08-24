/**
 * Created by dongChen on 2016/12/13.
 */

$(function () {
    $('#addValidateRule').click(function () {
        $('<div id="addValidateRuleDiv"></div>').dialog({
            title: '添加风险验证规则',
            width: 900,
            height: 420,
            closed: false,
            cache: false,
            href: '../../page/systemManage/addValidateRule.html',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    $.messager.progress();
                    $.ajax({
                        url: basePath + '/validateConfig/lendValidateRule',
                        data: JSON.stringify($('#validateRuleForm').serializeObject()),
                        contentType: 'application/json;charset=utf-8',
                        method: 'POST',
                        success: function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.closeDialog('#addValidateRuleDiv');
                                $('#validateRuleTable').datagrid('load');
                                $('#validateRuleTable').datagrid('clearSelections');
                                $.messager.alert('提示消息', '添加风险验证规则成功！', 'info');
                            }
                        }
                    });
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#addValidateRuleDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#addValidateRuleDiv');
            }
        });

    });


    $('#updateValidateRule').click(function () {

        var $rows = $('#validateRuleTable').datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }

        $('<div id="updateValidateRuleDiv"></div>').dialog({
            title: '修改风险验证规则',
            width: 900,
            height: 420,
            closed: false,
            cache: false,
            href: '../../page/systemManage/addValidateRule.html',
            modal: true,
            queryParams: {
                'id': $rows[0].id
            },
            buttons: [{
                text: '确定',
                handler: function () {
                    $.messager.progress();
                    $.ajax({
                        url: basePath + '/validateConfig/lendValidateRule',
                        data: JSON.stringify($('#validateRuleForm').serializeObject()),
                        contentType: 'application/json;charset=utf-8',
                        method: 'POST',
                        success: function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.closeDialog('#updateValidateRuleDiv');
                                $('#validateRuleTable').datagrid('load');
                                $('#validateRuleTable').datagrid('clearSelections');
                                $.messager.alert('提示消息', '修改风险验证规则成功！', 'info');
                            }
                        }
                    });
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#updateValidateRuleDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#updateValidateRuleDiv');
            },
            onLoad: function () {
                $.includeFile('#updateValidateRuleDiv', ['/js/systemManage/updateValidateRule.js']);
            }
        });

    });

    $('#enable').click(function () {
        var $rows = $('#validateRuleTable').datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '要对该条数据做启用/禁用操作吗?', function (r) {
            if (r) {
                $.get(basePath + '/validateConfig/isEnable/' + $rows[0].id).success(function (data) {
                    $.messager.progress('close');
                    if (data.code === '200') {
                        $.closeDialog('#updateValidateRuleDiv');
                        $('#validateRuleTable').datagrid('load');
                        $('#validateRuleTable').datagrid('clearSelections');
                        $.messager.alert('提示消息', '操作成功！', 'info');
                    }
                })
            }
        });
    })
});
