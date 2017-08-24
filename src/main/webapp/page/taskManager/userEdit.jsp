<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<title>修改用户信息</title>
</head>
<body>
<form id="userEditForm" method="post">
	<input id="updateUserId" type="hidden" name="id"/>
	<div class="main_content_table">
		<div class="div_bottom">
			<div class="main_content_td_gray">员工编号</div>
			<div class="main_content_td_white"><input name="employeeNo" id="employeeNo" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:true" /></div>
			<div class="main_content_td_graylast">入职时间</div>
			<div class="main_content_td_whitelast"><input name="entryTime" id="entryTime" class="easyui-datebox" data-options="panelHeight:'auto',required:true" /></div>
		</div>
		<div class="div_bottom deductDiv">
			<div class="main_content_td_gray">用户名</div>
			<div class="main_content_td_white"><input name="username" id="username" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:true"/></div>
			<div class="main_content_td_graylast">所属机构</div>
			<div class="main_content_td_whitelast"><input name="organizationVo.id" id="orgTreeEdit" class="easyui-combotree" data-options="required:true"/></div>
		</div>
		<div class="div_bottom deductDiv">
			<div class="main_content_td_gray">姓名</div>
			<div class="main_content_td_white"><input name="realName" id="realName" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:true"/></div>
			<div class="main_content_td_graylast">职位</div>
			<div class="main_content_td_whitelast">
				<input name="positionType" id="positionType" class="easyui-combobox"
					   data-options="panelHeight:'auto',required:true,editable:false,
					   data:[{text:'个贷-门店经理',value:'MANAGER',selected:true},{text:'个贷-客服经理',value:'CUSTOMER_SERVICE_MANAGER'},
					   {text:'个贷-销售组长',value:'LEADER'},{text:'个贷-客服',value:'CUSTOMER_SERVICE'},{text:'个贷-销售',value:'SALES'}]" />
			</div>
		</div>
		<div class="div_bottom deductDiv">
			<div class="main_content_td_gray">手机号</div>
			<div class="main_content_td_white">
				<input name="mobile" id="mobile" class="easyui-validatebox textbox"
						  style="height: 23px" data-options="panelHeight:'auto',required:true, validType:'mobile'"/>
			</div>
			<div class="main_content_td_graylast">邮箱</div>
			<div class="main_content_td_whitelast"><input name="email" id="email" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:true, validType:['email']"/></div>
		</div>
		<div class="clear"></div>
	</div>
</form>
<div class="div_bottom">
	<div class="linkbutton_bg" style="float: right;">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="editSubmitBtn">提交</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-no'" id="editCloseBtn">关闭</a>
	</div>
</div>
</body>
</html>