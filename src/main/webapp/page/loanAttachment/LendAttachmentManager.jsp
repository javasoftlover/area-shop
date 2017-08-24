<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../common/taglibs.jsp" %>
<!DOCTYPE HTML>
<html>
<head>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
</head>
<script>$(function () {
    $.includeFile('head', ["/component/fancyBox/jquery.fancybox.css",
        "/component/fancyBox/jquery.fancybox.js",
        "/component/fancyBox/jquery.fancybox.pack.js",
        "/js/lendAttachment/LendAttachmentManager.js",
        "/js/lendAttachment/attachmentCommons.js"
    ]);
});
</script>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="container_attachmentUplaod"></div>
    <div id="lendAttachmentToolbar" style="padding:2px 0">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-upload'" id="attachmentUplaod">上传</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-preview'" id="preview"
           onclick="$attachment.preview()">预览</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="attachmentDownLoad"
           onclick="$attachment.attachmentDownLoad()">批量下载</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="attachmentDownLoadOne"
           onclick="$attachment.attachmentDownLoadOne()">下载</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" id="attachmentAdd">添加其他</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete'" id="attachmentRemove">删除其他附件</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-delete'" id="optionalRemove">清空选填附件</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-insurance'" id="socialInsurance"
           style="display: none">社保</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-verify'" id="lendFund" style="display: none">公积金</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-credit'" id="lendCreditReport"
           style="display: none">征信报告</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-verify'" id="lendPolicy"
           style="display: none">保单</a>
    </div>
    <div data-options="region:'north'" style="height:60px;overflow:hidden;" title=""
         data-options="fit:true,border:false,collapsible:false,hideCollapsedContent:false">
        <div class="main_content_table">
            <div class="div_bottom">
                <div class="main_content_td_gray">进件号</div>
                <div class="main_content_td_white"><input id="lendRequestId"
                                                          style="border:0px;padding:5px;color: #CC2222"
                                                          readonly="readonly"/></div>
                <div class="main_content_td_graylast">姓名</div>
                <div class="main_content_td_whitelast"><input id="customerName"
                                                              style="border:0px;padding:5px;color: #ff8080"
                                                              readonly="readonly"/></div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <div data-options="region:'center'">
        <table id="lendAttachmentTable" style="width:100%;height:100%;" class="easyui-datagrid" data-options="idField:'id',
						url:'../../lendRequestUpload/lendRequestUploads/list',toolbar:'#lendAttachmentToolbar',
						onBeforeLoad:function(param){
						$('#creditType').next('.combo').hide();
						var params = getIframeParams(window.document.location.href);
						var customName = decodeURI(params.customName);
		                var lendRequestId=params.lendRequestId;
		                var view = params.view;
		                if(view === 'true') { // 进件搜索
                            $('#attachmentUplaod').hide();
                            $('#attachmentAdd').hide();
                            $('#optionalRemove').hide();
                            $('#attachmentRemove').hide();
		                }
		                $('#lendRequestId').val(lendRequestId);
		                $('#customerName').val(customName);
		                param.lendRequestId=lendRequestId;
		                var productCode = params.productCode;
                        var lendSoFundType = params.lendSoFundType;
                        // 针对无产品，所有附件都要显示
                         if(productCode === 'FINUP_BUSINESS' || productCode === 'FINUP_SALARY') {
                            $('#socialInsurance').show();
                            $('#lendFund').show();
                            $('#lendPolicy').show();
                         }
                         // 针对悦薪贷，社保和公积金选项
                        if (productCode.indexOf('_DELIGHT')!==-1) {
                        if (lendSoFundType === 'SOCIAL_INSURANCE') {
                         $('#socialInsurance').show();
                      } else if (lendSoFundType === 'ACCUMULATION_FUND') {
                        $('#lendFund').show();
                        } else if (lendSoFundType === 'INSURANCE_FUND') {
                          $('#socialInsurance').show();
                         $('#lendFund').show();
                          }
                              }
                          if (productCode.indexOf('_SAFETY')!=-1) {
                        $('#lendPolicy').show();
		                }},
		                onLoadSuccess:function(data){
		                var $rows=data.rows;
		                    $.map($rows, function (item) {
		                       if(item.lendType.key==='CREDIT_REPORT' &&  item.lendCreditReportType==='SIMPLE'){
		                        $('#lendCreditReport').show();
		                       }
		                    })
		                }
		                ">
            <thead>
            <tr>
                <th data-options="field:'id',width:140,align:'center'">文件编号</th>
                <th data-options="field:'lendTypeName',width:240,align:'center',formatter: function (value, data) {
                    return data.lendType.value;
                }">文件类型</th>
                <th data-options="field:'originalFileName',width:240,align:'center'">文件名称</th>
                <th data-options="field:'fileSize',width:140,align:'center',formatter:$.formatFileSize">文件大小</th>
                <th data-options="field:'prefix',width:100,align:'center'">命名前缀</th>
                <th data-options="field:'isRequired',width:180,align:'center'">必填验证</th>
                <th data-options="field:'updateTime',width:190,align:'center',formatter:$.formatDateTime">上传时间</th>
            </tr>
            </thead>
        </table>
    </div>

</div>
</body>
</html>