<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <script>$(function () {
        $.includeFile('head', ["/component/fancyBox/jquery.fancybox.css",
            "/component/fancyBox/jquery.fancybox.js",
            "/component/fancyBox/jquery.fancybox.pack.js",
            "/js/lendRequestManage/sign/sign.js",
            "/js/lendAttachment/attachmentCommons.js",
            "/component/agoVideo/js/ago.js"
        ]);
    });
    </script>

</head>
<body style="margin:8px 0px;">
<div style="width: 100%;height: 100%;overflow: auto;">
<div style="width:97%;margin:0 auto;">
    <div class="easyui-panel" title="客户基本信息" style="width:99%; border: false">
        <form class="main_content_table" id="lendSignForm">
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">进件编号</div>
                <div class="main_content_td_white_small4">
                    <input type="hidden" id="appLendRequestId" name="appLendRequestId" />
                    <input id="lendRequestId" name="id" style="border:0;padding:5px;" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">姓名</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="name" name="lendCustomer.name" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">身份证号码</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="idNo" name="lendCustomer.idNo" style="border:0;padding:5px" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">手机号</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="mobile" name="lendCustomer.mobile" style="border:0;padding:5px" readonly="readonly"/>
                </div>
            </div>
            <div class="clear"></div>
        </form>
    </div>
</div>
<br>
<div style="width:97%;margin:0 auto;">
    <div class="easyui-panel" title="生成合同" style="width:99%;border: false">
        <div class="main_content_table">
            <div class="div_bottom">
                <div class="main_content_td_gray_small">生成合同</div>
                <div class="main_content_td_white_small">
                    <span id="bank_card_auth_ok" class="icon-ok" style="display:none;width:20px;height:30px;float:left"></span>
                    <a href="#" id="bankCardAuth" class="easyui-linkbutton c6 ">银行卡鉴权</a>
                </div>
                <div class="main_content_td_whitelast_small6" style="display: none" id="isShowVideoSignDiv">
                    <span id="channel_ok" class="icon-ok" style="display:none;width:20px;height:30px;float:left"></span>
                    <a href="#" id="videoSign" class="easyui-linkbutton c6">&nbsp;获取频道号 &nbsp;</a>
                    <span id="channelNum" style="display:none;width:400px;float:right"></span>
                </div>
                <div class="main_content_td_whitelast_small6" style="display: none" id="isShowCreateContractDiv">
                    <span id="create_contract_ok" class="icon-ok" style="display:none;width:20px;height:30px;float:left"></span>
                    <a href="#" id="createContract" class="easyui-linkbutton c6">&nbsp;生成合同 &nbsp;</a>
                </div>
                <div class="main_content_td_whitelast_small6" style="display: none" id="afreshContract">
                    <a href="#" id="afreshContractBtn" class="easyui-linkbutton c6">重新生成合同</a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>
<br>
<div id="verificationCode" style="display: none;width:97%;margin:0 auto;">
    <div class="easyui-panel" title="申请电子签章" style="width:99%;border: false">
        <div class="main_content_table">
            <div class="div_bottom">
                <div class="main_content_td_gray_small">获取验证码:</div>
                <div class="main_content_td_white_small">
                    <input id="messageCode" class="easyui-validatebox textbox" style="height: 23px"
                           data-options="required:true,validType:'onlyNumberValidate'" maxlength="6"/>
                </div>
                <div class="main_content_td_whitelast_small">
                    <a href="#" id="messageCodeBtn" class="easyui-linkbutton c6">获取验证码</a>
                    <a href="#" id="authMessageAndSealBtn" class="easyui-linkbutton c1"
                       style="margin-left: 60px">验证并盖章</a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>
<br>
<div id="viewContract" style="display: none;width:97%;margin:0 auto;">
    <div class="easyui-panel" title="合同查看" style="width:99%;border: false">
        <div class="main_content_table" id="viewMainContentTable">
        </div>
    </div>
</div>
<br>
<div id="container_uploadMobileInfoBtn"></div>
<div id="container_uploadSignPhotoBtn"></div>
<div id="container_uploadSignContractBtn"></div>
<div id="uploadContract" style="display: none;width:97%;margin:0 auto;">
    <div class="easyui-panel" title="上传" style="width:99%;border: false">
        <div class="main_content_table">
            <div class="div_bottom">
                <div class="main_content_td_gray_small">手机详单:</div>
                <div class="main_content_td_whitelast_small">
                    <a href="#" id="uploadMobileInfoBtn" class="easyui-linkbutton c6" style="float:left">上传/重新上传</a>
                    <a href="#" id="MOBILE_INFO_VIEW" class="easyui-linkbutton c1" style="margin-left: 60px;float:left">预览</a>
                    <span id="MOBILE_INFO_OK" class="icon-ok" style="display:none;width:30px;height:30px;float:left"></span>
                </div>
            </div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small">签约照片:</div>
                <div class="main_content_td_whitelast_small">
                    <a href="#" id="uploadSignPhotoBtn" class="easyui-linkbutton c6" style="float:left">上传/重新上传</a>
                    <a href="#" id="SIGN_PHOTO_VIEW" class="easyui-linkbutton c1" style="margin-left: 60px;float:left" >预览</a>
                    <span id="SIGN_PHOTO_OK" class="icon-ok" style="display:none;width:30px;height:30px;float:left"></span>
                </div>
            </div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small">签约合同:</div>
                <div class="main_content_td_whitelast_small">
                    <a href="#" id="uploadSignContractBtn" class="easyui-linkbutton c6" style="float:left">上传/重新上传</a>
                    <a href="#" id="SIGN_CONTRACT_VIEW" class="easyui-linkbutton c1" style="margin-left:60px;float: left">预览</a>
                    <span id="SIGN_CONTRACT_OK" class="icon-ok" style="display:none;width:30px;height:30px;float:left"></span>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>
    <div style="float:left; margin:8px 391px; display: none" id="Auditing">
        <a href="#" class="easyui-linkbutton c1" data-options="iconCls:'icon-ok'" id="sumbitBtn">提交签约合同</a>
    </div>
</div>
</body>
</html>