<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <title>申请还款</title>
</head>
<body>
<div id="container_proofUpload"></div>
<form id="applyForm" method="post" >
    <div class="main_content_table">
        <input type="hidden" id="repayLendRequestId" name="lendRequestId"/>
        <input type="hidden" id="repayLendRepayRecordId" name="lendRepayRecordId"/>
        <input type="hidden" id="repaybillDate" name="billDate"/>
        <input type="hidden" id="lendRepayRecordUploadId" name="lendRepayRecordUploadId"/>
        <input type="hidden" id="repayPhase" name="phase">
        <input type="hidden" id="repayBankCard" name="repayBankCard">
        <input type="hidden" id="policyAmount" name="policyAmount">
        <input type="hidden" id="friendAmount" name="friendAmount">
        <input type="hidden" id="version" name="version">
        <div class="div_bottom">
            <div class="main_content_td_gray">还款类型:</div>
            <div class="main_content_td_white"><input name="repayType" id="repayType"/></div>
            <div class="main_content_td_graylast">还款方式:</div>
            <div class="main_content_td_whitelast"><input name="payType" id="repayMethod"/></div>
        </div>

        <div class="div_bottom deductDiv">
            <div class="main_content_td_gray">还款银行卡:</div>
            <div class="main_content_td_white"><input name="lendBankCardType" id="lendBankCardType" class="easyui-combobox"
                                                      data-options="width:'200px',panelWidth:'200px',panelHeight:'auto'"/>
            </div>
            <div class="main_content_td_graylast">还款银行:</div>
            <div class="main_content_td_whitelast"><input name="repayBankName" id="repayBankName"
                                                          style="border:0;padding:5px" readonly/></div>
        </div>

        <div class="div_bottom deductDiv">
            <div class="main_content_td_gray">划扣时效:</div>
            <div class="main_content_td_white"><input name="deductMethods" id="deductMethods"/></div>
        </div>

        <div class="div_bottom   realTimeDiv" style="display: none">
            <div class="main_content_td_gray">预约时间:</div>
            <div class="main_content_td_white"><input name="appointmentTime" id="appointmentTime"
                                                      class="easyui-datebox"
                                                      data-options="width:120"/>
                <input name="hourTime" id="hourTime">
            </div>
        </div>

        <div class="div_bottom transferDiv" style="display: none">
            <div class="main_content_td_gray">汇款时间:</div>
            <div class="main_content_td_white"><input name="remittanceTime" id="remittanceTime" clearable="false"
                                                      class="easyui-datebox"
                                                      data-options="validType:'repayValidate[\'#repaybillDate\']'"/></div>

            <div class="main_content_td_graylast">上传凭条:</div>
            <div class="main_content_td_whitelast">

                <a href="#" class="easyui-linkbutton c6" id="proofUpload">上传</a>
                <a href="#" class="easyui-linkbutton c1" id="previewUpload">预览</a>
                <a href="#"  id="fileName"></a>
                 <span class="icon-question easyui-tooltip" style="width:20px;height:20px;float:right"
                       data-options="position:'top',content:'再次上传会替换原有凭条'"> </span>
            </div>
        </div>


        <div class="div_bottom">
            <div class="main_content_td_gray">应还金额:</div>
            <div class="main_content_td_white">
                <input id="amount" value="0" style="border:0;padding:5px;" readonly/>
                <input id="inRepayAmount" value="0" style="border:0;padding:5px;" readonly hidden/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray">账户余额:</div>
            <div class="main_content_td_white4">

                <input id="accountAmount" name="accountAmount" style="border:0;padding:10px;width: 150px;"
                                                      readonly/>  <input name="useAmount" id="useAmount" type="checkbox"
                                                                       checked/>使用账户余额
                <div style="display: inline" id="rewardAmountDiv">
                <input name="rewardAmount" id="rewardAmount" type="checkbox"
                       checked disabled/>使用红包余额
                </div>
            </div>
            </div>
            <div class="div_bottom">
            <div class="main_content_td_gray">划扣/汇款金额:</div>
            <div class="main_content_td_white"><input name="repayMoney" id="repayMoney" class="easyui-numberbox"
                                                          data-options="required:true,precision: 2"/></div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray" style="height:80px">还款备注:</div>
            <div class="main_content_td_textarea"><textarea id="repayNote" name="repayNote"
                                                            class="textareastyle easyui-validatebox" cols="70" rows="5"
                                                            data-options="validType:['maxLength[60]']"></textarea>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</form>
</body>
</html>