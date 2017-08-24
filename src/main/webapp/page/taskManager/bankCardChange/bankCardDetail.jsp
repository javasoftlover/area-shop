<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
</head>
<script>$(function() {$.includeFile('head', ["/js/taskManager/bankCardChange/bankCardDetail.js","/js/lendAttachment/attachmentCommons.js"]);});</script>
<body style="margin:8px 0px; " >
<div style="width: 100%;height: 100%;overflow: auto;">
	<div style="width:97%;margin:0 auto;">
		<div class="easyui-panel" title="客户基本信息" style="width:99%; border: false">
			<form class="main_content_table" id="baseInfoForm">
				<div class="div_bottom">
					<div class="main_content_td_gray_small4">进件编号</div>
					<div class="main_content_td_white_small4">
						<input id="lendRequestId" name="lendRequestId" style="border:0;padding:5px;" readonly/>
					</div>
					<div class="main_content_td_graylast_small4">姓名</div>
					<div class="main_content_td_whitelast_small4">
						<input id="lendCustomerName" name="lendCustomerName" style="border:0;padding:5px" readonly/></div>
					<div class="main_content_td_graylast_small4">身份证号码</div>
					<div class="main_content_td_whitelast_small4">
						<input id="idNo" name="idNo" style="border:0;padding:5px" readonly/>
					</div>
					<div class="main_content_td_graylast_small4">手机号</div>
					<div class="main_content_td_whitelast_small4">
						<input id="mobile" name="mobile" style="border:0;padding:5px" readonly="readonly"/>
					</div>
				</div>
				<div class="clear"></div>
			</form>
		</div>
	</div>
	<br>
	<div style="width:97%;margin:0 auto;" id="mainCardId">
		<div class="easyui-panel" title="原主卡信息" style="width:99%; border: false">
			<form class="main_content_table" id="mainCardInfo">
				<div class="div_bottom">
					<div class="main_content_td_gray_small">银行名称</div>
					<div class="main_content_td_white_small">
						<input id="mainBankName" name="bankName" style="border:0;padding:5px;" readonly/>
					</div>
					<div class="main_content_td_graylast_small">预留手机号</div>
					<div class="main_content_td_whitelast_small">
						<input id="mainOrderMobile" name="orderMobile" style="border:0;padding:5px" readonly/></div>
					<div class="main_content_td_graylast_small">开户行</div>
					<div class="main_content_td_whitelast_small">
						<input id="mainBranchName" name="bankBranchName" style="border:0;padding:5px" readonly/>
					</div>
				</div>
				<div class="div_bottom">
					<div class="main_content_td_gray_small">支行行号</div>
						<div class="main_content_td_white_small">
							<input id="mainBranchNo" name="branchNo"  style="border:0;padding:5px" readonly="readonly"/>
						</div>
					<div class="main_content_td_graylast_small">银行卡号</div>
						<div class="main_content_td_whitelast_small">
							<input id="mainCardNo" name="cardNo" style="border:0;padding:5px" readonly="readonly"/>
						</div>
				</div>

				<div class="clear"></div>
			</form>
		</div>
	</div>
	<br>
	<div style="width:97%;margin:0 auto;" id="viceCardId">
		<div class="easyui-panel" title="原副卡信息" style="width:99%; border: false">
			<form class="main_content_table" id="viceCardInfo">
				<div class="div_bottom">
					<div class="main_content_td_gray_small">银行名称</div>
					<div class="main_content_td_white_small">
						<input id="viceBankName" name="bankName" style="border:0;padding:5px;" readonly/>
					</div>
					<div class="main_content_td_graylast_small">预留手机号</div>
					<div class="main_content_td_whitelast_small">
						<input id="viceOrderMobile" name="orderMobile" style="border:0;padding:5px" readonly/></div>
					<div class="main_content_td_graylast_small">开户行</div>
					<div class="main_content_td_whitelast_small">
						<input id="viceBranchName" name="bankBranchName" style="border:0;padding:5px" readonly/>
					</div>
				</div>
				<div class="div_bottom">
					<div class="main_content_td_gray_small">支行行号</div>
					<div class="main_content_td_white_small">
						<input id="viceBranchNo" name="branchNo" style="border:0;padding:5px" readonly="readonly"/>
					</div>
					<div class="main_content_td_graylast_small">银行卡号</div>
					<div class="main_content_td_whitelast_small">
						<input id="viceCardNo" name="cardNo" style="border:0;padding:5px" readonly="readonly"/>
					</div>
				</div>

				<div class="clear"></div>
			</form>
		</div>
	</div>
	<br>
	<div style="width:97%;margin:0 auto;" id="mainAuthenticationIdDiv">
		<div class="easyui-panel" title="变更主卡信息" style="width:99%; border: false">
			<form class="main_content_table" id="mainAuthenticationId">
				<div class="div_bottom">
					<div class="main_content_td_gray_small4">银行名称:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankInfo_bankName" id="lendBankInfo_bankName" class="easyui-combobox"
							   data-options="required:true,url:'<%=basePath%>/lendSign/bankName',method:'get',valueField:'bankCode',textField:'bankName',prompt:'银行名称'" style="height: 23px;width: 99%"/>
					</div>
					<div class="main_content_td_graylast_small4">预留手机号:</div>
					<div class="main_content_td_whitelast_small4">
						<input type="text" name="orderMobile" id="orderMobile" class="easyui-validatebox textbox" style="height: 23px;width: 98%" data-options="required:true,validType:'mobile'" placeholder="预留手机号" />
					</div>
					<div class="main_content_td_graylast_small4">开户行省份:</div>
					<div class="main_content_td_whitelast_small4">
						<input type="text" name="lendBankInfo_bankProvince" id="lendBankInfo_bankProvince" style="height: 23px;width: 99%" class="easyui-combobox" data-options="panelHeight:'200px'"/>
					</div>
					<div class="main_content_td_graylast_small4">开户行城市:</div>
					<div class="main_content_td_whitelast_small4">
						<input type="text" name="lendBankInfo_bankCity" id="lendBankInfo_bankCity"  style="height: 23px;width: 99%" class="easyui-combobox" data-options="required:true,prompt:'开户行城市'"/>
					</div>
				</div>
				<div class="div_bottom">
					<div class="main_content_td_gray_small4">支行名称:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankInfo_bankBranchName" id="lendBankInfo_bankBranchName"  style="height: 23px;width: 99%" class="easyui-combobox" data-options="required:true,hasDownArrow:false,editable:true,prompt:'支行名称'" />
					</div>
					<div class="main_content_td_graylast_small4">支行行号:</div>
					<div class="main_content_td_whitelast_small4">
						<input type="text" name="lendBankInfo_branchNo" id="lendBankInfo_branchNo" style="height: 23px;width: 99%"  class="easyui-validatebox textbox" style="height: 23px" data-options="required:true,prompt:'支行行号'" readonly/>
					</div>
					<div class="main_content_td_graylast_small4">银行卡号:</div>
					<div class="main_content_td_whitelast_small4">
						<input type="text" name="lendBankInfo_cardNo" id="lendBankInfo_cardNo"  style="height: 23px;width: 99%" class="easyui-validatebox textbox"
							   data-options="required:true,validType:['onlyNumberValidate','maxLength[30]','isEqualTwo[\'#viceCardNo\']']" style="height: 23px" oncopy="return false;" onpaste="return false;" oncut="return false;" style="height: 23px" placeholder="银行卡号"/>
					</div>
					<div class="main_content_td_graylast_small4">确认银行卡号:</div>
					<div class="main_content_td_whitelast_small4">
						<input type="text" style="height: 23px;width: 99%" id="replayCardNo" class="easyui-validatebox textbox"
							   data-options="required:true,validType:['onlyNumberValidate','maxLength[30]','equalTo[\'#lendBankInfo_cardNo\']']" style="height: 23px" oncopy="return false;"  onpaste="return false;" oncut="return false;" placeholder="确认银行卡号"/>
					</div>
				</div>
				<div class="clear"></div>
			</form>
		</div>
	</div>
	<div style="width:97%;margin:0 auto;" id="viceAuthenticationIdDiv">
		<div class="easyui-panel" title="变更副卡信息" style="width:99%; border: false">
			<form class="main_content_table" id="viceAuthenticationId">
				<input type="text" name="viceUniqueId" id="viceUniqueId" hidden="hidden" readonly/>
				<div class="div_bottom">
					<div class="main_content_td_gray_small4">银行名称:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankViceInfo_bankName" id="lendBankViceInfo_bankName" class="easyui-combobox"
							   data-options="required:true,url:'<%=basePath%>/lendSign/bankName',method:'get',valueField:'bankCode',textField:'bankName',prompt:'银行名称'" style="height: 23px;width: 99%"/>
					</div>
					<div class="main_content_td_gray_small4">预留手机号:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="orderMobile1" id="orderMobile1" class="easyui-validatebox textbox" data-options="required:true,validType:'mobile'" placeholder="预留手机号" style="height: 23px;width: 99%"/>
					</div>
					<div class="main_content_td_gray_small4">开户行省份:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankViceInfo_bankProvince" id="lendBankViceInfo_bankProvince" style="height: 23px;width: 99%" class="easyui-combobox" data-options="panelHeight:'200px'"/>
					</div>
					<div class="main_content_td_gray_small4">开户行城市:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankViceInfo_bankCity" id="lendBankViceInfo_bankCity"  style="height: 23px;width: 99%" class="easyui-combobox" data-options="required:true,prompt:'开户行城市'"/>
					</div>
				</div>
				<div class="div_bottom">
					<div class="main_content_td_gray_small4">支行名称:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankViceInfo_bankBranchName" id="lendBankViceInfo_bankBranchName"  style="height: 23px;width: 99%" class="easyui-combobox" data-options="required:true,hasDownArrow:false,editable:true,prompt:'支行名称'" />
					</div>
					<div class="main_content_td_gray_small4">支行行号:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankViceInfo_branchNo" id="lendBankViceInfo_branchNo" style="height: 23px;width: 99%"  class="easyui-validatebox textbox" style="height: 23px" data-options="required:true,prompt:'支行行号'" readonly/>
					</div>
					<div class="main_content_td_gray_small4">银行卡号:</div>
					<div class="main_content_td_white_small4">
						<input type="text" name="lendBankViceInfo_cardNo" id="lendBankViceInfo_cardNo"  style="height: 23px;width: 99%" class="easyui-validatebox textbox"
							   data-options="required:true,validType:['onlyNumberValidate','maxLength[30]','isEqualTwo[\'#viceCardNo\']']" style="height: 23px" oncopy="return false;" onpaste="return false;" oncut="return false;" style="height: 23px" placeholder="银行卡号"/>
					</div>
					<div class="main_content_td_gray_small4">确认银行卡号:</div>
					<div class="main_content_td_white_small4">
						<input type="text" style="height: 23px;width: 99%" id="replayViceCardNo" class="easyui-validatebox textbox"
							   data-options="required:true,validType:['onlyNumberValidate','maxLength[30]','equalTo[\'#lendBankViceInfo_cardNo\']']" style="height: 23px" oncopy="return false;"  onpaste="return false;" oncut="return false;" placeholder="确认银行卡号"/>
					</div>
				</div>
				<div class="clear"></div>
				<div class="div_bottom" style="display: none" id="messageCodeDiv">
					<div class="main_content_td_gray_small4" >
						<a href="#" id="getViceChangeMessageCodeBtn" class="easyui-linkbutton c6">获取验证码</a>
					</div>
					<div class="main_content_td_white_small4">
						<input id="viceVerifyValue" name="viceVerifyValue" class="easyui-validatebox textbox" style="height: 24px;width: 100%"
							   data-options="validType:'onlyNumberValidate'" maxlength="6"/>
					</div>
				</div>
				<div class="clear"></div>
			</form>
		</div>
	</div>
	<br>
	<div style="width:97%;margin:0 auto;">
		<div class="easyui-panel" title="银行卡鉴权" style="width:99%;border: false">
			<div class="main_content_table">
				<div class="div_bottom">
					<div class="main_content_td_gray_small2">银行卡鉴权</div>
					<div class="main_content_td_white_small2">
						<span id="bank_card_auth_ok" class="icon-ok" style="display:none;width:30px;height:30px;float:left"></span>
						<a href="#" id="bank_card_auth" isClick="false" class="easyui-linkbutton c6" data-options="disabled:'true'">银行卡鉴权</a>

					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<br>
	<div style="width:97%;margin:0 auto;">
		<div class="easyui-panel" title="生成委托划扣授权书" style="width:99%;border: false">
			<div class="main_content_table">
				<div class="div_bottom">
					<div class="main_content_td_gray_small2">生成委托划扣授权书</div>
					<div class="main_content_td_white_small2">
						<span id="entrust_authorization_ok" class="icon-ok"
							  style="display:none;width:30px;height:30px;float:left"></span>
						<a href="#" id="entrust_authorization" isClick="false" class="easyui-linkbutton c6 "
						   data-options="disabled:'true'">生成委托划扣授权书</a>
					</div>
					<a href="#" id="view_entrust_authorization" class="easyui-linkbutton c6 " data-options="">预览</a>
					<a href="#" id="download_entrust_authorization" class="easyui-linkbutton c6 " data-options="">下载</a>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
	<br>
    <div id="verificationCode" style="width:97%;margin:0 auto;">
        <div class="easyui-panel" title="申请电子签章" style="width:99%;border: false">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">获取验证码:</div>
                    <div class="main_content_td_white_small">
                        <input id="messageCode" class="easyui-validatebox textbox" style="height: 23px"
                               data-options="required:true,validType:'onlyNumberValidate',disabled:'true'" maxlength="6"/>
                    </div>
                    <div class="main_content_td_whitelast_small">
                        <a href="#" id="messageCodeBtn" class="easyui-linkbutton c6"  data-options="disabled:'true'">获取验证码</a>
                        <a href="#" id="authMessageAndSealBtn" class="easyui-linkbutton c1"  data-options="disabled:'true'"
                           style="margin-left: 60px">验证并盖章</a>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
	<br>
	<div id="container_upload_authorization_div" style="width:97%;margin:0 auto;display: none">
		<div class="easyui-panel" title="上传委托划扣授权书" style="width:99%;border: false">
			<div class="main_content_table">
				<div class="div_bottom">
					<div class="main_content_td_gray_small2">上传委托划扣授权书</div>
					<div class="main_content_td_white_small2">
						<span id="upload_authorization_ok" class="icon-ok" style="display:none;width:30px;height:30px;float:left"></span>
						<div id="container_upload_authorization" style="display: none"></div>
						<a href="#" id="upload_authorization" isClick="false" class="easyui-linkbutton c6 "  data-options="disabled:'true'">上传委托划扣授权书</a>

					</div>
					<a href="#" id="view_authorization" class="easyui-linkbutton c6 " data-options="">预览</a>

				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<br>
	<div style="float:left; margin:8px 391px" id="audit">
		<a href="#" class="easyui-linkbutton c1" data-options="iconCls:'icon-ok',disabled:'true'" id="submitBtn">提交</a>
		<a href="#" class="easyui-linkbutton c1" data-options="iconCls:'icon-cancel'" id="resetBtn">重置</a>
	</div>
	</div>
</body>
</html>