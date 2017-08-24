<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="educationForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">学历证书类型</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendDegreeCertificate.degreeType" id="lendCustomer_lendDegree_Certificate_degreeType" class="easyui-combobox" style="width:210px" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/22',required:true"/></div>
            <div class="main_content_td_graylast_small"  id="lendDegreeCertificate_degreeNumber_first" style="display: none">学历证书编号</div>
            <div class="main_content_td_whitelast_small" id="lendDegreeCertificate_degreeNumber_second" style="display: none"><input id="lendCustomer_lendDegreeCertificate_degreeNumber_main_1" name="lendCustomer.lendDegreeCertificate.degreeNumber" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:false,validType:'chineseAndNumber'"/></div>
            <div class="main_content_td_graylast_small" id="lendDegreeCertificate_degreeNumber_third" style="display: none">确认学历证书编号</div>
            <div class="main_content_td_whitelast_small" id="lendDegreeCertificate_degreeNumber_forth" style="display: none"><input id="lendCustomer_lendDegreeCertificate_degreeNumber_main_2" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:false" validType="sameValidate['#lendCustomer_lendDegreeCertificate_degreeNumber_main_1']"  oncopy="return false;" onpaste="return false;" oncut="return false;"/></div>


            <div class="main_content_td_gray_small" style="display: none" id="lendDegreeCertificate_degreeNumber_fifth">学历证书编号</div>
            <div style="display: none; padding: 3px 0 3px 3px;" id="lendDegreeCertificate_degreeNumber_sixth">
                <input id="lendCustomer_lendDegreeCertificate_degreeNumber1" class="easyui-validatebox textbox" style="height: 23px" validType="notNumberValidate['#lendCustomer_lendDegreeCertificate_degreeNumber1']" data-options="panelHeight:'200px',required:false"/>&nbsp;&nbsp; -&nbsp;&nbsp;
                <input id="lendCustomer_lendDegreeCertificate_degreeNumber2" class="easyui-validatebox textbox" style="height: 23px" validType="onlyNumberValidateAndCount['#lendCustomer_lendDegreeCertificate_degreeNumber2',4]" data-options="panelHeight:'200px',required:false"/>&nbsp;&nbsp;-&nbsp;&nbsp;
                <input id="lendCustomer_lendDegreeCertificate_degreeNumber3" class="easyui-validatebox textbox" style="height: 23px" validType="onlyNumberValidate['#lendCustomer_lendDegreeCertificate_degreeNumber3']" data-options="panelHeight:'200px',required:false"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">学历证书取得时间</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendDegreeCertificate.degreeTime" class="easyui-datebox" data-options="required:true,validType:'lessThanToday'"/></div>
        </div>
    	<div class="clear"></div>
    </div>
</form>