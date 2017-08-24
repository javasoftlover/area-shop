<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
</head>
<script>$(function() {$.includeFile('head', "/js/taskManager/requestSearch/requestSearch.js");});</script>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="lendRequestTabletoolbar" style="padding:2px 0">
        <a href="#" id="inputSelect" data-options="iconCls:'icon-view'" class="easyui-linkbutton">查看进件</a>
        <shiro:hasPermission name="V050602">
        <a href="#" id="attachmentUpload" data-options="iconCls:'icon-upload'" class="easyui-linkbutton">附件浏览</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V050601">
        <a href="#" id="download" data-options="iconCls:'icon-upload'" class="easyui-linkbutton">下载</a>
        </shiro:hasPermission>
    </div>
    <div data-options="region:'north'" style="height:200px;overflow:hidden;" title="搜索条件"
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <form id="lendRequestSearchForm" method="post">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small4">进件编号:</div>
                    <div class="main_content_td_white_small4">
                        <input type="text" style="width: 95%" name="lendRequestId" class="easyui-numberbox"
                               data-options="min:1,max:959595959595959,groupSeparator:'',prompt:'进件编号'"/>
                    </div>
                    <div class="main_content_td_graylast_small4">姓名:</div>
                    <div class="main_content_td_whitelast_small4">
                        <input type="text" style="width: 95%" name="customerName" class="puhui-textbox" maxlength="20" placeholder="客户姓名"/>
                    </div>
                    <div class="main_content_td_graylast_small4">身份证号:</div>
                    <div class="main_content_td_whitelast_small4">
                        <input type="text" style="width: 95%" name="idNo" class="puhui-textbox" maxlength="22" placeholder="身份证号"/>
                    </div>

                    <div class="main_content_td_graylast_small4">手机号:</div>
                    <div class="main_content_td_whitelast_small4">
                        <input type="text" style="width: 95%" name="mobile" class="puhui-textbox" maxlength="11" placeholder="手机号"/></div>
                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small4">状态:</div>
                    <div class="main_content_td_white_small4">
                        <div class="easyui-combobox" style="width: 95%" name="status" id="status" data-options="url:'<%=basePath%>/dictionary/status/manage/ALL',multiple:true,prompt:'状态',
                        onLoadSuccess:function(){
                        $('#status').combobox('clear');
                        }"></div>
                    </div>
                    <div class="main_content_td_graylast_small4">产品:</div>
                    <div class="main_content_td_whitelast_small4">
                        <div class="easyui-combobox" style="width: 95%" name="productType"
                             data-options="url:'<%=basePath%>/dictionary/lendProduct/28',prompt:'产品'"></div>
                    </div>
                    <div class="main_content_td_graylast_small4">审核金额</div>
                    <div class="main_content_td_whitelast_small4">
                        <input style="width: 95%" name="amount" id="amount" class="easyui-numberbox" data-options="precision: 2" />
                    </div>
                    <div class="main_content_td_graylast_small4">产品期限</div>
                    <div class="main_content_td_whitelast_small4">
                        <input id="lendCustomer_companyInfoOfCustomer_customerCompanyType" style="width: 95%" name="period" class="easyui-combobox" data-options="panelHeight:'auto',data:[{text:'12',value:'12'},{text:'18',value:'18'},{text:'24',value:'24'},{text:'36',value:'36'},{text:'48',value:'48'}]"/>
                    </div>
                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small4">销售:</div>
                    <div class="main_content_td_white_small4">
                        <input type="text" style="width: 95%" name="sellerName" class="puhui-textbox" placeholder="销售" maxlength="20"/>
                    </div>
                    <div class="main_content_td_graylast_small4">客服:</div>
                    <div class="main_content_td_whitelast_small4">
                        <input type="text" style="width: 95%" name="submiterName" class="puhui-textbox" placeholder="客服" maxlength="20"/>
                    </div>
                    <div class="main_content_td_graylast_small4">机构:</div>
                    <div class="main_content_td_whitelast_small4">
                        <input name="orgCode" id="orgCode" style="width: 95%" class="easyui-combotree"
                               data-options="url:'<%=basePath%>/dictionary/orgTree',animate:true, idFiled:'id', textFiled:'name',parentField : 'pid',lines : true,prompt:'进件机构'"/>
                    </div>
                </div>

                <div class="div_bottom">
                    <div class="main_content_td_gray_small4">进件时间:</div>
                    <div style="padding-top: 8px;padding: 3px;padding-left: 3px;float: left;">
                        <div class="easyui-datebox" name="startSubmitTime" id="startSubmitTime"
                             data-options="prompt:'进件开始时间'"></div>
                        至
                        <div class="easyui-datebox" name="endSubmitTime"
                             data-options="validType:'md[\'#startSubmitTime\']',prompt:'进件结束时间'"></div>
                    </div>

                </div>
                <div class="div_bottom">

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
        <table id="lendRequestTable" class="easyui-datagrid" data-options="idField:'lend_id', url:'<%=basePath%>/requestSearch/list',toolbar:'#lendRequestTabletoolbar'">
            <thead>
            <tr>
                <th data-options="field:'lendRequestId',width:200,align:'center'">进件编号</th>
                <th data-options="field:'customerName',width:250,align:'center'">客户姓名</th>
                <th data-options="field:'amount',width:250,align:'center'">审核金额</th>
                <th data-options="field:'lendProductCode',width:250,align:'center'">产品</th>
                <th data-options="field:'period',width:150,align:'center'">期限</th>
                <th data-options="field:'lendRequestStatus',width:250,align:'center',formatter:function(data,value){
                    return data.value;
				}">状态</th>
                <th data-options="field:'shopName',width:250,align:'center'">门店</th>
                <th data-options="field:'sellGroupName',width:150,align:'center'">团队</th>
                <th data-options="field:'sellerName',width:250,align:'center'">销售</th>
                <th data-options="field:'submitName',width:250,align:'center'">客服</th>
                <th data-options="field:'createTime',width:250,align:'center',formatter:$.formatDateTime">创建时间</th>
                <th data-options="field:'submitTime',width:250,align:'center',formatter:$.formatDateTime">进件时间</th>
                <th data-options="field:'updateTime',width:250,align:'center',formatter:$.formatDateTime">更新时间</th>
                <th data-options="field:'appLendRequestId',width:200,align:'center'">APP进件号</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
</body>
</html>