<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ include file="basePath.jsp" %>
<link rel="shortcut icon" type="image/x-icon" href="<%=basePath%>/images/icon/favicon.ico" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/component/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/component/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/index.css">
<script type="text/javascript" src="<%=basePath%>/component/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/extEasyUI.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/easyui-validator-ext.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/plupload/plupload.full.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/arith.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/format.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/form.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/document.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/collections.js"></script>
<script type="text/javascript" src="<%=basePath%>/component/common/serializeObject.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/index.js"></script>

<script type="text/javascript" >
	//全局的ajax访问，处理ajax清求时sesion超时
	$.ajaxSetup({
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		complete:function(XMLHttpRequest,textStatus){
			//通过XMLHttpRequest取得响应头，sessionstatus，
			var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); 
			if(sessionstatus=="timeout"){
			//如果超时就处理 ，指定要跳转的页面
				window.location.reload("/puhui-lend-pre/");
			}
			if(XMLHttpRequest.status==555){
				var location = XMLHttpRequest.getResponseHeader("Location");
				self.parent.window.location=location;
			}
		}
	});
</script>