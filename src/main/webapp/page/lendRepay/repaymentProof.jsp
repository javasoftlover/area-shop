<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<title>上传凭条</title>
</head>
<body>
<input type="hidden" id="lendRepayRecordId"/>
<div class="main_content_table"  style="width:98%;overflow:hidden;">
	<div class="div_bottom">
		<div class="main_content_td_gray_small" style="width: 200px; color: red;">再次上传会替换已有凭条！</div>
		<div class="main_content_td_white_small">
			<div id="container_proofUpload"></div>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-upload'" id="proofUpload">上传</a>
		</div>
	</div>
	<div class="clear"></div>
</div>


<div class="div_bottom">
	<div class="linkbutton_bg" style="float: right;">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="downloadBtn">下载</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-no'" id="delBtn">删除</a>
	</div>
</div>
<div class="clear"></div>
<div  class="main_content_table" style="height:300px; text-align: center;">
	<div class="div_bottom">
		<div class="main_content_td_gray_small">文件编号</div>
		<div class="main_content_td_white_small" id="idDiv"></div>
	</div>
	<div class="div_bottom">
		<div class="main_content_td_gray_small">文件名</div>
		<div class="main_content_td_white_small" id="originalFilenameDiv"></div>
	</div>
	<div class="div_bottom">
		<div class="main_content_td_gray_small">文件大小</div>
		<div class="main_content_td_white_small" id="fileSizeDiv"></div>
	</div>
	<div class="div_bottom">
		<div class="main_content_td_gray_small">创建时间</div>
		<div class="main_content_td_white_small" id="createTimeDiv"></div>
	</div>
	<%--<div class="div_bottom">--%>
		<%--<div class="main_content_td_gray_small">路径</div>--%>
		<%--<div class="main_content_td_white_small" id="pathDiv" style="width: 80%"></div>--%>
	<%--</div>--%>
</div>

</body>
</html>