<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
</head>
<script>$(function() {$.includeFile('head', "/js/newInput/riskJudgment.js");});</script>
<body>
	<div style="overflow: hidden;padding: 10px;">
		<shiro:hasPermission name="V01010201">
		<div class="easyui-panel" title="身份验证" style="width:100%;height:150px;overflow:hidden;" >
			<form id="riskJudgmentForm" method="post">
	            <div class="main_content_table">
	                <div class="div_bottom">
						<input type="hidden" name="token" id="token" >
						<div class="main_content_td_gray_small">身份证:</div>
	                    <div class="main_content_td_white_small"><input id="cardIdOfValidate" name="cardId" class="easyui-validatebox textbox validate" data-options="required:true,prompt:'请输入18位数字及字母',width:220,validType:'idcard'" style="height: 23px;width: 99%"/></div>
	                    <div class="main_content_td_graylast_small">客户姓名:</div>
	                    <div class="main_content_td_whitelast_small"><input id="name" name="name" class="easyui-validatebox textbox validate" data-options="required:true,prompt:'请输入客户姓名',validType:'CHS'"  style="height: 23px;width: 99%"/></div>
	                    <div class="main_content_td_graylast_small">客户手机号:</div>
	                    <div class="main_content_td_whitelast_small"><input id="phone" name="phone" class="easyui-validatebox textbox validate" data-options="required:true,prompt:'请输入客户手机号',validType:'mobile'" style="height: 23px;width: 99%"/></div>
	                </div>
	                <div class="div_bottom">
						<div class="main_content_td_gray_small">团队</div>
						<div class="main_content_td_white_small"><input id="sellGroup" name="sellGroup" class="easyui-combobox"/>
						</div>
						<div class="main_content_td_graylast_small">客户经理</div><label id="infoOfCardId" style="color: red;margin-left: 10px;"></label>
						<div class="main_content_td_whitelast_small"><input id="seller" name="seller" class="easyui-combobox"/>
						</div>
	                </div>
	                <div class="div_bottom">
	                    <div class="linkbutton_bg_left" style="float: left;">
	                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" id="riskJudgmentSubmitBtn">验证</a>
	                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" id="riskJudgmentClearBtn">重置</a>
                            <shiro:hasPermission name="V01010203">
                            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',disabled:true" id="riskJudgmentNextStep">下一步</a>
                            </shiro:hasPermission>
	                    </div>
	                </div>
	                <div class="clear"></div>
	            </div>
	            <input type="hidden" id="positionName" name="positionName">
	            <input type="hidden" name="lendTelephoneSaleId" id="lendTelephoneSaleId">
	        </form>
		</div>
		</shiro:hasPermission>
		<br>
		<shiro:hasPermission name="V01010202">
		<div class="easyui-panel" title="重复客户查询" style="width:100%;height:150px;overflow:hidden;">
			<form id="repetitionForm" method="post">
	            <div class="main_content_table">
	                <div class="div_bottom">
						<div class="main_content_td_gray_small">联系人姓名:</div>
	                    <div class="main_content_td_white_small"><input name="contractName" class="easyui-textbox" data-options="" /></div>
	                    <div class="main_content_td_graylast_small">联系人手机号:</div>
	                    <div class="main_content_td_whitelast_small"><input name="mobile" class="easyui-textbox" data-options="" /></div>
					</div>
					<div class="div_bottom">
	                    <div class="main_content_td_gray_small">公司名称:</div>
	                    <div class="main_content_td_white_small"><input name="companyName" class="easyui-textbox" data-options="" /></div>
	                    <div class="main_content_td_graylast_small">公司电话:</div>
	                    <div class="main_content_td_whitelast_small"><input name="companyPhone" class="easyui-textbox" data-options=""/></div>
	                    <div class="main_content_td_graylast_small">公司地址:</div>
	                    <div class="main_content_td_whitelast_small"><input name="companyAddress" class="easyui-textbox" data-options=""/></div>
	                </div>
	                <div class="div_bottom">
	                    <div class="linkbutton_bg_left" style="float: left;">
	                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" id="repetitionSubmitBtn">验证</a>
	                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'" id="repetitionClearBtn">重置</a>
	                    </div>
	                </div>
	                <div class="clear"></div>
	             </div>   
			</form>
		</div>
		<br>
		<div class="easyui-panel" style="width:100%;height:200px;overflow:hidden;" data-options="border:false">
			<table id="repetitionTable" class="easyui-datagrid" data-options="idField:'lendRequestId',url:'../../lendRequest/querySimilarLendRequest',
				onClickCell:function(rowIndex,field,value){
			        		if(field === 'operation'){
			        			var rowData = $('#repetitionTable').datagrid('getRows')[rowIndex];
			        			if(rowData.operation){
				        			view(rowData.lendRequestId);
			        			}
			        		}
			        }
			">
				<thead>
					<tr>
						<th data-options="field:'lendRequestId',width:'10%',align:'center'">进件编号</th>
						<th data-options="field:'customerName',width:'10%',align:'center'">客户姓名</th>
						<th data-options="field:'productType',width:'10%',align:'center'">产品</th>
						<th data-options="field:'status',width:'20%',align:'center',formatter:function(value,row,index){
						       if(value!==null&&value!==''){
                                  return value.value;
						       }
						}">状态</th>
						<th data-options="field:'shop',width:'20%',align:'center'">进件门店</th>
						<th data-options="field:'type',width:'15%',align:'center'">匹配类型</th>
						<th data-options="field:'operation',width:100,align:'center',
			            	formatter: function(value,row,index){
			            		if(row.operation){
			            			return '查看';
			            		}else{
			            			return '没有权限';
			            		}
			            	},
			            	styler: function(value , data , index){
			            		if(data.operation){
			            			return 'text-decoration: underline;color: blue;cursor:pointer';
			            		}else{
			            			return 'color: rgb(162, 167, 167)';
			            		}
			            	}
			            ">操作</th>
					</tr>
				</thead>
			</table>
		</div>
		</shiro:hasPermission>
	</div>
</body>
</html>