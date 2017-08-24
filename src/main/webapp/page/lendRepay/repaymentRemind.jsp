<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="../common/basePath.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<title>还款提醒</title>
</head>
<body>
<form id="remindForm" method="post">
	<input type="hidden" id="lendRequestIdRemind" name="lendRequestId">
	<input type="hidden" id="phaseRemind" name="phase">
	<div class="main_content_table">
		<div class="div_bottom">
			<div class="main_content_td_gray">提醒状态</div>
			<div class="main_content_td_white"><input name="remainedType" class="easyui-combobox" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/37',required:true"/></div>
		</div>
		<div class="div_bottom">
			<div class="main_content_td_gray" style="height:80px">提醒备注</div>
			<div class="main_content_td_textarea"><textarea name="remark" class="textareastyle easyui-validatebox" cols="70" rows="3" data-options="validType:['maxLength[60]']"></textarea></div>
		</div>

		<div class="clear"></div>
	</div>
</form>
<div class="div_bottom">
	<div class="linkbutton_bg" style="float: right;">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="remindSubmitBtn">提交</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-no'" id="remindCloseBtn">关闭</a>
	</div>
</div>
<div style="width:750px;height:150px; padding: 10px;">
	<div id="remindTable"></div>

</div>

</body>
</html>