/**
 * Created by Puhui on 2016/9/7.
 */
$(function () {
    /**
     * 初始化变量
     */
    var _grid = $('#lendexamineTable'),
        _lendExamineForm = $('#lendManagerExamineForm');

    /**
     * 搜索按钮
     */
    $('#lendManagerExamineSearchBtn').click(function () {
        var data = _lendExamineForm.form('getDataObj');
        _grid.datagrid('load', data);
        _grid.datagrid('clearSelections');
    });
    
    $('#channelType').combobox({
    	onChange: function (newVal,oldVal){
    		$('#secondChannel').combobox({
    	        required: false,
    	        url: '../../channel/option/'+newVal
    	    });
    	}
    });

    /**
     * 重置
     */
    $('#lendManagerExamineClearBtn').click(function () {
        _lendExamineForm.form('reset');
        $('#secondChannel').combobox({
	        required: false,
	        url: '../../channel/option/two'
	    });
    });
    /**
     * 查看进件
     */
    $('#lendRequestSearch').click(function () {
        var _rows = _grid.datagrid('getSelections');
        if (_rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs("查看进件" + _rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + _rows[0].lendRequestId + '&view=true');
    });

    /**
     * 团队经理审核通过
     */
    $('#teamManagerPass').click(function () {
        var _rows = _grid.datagrid('getSelections');
        if (_rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定对该进件进行通过操作吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(
                    basePath + '/lendManagerExamine/examine/teamManger/' + _rows[0].lendRequestId,
                    function (data) {
                        $.messager.progress("close");
                        if (data.code === '200') {
                            $.messager.alert('提示消息', '团队经理质检成功！', 'info');
                            _grid.datagrid('clearSelections');
                            _grid.datagrid("reload");
                        } else {
                            $.messager.alert('提示消息', data.result, 'error');
                        }
                    }
                );
            }
        })
    });

    /**
     * 打开附件管理
     */
    $('#viewAttachment').click(function () {
        var _rows = _grid.datagrid('getSelections');
        if (_rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs('附件管理' + _rows[0].lendRequestId, 'page/lendAttachment/viewAttachmentManager.jsp?lendRequestId='
            + _rows[0].lendRequestId + '&customName=' + _rows[0].customName + '&productCode=' + _rows[0].productCode + "&lendSoFundType=" + _rows[0].lendSoFundType);
    });
});

//@ sourceURL=source.lendManageExamine