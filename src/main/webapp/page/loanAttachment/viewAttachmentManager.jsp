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
        "/js/loanAttachment/attachmentCommons.js"
    ]);
});
</script>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div id="lendAttachmentToolbar" style="padding:2px 0">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-preview'" id="preview" onclick="$attachment.preview();">预览</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="attachmentDownLoad" onclick="$attachment.attachmentDownLoad()">批量下载</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-downLoad'" id="attachmentDownLoadOne" onclick="$attachment.attachmentDownLoadOne()">下载</a>
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
						var params = getIframeParams(window.document.location.href);
						var customName = decodeURI(params.customName);
		                var lendRequestId=params.lendRequestId;
		                $('#lendRequestId').val(lendRequestId);
		                $('#customerName').val(customName);
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