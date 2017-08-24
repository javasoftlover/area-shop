<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="borrowingForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">申请产品</div>
            <div class="main_content_td_white_small"><input id="product_request" name="lendProductCode" class="easyui-combobox"
                                                            data-options="panelHeight:'170px',required:true"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">借款用途</div>
            <div class="main_content_td_white_small"><input id="loanPurposeType" name="loanPurposeType" class="easyui-combobox"
                                                            data-options="panelHeight:'200px',url:'<%=basePath%>/dictionary/option/5',required:true"/>
            </div>
            <div class="main_content_td_gray_small" id="loanPurposeFirst" style="display: none">说明</div>
            <div class="main_content_td_white_small" id="loanPurposeSecond" style="display: none"><input id="loanPurpose" name="loanPurpose" class="easyui-validatebox textbox"
                                                            data-options="required:false" style="height: 23px" />
            </div>
            <div class="main_content_td_graylast_small">零钱通类型</div>
            <div class="main_content_td_whitelast_small"><input name="lingQianTongType" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/6',required:true"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">借款申请额度（元）</div>
            <div class="main_content_td_white_small"><input name="loanAmount" class="easyui-numberbox"
                                                            data-options="required:true,min:10000,max:200000,prompt:'借款额度10000—200000'"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">是否提供房产证</div>
            <div class="main_content_td_white_small"><input id="isHouse" name="lendCustomer.houseProperty" class="easyui-combobox"
                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">是否提供户口本</div>
            <div class="main_content_td_whitelast_small"><input id="is_lendHouseholdRegister" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:true"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">是否提供结婚证</div>
            <div class="main_content_td_white_small"><input id="is_lendMarriageCertificate" class="easyui-combobox"
                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">是否提供学历证书</div>
            <div class="main_content_td_whitelast_small"><input id="is_lendDegreeCertificate" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:true"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">门店</div>
            <div class="main_content_td_white_small"><input id="shop" name="summer" class="easyui-validatebox textbox" style="height: 23px"
                                                            data-options="panelHeight:'auto'"/>
            </div>
            <div class="main_content_td_graylast_small">团队</div>
            <div class="main_content_td_whitelast_small"><input id="sellerGroup" name="sellGroup" class="easyui-combobox"
                                                                data-options="panelHeight:'auto'"/>
            </div>
            <div class="main_content_td_graylast_small">销售</div>
            <div class="main_content_td_whitelast_small"><input id="seller" name="seller" class="easyui-combobox"
                                                                data-options="panelHeight:'200px'"/>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</form>