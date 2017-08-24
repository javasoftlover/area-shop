$(function(){
    var _grid = $('#lendRedRechargeTable')

	$('#uploadExcel').tooltip({
		position: 'top',
		content: '<span style="color:#fff;font-family: 新宋体;color: snow">提示：由于数据量大，请勿连续点击按钮。</span>',
		onShow: function () {
			$(this).tooltip('tip').css({backgroundColor: '#666', borderColor: '#666'});
		}
	});

	//定义文件上传组件
	var uploader = $.uploader('uploadExcel', '../../lendRedRecharge/upload/files', function (data) {
		var dataObj = $.parseJSON(data.response);
		if (dataObj.code === "200") {
            $.messager.alert('提示', dataObj.result, 'info');
            _grid.datagrid('load');
            _grid.datagrid('clearSelections');
		} else {
			$.messager.alert("失败", "请求失败，请联系技术人员", "error");
		}
	});
	uploader.bind('BeforeUpload', function (uploader) {
	});
});