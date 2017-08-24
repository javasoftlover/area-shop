/**
 * Created by dongChen on 2017/5/18.
 */

$(function () {
    var $coreErrorLogTable = $('#coreErrorLogTable');
    $('#charge').click(function () {
        var $rows = $coreErrorLogTable.datagrid('getSelections');
        if ($rows.length=== 0) {
            $.messager.alert('提示信息', '请选择大于等于一条记录！', 'warning');
            return false;
        }
        var ids=new Array();
        $.map($rows, function (row, index) {
            ids.push(row.id);
        });
        var $data={"ids":ids};
        $.messager.confirm('警告', '确定对该数据进行充值操作吗?', function (r) {
            if (r) {
                $.post(basePath + '/systemInteraction/coreErrorLog/recharge',$data).success(function (data) {
                    if (data.code === '200') {
                        $.closeDialog('#coreErrorListDiv');
                        $.messager.alert('提示消息', "批量核心充值成功！", 'info');
                        $coreErrorLogTable.datagrid('load');
                        $coreErrorLogTable.datagrid('clearSelections');
                    } else {
                        $.messager.alert('提示消息', "批量核心充值失败！", 'info');
                    }

                }).fail(function (error) {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', '批量核心充值异常', 'error');
                })
            }
        });
    });


    $('#delete').click(function () {
        var $rows = $coreErrorLogTable.datagrid('getSelections');
        if ($rows.length ===0) {
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
                $.post(basePath + '/systemInteraction/coreErrorLog/delete',$data).success(function (data) {
                    if (data.code === '200') {
                        $.messager.alert('提示消息', "批量未充值删除成功！", 'info');
                    } else {
                        $.messager.alert('提示消息', "批量未充值删除失败！", 'info');
                    }
                    $coreErrorLogTable.datagrid('load');
                    $coreErrorLogTable.datagrid('clearSelections');
                }).fail(function (error) {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', '批量未充值删除异常', 'error');
                })
            }

        });
    });
});

