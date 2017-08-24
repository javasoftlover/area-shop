<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<script>
		$(function () {
			$.includeFile('head',"/js/lendRedRecharge/lendRedRecharge.js");});
	</script>
</head>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
	<div id="lendRedRechargeToolbar" style="padding:2px 0">
		<div id="container_uploadExcel"></div>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-upload'" id="uploadExcel">上传</a>
	</div>
<div data-options="region:'center'">
	<table id="lendRedRechargeTable"  class="easyui-datagrid" data-options="collapsible:true,url:'<%=basePath%>/lendRedRecharge/queryLendRechargeAccountLog', toolbar:'#lendRedRechargeToolbar'">
		<thead>
		<tr>
			<th data-options="field:'idNo',width:250,align:'center',fitColumns: true">身份证号</th>
			<th data-options="field:'policyAmount',width:250,align:'center',fitColumns: true,formatter:$.formatMoney">政策红包余额</th>
			<th data-options="field:'friendAmount',width:250,align:'center',fitColumns: true,formatter:$.formatMoney">好友分享红包余额</th>
			<th data-options="field:'policyPeriod',width:250,align:'center',fitColumns: true">充值期数</th>
			<th data-options="field:'createTime',width:250,align:'center',fitColumns: true">充值时间</th>
		</tr>
		</thead>
	</table>
</div>
</div>
</body>
</html>