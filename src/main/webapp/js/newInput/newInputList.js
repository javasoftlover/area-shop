$(function () {// NOSONAR
    var _grid = $('#lendRequestTable');
    $('#lendRequestSearchBtn').click(function() {
        var $lendRequestSearchForm = $('#lendRequestSearchForm');
        var valid = $lendRequestSearchForm.form('validate');
        if (!valid)return;
        var data = $lendRequestSearchForm.form('getDataObj');
        $('#lendRequestTable').datagrid('load', data);
    });
    $('#lendRequestClearBtn').click(function () {
        $('#lendRequestSearchForm').form("reset");
        $('#lendRequestTable').datagrid('load',{});
        $('#secondChannel').combobox({
	        required: false,
	        url: '../../channel/option/two'
	    });
    });
    $('#addInput').click(function() {
    	parent.addTabs("添加进件", "page/newInput/riskJudgment.jsp");
    });
    $('#chanceType').combobox({
    	onChange: function (newVal,oldVal){
    		$('#secondChannel').combobox({
    	        required: false,
    	        url: '../../channel/option/'+newVal
    	    });
    	}
    });

    $('#attachmentUpload').click(function () {
        var _rows = _grid.datagrid('getSelections');
        if(_rows.length===0 || _rows.length > 1){
            $.messager.alert('提示消息', '请选择一条记录!','warning');
            return;
        }
        parent.addTabs('附件管理' + _rows[0].lendRequestId, 'page/lendAttachment/LendAttachmentManager.jsp?lendRequestId='
            + _rows[0].lendRequestId + '&customName=' + _rows[0].realName + '&productCode=' + _rows[0].productCode + "&lendSoFundType=" + _rows[0].lendSoFundType);
    });

    $('#inputDelete').click(function() {
        var rows = _grid.datagrid('getSelections');
        if(rows.length===0){
            $.messager.alert('提示消息', '请选择要删除的记录!','warning');
            return;
        }
        $.messager.confirm('警告', '确定要删除吗?',function(r){
            $.messager.progress();
            if (!r) {
                $.messager.progress('close');
            }else{
                $.ajax({
                    url : basePath + '/lendRequest/del',
                    cache : false,
                    type : 'GET',
                    dataType : "json",
                    data : {id : rows[0].lendRequestId},
                    success : function(data) {
                        $.messager.progress('close');
                        if (data.code === '200') {
                            $.messager.alert('提示信息', '删除成功！', 'info');
                            _grid.datagrid('clearSelections');
                            _grid.datagrid("reload");
                        } else {
                            _grid.datagrid('clearSelections');
                            _grid.datagrid("reload");
                            $.messager.alert('提示信息', '删除失败！', 'info');
                        }
                    }
                });
            }
        });

    });
    $('#submitAudit').click(function() {
        var rows = _grid.datagrid('getSelections');
        if(rows.length===0){
            $.messager.alert('提示消息', '请选择要提交的记录!','warning');
            return;
        }
        $.messager.confirm('警告', '确定要提交审核吗?',function(r){
            $.messager.progress();
            if (!r) {
                $.messager.progress('close');
            }else{
                $.ajax({
                    url : basePath + '/lendRequest/submitAudit',
                    cache : false,
                    type : 'GET',
                    dataType : "json",
                    data : {lendRequestId : rows[0].lendRequestId},
                    success : function(data) {
                        $.messager.progress('close');
                        if (data.code === '200') {
                            _grid.datagrid('clearSelections');
                            _grid.datagrid("reload");
                            $.messager.alert('提示信息', data.message, 'info');
                        } else {
                            _grid.datagrid('clearSelections');
                            _grid.datagrid("reload");
                            $.messager.alert('提示信息', data.message, 'warning');
                        }
                    }
                });
            }
        });
    });

    $('#inputUpdate').click(function() {
        var rows = _grid.datagrid('getSelections');
        if(rows.length===0 || rows.length > 1){
            $.messager.alert('提示消息', '请选择要修改的记录!','warning');
            return;
        }
        parent.addTabs("修改进件" + rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + rows[0].lendRequestId + '&status=DRAFT' + '&sourceTitle=' + '新增进件');
    });
    $('#inputSelect').click(function() {
        var rows = _grid.datagrid('getSelections');
        if(rows.length===0 || rows.length > 1){
            $.messager.alert('提示消息', '请选择要查看的记录!','warning');
            return;
        }
        parent.addTabs("查看进件" + rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + rows[0].lendRequestId + '&view=true');
    });
});