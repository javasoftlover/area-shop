<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
	<title>还款详情</title>
	<script>$(function() {$.includeFile('head', "/js/lendRepay/repayDetail.js");});</script>
</head>
<style>

</style>
<body>

<div style="overflow:auto;width:100%;height:99%;position:absolute">
    <br>
    <div class="easyui-panel" title="客户详细信息" style="width:99%; ">
        <form class="main_content_table" id="customerDetailForm">
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">姓名</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="name" name="name" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">性别</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="gender" name="gender" style="border:0;padding:5px;" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">手机号</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="mobile" name="mobile" style="border:0;padding:5px" readonly="readonly"/>
                </div>
                <div class="main_content_td_graylast_small4">固定电话</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="phone" name="phone" style="border:0;padding:5px" readonly/>
                </div>
            </div>
            <div class="clear"></div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">银行名称</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="bankName" name="bankName" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">支行名称</div>
                <div class="main_content_td_white_small4">
                   <input id="bankBranchName" name="bankBranchName" style="border:0;padding:5px;" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">银行卡号</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="cardNo" name="cardNo" style="border:0;padding:5px" readonly="readonly"/>
                </div>

            </div>
            <div class="clear"></div>
        </form>
    </div>

    <br>
    <div class="easyui-panel" title="客户签约信息" style="width:99%;">
        <form class="main_content_table" id="customerDignForm">
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">进件编号</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="lendRequestId" name="lendRequestId" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">签约金额</div>
                <div class="main_content_td_white_small4">
                    <input id="signedAmount" name="signedAmount" style="border:0;padding:5px;" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">放款金额</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="amount" name="amount" style="border:0;padding:5px" readonly="readonly"/>
                </div>
                <div class="main_content_td_graylast_small4">签约费率</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="monthlyTotalRate" name="monthlyTotalRate" style="border:0;padding:5px" readonly/>
                </div>
            </div>
            <div class="clear"></div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">产品</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="productName" name="productName" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">签约期数</div>
                <div class="main_content_td_white_small4">
                    <input id="period" name="period" style="border:0;padding:5px;" readonly/>
                </div>
                <div class="main_content_td_graylast_small4">月还款额</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="monthlyRepay" name="monthlyRepay" style="border:0;padding:5px" readonly="readonly"/>
                </div>
                <div class="main_content_td_graylast_small4">签约日期</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="signedTime" name="signedTime" style="border:0;padding:5px" readonly="readonly"/>
                </div>
            </div>
            <div class="clear"></div>
            <div class="div_bottom">
                <div class="main_content_td_gray_small4">放款时间</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="passTime" name="passTime" style="border:0;padding:5px" readonly/></div>
                <div class="main_content_td_graylast_small4">首次还款日</div>
                <div class="main_content_td_whitelast_small4">
                    <input id="firstBillDate" name="firstBillDate" style="border:0;padding:5px;" readonly/>
                </div>

            </div>
            <div class="clear"></div>
        </form>
    </div>

    <br>
    <div>
<div style="float:left;width:60%;height:500px">
    <div class="easyui-panel" title="还款记录"  style="max-height:500px;overflow:auto;overflow-x:hidden;">
            <table id="detailTable"></table>

    </div>
</div>
    <div class="easyui-panel" title="提前还款" style="float:left;width:40%;height:500px">
         <form class="main_content_table" id="reduceAmountForm">
            <div class="div_bottom" >
                <div class="main_content_td_gray_small4" style="width:30%">提前还款期数:</div>
                <div class="main_content_td_white_small4">
                    <input id="inRepayPhase" name="inRepayPhase" style="border:0;padding:5px" readonly/></div>
            </div>

                <div class="div_bottom" >
                    <div class="main_content_td_gray_small4" style="width:30%">应还总额:</div>
                    <div class="main_content_td_white_small4">
                        <input id="totalRepayAmount" name="totalRepayAmount" style="border:0;padding:5px" readonly/></div>
                </div>
                <div class="div_bottom" >
                    <div class="main_content_td_gray_small4" style="width:30%">账户余额:</div>
                    <div class="main_content_td_white_small4">
                        <input id="accountAmount" name="accountAmount" style="border:0;padding:5px" readonly/></div>
                </div>
                <div class="div_bottom" >
                    <div class="main_content_td_gray_small4" style="width: 30%">减免服务费:</div>
                    <div class="main_content_td_white_small4">
                        <input id="reduceAmount" name="reduceAmount" style="border:0;padding:5px" readonly/></div>
                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small4" style="width:30%">实际应还:</div>
                    <div class="main_content_td_white_small4">
                        <input id="shouldRepayAmount" name="shouldRepayAmount" style="border:0;padding:5px" readonly/></div>
                </div>
                <div class="clear"></div>
        </form>
    </div>
</div>


</div>

</body>
</html>