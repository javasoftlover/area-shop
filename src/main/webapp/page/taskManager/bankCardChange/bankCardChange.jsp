<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<title>银行卡变更申请</title>
</head>
<script>$(function() {$.includeFile('head', "/js/taskManager/bankCardChange/bankCardChange.js");});</script>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">

	<div data-options="region:'north'" style="height:150px;overflow:hidden;" title="搜索条件"
		 data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
		<form id="bankCardChangeSearchForm" method="post">
			<div class="main_content_table">
				<div class="div_bottom">
					<div class="main_content_td_gray_small">产品:</div>
					<div class="main_content_td_white_small">
						<div class="easyui-combobox" name="productType"
							 data-options="url:'<%=basePath%>/dictionary/lendProduct/28',prompt:'产品'"></div>
					</div>
					<div class="main_content_td_graylast_small">客服:</div>
					<div class="main_content_td_whitelast_small"><input type="text" name="submiterName" class="puhui-textbox" placeholder="客服" maxlength="20"/></div>
					<div class="main_content_td_graylast_small">进件编号:</div>
					<div class="main_content_td_whitelast_small"><input type="text" name="lendRequestId" class="easyui-numberbox" data-options="min:1,max:999999999999999,groupSeparator:'',prompt:'进件编号'"/>
					</div>
				</div>
				<div class="div_bottom">
					<div class="main_content_td_gray_small">客户姓名:</div>
					<div class="main_content_td_white_small"><input type="text" name="customerName" class="puhui-textbox" maxlength="20" placeholder="客户姓名"/></div>
					<div class="main_content_td_graylast_small">身份证号:</div>
					<div class="main_content_td_whitelast_small"><input type="text" name="idNo" class="puhui-textbox" maxlength="22" placeholder="身份证号"/></div>
				</div>
				<div class="div_bottom">
					<div class="linkbutton_bg" style="float: right;">
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" id="bankCardChangeSearchBtn">搜索</a>
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" id="bankCardChangeClearBtn">重置</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</form>
	</div>

	<div id="bankCardChangeToolbar" style="padding:2px 0">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="edit_master_card">修改主卡</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="edit_vice_card">修改副卡</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="update_record">查看修改记录</a>
	</div>
	<div data-options="region:'center'">
		<table id="bankCardChangeTable" class="easyui-datagrid" data-options="url:'<%=basePath%>/bankCardChange/list',pagination: true,showFooter: true, toolbar:'#bankCardChangeToolbar',
			onSelect:function(){
              var $rows = $('#bankCardChangeTable').datagrid('getSelections');
              if (!$rows[0].viceCardNo){
              	$('#edit_vice_card').linkbutton({
              		text:'添加副卡'
              	});
              } else {
				$('#edit_vice_card').linkbutton({
              		text:'修改副卡'
              	});
              }
              if (!$rows[0].lendBankCardChangeType) {
            	  $('#edit_master_card').linkbutton('enable');
				  $('#edit_vice_card').linkbutton('enable');
              } else {
              	var type = $rows[0].lendBankCardChangeType;
              	if (type === 'UPDATE_MAIN_CARD' || type === 'UPDATE_BOHAI_MAIN_CARD') {
					$('#edit_vice_card').linkbutton('disable');
					$('#edit_master_card').linkbutton('enable');
              	} else if (type === 'ADD_VICE_CARD' || type === 'UPDATE_BOHAI_VICE_CARD' || type === 'UPDATE_VICE_CARD') {
					$('#edit_master_card').linkbutton('disable');
					$('#edit_vice_card').linkbutton('enable');
              	} else {
					$('#edit_master_card').linkbutton('enable');
					$('#edit_vice_card').linkbutton('enable');
              	}
              }
              var status = $rows[0].lendRequestStatus;
              if (status === 'PROCESSING_ERROR') {
				$('#edit_master_card').linkbutton('enable');
				$('#edit_vice_card').linkbutton('disable');
              }
            }
		">
			<thead>
			<tr>
				<th data-options="field:'lendRequestId',width:100,align:'center'">进件编号</th>
				<th data-options="field:'lendCustomerName',width:100,align:'center'">姓名</th>
				<th data-options="field:'productName',width:80,align:'center'">产品</th>
				<th data-options="field:'period',width:50,align:'center'">期限</th>
				<th data-options="field:'mainCardNo',width:150,align:'center'">主卡卡号</th>
				<th data-options="field:'viceCardNo',width:150,align:'center'">副卡卡号</th>
				<th data-options="field:'status',width:80,align:'center',formatter:function(data,value){
					if(!data) {
						return '';
					}
					if(data.key === 'WAIT_EXAMINE' || data.key === 'EXAMINE_PASS' || data.key === 'EXAMINE_REJECT') {
						return data.value;
					}
					return '';
				}">申请状态</th>
				<th data-options="field:'groupName',width:80,align:'center'">团队</th>
				<th data-options="field:'shopName',width:120,align:'center'">进件门店</th>
				<th data-options="field:'sellerName',width:100,align:'center'">销售</th>
				<th data-options="field:'submitName',width:100,align:'center'">客服</th>
			</tr>
			</thead>
		</table>
	</div>
</div>
</body>
</html>