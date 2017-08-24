<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <title>还款管理</title>
</head>
<script>$(function () {
    $.includeFile('head', "/js/lendRepay/repayList.js");
});</script>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="repayToolbar" style="padding:2px 0">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-preview'" id="repayDetail">还款详情</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="applyRepay">申请还款</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-approve'" id="inRepayForReduction">提前结清减免</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-view'" id="businessDetail">划扣详情</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-tip'" id="seeRemindNote">还款提醒</a>

        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-view'" id="checkReview">查看进件</a>
    </div>
    <div data-options="region:'north'" style="height:150px;overflow:hidden;" title="查询"
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <form id="sampleSearchForm" method="post">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">进件编号:</div>
                    <div class="main_content_td_white_small"><input id="lendRequestId" name="lendRequestId"
                                                                    class="easyui-numberbox"
                                                                    data-options="min:1,max:999999999999999,groupSeparator:'',prompt:'进件编号'"/>
                    </div>
                    <div class="main_content_td_graylast_small">姓名:</div>
                    <div class="main_content_td_whitelast_small"><input type="text" id="customerName"
                                                                        name="customerName"
                                                                        class="puhui-textbox" maxlength="10"
                                                                        placeholder="客户姓名"/></div>
                    <div class="main_content_td_graylast_small">身份证:</div>
                    <div class="main_content_td_whitelast_small">
                        <input type="text" id="idNo" name="idNo" class="easyui-validatebox textbox validate" data-options="validType:'idcard',required:false" style="height: 23px;width:80%"  placeholder="请输入18位数字及字母"/></div>
                </div>
                <div class="div_bottom" id="billDateDiv">
                    <div class="main_content_td_gray_small">账单日:</div>
                    <div class="main_content_td_white_small">
                        <input id="billDate" name="billDate" class="easyui-datebox" clearable="false"/>
                    </div>
                    <div class="main_content_td_graylast_small">还款状态:</div>
                    <div class="main_content_td_white_small">
                        <div class="easyui-combobox" name="lendRepaymentType" id="lendRepaymentType"></div>
                    </div>
                </div>
                <div class="div_bottom">
                    <div class="linkbutton_bg" style="float: right;">
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" id="sampleSearchBtn">查询</a>
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
                           id="sampleClearBtn">重置</a>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </form>
    </div>
    <div data-options="region:'center'">
        <table id="repayTable">
        </table>
    </div>
</div>
</body>
</html>