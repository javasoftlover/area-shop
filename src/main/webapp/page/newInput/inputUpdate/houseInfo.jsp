<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="houseForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">房产购买时间</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendHouseProperty.buyDate" class="easyui-datebox" data-options="required:true,validType:'enterCompanyValidate[]'"/></div>
            <div class="main_content_td_graylast_small">产权人</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_lendHouseProperty_property_people" name="lendCustomer.lendHouseProperty.propertyPeople" class="easyui-combobox" data-options="type:'get',url:'<%=basePath%>/dictionary/option/18',required:true"/></div>
            <div id="relationshipForShareDiv" style="display: none">
                <div class="main_content_td_graylast_small">与共有人关系</div>
                <div class="main_content_td_whitelast_small"><input id="relationshipForShare" name="lendCustomer.lendHouseProperty.relationshipForShare" class="easyui-combobox" data-options="type:'get',url:'<%=basePath%>/dictionary/option/45'"/></div>
            </div>
            <div id="messageOfPropertyPeopleDiv" style="display: none">
                <div class="main_content_td_graylast_small">说明</div>
                <div class="main_content_td_whitelast_small">
                    <input id="messageOfPropertyPeople" name="lendCustomer.lendHouseProperty.messageOfPropertyPeople" class="easyui-validatebox textbox" style="height: 23px" data-options="type:'get',url:'<%=basePath%>/dictionary/option/18',required:true"/>
                </div>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">房产地址</div>
            <div style="padding: 3px 0;padding-left: 3px;">
                <input id="housePropertyCheckbox" type="checkbox" style="width:13px;"/>同现居住地址
                <input id="houseProvince" name="lendCustomer.lendHouseProperty.housePropertyAddress.province" class="easyui-combobox" data-options="panelHeight:'200px',required:true,url:'<%=basePath%>/dictionary/region/-1',onSelect: function (record) { $('#houseCity').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>-
                <input id="houseCity" name="lendCustomer.lendHouseProperty.housePropertyAddress.city" class="easyui-combobox" data-options="panelHeight:'200px',required:true,onSelect: function (record) {$('#houseCountry').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>-
                <input id="houseCountry" name="lendCustomer.lendHouseProperty.housePropertyAddress.dist" class="easyui-combobox" data-options="panelHeight:'200px',required:true"/> -
                <input id="houseTown" name="lendCustomer.lendHouseProperty.housePropertyAddress.town" class="easyui-validatebox textbox" data-options="required:true,prompt:'街道/小区/楼'" style="height: 23px"  /> -
                <input id="houseHouseNumber" name="lendCustomer.lendHouseProperty.housePropertyAddress.housenumber" class="easyui-validatebox textbox" data-options="required:true,prompt:'门牌号/单元楼层号'" style="height: 23px"  /></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">房产面积（平方米）</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendHouseProperty.area" class="easyui-numberbox" data-options="required:true,precision:2,min:1"/></div>
            <div class="main_content_td_graylast_small">提供有效房产数量</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.countOfHouseProperty" class="easyui-numberbox" data-options="required:true,min:1"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">房产当前抵押情况</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lendHouseProperty.mortgageType" class="easyui-combobox" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/19',required:true"/></div>
            <div class="main_content_td_graylast_small">房产类型</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_house_type" name="lendCustomer.lendHouseProperty.housePropertyType" class="easyui-combobox" data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/20',required:true"/></div>
            <div class="main_content_td_graylast_small" id="messageOfHousePropertyType_first" style="display: none;">说明</div>
            <div class="main_content_td_whitelast_small" id="messageOfHousePropertyType_second" style="display: none;"><input id="messageOfHousePropertyTypeId" name="lendCustomer.lendHouseProperty.messageOfHousePropertyType" class="easyui-validatebox textbox" style="height: 23px"  data-options="required:false"/></div>
        </div>
        <div class="div_bottom" id="lendCustomer_repayMonthlyOfHousingLoans_Div" style="display: none;">
            <div class="main_content_td_gray_small">月还房贷（元）</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_repayMonthlyOfHousingLoans" name="lendCustomer.repayMonthlyOfHousingLoans" class="easyui-numberbox" data-options="precision:2,min:1"/></div>
            <div class="main_content_td_graylast_small">房产证明类型</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_lendHouseProve"  name="lendCustomer.lendHouseProve"  class="easyui-combobox" data-options="multiple:true,panelHeight:'auto',url:'<%=basePath%>/dictionary/option/25'"/></div>
        </div>
        <div class="clear"></div>
    </div>
</form>