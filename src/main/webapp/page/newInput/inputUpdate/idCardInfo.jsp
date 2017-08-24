<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="idCardForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">身份证地址</div>
            <div style="padding: 3px 0;padding-left: 3px;">
                <input name="lendCustomer.lendIdentificationCard.identificationCardAddress.province" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,url:'<%=basePath%>/dictionary/region/-1',onSelect: function (record) { $('#idCardCity').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>
                -
                <input id="idCardCity" name="lendCustomer.lendIdentificationCard.identificationCardAddress.city" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,onSelect: function (record) {$('#idCardCountry').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>
                -
                <input id="idCardCountry" name="lendCustomer.lendIdentificationCard.identificationCardAddress.dist" class="easyui-combobox" data-options="panelHeight:'200px',required:true"/> -
                <input name="lendCustomer.lendIdentificationCard.identificationCardAddress.town" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'街道/小区/楼'"/> -
                <input name="lendCustomer.lendIdentificationCard.identificationCardAddress.housenumber" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'门牌号/单元楼层号'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">身份证所在城市是否同现住址</div>
            <div class="main_content_td_white_small"><input id="isIdcardSameToAddress" name="lendCustomer.lendIdentificationCard.isHouseCity" class="easyui-combobox"
                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">身份证有效期</div>
            <div style="padding: 3px 0;padding-left: 3px;">
                <input id="idCardStart" name="lendCustomer.lendIdentificationCard.validTermStart" class="easyui-datebox" data-options="required:true,validType:'lessThanToday'"/>-
                <input id="idCardEnd" name="lendCustomer.lendIdentificationCard.validTermFinish" class="easyui-datebox" data-options="required:true,validType:'moreThanToday'"/>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</form>