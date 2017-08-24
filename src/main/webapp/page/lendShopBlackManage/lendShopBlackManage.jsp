<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<script>$(function () {
		$.includeFile('head', "/js/lendShopBlackManage/lendShopBlackManage.js");
	});

	//格式化菜单操作
	/*function formatterOpt(fieldVal, rowData) {
		var params = rowData.id + ',' + rowData.name;
		var viewShopBlack = $.opButton('#viewShopBlackDiv', 'viewShopBlackDiv', '预览', rowData.id);
		return viewShopBlack;
	}*/

	</script>
</head>

<body>
<div style="display: none" title="列表各种操作">
	<div id="viewShopBlackDiv" title="预览">
		<span class='icon-search span_button'>&nbsp;&nbsp;</span>
	</div>
	<div id="editShopBlackDiv" title="修改">
		<span class='icon-save span_button'>&nbsp;&nbsp;</span>
	</div>
</div>
<div class="easyui-layout" style="width:100%;height:100%;">
	<div id="lendShopBlackManagetoolbar" style="padding:2px 0">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" id="addLendBlack">添加</a>
	</div>
	<div data-options="region:'north'" style="height:120px;overflow:hidden;" title="搜索条件"
		 data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
		<form id="lendShopBlackManagetoolForm" method="post">
			<div class="main_content_table">
				<div class="div_bottom">
					<div class="main_content_td_gray_small">客户姓名:</div>
					<div class="main_content_td_whitelast_small"><input type="text" name="name" class="puhui-textbox" maxlength="10" placeholder="客户姓名"/></div>
					<div class="main_content_td_graylast_small">身份证号:</div>
					<div class="main_content_td_whitelast_small"><input type="text" name="idNo" class="easyui-validatebox puhui-textbox" data-options="validType:'idcard',required:false" maxlength="22" placeholder="身份证号"/></div>
				</div>

				<div class="div_bottom">
					<div class="linkbutton_bg" style="float: right;">
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
						   id="lendShopBlackManagetoolbarSearchBtn">查询</a>
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-clear'"
						   id="lendShopBlackManagetoolbarBtn">重置</a>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</form>
	</div>
	<div data-options="region:'center'">
		<table id="lendShopBlackManageTable" class="easyui-datagrid"
			   data-options="idField:'lendRequestId',url:'<%=basePath%>/lendShopBlackManage/queryShopBlacklist',toolbar:'#lendShopBlackManagetoolbar',onLoadSuccess: function(){
                    $('.easyui-tooltip').tooltip({
                  onShow: function () {
                      $(this).tooltip('tip').css({
                          borderColor: '#000'
                  });
              }
         });
        }">
			<thead>
			<tr>
				<th data-options="field:'id',width:140,align:'center',hidden:true"></th>
				<th data-options="field:'name',width:100,align:'center'">客户姓名</th>
				<th data-options="field:'idNo',width:140,align:'center'">身份证号</th>
				<th data-options="field:'classOneType',width:180,align:'center'">黑名单主原因</th>
				<th data-options="field:'classTwoType',width:140,align:'center'">黑名单子原因</th>
				<th data-options="field:'blockKey',width:240,align:'center',formatter: function (value, data, index) {
                return '<span title=&quot;'
                    +data.blockKey+'&quot; class=&quot;easyui-tooltip&quot;>'+data.blockKey+'</span>'
                }">具体明细</th>
				<th data-options="field:'blockDesc',width:240,align:'center',formatter: function (value, data, index) {
                return '<span title=&quot;'
                    +data.blockDesc+'&quot; class=&quot;easyui-tooltip&quot;>'+data.blockDesc+'</span>'
                }">明细内容</th>
				<th data-options="field:'commitPerson',width:100,align:'center'">创建人</th>
				<th data-options="field:'shopName',width:140,align:'center'">所属门店</th>
				<th data-options="field:'createTime',width:140,align:'center',formatter:$.formatDateTime">创建时间</th>
				<%--<th data-options="field:'opt',width:80,align:'center'" formatter="formatterOpt">操作</th>--%>

			</tr>
			</thead>
		</table>
	</div>
</div>
</body>
</html>