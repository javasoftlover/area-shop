<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
</head>

<body>
<div data-options="region:'center'" style="height: 500px;">
    <input id="lendRequestId" type="hidden"/>
    <table id="updateRecordTable" class="easyui-datagrid">
        <thead>
        <tr>
            <th data-options="field:'customerName',width:120,align:'center'">客户姓名</th>
            <th data-options="field:'oldCardNo',width:250,align:'center'">原银行卡号</th>
            <th data-options="field:'newCardNo',width:250,align:'center'">变更银行卡号</th>
            <th data-options="field:'lendBankCardChangeType',width:100,align:'center',formatter:function(data,value){
					if(!data) {
						return '';
					}
					if(data.key === 'UPDATE_MAIN_CARD' || data.key === 'UPDATE_BOHAI_MAIN_CARD') {
						return '主卡';
					}
					if(data.key === 'ADD_VICE_CARD' || data.key === 'UPDATE_VICE_CARD' || data.key === 'UPDATE_BOHAI_VICE_CARD'){
					    return '副卡';
					}
				}">类别</th>
            <th data-options="field:'status',width:140,align:'center',formatter:function(data,value){
					if(!data) {
						return '';
					}
					if(data.key === 'WAIT_EXAMINE' || data.key === 'EXAMINE_PASS' || data.key === 'EXAMINE_REJECT') {
						return data.value;
					}
					return '';
				}">审核状态</th>
            <th data-options="field:'applyDate',width:290,align:'center',formatter:$.formatDateTime2Second">申请时间</th>
            <th data-options="field:'auditDate',width:290,align:'center',formatter:$.formatDateTime2Second">审核时间</th>
            <th data-options="field:'submitter',width:100,align:'center'">提交人</th>
        </tr>
        </thead>
    </table>
</div>
</body>
</html>