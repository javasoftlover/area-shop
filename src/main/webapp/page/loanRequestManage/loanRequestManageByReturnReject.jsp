<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <script>
        $(function () {
            $.includeFile('head', ["/component/extEasyUI.js", "/js/lendRequestManage/lendRequestManage.js","/js/lendRequestManage/updateSellerCommons.js"]);
        });
    </script>
</head>

<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="lendRequestManagetoolbar" style="padding:2px 0">
        <shiro:hasPermission name="V020201">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-audit-result'" id="reviewResult">审核结果</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V020202">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-attachment'" id="attachmentSearch">附件管理</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V020203">
        <a href="#" class="easyui-menubutton" data-options="menu:'#formView',iconCls:'icon-watch'">查看</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V020106">
            <a href="#" class="easyui-menubutton" data-options="menu:'#updateLendRequestData',iconCls:'icon-update-staff'">修改进件</a>
        </shiro:hasPermission>

    </div>
    <div id="formView">
        <div data-options="iconCls:'icon-view'" id="inputForm">申请表</div>
        <div data-options="iconCls:'icon-view'" id="social">社保</div>
        <div data-options="iconCls:'icon-view'" id="fund">公积金</div>
        <div data-options="iconCls:'icon-view'" id="policy">保单信息</div>
        <div data-options="iconCls:'icon-view'" id="viewCancelSign">查看客户放弃原因</div>
        <div data-options="iconCls:'icon-view'" id="rejectOrGiveUpReason">查看门店拒贷原因</div>
    </div>
    <div id="updateLendRequestData">
        <shiro:hasPermission name="V02010601">
            <div data-options="iconCls:'icon-update'" id="submiterEdit">修改客服</div>
        </shiro:hasPermission>
        <shiro:hasPermission name="V02010602">
            <div data-options="iconCls:'icon-update'" id="sellerEdit">修改销售</div>
        </shiro:hasPermission>
    </div>

    <div data-options="region:'north'" style="height:180px;overflow:hidden;" title="搜索条件"
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <form id="lendRequestManageForm" method="post" class="easyui-form">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">进件编号:</div>
                    <div class="main_content_td_white_small">
                        <input type="text" name="lendRequestId" class="easyui-numberbox"
                               data-options="min:1,max:999999999999999,groupSeparator:'',prompt:'进件编号'"/>
                    </div>
                    <div class="main_content_td_graylast_small">姓名:</div>
                    <div class="main_content_td_whitelast_small">
                        <input type="text" name="customerName" class="puhui-textbox" maxlength="20" placeholder="客户姓名"/>
                    </div>
                    <div class="main_content_td_graylast_small">身份证号:</div>
                    <div class="main_content_td_whitelast_small">
                        <input type="text" name="idNo" class="puhui-textbox" maxlength="22" placeholder="身份证号"/>
                    </div>

                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small">手机号:</div>
                    <div class="main_content_td_white_small">
                        <input type="text" name="mobile" class="puhui-textbox" maxlength="11" placeholder="手机号"/></div>
                    <div class="main_content_td_graylast_small">状态:</div>
                    <div class="main_content_td_whitelast_small">
                        <div class="easyui-combobox" name="status" id="status" data-options="url:'../../dictionary/status/manage/LEND_REQUEST_MANAGE_RETURN_REJECT',multiple:true,prompt:'状态',
                        onLoadSuccess:function(){
                        $('#status').combobox('clear');
                        }"></div>
                    </div>
                    <div class="main_content_td_graylast_small">产品:</div>
                    <div class="main_content_td_whitelast_small">
                        <div class="easyui-combobox" name="productType"
                             data-options="url:'../../dictionary/lendProduct/28',prompt:'产品'"></div>
                    </div>
                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small">销售:</div>
                    <div class="main_content_td_white_small">
                        <input type="text" name="sellerName" class="puhui-textbox" placeholder="销售" maxlength="20"/>
                    </div>
                    <div class="main_content_td_graylast_small">客服:</div>
                    <div class="main_content_td_whitelast_small">
                        <input type="text" name="submiterName" class="puhui-textbox" placeholder="客服" maxlength="20"/>
                    </div>
                    <div class="main_content_td_graylast_small">机构:</div>
                    <div class="main_content_td_whitelast_small">
                        <input name="orgCode" id="orgCode" class="easyui-combotree"
                               data-options="url:'../../dictionary/orgTree',animate:true, idFiled:'id', textFiled:'name',parentField : 'pid',lines : true,prompt:'进件机构'"/>
                    </div>
                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small">进件时间:</div>
                    <div style="padding-top: 8px;padding: 3px;padding-left: 3px;float: left;">
                        <div class="easyui-datebox" name="startSubmitTime" id="startSubmitTime"
                             data-options="prompt:'进件开始时间'"></div>
                        至
                        <div class="easyui-datebox" name="endSubmitTime"
                             data-options="validType:'md[\'#startSubmitTime\']',prompt:'进件结束时间'"></div>
                    </div>
                    <div class="linkbutton_bg" style="float: right;">
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
                           id="requestManageSearchBtn">查询</a>
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
                           id="requestManageClearBtn">重置</a>
                    </div>
                </div>


                <div class="clear"></div>
            </div>
        </form>
    </div>
    <div data-options="region:'center'">
        <table id="lendRequestManageTable" class="easyui-datagrid"
               data-options="idField:'lendRequestId',url:'../../lendRequestManage/lendRequestManages/list/LEND_REQUEST_MANAGE_RETURN_REJECT',toolbar:'#lendRequestManagetoolbar',
               onSelect:function(){
                  var $rows = $('#lendRequestManageTable').datagrid('getSelections');
                  var lendProductCode = $rows[0].lendProductCode;
                  var lendSoFundType = $rows[0].lendSoFundType;
                  if(lendProductCode.indexOf('SAFETY') === -1) {
                    $('#policy').hide();
                  } else {
                    $('#policy').show();
                  }
                  if(!lendSoFundType){
                    $('#fund').hide();
                    $('#social').hide();
                  } else if (lendSoFundType === 'SOCIAL_INSURANCE') {
                    $('#fund').hide();
                    $('#social').show();
                  } else if (lendSoFundType === 'ACCUMULATION_FUND') {
                    $('#fund').show();
                    $('#social').hide();
                  } else if (lendSoFundType === 'INSURANCE_FUND') {
                    $('#fund').show();
                    $('#social').show();
                  }
                  if($rows[0].lendRequestStatus.key==='CANCEL_SIGN'){
                        $('#viewCancelSign').show();
                          $('#rejectOrGiveUpReason').hide();
                  }else if($rows[0].lendRequestStatus.key==='STORES_REFUSED_CREDIT'){
                        $('#rejectOrGiveUpReason').show();
                        $('#viewCancelSign').hide();
                  }else{
                         $('#rejectOrGiveUpReason').hide();
                            $('#viewCancelSign').hide();
                  }
               }">
            <thead>
            <tr>
                <th data-options="field:'lendRequestId',width:100,align:'center'">进件编号</th>
                <th data-options="field:'encryptCustomName',width:140,align:'center'">客户姓名</th>
                <th data-options="field:'typeName',width:140,align:'center'">产品</th>
                <th data-options="field:'period',width:50,align:'center'">期限</th>
                <th data-options="field:'statusName',width:210,align:'center',formatter: function (value, data) {
                    return data.lendRequestStatus.value;
                }">状态</th>
                <th data-options="field:'signedAmount',width:140,align:'center',formatter:$.formatMoney">签约金额</th>
                <th data-options="field:'amount',width:140,align:'center',formatter:$.formatMoney">审核金额</th>
                <th data-options="field:'shopName',width:240,align:'center'">门店</th>
                <th data-options="field:'sellGroupName',width:110,align:'center'">团队</th>
                <th data-options="field:'sellerName',width:140,align:'center'">销售</th>
                <th data-options="field:'submitName',width:140,align:'center'">客服</th>
                <th data-options="field:'submitTime',width:200,align:'center',formatter:$.formatDateTime">进件时间</th>
                <th data-options="field:'updateTime',width:200,align:'center',formatter:$.formatDateTime">更新时间</th>
                <th data-options="field:'chanceType',width:110,align:'center'">进件渠道</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>
</html>