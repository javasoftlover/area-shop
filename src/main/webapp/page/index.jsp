<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title>凡普互金</title>
</head>
<body class="easyui-layout">
<%@ include file="common/header.jsp" %>
<div data-options="region:'west',split:true,title:'菜单'" style="width: 150px">
    <div id="wrapper-250">
        <ul class="accordion">


            <shiro:hasPermission name="V02">
                <li id="two" class="icon02"><a href="#two">贷中管理</a>
                    <ul class="sub-menu">
                        <%--<shiro:hasPermission name="V0201">--%>
                            <li><a class="index-navi-tab" href="#"
                                   src="page/loanRequestManage/loanRequestManage.jsp">签约管理</a></li>
                        <%--</shiro:hasPermission>--%>
                        <shiro:hasPermission name="V0202">
                            <li><a class="index-navi-tab" href="#"
                                   src="page/loanRequestManage/loanRequestManageByReturnReject.jsp">拒贷退件列表</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="V0203">
                            <li><a class="index-navi-tab" href="#"
                                   src="page/lendContractReview/lendContractReview.jsp">签约审核</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="V0204">
                            <li><a class="index-navi-tab" href="#"
                                   src="page/lendRequestManage/lendProcessing.jsp">放款列表</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>

            <shiro:hasPermission name="V03">
                <li id="three" class="icon03"><a href="#three">贷后管理</a>
                    <ul class="sub-menu">
                        <shiro:hasPermission name="V0301">
                            <li><a class="index-navi-tab" href="#" src="page/lendRepay/repayList.jsp">还款管理</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>


        </ul>
    </div>


</div>
<div data-options="region:'center'">
    <div id="tabs" class="easyui-tabs" data-options="fit:true">
        <div title="首页"></div>
    </div>
</div>
<%@ include file="common/footer.jsp" %>
</body>
</html>