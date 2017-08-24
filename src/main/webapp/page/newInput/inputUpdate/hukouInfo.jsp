<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="hukouForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">户主姓名</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendHouseholdRegister.houseHolderName" class="easyui-textbox easyui-validatebox" data-options="required:true,validType:['CHS','maxLength[32]']"/></div>
            <div class="main_content_td_graylast_small">户主身份证号码</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.lendHouseholdRegister.houseHolderIdno" class="easyui-textbox easyui-validatebox" data-options="required:true,validType:'idcard'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">户主页地址</div>
            <div style="padding: 3px 0;padding-left: 3px;">
                <input name="lendCustomer.lendHouseholdRegister.householdRegisterAddress.province" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,url:'<%=basePath%>/dictionary/region/-1',onSelect: function (record) { $('#hukouCity').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>
                -
                <input id="hukouCity" name="lendCustomer.lendHouseholdRegister.householdRegisterAddress.city" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,onSelect: function (record) {$('#hukouCountry').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>
                -
                <input id="hukouCountry" name="lendCustomer.lendHouseholdRegister.householdRegisterAddress.dist" class="easyui-combobox" data-options="panelHeight:'200px',required:true"/> -
                <input name="lendCustomer.lendHouseholdRegister.householdRegisterAddress.town" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'街道/小区/楼'"/> -
                <input name="lendCustomer.lendHouseholdRegister.householdRegisterAddress.housenumber" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'门牌号/单元楼层号'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">申请人与户主的关系</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendHouseholdRegister.householdRegisterRelationship" class="easyui-combobox" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/21',required:true"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">申请人配偶姓名</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_lendHouseholdRegister_householdRegisterSpouse" name="lendCustomer.lendHouseholdRegister.householdRegisterSpouse" class="easyui-validatebox textbox" style="height: 23px " data-options="required:false,validType:['CHS','maxLength[32]']"/></div>
            <div class="main_content_td_graylast_small">申请人配偶身份证号码</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_lendHouseholdRegister_householdRegisterSpouseIdno" name="lendCustomer.lendHouseholdRegister.householdRegisterSpouseIdno"  class="easyui-validatebox textbox" style="height: 23px " data-options="required:false,validType:'idcard'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">申请人子女姓名</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendHouseholdRegister.householdRegisterChilds" class="easyui-textbox easyui-validatebox" data-options="required:false,validType:['CHS','maxLength[32]']"/></div>
            <div class="main_content_td_graylast_small">子女出生年月</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_lendHouseholdRegister_householdRegisterChildBirthdays" name="lendCustomer.lendHouseholdRegister.householdRegisterChildBirthdays" class="easyui-datebox" data-options="required:false,validType:'enterCompanyValidate[]',readonly:true"/></div>
            <div class="main_content_td_graylast_small">子女身份证号码</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_lendHouseholdRegister_householdRegisterChildIdnos" name="lendCustomer.lendHouseholdRegister.householdRegisterChildIdnos" class="easyui-textbox" data-options="required:false,validType:'idcard'"/></div>
        </div>
        <div class="clear"></div>
    </div>
</form>