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
            $.includeFile('head', ["/js/systemInteraction/systemInteraction.js"]);
        });
    </script>
</head>

<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="container_parseSQL"></div>
    <div id="systemInteractiontoolbar" style="padding:2px 0">
        <shiro:hasPermission name="V060201">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-audit-result'" id="getAttachment">获取附件</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-audit-result'" id="getAttachments">获取所有附件</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060202">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="lendRequestEdit">修改进件</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060203">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="infoEdit">更改信息</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060204">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="isFinalStateEdit">修改终态</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060205">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="customerWithdrawal">客户提现</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060206">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="downLoadSignContract" >下载签约合同</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060207">
            <a href="#" class="easyui-menubutton" data-options="iconCls:'icon-audit-result',menu:'#cacheView'">缓存初始化</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-audit-result'" id="deleteBankInfo">删除bank_info数据</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-audit-result'" id="pushRepay">推送贷后</a>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060208">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="mainCardPushCore" >主卡推送核心</a>
        </shiro:hasPermission>
        <a href="#" class="easyui-menubutton" data-options="iconCls:'icon-audit-result',menu:'#compensateView'" id="compensate">数据补偿</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="parseSQL">sql解析</a>
    </div>

    <div id="cacheView">
        <div data-options="iconCls:'icon-view'" id="dictionaryCache">字典表缓存</div>
        <div data-options="iconCls:'icon-view'" id="cityCache">省市区缓存</div>
        <div data-options="iconCls:'icon-view'" id="neo4jCache">知识图谱拒贷码缓存</div>
        <div data-options="iconCls:'icon-view'" id="oneChannelCache">一级渠道缓存</div>
        <div data-options="iconCls:'icon-view'" id="secondChannelCache">二级渠道缓存</div>
        <div data-options="iconCls:'icon-view'" id="channelRelationCache">渠道关系缓存</div>
        <div data-options="iconCls:'icon-view'" id="lendShopBlackCache">缓存黑明单字典</div>
        <div data-options="iconCls:'icon-view'" id="viceAuthOneCache">开启副卡京东鉴权</div>
        <div data-options="iconCls:'icon-view'" id="viceAuthZeroCache">关闭副卡京东鉴权</div>

    </div>

    <div id="compensateView">
        <shiro:hasPermission name="V060209">
        <div data-options="iconCls:'icon-audit-result'" id="settlementErrorList" >结算划扣异常数据</div>
        </shiro:hasPermission>
        <shiro:hasPermission name="V060210">
        <div data-options="iconCls:'icon-audit-result'" id="coreErrorList" >核心充值异常数据</div>
        </shiro:hasPermission>
        <div data-options="iconCls:'icon-audit-result'" id="coreErrorList" >逾期推送贷后异常数据</div>
    </div>


    <div data-options="region:'north'" style="height:100px;overflow:hidden;" title="搜索条件"
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <form id="systemInteractionForm" method="post" class="easyui-form">
            <div class="main_content_table">
                <div class="div_bottom">
                    <div class="main_content_td_gray_small">进件编号:</div>
                    <div class="main_content_td_white_small">
                        <input type="text" name="lendRequestId" class="easyui-numberbox"
                               data-options="min:1,max:999999999999999,groupSeparator:'',prompt:'进件编号'"/>
                    </div>
                    <div class="main_content_td_graylast_small">身份证号码:</div>
                    <div class="main_content_td_white_small">
                        <input type="text" name="idNo" class="puhui-textbox"
                               maxlength="20" placeholder="身份证号"/>
                    </div>

                    <div class="linkbutton_bg" style="float: right;">
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
                           id="systemInteractionSearchBtn">查询</a>
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
                           id="systemInteractionClearBtn">重置</a>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </form>
    </div>

    <div data-options="region:'center'">
        <table id="systemInteractionTable" class="easyui-datagrid"
               data-options="url:'../../systemInteraction/list',toolbar:'#systemInteractiontoolbar'">
            <thead>
            <tr>
                <th data-options="field:'lendRequestId',width:80,align:'center'">进件号
                </th>
                <th data-options="field:'customerName',width:80,align:'center'">姓名
                </th>
                <th data-options="field:'idNo',width:180,align:'center'">身份证
                </th>
                <th data-options="field:'lendRequestStatus',width:120,align:'center',formatter: function (value,data) {
                    return data.lendRequestStatus.value;
                }">状态
                </th>
                <th data-options="field:'productName',width:100,align:'center'">产品
                </th>
                <th data-options="field:'period',width:70,align:'center'">期数
                </th>
                <th data-options="field:'signedAmount',width:100,align:'center',formatter:$.formatMoney">签约金额
                </th>
                <th data-options="field:'amount',width:100,align:'center',formatter:$.formatMoney">审核金额
                </th>
                <th data-options="field:'shopName',width:180,align:'center'">门店
                </th>
                <th data-options="field:'groupName',width:100,align:'center'">团队
                </th>
                <th data-options="field:'sellerName',width:100,align:'center'">销售
                </th>
                <th data-options="field:'submitName',width:100,align:'center'">客服
                </th>
                <th data-options="field:'appLendRequestId',width:80,align:'center'">App进件号
                </th>
                <th data-options="field:'channelName',width:100,align:'center'">渠道
                </th>

            </thead>
        </table>
    </div>
</div>
</body>
</html>