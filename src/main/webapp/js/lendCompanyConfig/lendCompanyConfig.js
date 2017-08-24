/**
 * Created by yangzq on 2017/3/15 11:56.
 */

$(function(){

    /**
     * 初始化变量
     */
    var _grid = $('#lendCompanyConfigTable'),
        _lendCompanyConfigForm = $('#lendCompanyConfigForm');


    /**
     * 搜索按钮
     */
    $('#lendCompanyConfigSearchBtn').click(function () {
        var data = _lendCompanyConfigForm.form('getDataObj');
        _grid.datagrid('load', data);
        _grid.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#lendCompanyConfigClearBtn').click(function () {
        _lendCompanyConfigForm.form('reset');
    });


    //添加合同分成比例
    $('#addLendCompanyConfig').click(function () {

        $('<div id="lendCompanyConfigDiv"></div>').dialog({
            title: '添加合同分成比例',
            width: 700,
            height: 'auto',
            closed: false,
            href: basePath + '/page/lendCompanyConfig/addLendCompanyConfig.jsp',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {

                    if (!$('#addLendCompanyConfigForm').form('validate')) {
                        return;
                    }
                    $.messager.progress();
                    var data = $('#addLendCompanyConfigForm').serializeObject();
                    $.ajax({
                        url: basePath + '/lendCompanyConfig/addLendCompanyConfig',
                        data: JSON.stringify(data),
                        contentType: 'application/json;charset=utf-8',
                        method: 'POST',
                        success: function (data) {
                            $.messager.progress('close');
                            $.closeDialog('#lendCompanyConfigDiv');
                            if (data.code === '200') {
                                $.messager.alert('提示消息', "添加合同分成比例成功!", 'info');
                                _grid.datagrid('load');
                                _grid.datagrid('clearSelections');
                            }else{
                                $.messager.alert('提示消息', data.result, 'warning');
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $.messager.progress('close');
                            $.messager.alert('提示消息',$.parseJSON(XMLHttpRequest.responseText).message, 'warning');
                            console.log($.parseJSON(XMLHttpRequest.responseText));
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
                    $.closeDialog('#lendCompanyConfigDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#lendCompanyConfigDiv');
            }
        });
    });



})