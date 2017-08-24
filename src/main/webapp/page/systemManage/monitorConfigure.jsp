<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <script type="text/javascript" src="../../js/systemManage/monitorConfigure.js"></script>

</head>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="monitorConfigToolbar" style="padding:2px 0">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'" id="addMonitor">添加监控配置</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'"
           id="updateMonitor">修改监控配置</a>
    </div>
    <div data-options="region:'center'">
        <table id="monitorTable" class="easyui-datagrid"
               data-options="idField:'lendRequestId',url:'../../monitorConfig/lists', toolbar:'#monitorConfigToolbar',pagination:false">
            <thead>
            <tr>
                <th data-options="field:'monitorDesc',width:150,align:'center'">类型</th>
                <th data-options="field:'type',width:140,align:'center'">描述</th>
                <th data-options="field:'enable',width:140,align:'center',formatter: function (value, data) {
                if(value===true){
                return '启用'
                }else{
                return '禁用'
                }
                }">是否启用
                </th>
                <th data-options="field:'updateTime',width:140,align:'center',formatter:$.formatDateTime">更新时间</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>


</html>