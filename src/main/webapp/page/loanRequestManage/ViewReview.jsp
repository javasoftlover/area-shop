<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
</head>
<script>
    $(function () {
        $.includeFile('head', ["/js/lendRequestManage/ViewReview.js"
        ]);
    });
</script>
<body>
<div style="width:97%;margin:0 auto;">
    <br>
    <div class="easyui-panel" title="进件信息" style="width:99%; border: false">
        <form class="main_content_table" id="lendSignForm">
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">进件编号</div>
                <div class="main_content_td_white_small4">
                    <input id="lendRequestId" style="border:0;padding:5px;" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">姓名</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="name" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">身份证号码</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="idNo" style="border:0;padding:5px" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">手机号</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="mobile" style="border:0;padding:5px" readonly="readonly"/>
                </div>
            </div>
            <div class="clear"></div>
        </form>
    </div>

    <div id="lendReviewToolbar" style="padding:2px 0">
        <shiro:hasPermission name="V02010101">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',disabled:true"
           id="oneReconSideRationBtn">申请复议</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V02010102">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',disabled:true"
           id="twoReconsiderationBtn">申请二次复议</a>
        </shiro:hasPermission>

        <shiro:hasPermission name="V02010104">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',disabled:true" id="returnBtn">退件再进</a>
        </shiro:hasPermission>
    </div>
    <br>
    <div class="easyui-panel" title="审核记录" style="width:99%;height: 119%; border: false">
        <table id="lendReviewTable"></table>
    </div>
    <br>
    <div class="easyui-panel" title="审核结论" style="width:99%; border: false">
        <div class="div_bottom">
            <div class="main_content_td_graylast_small2">审核备注：</div>
            <div class="main_content_td_white_small2">
                <input id="serviceMemo" class="easyui-textbox" data-options="multiline:true"
                       style="height:129%;width:100%"
                       readonly/>
            </div>
            <div  id="rejectedDiv">
                <div class="main_content_td_graylast_small2">拒贷原因：</div>
                <div class="main_content_td_white_small2">
                    <input id="rejectedMemo" class="easyui-textbox" data-options="multiline:true"
                           style="height:129%;width:100%"
                           readonly/>
                </div>
            </div>
        </div>
    </div>

</div>
</body>
</html>