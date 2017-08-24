<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="manageForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">经营主体范围(营业执照为准)</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_companyInfoOfCustomer_businessSubjectRange" name="lendCustomer.companyInfoOfCustomer.businessSubjectRange" class="easyui-textbox easyui-validatebox" data-options="required:true"/></div>
            <div class="main_content_td_graylast_small">客户身份</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_companyInfoOfCustomer_identity" name="lendCustomer.companyInfoOfCustomer.identity" class="easyui-combobox" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/24',required:true"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">企业注册时间</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.companyInfoOfCustomer.registrationTime" class="easyui-datebox" data-options="required:true,validType:'lessThanToday'"/></div>
            <div class="main_content_td_graylast_small">注册资本(万元)</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_companyInfoOfCustomer_registrationCapital" name="lendCustomer.companyInfoOfCustomer.registrationCapital" class="easyui-numberbox" data-options="required:true,min:0"/></div>
            <div id="lendCustomer_companyInfoOfCustomer_proportionOfShares_div" style="display: none">
                <div class="main_content_td_graylast_small">占股比例</div>
                <div class="main_content_td_whitelast_small">
                    <input class="easyui-numberbox" type="text" id="lendCustomer_companyInfoOfCustomer_proportionOfShares"
                           name="lendCustomer.companyInfoOfCustomer.proportionOfShares" data-options="precision:2,min:0,max:100" />%
                </div>
            </div>
            <div id="lendCustomer_companyInfoOfCustomer_messageOfIdentity_div" style="display: none">
                <div class="main_content_td_graylast_small">说明</div>
                <input class="easyui-validatebox textbox" style="height: 23px"  type="text" id="lendCustomer_companyInfoOfCustomer_messageOfIdentity"
                       name="lendCustomer.companyInfoOfCustomer.messageOfIdentity" data-options=""/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_graylast_small">企业性质</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_companyInfoOfCustomer_customerCompanyType" name="lendCustomer.companyInfoOfCustomer.customerCompanyType" class="easyui-combobox" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/36',required:true"/></div>
            <div class="main_content_td_graylast_small" style="display: none" id="lendCustomer_companyInfoOfCustomer_messageOfCompanyType_first">其他</div>
            <div class="main_content_td_whitelast_small" style="display: none" id="lendCustomer_companyInfoOfCustomer_messageOfCompanyType_second"><input id="lendCustomer_companyInfoOfCustomer_messageOfCompanyType" name="lendCustomer.companyInfoOfCustomer.messageOfCompanyType" class="easyui-validatebox textbox"  style="height: 23px" data-options="required:false"/></div>
        </div>
        <div class="clear"></div>
    </div>
</form>