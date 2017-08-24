<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="baseForm" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray_small">姓名</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_name" name="lendCustomer.name" class="easyui-textbox easyui-validatebox"
                                                            data-options="panelHeight:'auto',required:true,validType:['CHS','maxLength[32]']"/></div>
            <div class="main_content_td_graylast_small">身份证号码</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_idNo" name="lendCustomer.idNo" style="height: 23px" class="easyui-validatebox textbox"
                                                                data-options="panelHeight:'auto',required:true,validType:'idcard',editable:false"/>
            </div>
            <div class="main_content_td_graylast_small">性别</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_gender" name="lendCustomer.gender" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/7',required:true,readonly:true"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">电子邮箱</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.email" class="easyui-textbox easyui-validatebox"
                                                            data-options="panelHeight:'auto',required:true,validType:['email','maxLength[64]']"/>
            </div>
            <div class="main_content_td_graylast_small">婚姻状况</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.marriage" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/8',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">子女人数</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.childrenNumber" class="easyui-numberbox"
                                                                data-options="panelHeight:'auto',required:true,min:0,max:9,value:0"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">学历</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.education" class="easyui-combobox"
                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/9',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">车产</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_lendCarPropertyType" name="lendCustomer.lendCarPropertyType" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/10',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">民族</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.nation" class="easyui-textbox easyui-validatebox"
                                                                data-options="panelHeight:'auto',required:true,validType:['chinese','maxLength[32]']"/></div>
        </div>
        <div class="div_bottom" id="carDiv" style="display: none;">
            <div class="main_content_td_gray_small">车牌号</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_carNum" name="lendCustomer.carNum" class="easyui-validatebox textbox" style="height: 23px "
                                                            data-options="required:false,validType:['CAR','maxLength[20]']"/>
            </div>
            <div class="main_content_td_graylast_small">车辆是否抵押</div>
            <div class="main_content_td_whitelast_small"><input id="lendCustomer_isCarMortgage" name="lendCustomer.carMortgage" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/14',required:false"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">本市房产状况</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_lendHousePropertyType" name="lendCustomer.lendHousePropertyType" class="easyui-combobox"
                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/12',required:true"/>
            </div>
            <div class="main_content_td_graylast_small">居住情况</div>
            <div class="main_content_td_whitelast_small"><input id="live_house_type" name="lendCustomer.lendHouseType" class="easyui-combobox"
                                                                data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/11',required:true"/>
            </div>
            <div id="LendCustomer_messageOfLendHouseType_div" style="display: none">
                <div class="main_content_td_graylast_small">说明</div>
                <div class="main_content_td_whitelast_small">
                    <input class="easyui-validatebox textbox" type="text" id="LendCustomer_messageOfLendHouseType" style="height: 23px" name="lendCustomer.messageOfLendHouseType"
                           data-options="required:false" />
                </div>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">现居住地址</div>
            <div style="padding: 3px 0;padding-left: 3px;">
                <input id="baseInfoProvince" name="lendCustomer.livingAddress.province" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,url:'<%=basePath%>/dictionary/region/-1',onSelect: function (record) { $('#baseInfoCity').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>
                <input id="baseInfoCity" name="lendCustomer.livingAddress.city" class="easyui-combobox"
                       data-options="panelHeight:'200px',required:true,onSelect: function (record) {$('#baseInfoCountry').combobox({url: '<%=basePath%>/dictionary/region/' + record.value});}"/>
                <input id="baseInfoCountry" name="lendCustomer.livingAddress.dist" class="easyui-combobox" data-options="panelHeight:'200px',required:true"/>
                <input id="baseInfoTown" name="lendCustomer.livingAddress.town" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'街道/小区/楼'"/>
                <input id="baseInfoHouseNumber" name="lendCustomer.livingAddress.housenumber" class="easyui-textbox easyui-validatebox" data-options="required:true,prompt:'门牌号/单元楼层号'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">在此城市生活时长(年)</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.lifeYears" class="easyui-numberbox"
                                                            data-options="panelHeight:'auto',required:true,min:0,max:99"/>
            </div>
            <div class="main_content_td_graylast_small">手机号码1</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.mobile" id="lendCustomer_mobile"
                                                                class="easyui-textbox easyui-validatebox"
                                                                data-options="required:true,validType:['mobile','maxLength[11]']"/></div>
            <div class="main_content_td_graylast_small">手机号码2</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.mobile2" id="lendCustomer_mobile2"
                                                                class="easyui-textbox easyui-validatebox"
                                                                data-options="required:false,validType:['mobile','maxLength[11]']"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">如何了解到凡普</div>
            <div class="main_content_td_white_small"><input id="resourceType_id" name="resourceType" class="easyui-combobox"
                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/13',required:true"/>
            </div>
            <div class="main_content_td_gray_small" id="messageOfResourceType_first" style="display: none"></div>
            <div class="main_content_td_white_small" id="messageOfResourceType_second" style="display: none"><input id="messageOfResourceType_id" name="messageOfResourceType" class="easyui-validatebox textbox" style="height: 23px"
                                                                                                                    data-options="panelHeight:'auto',required:false"/>
            </div>
            <div class="main_content_td_graylast_small">个人年度总收入(元)</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.annualIncome" class="easyui-numberbox"
                                                                data-options="required:true,precision:2"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small">QQ</div>
            <div class="main_content_td_white_small"><input id="lendCustomer_qq" name="lendCustomer.qq" class="easyui-validatebox textbox" style="height: 23px"
                                                            data-options="required:false,validType:'length[0,14]'" validType="onlyNumberValidate['#lendCustomer_qq']" /></div>
            <div class="main_content_td_graylast_small">微信</div>
            <div class="main_content_td_white_small"><input name="lendCustomer.weixin" class="easyui-textbox easyui-validatebox"
                                                            data-options="required:false,validType:'length[1,20]'"/></div>
            <div class="main_content_td_graylast_small">微博</div>
            <div class="main_content_td_whitelast_small"><input name="lendCustomer.weibo" class="easyui-textbox easyui-validatebox"
                                                                data-options="required:false,validType:'length[1,30]'"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray_small" style="height:80px">备注</div>
            <div class="main_content_td_textarea"><textarea name="remark" class="textareastyle easyui-validatebox" cols="100" rows="3" data-options=""></textarea></div>
        </div>
        <div class="clear"></div>
    </div>
</form>