/**
 * Created by dongChen on 2017/5/18.
 */

$(function () {
    var $settlementErrorLogTable = $('#settlementErrorLogTable');
    $('#deduct').click(function () {
        var $rows = $settlementErrorLogTable.datagrid('getSelections');
        if ($rows.length === 0) {
            $.messager.alert('提示信息', '请选择大于等于一条记录！', 'warning');
            return false;
        }
        var ids=new Array();
        $.map($rows, function (row, index) {
            ids.push(row.id);
        });
        var $data={"ids":ids};
        $.messager.confirm('警告', '确定对该数据进行划扣通知操作吗?', function (r) {
            if (r) {
                $.post(basePath + '/systemInteraction/settlementErrorLog/deduct',$data).success(function (data) {
                    if (data.code === '200') {
                        $.closeDialog('#coreErrorListDiv');
                        $.messager.alert('提示消息', "批量划扣通知已发送,稍等查询结果！", 'info');
                        $settlementErrorLogTable.datagrid('load');
                        $settlementErrorLogTable.datagrid('clearSelections');
                    } else {
                        $.messager.alert('提示消息', "批量划扣通知失败！", 'info');
                    }

                }).fail(function (error) {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', '批量划扣通知异常', 'error');
                })
            }
        });
    });


    $('#deleteSettlement').click(function () {
        var $rows = $settlementErrorLogTable.datagrid('getSelections');
        if ($rows.length === 0) {
            $.messager.alert('提示信息', '请选择大于等于一条记录！', 'warning');
            return false;
        }
        var ids=new Array();
        $.map($rows, function (row, index) {
            ids.push(row.id);
        });
        var $data={"ids":ids};
        $.messager.confirm('警告', '确定对该数据进行删除操作吗?', function (r) {
            if (r) {
                $.post(basePath + '/systemInteraction/settlementErrorLog/delete',$data).success(function (data) {
                    if (data.code === '200') {
                        $.messager.alert('提示消息', "批量划扣通知删除成功！", 'info');
                    } else {
                        $.messager.alert('提示消息', "批量划扣通知删除失败！", 'info');
                    }
                    $settlementErrorLogTable.datagrid('load');
                    $settlementErrorLogTable.datagrid('clearSelections');
                }).fail(function (error) {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', '批量划扣删除异常', 'error');
                })
            }

        });
    });
});

