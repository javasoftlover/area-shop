<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../../common/basePath.jsp" %>
<form id="contractForm" method="post">
	<div class="easyui-panel" title="直系亲属(仅限于父母、配偶或者子女，若已婚请务必填写配偶)" style="width:100%;height:180px;padding:5px;">
		<div class="main_content_table">
			 <div class="div_bottom">
	            <div class="main_content_td_gray_small4">姓名</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[0].subName" class="easyui-validatebox textbox"
	                                                             data-options="panelHeight:'auto',required:true,validType:['CHS','maxLength[32]']" style="height: 23px;width: 99%"/>
	            </div>
	            <div class="main_content_td_graylast_small4">关系</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts_relationShip0" name="lendCustomer.contacts[0].relationShip" class="easyui-combobox"
	                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/16',required:true" style="width: 99%" />
	            </div>
	            <div class="main_content_td_graylast_small4">关系说明</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts_messageOfRelationship0" name="lendCustomer.contacts[0].messageOfRelationship" style="height: 23px;width: 99%" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:false"/></div>
	            <div class="main_content_td_graylast_small4">联系电话</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts0_subMobile" name="lendCustomer.contacts[0].subMobile" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:true,validType:'mobile'" style="width: 99%" />
	            </div>
	        </div>
	        <div class="div_bottom">
	            <div class="main_content_td_gray_small4">固定电话</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[0].telephone" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:false,validType:'tel'"  style="width: 99%"/>
	            </div>
	        </div>
	        <div class="div_bottom">
	            <div class="main_content_td_gray_small4">姓名</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[1].subName" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:true,validType:['CHS','maxLength[32]']" style="height: 23px;width: 99%"/></div>
	            <div class="main_content_td_graylast_small4">关系</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts_relationShip1" name="lendCustomer.contacts[1].relationShip" class="easyui-combobox"
	                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/16',required:true" style="width: 99%"/>
	            </div>
	            <div class="main_content_td_graylast_small4">关系说明</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts_messageOfRelationship1" name="lendCustomer.contacts[1].messageOfRelationship" style="height: 23px;width: 99%" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:false"/></div>
	            <div class="main_content_td_graylast_small4">联系电话</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts1_subMobile"name="lendCustomer.contacts[1].subMobile" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:true,validType:'mobile'" style="width: 99%"/>
	            </div>
	        </div>
	        <div class="div_bottom">
	            <div class="main_content_td_gray_small4">固定电话</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[1].telephone" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:false,validType:'tel'" style="width: 99%"/>
	            </div>
	        </div>
	        <div class="clear"></div>
		</div>
	</div>
	<br>
	<div class="easyui-panel" title="工作证明人(请务必填写现职公司的在职同事)" style="width:100%;height:100px;padding:5px;">
		<div class="main_content_table">
			<div class="div_bottom">
	            <div class="main_content_td_gray_small4">姓名</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[2].subName" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:true,validType:['CHS','maxLength[32]']" style="height: 23px;width: 99%"/></div>
	            <div class="main_content_td_graylast_small4">联系人所在部门</div>
	            <div class="main_content_td_whitelast_small4"><input name="lendCustomer.contacts[2].department" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:true" style="width: 99%"/></div>
	            <div class="main_content_td_graylast_small4">联系电话</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts2_subMobile" name="lendCustomer.contacts[2].subMobile" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:true,validType:'mobile'" style="width: 99%"/>
	            </div>
	            <div class="main_content_td_graylast_small4">固定电话</div>
	            <div class="main_content_td_whitelast_small4"><input name="lendCustomer.contacts[2].telephone" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:false,validType:'tel'" style="width: 99%"/>
	            </div>
	        </div>
	        <div class="clear"></div>
		</div>
	</div>
	<br>
	<div class="easyui-panel" title="其他联系人" style="width:100%;height:130px;padding:5px;">
		<div class="main_content_table">
	        <div class="div_bottom">
	            <div class="main_content_td_gray_small4">姓名</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[3].subName" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:true,validType:['CHS','maxLength[32]']" style="height: 23px;width: 99%"/></div>
	            <div class="main_content_td_graylast_small4">关系</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts_relationShip3" name="lendCustomer.contacts[3].relationShip" class="easyui-combobox"
	                                                            data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/17',required:true" style="width: 99%"/>
	            </div>
	            <div class="main_content_td_graylast_small4">关系说明</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts_messageOfRelationship3" name="lendCustomer.contacts[3].messageOfRelationship" style="height: 23px;width: 99%" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:false"/></div>
	            <div class="main_content_td_graylast_small4">联系电话</div>
	            <div class="main_content_td_whitelast_small4"><input id="lendCustomer_contacts3_subMobile" name="lendCustomer.contacts[3].subMobile" class="easyui-validatebox textbox"
	                                                            data-options="panelHeight:'auto',required:true,validType:'mobile'" style="height: 23px;width: 99%"/>
	            </div>
	        </div>
	        <div class="div_bottom">
	            <div class="main_content_td_gray_small4">固定电话</div>
	            <div class="main_content_td_white_small4"><input name="lendCustomer.contacts[3].telephone" class="easyui-textbox easyui-validatebox"
	                                                            data-options="panelHeight:'auto',required:false,validType:'tel'" style="width: 99%"/>
	            </div>
	        </div>
	        <div class="clear"></div>
		</div>
	</div>
	<div class="easyui-panel" title="是否可被知晓" style="width:100%;height:130px;padding:5px;">
		<div class="main_content_table">
			<div class="div_bottom">
				<div class="main_content_td_gray_small">直系亲属</div>
				<div class="main_content_td_white_small"><input name="lendCustomer.secretToFamily" class="easyui-combobox"
																data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/26',required:true"/>
				</div>
				<div class="main_content_td_graylast_small">工作证明人</div>
				<div class="main_content_td_whitelast_small"><input name="lendCustomer.secretToColleague" class="easyui-combobox"
																	data-options="panelHeight:'auto',url:'<%=basePath%>/dictionary/option/26',required:true"/>
				</div>
			</div>
	        <div class="clear"></div>
		</div>
	</div>
</form>