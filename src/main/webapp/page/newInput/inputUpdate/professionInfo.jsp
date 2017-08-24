<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<style>
   #professionForm .textbox{
        min-width:160px !important;
    }
</style>
<form id="professionForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">正式参加工作时间</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.occupationInfo.officialJobTime"
                                                            class="easyui-datebox" type="text"
                                                            data-options="panelHeight:'auto',required:true,validType:'lessThanToday'" style="width:200px;"/></div>
            <div class="main_content_td_graylast_small">缴纳社保公积金</div>
            <div class="main_content_td_whitelast_small"><input id="isPayOfSocialSecurityFund" name="lendCustomer.occupationInfo.isPayOfSocialSecurityFund" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:true"  style="width:200px;"/>
            </div>
        </div>
        <div class="div_bottom" id="occupation_detail" style="display: none">
            <div class="main_content_td_gray_small" style="width:10%" id="lendCustomer_occupationInfo_salaryGetForm_first" style="display: none">工资发放形式</div>
            <div class="main_content_td_white_small" style="width:18%" id="lendCustomer_occupationInfo_salaryGetForm_second" style="display: none"><input id="lendCustomer_occupationInfo_salaryGetForm" name="lendCustomer.occupationInfo.salaryGetForm" class="easyui-combobox"
                                                                                                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/15',required:false"  style="width:200px;"/>
            </div>
            <div class="main_content_td_graylast_small" style="width:8%" id="lendCustomer_isProvideWageCard_first" style="display: none">提供工资卡流水</div>
            <div class="main_content_td_whitelast_small" style="width:15%" id="lendCustomer_isProvideWageCard_second" style="display: none"><input id="lendCustomer_isProvideWageCard" name="lendCustomer.isProvideWageCard" class="easyui-combobox"
                                                                                                                                 data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:false"/>
            </div>
            
            <div class="main_content_td_graylast_small" style="width:5%" id="lendCustomer_occupationInfo_bankCard_first" style="display: none">银行卡号</div>
            <div class="main_content_td_whitelast_small" style="width:14%" id="lendCustomer_occupationInfo_bankCard_second" style="display: none"><input id="lendCustomer_occupationInfo_bankCard" name="lendCustomer.occupationInfo.bankCard" class="easyui-validatebox textbox" style="width:160px; height: 23px"
                                                            data-options="required:false, validType:['onlyNumberValidate']" /></div> 
            
            <div class="main_content_td_graylast_small" style="width:8%" id="lendCustomer_occupationInfo_lendTurnOverType_first" style="display: none">提供流水类型</div>
            <div class="main_content_td_whitelast_small" style="width:16%" id="lendCustomer_occupationInfo_lendTurnOverType_second" style="display: none"><input id="lendCustomer_occupationInfo_lendTurnOverType" name="lendCustomer.occupationInfo.lendTurnOverType" class="easyui-combobox"
                                                                                                                                               data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/35',required:false"/>
            </div>
            <div class="main_content_td_graylast_small" style="width:10%" id="lendCustomer_lendSoFundType_first" style="display: none">提供社保/公积金明细</div>
            <div class="main_content_td_whitelast_small" style="width:14%" id="lendCustomer_lendSoFundType_second" style="display: none"><input id="lendCustomer_lendSoFundType" name="lendCustomer.lendSoFundType" class="easyui-combobox"
                                                                                                                              data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/31',required:false"/>
            </div>
        </div>
        <div class="div_bottom" id="bank_name" style="display: none">
            <div class="main_content_td_gray_small" id="lendCustomer_occupationInfo_turnOverBankNameOne_div1" style="">流水1银行名称</div>
            <div class="main_content_td_white_small" id="lendCustomer_occupationInfo_turnOverBankNameOne_div2" style=""><input id="lendCustomer_occupationInfo_turnOverBankNameOne" name="lendCustomer.occupationInfo.turnOverBankNameOne" style="height: 23px" class="easyui-validatebox textbox"
                                                                                                                               data-options="required:false,validType:['chinese','sameBank[\'#lendCustomer_occupationInfo_turnOverBankNameTwo\']']"/>
            </div>
            <div class="main_content_td_graylast_small" id="lendCustomer_occupationInfo_turnOverBankNameTwo_div1" style="">流水2银行名称</div>
            <div class="main_content_td_whitelast_small" id="lendCustomer_occupationInfo_turnOverBankNameTwo_div2" style=""><input id="lendCustomer_occupationInfo_turnOverBankNameTwo" name="lendCustomer.occupationInfo.turnOverBankNameTwo" style="height: 23px" class="easyui-validatebox textbox"
                                                                                                                                   data-options="required:false,validType:['chinese','sameBank[\'#lendCustomer_occupationInfo_turnOverBankNameOne\']']"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">现单位经营主体全称</div>
            <div style="padding: 3px 0 3px 3px;">
                <input name="lendCustomer.occupationInfo.areaOfCompany" class="easyui-textbox easyui-validatebox" data-options="panelHeight:'auto',prompt:'地区命名',validType:['notOnlyNumberValidate','maxLength[64]']"/> -
                <input id="lendCustomer_occupationInfo_companyName" name="lendCustomer.occupationInfo.companyName" class="easyui-validatebox textbox" style="height: 23px" data-options="panelHeight:'auto',required:true,prompt:'公司名称命名',validType:['notOnlyNumberValidate','maxLength[64]']"/> -
                <input name="lendCustomer.occupationInfo.suffixOfCompanyName" class="easyui-textbox easyui-validatebox" data-options="panelHeight:'auto',prompt:'尾缀结构',validType:['notOnlyNumberValidate','maxLength[64]']"/> -
                <input name="lendCustomer.occupationInfo.branchCompanyName" class="easyui-textbox easyui-validatebox" data-options="panelHeight:'auto',prompt:'分公司附加',validType:['notOnlyNumberValidate','maxLength[64]']"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">现职单位/经营主体地址</div>
            <div style="padding: 3px 0;padding-left: 3px;">
                <input id="lendCustomer_occupationInfo_companyAddress_province" name="lendCustomer.occupationInfo.companyAddress.province" class="easyui-combobox"
                       data-options="panelHeight:'200px',url:'<%=basePath%>/dictionary/region/-1',required:true,onSelect: function (record) { $('#professionalCity').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/> -
                <input id="professionalCity" name="lendCustomer.occupationInfo.companyAddress.city" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,onSelect: function (record) {$('#professionalCountry').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/> -
                <input id="professionalCountry" name="lendCustomer.occupationInfo.companyAddress.dist" class="easyui-combobox" data-options="panelHeight:'200px',required:true"/> -
                <input name="lendCustomer.occupationInfo.companyAddress.town" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'街道/小区/楼'"/> -
                <input name="lendCustomer.occupationInfo.companyAddress.housenumber" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'门牌号/单元楼层号'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">单位电话</div>
            <div style="padding: 3px 0 3px 3px;">
                <input id="lendCustomer_occupationInfo_areaCode" name="lendCustomer.occupationInfo.areaCode" class="easyui-validatebox textbox" style="height: 23px"
                       data-options="panelHeight:'auto',required:true,prompt:'区号',validType:'areaCodeValidate'"/> -
                <input id="lendCustomer_occupationInfo_phone" name="lendCustomer.occupationInfo.phone" class="easyui-validatebox textbox" style="height: 23px"
                       data-options="panelHeight:'auto',required:true,prompt:'号码',validType:'numberPhoneValidate'"/> -
                <input id="lendCustomer_occupationInfo_branchNumber" name="lendCustomer.occupationInfo.branchNumber" class="easyui-validatebox textbox" style="height: 23px"
                       data-options="panelHeight:'auto',required:false,prompt:'分机号码'"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">现职单位/经营主体所属行业</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_occupationInfo_industryType" name="lendCustomer.occupationInfo.industryType" style="width:99% !important" class="easyui-combobox"
                                                            data-options="multiple:true,panelHeight:'auto',url:'<%=basePath%>/dictionary/option/23',required:true"/>
            </div>
        </div>
        <div class="div_bottom" id="profession_first" style="display: none">
            <div class="main_content_td_gray_small">入职时间</div>
            <div class="main_content_td_white_small"><input id="enterCompany" name="lendCustomer.occupationInfo.enterCompany" type="text"
                                                            class="easyui-datebox"
                                                            data-options="panelHeight:'auto',validType:'lessThanToday'"/></div>
            <div class="main_content_td_graylast_small">工作年限（年）</div>
            <div class="main_content_td_whitelast_small"><input id="workYears" name="lendCustomer.occupationInfo.workYears" class="easyui-numberbox"
                                                                data-options="min:0,max:100,precision:2,readonly:true"/>
            </div>
            <div class="main_content_td_graylast_small">现单位所在部门</div>
            <div class="main_content_td_whitelast_small"><input id="department" name="lendCustomer.occupationInfo.department" style="height: 23px" class="easyui-validatebox textbox"
                                                                data-options="panelHeight:'auto',validType:['notOnlyNumberValidate','maxLength[255]']"/></div>
        </div>
        <div class="div_bottom" id="profession_second" style="display: none">
            <div class="main_content_td_gray_small">现单位职位</div>
            <div class="main_content_td_white_small"><input id="jobTitleType" name="lendCustomer.occupationInfo.jobTitleType"
                                                                class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/29'"/>
            </div>
            <div class="main_content_td_graylast_small">现单位性质</div>
            <div class="main_content_td_whitelast_small"><input id="companyType" name="lendCustomer.occupationInfo.companyType"
                                                                class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/30'"/>
            </div>
            <div class="main_content_td_graylast_small" id="lendCustomer_occupationInfo_messageOfCompanyType_first" style="display: none">说明</div>
            <div class="main_content_td_whitelast_small" id="lendCustomer_occupationInfo_messageOfCompanyType_second" style="display: none"><input id="lendCustomer_occupationInfo_messageOfCompanyType" name="lendCustomer.occupationInfo.messageOfCompanyType" style="height: 23px" class="easyui-validatebox textbox"
                                                                                                                                                   data-options="panelHeight:'auto'"/></div>
        </div>
        <div class="div_bottom" id="partnerDiv" style="display: none">
            <div class="main_content_td_gray_small" id="lendCustomer_occupationInfo_partnerName_div1" style="">合作人名称</div>
            <div class="main_content_td_white_small" id="lendCustomer_occupationInfo_partnerName_div2" style=""><input id="lendCustomer_occupationInfo_partnerName" name="lendCustomer.occupationInfo.partnerName" style="height: 23px" class="easyui-validatebox textbox"
                                                                                                                               data-options="required:false"/>
            </div>
            <div class="main_content_td_graylast_small" id="lendCustomer_occupationInfo_partnerPhone_div1" style="">合作人电话</div>
            <div class="main_content_td_whitelast_small" id="lendCustomer_occupationInfo_partnerPhone_div2" style=""><input id="lendCustomer_occupationInfo_partnerPhone" name="lendCustomer.occupationInfo.partnerPhone" style="height: 23px" class="easyui-validatebox textbox"
                                                                                                                                   data-options="required:false,validType:'mobileAndTel'"/>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</form>