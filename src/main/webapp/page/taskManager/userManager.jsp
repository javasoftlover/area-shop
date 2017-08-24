<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<title>用户管理</title>
</head>
<script>$(function() {$.includeFile('head', "/js/taskManager/userManager.js");});</script>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">

	<div data-options="region:'north'" style="height:150px;overflow:hidden;" title="搜索条件"
		 data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
		<form id="sampleSearchForm" method="post">
			<div class="main_content_table">
				<div class="div_bottom">
					<div class="main_content_td_gray_small">用户名</div>
					<div class="main_content_td_white_small"><input  id="username" name="username" class="easyui-textbox" data-options="" /></div>
					<div class="main_content_td_graylast_small">姓名</div>
					<div class="main_content_td_whitelast_small"><input id="realName" name="realName" class="easyui-textbox" data-options="" /></div>
					<div class="main_content_td_graylast_small">员工编号</div>
					<div class="main_content_td_whitelast_small"><input id="employeeNo" name="employeeNo" class="easyui-textbox" data-options="" /></div>
				</div>
				<div class="div_bottom">
					<div class="main_content_td_gray_small">邮箱</div>
					<div class="main_content_td_white_small"><input id="email" name="email" class="easyui-textbox" data-options="" /></div>
					<div class="main_content_td_graylast_small">进件机构</div>
					<div class="main_content_td_whitelast_small"><input id="orgTree" name="organizationVo.id" class="easyui-combotree" data-options="" /></div>
					<div class="main_content_td_graylast_small">用户状态</div>
					<div class="main_content_td_whitelast_small">
						<input id="enabled" name="enabled" class="easyui-combobox"
							   data-options="panelHeight:'auto', required: false, data:[{text:'启用中',value:'true'},{text:'禁用中',value:'false'}]" />
					</div>
				</div>
				<div class="div_bottom">
					<div class="linkbutton_bg" style="float: right;">
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" id="sampleSearchBtn">搜索</a>
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" id="sampleClearBtn">重置</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</form>
	</div>

	<div id="sampleTabletoolbar" style="padding:2px 0">
	  <shiro:hasPermission name="V050201"><a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" id="addUser">添加</a></shiro:hasPermission>
	  <shiro:hasPermission name="V050202"><a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="editUser">编辑</a></shiro:hasPermission>
	  <shiro:hasPermission name="V050203">	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="enable">启用</a></shiro:hasPermission>
	  <shiro:hasPermission name="V050204">	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-no'" id="unable">禁用</a></shiro:hasPermission>
	  <shiro:hasPermission name="V050205">	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo'" id="resetPassWord">重置密码</a></shiro:hasPermission>
	  <shiro:hasPermission name="V050206">	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload'" id="resetCertificate">重新生成证书</a></shiro:hasPermission>
	  <shiro:hasPermission name="V050207">	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="updateCustomer">进件客服修改</a></shiro:hasPermission>
	</div>
	<div data-options="region:'center'">
		<table id="sampleTable" class="easyui-datagrid" data-options="url:'<%=basePath%>/userManager/user/list', method: 'GET',pagination: true,showFooter: true, toolbar:'#sampleTabletoolbar'">
			<thead>
			<tr>
				<th data-options="field:'id',hidden:true" />
				<th data-options="field:'username',width:100,align:'center'">用户名</th>
				<th data-options="field:'realName',width:100,align:'center'">姓名</th>
				<th data-options="field:'employeeNo',width:100,align:'center'">员工编号</th>
				<th data-options="field:'email',width:100,align:'center'">邮箱</th>
				<th data-options="field:'mobile',width:100,align:'center'">手机号</th>
				<th data-options="field:'organizationVo',width:100,align:'center',formatter:function(data){return data.name;}">所属部门</th>
				<th data-options="field:'positionName',width:100,align:'center'">职位</th>
				<th data-options="field:'enabledStr',width:100,align:'center'">用户是否启用</th>
				<th data-options="field:'certEnableStr',width:100,align:'center'">证书是否启用</th>
				<th data-options="field:'issueCertStatusStr',width:100,align:'center'">证书状态</th>
			</tr>
			</thead>
		</table>
	</div>
</div>
</body>
</html>