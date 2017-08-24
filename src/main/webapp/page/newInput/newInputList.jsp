<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
</head>
<script>$(function() {$.includeFile('head', "/js/newInput/newInputList.js");});</script>
<body>
	<div class="easyui-layout" style="width:100%;height:100%;">
	    <div id="lendRequestTabletoolbar" style="padding:2px 0">
			<shiro:hasPermission name="V010101">
	        <a href="#" id="inputSelect" data-options="iconCls:'icon-view'" class="easyui-linkbutton">查看进件</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="V010102">
			<a href="#" id="addInput" data-options="iconCls:'icon-add'" class="easyui-linkbutton">添加进件</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="V010103">
	        <a href="#" id="inputUpdate" data-options="iconCls:'icon-edit'" class="easyui-linkbutton">修改</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="V010104">
	        <a href="#" id="inputDelete" data-options="iconCls:'icon-cancel'" class="easyui-linkbutton">删除</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="V010105">
	        <a href="#" id="submitAudit" data-options="iconCls:'icon-submit'" class="easyui-linkbutton">提交审核</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="V010106">
	        <a href="#" id="attachmentUpload" data-options="iconCls:'icon-upload'" class="easyui-linkbutton">上传附件</a>
			</shiro:hasPermission>
	    </div>
	    <div data-options="region:'north'" style="height:150px;overflow:hidden;" title="查询" data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
	        <form id="lendRequestSearchForm" method="post">
	            <div class="main_content_table">
	                <div class="div_bottom">
	                    <div class="main_content_td_gray_small">进件号</div>
	                    <div class="main_content_td_white_small"><input name="id" class="easyui-validatebox easyui-textbox" data-options="min:1,validType:'onlyNumberValidate',max:9999999,required:false"/></div>
	                    <div class="main_content_td_graylast_small">姓名</div>
	                    <div class="main_content_td_whitelast_small"><input name="customerName" class="easyui-validatebox easyui-textbox" data-options="validType:'length[0,10]',required:false"/></div>
	                    <div class="main_content_td_graylast_small">手机号</div>
	                    <div class="main_content_td_whitelast_small"><input name="mobile" class="easyui-validatebox easyui-textbox" data-options="validType:'mobile',required:false"/></div>
	                </div>
	                
	                <div class="div_bottom">
	                  <div class="main_content_td_gray_small">身份证号</div>
	                  <div class="main_content_td_white_small"><input name="idNo" class="easyui-validatebox easyui-textbox" data-options="validType:'idcard',required:false"/></div>
                      <div class="main_content_td_graylast_small">一级渠道:</div>
                      <div class="main_content_td_whitelast_small"><div id="chanceType" name="chanceType" class="easyui-combobox" data-options="url:'../../channel/option/one',prompt:'一级渠道'"></div></div>
                      <div class="main_content_td_graylast_small">二级渠道:</div>
                      <div class="main_content_td_whitelast_small"><div id="secondChannel" name="secondChannel" class="easyui-combobox" data-options="url:'../../channel/option/two',prompt:'二级渠道'"></div></div>
                   </div>
	                <div class="div_bottom">
	                    <div class="linkbutton_bg" style="float: right;">
	                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
	                           id="lendRequestSearchBtn">查询</a>
	                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
	                           id="lendRequestClearBtn">重置</a>
	                    </div>
	                </div>
	                <div class="clear"></div>
	            </div>
	        </form>
		</div>
		<div data-options="region:'center'">
			<table id="lendRequestTable" class="easyui-datagrid" data-options="idField:'lend_id', url:'../../lendRequest/getLendRequestList',toolbar:'#lendRequestTabletoolbar'">
			    <thead>
				    <tr>
				        <th data-options="field:'lendRequestId',width:140,align:'center'">进件编号</th>
				        <th data-options="field:'customerName',width:250,align:'center'">客户姓名</th>
				        <th data-options="field:'productName',width:250,align:'center'">产品</th>
				        <th data-options="field:'shop',width:250,align:'center'">门店</th>
				        <th data-options="field:'sellGroup',width:250,align:'center'">团队</th>
				        <th data-options="field:'seller',width:250,align:'center'">销售</th>
				        <th data-options="field:'submitter',width:250,align:'center'">客服</th>
				        <th data-options="field:'chanceType',width:250,align:'center'">一级渠道</th>
				        <th data-options="field:'secondChannel',width:250,align:'center'">二级渠道</th>
				        <th data-options="field:'createTime',width:250,align:'center',formatter:$.formatDateTime">创建时间</th>
				        <th data-options="field:'updateTime',width:250,align:'center',formatter:$.formatDateTime">更新时间</th>
				    </tr>
			    </thead>
			</table>
		</div>
	</div>
</body>
</html>