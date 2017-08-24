<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="weddingForm" method="post">
    <div class="main_content_table">
   		<div class="div_bottom">
	        <div class="main_content_td_gray_small">配偶姓名</div>
	        <div class="main_content_td_white_small"><input name="lendCustomer.lendMarriageCertificate.marriageCertificateSpouse" class="easyui-textbox easyui-validatebox" data-options="required:true,validType:['CHS','maxLength[32]']"/></div>
	        <div class="main_content_td_graylast_small">配偶身份证号码</div>
	        <div class="main_content_td_whitelast_small"><input name="lendCustomer.lendMarriageCertificate.marriageCertificateSpouseIdno" class="easyui-textbox easyui-validatebox" data-options="required:true,validType:'idcard'"/></div>
	        <div class="main_content_td_graylast_small">结婚登记日期</div>
	        <div class="main_content_td_whitelast_small"><input name="lendCustomer.lendMarriageCertificate.marriageCertificateTime" class="easyui-datebox" data-options="required:true,validType:'enterCompanyValidate[]'"/></div>
    	</div>
    	<div class="clear"></div>
    </div>
</form>