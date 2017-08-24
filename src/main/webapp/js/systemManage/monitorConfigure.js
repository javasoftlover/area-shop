/**
 * Created by dongChen on 2016/12/13.
 */

$(function () {
    $('#addMonitor').click(function () {
        $('<div id="addMonitorDiv"></div>').dialog({
            title: '添加监控规则',
            width: 1100,
            height: 420,
            closed: false,
            cache: false,
            href: '../../page/systemManage/addMonitorConfig.html',
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
                                $('#monitorTable').datagrid('load');
                                $('#monitorTable').datagrid('clearSelections');
                                $.messager.alert('提示消息', '添加监控配置成功！', 'info');
                            }
                        }
                    });
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#addMonitorDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#addMonitorDiv');
            }
        });

    });


    $('#updateMonitor').click(function () {

        var $rows = $('#monitorTable').datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }

        $('<div id="updateMonitorDiv"></div>').dialog({
            title: '修改监控配置',
            width: 900,
            height: 420,
            closed: false,
            cache: false,
            href: '../../page/systemManage/addMonitorConfig.html',
            modal: true,
            queryParams: {
                'id': $rows[0].id
            },
            buttons: [{
                text: '确定',
                handler: function () {
                    $.messager.progress();
                    $.ajax({
                        url: basePath + '/monitorConfig/monitorConfig',
                        data: JSON.stringify($('#monitorConfigForm').serializeObject()),
                        contentType: 'application/json;charset=utf-8',
                        method: 'POST',
                        success: function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.closeDialog('#updateMonitorDiv');
                                $('#monitorTable').datagrid('load');
                                $('#monitorTable').datagrid('clearSelections');
                                $.messager.alert('提示消息', '监控配置修改成功！', 'info');
                            }
                        }
                    });
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#updateMonitorDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#updateMonitorDiv');
            },
            onLoad: function () {
                $.includeFile('#updateMonitorDiv', ['/js/systemManage/updateMonitorConfigure.js']);
            }
        });

    });


});
