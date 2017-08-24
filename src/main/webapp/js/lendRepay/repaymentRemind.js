$(function(){
	var _lendRequestId = $('#lendRequestIdRemind').val();
	$('#remindTable').datagrid({
		width:750,
		height: 'auto',
		rownumbers:true,
		pagination:true,
		url: basePath+'/lendRepay/findRemarkList?lendRequestId='+_lendRequestId,
		method:'get',
		columns:[[
			{field:'createTime',title:'提醒时间',align:'center',width:50,formatter:$.formatDateTime},
			{field:'staffName',title:'提醒人员',align:'center',width:50},
			{field:'remark',title:'备注',align:'center',formatter: function (value, data, index) {
				return '<span title=&quot;'+data.remark+'&quot; class=&quot;easyui-tooltip&quot;>'+data.remark+'</span>'
			},width:200}
		]]
	});

	$('#remindSubmitBtn').click(function() {
		if($('#remindForm').form('validate')){
			var btn = $('#remindSubmitBtn');
			btn.attr('disabled', true);
			$.messager.progress();
			$('#remindForm').ajaxSubmit({
				url :basePath+'/lendRepay/addRemindRemark',
				dataType : 'json',
				method: 'post',
				success : function(data) {
					$.messager.progress('close');
					if (data.code === "200") {
						$.messager.alert("成功", data.message, "info");
						$('#remindTable').datagrid("reload");
						$('#repayTable').datagrid("reload");
						$.closeDialog('#remindDiv');
					} else {
						$.messager.alert("错误", data.message, "error");
						btn.attr('disabled', false);
					}
				}
			});
		}
	});
	$('#remindCloseBtn').click(function() {
		$("#remindDiv").dialog('close');
	});
});