<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <script>$(function () {
        $.includeFile('head', "/js/lendShopRepaid/lendShopRepaid.js");
    });</script>
</head>

<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="lendShopRepaidToolbar" style="padding:2px 0">
        <shiro:hasPermission name="V050401">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-view'" id="lendRepaidApply">申请</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V050402">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-view'" id="viewAndPrints">预览</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V050403">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-view'" id="confirmLendRepaid">资料确认</a>
        </shiro:hasPermission>
    </div>
    <div data-options="region:'north'" style="height:120px;overflow:hidden;" title="搜索条件"
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <form id="lendShopRepaidForm" method="post">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">进件编号:</div>
                    <div class="main_content_td_white_small"><input type="text" name="lendRequestId" class="easyui-numberbox" data-options="min:1,max:999999999999999,groupSeparator:'',prompt:'进件编号'"/>
                    </div>
                    <div class="main_content_td_graylast_small">客户姓名:</div>
                    <div class="main_content_td_whitelast_small"><input type="text" name="name" class="puhui-textbox" maxlength="20" placeholder="客户姓名"/></div>
                    <div class="main_content_td_graylast_small">身份证号:</div>
                    <div class="main_content_td_whitelast_small"><input type="text" name="idNo" class="puhui-textbox" maxlength="22" placeholder="身份证号"/></div>
                </div>
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">审核状态:</div>
                    <div class="main_content_td_whitelast_small">
                        <div name="status" class="easyui-combobox" maxlength="22" data-options="url:'../../dictionary/option/62',prompt:'审核状态'"></div>
                    </div>
                    <div class="linkbutton_bg" style="float: right;">
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
                           id="lendShopRepaidSearchBtn">查询</a>
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
                           id="lendShopRepaidClearBtn">重置</a>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </form>
    </div>
    <div data-options="region:'center'">
        <table id="lendShopRepaidTable" class="easyui-datagrid"
               data-options="idField:'lendRequestId',url:'<%=basePath%>/lendShopRepaid/lendShopRepaidList',toolbar:'#lendShopRepaidToolbar'">
            <thead>
            <tr>
                <th data-options="field:'lendRequestId',width:140,align:'center'">进件编号</th>
                <th data-options="field:'encryptCustomName',width:140,align:'center'">客户姓名</th>
                <th data-options="field:'productName',width:140,align:'center'">产品</th>
                <th data-options="field:'period',width:100,align:'center'">期限</th>
                <th data-options="field:'signedAmount',width:140,align:'center',formatter:$.formatMoney">合同金额</th>
                <th data-options="field:'repaidAmount',width:140,align:'center',formatter:$.formatMoney">结清金额</th>
                <th data-options="field:'repaidTime',width:140,align:'center',formatter:$.formatDate">结清日期</th>
                <th data-options="field:'status',width:140,align:'center',formatter: function (value, data) {
                    return data.status.value;
                }">状态</th>
                <%--<th data-options="field:'totalPrints',width:140,align:'center'">打印次数</th>--%>
                <th data-options="field:'audStatus',width:140,align:'center',formatter: function (value, data) {
                     if(!data.audStatus){return '';}
                    return data.audStatus.value;
                }">审核状态</th>
                <th data-options="field:'shopName',width:200,align:'center'">门店</th>
                <th data-options="field:'createStaff',width:140,align:'center'">创建人</th>
                <th data-options="field:'createTime',width:290,align:'center',formatter:$.formatDateTime">申请时间</th>
                <th data-options="field:'updateTime',width:290,align:'center',formatter:$.formatDateTime">审核时间</th>

            </tr>
            </thead>
        </table>
    </div>
</div>
</body>
</html>