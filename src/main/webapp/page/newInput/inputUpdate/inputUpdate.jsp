<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
</head>
<script>$(function() {$.includeFile('head', "/js/newInput/inputUpdate/inputUpdate.js");});</script>
<body>
<div id="loading" style="position: absolute; z-index: 1000; top: 0px; left: 0px; width: 100%; height: 100%; background: #DDDDDB; text-align: center; padding-top: 20%;">页面加载中……</div>
<div class="easyui-tabs" data-options="tools:'#tab-tools',fit:true" id="updateRequestFormTab">
    <div title="借款需求" style="padding: 10px;" id="borrowing">
        <jsp:include page="/page/newInput/inputUpdate/borrowing.jsp" flush="true"/>
    </div>
    <div title="基本信息" style="padding: 10px;" id="baseInfo">
        <jsp:include page="/page/newInput/inputUpdate/baseInfo.jsp" flush="true"/>
    </div>
    <div title="职业信息" style="padding: 10px;" id="professionInfo">
        <jsp:include page="/page/newInput/inputUpdate/professionInfo.jsp" flush="true"/>
    </div>
    <div title="联系人信息" style="padding: 10px;" id="contractInfo">
        <jsp:include page="/page/newInput/inputUpdate/contractInfo.jsp" flush="true"/>
    </div>
    <div title="身份证信息" style="padding: 10px;" id="idCardInfo">
        <jsp:include page="/page/newInput/inputUpdate/idCardInfo.jsp" flush="true"/>
    </div>
    <div title="房产证信息" style="padding: 10px;" id="houseInfo">
        <jsp:include page="/page/newInput/inputUpdate/houseInfo.jsp" flush="true"/>
    </div>
    <div title="户口本信息" style="padding: 10px;" id="hukouInfo">
        <jsp:include page="/page/newInput/inputUpdate/hukouInfo.jsp" flush="true"/>
    </div>
    <div title="结婚证信息" style="padding: 10px;" id="weddingInfo">
        <jsp:include page="/page/newInput/inputUpdate/weddingInfo.jsp" flush="true"/>
    </div>
    <div title="学历证书信息" style="padding: 10px;" id="educationInfo">
        <jsp:include page="/page/newInput/inputUpdate/educationInfo.jsp" flush="true"/>
    </div>
    <div title="经营信息" style="padding: 10px;" id="manageInfo">
        <jsp:include page="/page/newInput/inputUpdate/manageInfo.jsp" flush="true"/>
    </div>
</div>
<div id="tab-tools">
    <a id="updateAll" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" style="width:15%">保存</a>
</div>
<script>
    function show(){
        $("#loading").fadeOut("normal", function(){
            $(this).remove();
        });
    }
    var delayTime;
    $.parser.onComplete = function(){
        if(delayTime)
            clearTimeout(delayTime);
        delayTime = setTimeout(show,500);
    }
</script>
</body>
</html>