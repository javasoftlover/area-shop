<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <script type="text/javascript" src="../../js/systemManage/validateConfigure.js"></script>
</head>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="validateConfigureToolbar" style="padding:2px 0">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'" id="addValidateRule">添加验证规则</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'"
           id="updateValidateRule">修改验证规则</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'" id="enable">启用/禁用</a>
    </div>
    <div data-options="region:'center'">
        <table id="validateRuleTable" class="easyui-datagrid"
               data-options="idField:'lendRequestId',url:'../../validateConfig/lists', toolbar:'#validateConfigureToolbar',pagination:false">
            <thead>
            <tr>
                <th data-options="field:'validateType',width:150,align:'center'">标识</th>
                <th data-options="field:'validateDec',width:140,align:'center'">描述</th>
                <th data-options="field:'enable',width:140,align:'center',formatter: function (value, data) {
                if(value===true){
                return '启用'
                }else{
                return '禁用'
                }
                }">是否启用
                </th>
                <th data-options="field:'createTime',width:140,align:'center',formatter:$.formatDateTime">创建时间</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>


</html>