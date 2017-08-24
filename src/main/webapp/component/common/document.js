$.extend({
	// 文件下载
	download : function(url, data, method) {
		if (url && data) {
			// 把参数组装成 form的 input
			var inputs = '';
			$.each(data, function(name, value) {
				inputs += '<input type="hidden" name="' + name + '" value="' + value + '" />';
			});
			// request发送请求
			$('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body').submit().remove();
		}
	},
	// 预览文件
	viewFile: function (filePath){
		if (filePath) {
			$.closeDialog('previewWindow');
				$('<div id="previewWindow"></div>').dialog({
					title : '文件预览',
					content : '<iframe scrolling="auto" frameborder="0"  src="'+filePath+'" style="width:100%;height:95%;"></iframe>',
					width : 1000,
					draggable : true,
					height : 700,
					top : 70,
					onClose : function() {
						$.closeDialog('#previewWindow');
					}
				});
		} else {
			$.messager.alert('提示', '文件不存在');
		}
	},
	// 在当前页面中预览pdf文件
	previewPdfFileInCurPage: function(iframeId,fileId) {
		if(fileId) {
			var url = top.location.href.substring(0, top.location.href.lastIndexOf("/"))+"/file/getPDFfile.json?id=" + fileId;
			$(iframeId).attr("src",url);
		} else {
			$.messager.alert('提示', '文件不存在');
		}
	},
	// 上传文件
	uploader : function(buttonId, url, callBack) {
		var _title = document.title;
		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash,browserplus',
			browse_button : buttonId,
			url : url,
			container : 'container_' + buttonId,

			unique_names : true,
			filters :{  mime_types :[{title:'所有',extensions:'htm,html,pdf,png,jpg,xlsx,xls,txt,sql'},
				{title : "Zip files", extensions : "zip,rar"}
			], max_file_size : '50mb'},
	        flash_swf_url : 'component/plupload/plupload.flash.swf',
	        silverlight_xap_url : 'component/plupload/plupload.silverlight.xap'
	    });
		$('#'+buttonId).mouseenter(function() {
			uploader.refresh();
		});
		uploader.bind('FilesAdded', function(up) {
			document.title = _title;
			up.refresh();
			$.messager.progress();
		});
		uploader.bind('QueueChanged', function() {
			uploader.start();
		});
		uploader.bind('Error', function(up, err) {
			if(err.code=='-600'){
				$.messager.alert('提示',"上传文件限制小于50MB");
			}else {
				var $response=$.parseJSON(err.response);
				$.messager.alert('提示', $response.message);
			}
			document.title = _title;
			up.refresh();
			$.messager.progress('close');
		});
		uploader.bind('FileUploaded', function(up, file, response) {
			$.messager.progress('close');
			if (typeof callBack == "function") {
                callBack(response);
			}
		});
		uploader.init();
		return uploader;
	}
});