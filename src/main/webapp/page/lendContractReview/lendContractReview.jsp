<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <script>
        $(function () {
            $.includeFile('head', ["/component/extEasyUI.js", "/js/lendContractReview/lendContractReview.js"]);
        });
    </script>
</head>

<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="lendRequestManagetoolbar" style="padding:2px 0">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-watch'" id="inputForm">查看进件</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'" id="attachmentSearch">附件管理</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-contract-download'" id="downLoadSignPhoto">已签约合同下载</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-pass'" id="signAuditingPass">通过</a>
        <a href="#" class="easyui-menubutton" data-options="menu:'#rejectView',iconCls:'icon-wrong'">驳回</a>

    </div>
    <div id="rejectView">
        <div id="reCreateContract" data-options="iconCls:'icon-contract-make'">信息有误，重新制作合同</div>
        <div id="reUploadSign" data-options="iconCls:'icon-reupload'">重新上传签约</div>
    </div>

    <div data-options="region:'north'" style="height:120px;overflow:hidden;" title="搜索条件"
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <form id="lendContractReviewForm" method="post" class="easyui-form">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">进件编号:</div>
                    <div class="main_content_td_white_small">
                        <input type="text" name="lendRequestId" class="easyui-numberbox"
                               data-options="min:1,max:999999999999999,groupSeparator:'',prompt:'进件编号'"/>
                    </div>
                    <div class="main_content_td_graylast_small">姓名:</div>
                    <div class="main_content_td_whitelast_small">
                        <input type="text" name="customerName" class="puhui-textbox" maxlength="20" placeholder="客户姓名"/>
                    </div>
                    <div class="main_content_td_graylast_small">身份证号:</div>
                    <div class="main_content_td_whitelast_small">
                        <input type="text" name="idNo" class="puhui-textbox" maxlength="22" placeholder="身份证号"/>
                    </div>

                </div>



                <div class="div_bottom">
                    <div class="linkbutton_bg" style="float: right;">
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
                           id="contractReviewSearchBtn">查询</a>
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
                           id="contractReviewClearBtn">重置</a>
                    </div>
                </div>


                <div class="clear"></div>
            </div>
        </form>
    </div>
    <div data-options="region:'center'">
        <table id="lendContractReviewTable" class="easyui-datagrid"
               data-options="idField:'lendRequestId',url:'../../lendContractReview/lendContractReviews/list',toolbar:'#lendRequestManagetoolbar'">
            <thead>
            <tr>
                <th data-options="field:'lendRequestId',width:100,align:'center'">进件编号</th>
                <th data-options="field:'customName',width:140,align:'center'">客户姓名</th>
                <th data-options="field:'typeName',width:140,align:'center'">产品</th>
                <th data-options="field:'period',width:50,align:'center'">期限</th>
                <th data-options="field:'signedAmount',width:140,align:'center',formatter:$.formatMoney">签约金额</th>
                <th data-options="field:'amount',width:140,align:'center',formatter:$.formatMoney">审核金额</th>
                <th data-options="field:'markedBit',width:140,align:'center'">放款标示</th>
                <th data-options="field:'shop',width:240,align:'center'">门店</th>
                <th data-options="field:'sellGroupName',width:110,align:'center'">团队</th>
                <th data-options="field:'sellerName',width:140,align:'center'">销售</th>
                <th data-options="field:'submitName',width:140,align:'center'">客服</th>
                <th data-options="field:'submitTime',width:200,align:'center',formatter:$.formatDateTime">进件时间</th>
                <th data-options="field:'updateTime',width:200,align:'center',formatter:$.formatDateTime">更新时间</th>
                <th data-options="field:'channelName',width:110,align:'center'">进件渠道</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>
</html>