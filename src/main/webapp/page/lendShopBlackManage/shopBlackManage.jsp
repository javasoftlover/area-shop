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
            $.includeFile('head', "/js/lendShopBlackManage/shopBlackManage.js");
        });
    </script>
</head>

<body>
<form id="shopBlackForm" method="post" class="easyui-form" style="overflow:auto;width:100%;height:99%;position:absolute">
<div style="width:97%;margin:0 auto;">
    <input type="hidden" id="creater" name="creater">
    <input type="hidden" id="area" name="area">
    <input type="hidden" id="shop" name="shop">
    <input type="hidden" id="commitPersion" name="commitPersion">
    <input type="hidden" id="organizationCode" name="organizationCode">

    <div id="blackListTypeDiv">
    <div class="easyui-panel" title="黑灰标识" style="width:99%" >
            <div class="main_content_td_gray_small">加入类型:</div>
            <div class="main_content_td_white_small">
                <input type="text" id="blacklistTypeName" name="blacklistTypeName" style="border:0;padding:5px" >
            </div>
    </div>
    </div>
    <br>
    <div class="easyui-panel" title="名单申请" style="width:99%">

                <div class="main_content_td_gray_small">姓名:</div>
                <div class="main_content_td_white_small">
                    <input type="text" id="name" name="name" class="easyui-validatebox textbox validate" data-options="required:true,prompt:'户姓名',validType:'CHS'" style="height: 23px;width: 70%">
                </div>
                <div class="main_content_td_gray_small">身份证号:</div>
                <div class="main_content_td_white_small">
                    <input type="text" id="idNo" name="idNo" class="easyui-validatebox easyui-textbox" data-options="validType:'idcard',required:true">
                </div>
    </div>

    <br>
    <div class="easyui-panel" title="来源" style="width:99%">
            <div class="div_bottom">
                <div class="main_content_td_gray_small">提交省份:</div>
                <div class="main_content_td_white_small">
                    <input type="text" readonly="readonly" id="provinceName" name="provinceName" class="easyui-textbox">
                </div>
                <div class="main_content_td_gray_small">提交城市:</div>
                <div class="main_content_td_white_small">
                    <input type="text" readonly="readonly" id="cityName" name="cityName" class="easyui-textbox" >
                </div>
            </div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small">区域:</div>
                <div class="main_content_td_white_small">
                    <input type="text" readonly="readonly" id="areaName" name="areaName" class="easyui-textbox">
                </div>
                <div class="main_content_td_gray_small">门店:</div>
                <div class="main_content_td_white_small">
                    <input type="text" readonly="readonly" id="shopName" name="shopName" class="easyui-textbox" >
                </div>
            </div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small">来源机构:</div>
                <div class="main_content_td_white_small">
                    <input type="text" id="sourceOrg" name="sourceOrg" class="easyui-combobox">
                </div>
                <div class="main_content_td_gray_small">其他:</div>
                <div class="main_content_td_white_small">
                    <input type="text" id="sourceOrgName" name="sourceOrgName" class="easyui-textbox" data-options="validType:'length[0,30]'">
                </div>
            </div>

            <div class="main_content_td_gray_small">资源信息:</div>
            <div class="main_content_td_white_small">
                <input type="text" id="sourceInformation" name="sourceInformation" class="easyui-combobox" >
            </div>
            <div class="main_content_td_gray_small">资源提供地址:</div>
            <div class="main_content_td_white_small">
                <input type="text" id="sourceAddress" name="sourceAddress" class="easyui-textbox" data-options="validType:'length[0,30]'">
            </div>

    </div>
    <br>
    <div class="easyui-panel" title="加入原因" style="width:99%">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">申请类别:</div>
            <div class="main_content_td_white_small">
                <input type="text" id="classOneTypeId" name="classOneTypeId" class="easyui-combobox" data-options="required:true">
            </div>
            <div class="main_content_td_white_small">
                <input type="text" id="classTwoTypeId" name="classTwoTypeId" class="easyui-combobox" data-options="required:true">
            </div>
        </div>
        <div class="div_bottom" id="blockList">

            <div class="main_content_td_gray_small">具体明细:</div>
            <div class="main_content_td_white_small">
                <input type="text" id="blockListKey1" name="blockListKey" class="easyui-combobox">
            </div>
            <div class="main_content_td_white_small">
                <input type="text" id="blockListKeyDesc1" name="blockListKeyDesc" class="easyui-textbox" data-options="required:true">
            </div>
            <div  style="margin-left:50%">
                <a href="#" class="easyui-linkbutton" id="ContentTypeAdd">增加</a>
            </div>

    </div>
            <div class="main_content_td_gray_small" >黑名单原因:</div>
            <div class="main_content_td_whitelast_small">
                <input type="text" name="reason" id="reason" class="easyui-textbox"
                       data-options="multiline:true,required:true,prompt:'添加黑名单备注'" style="height:129%;width:200%"/>
            </div>
    </div>
    <br>

    <div id="tab-tools" style="margin-left:90%">
        <a href="#" id="saveAll" class="easyui-linkbutton c6">保存</a>
    </div>

</div>
    </form>
</body>
</html>