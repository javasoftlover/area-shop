<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <title>客服离职时该客服的所有进件进行客服修改</title>
</head>
<body>
<form id="updateSeller" method="post">
    <div class="main_content_table">
        <div class="div_bottom">
            <div class="main_content_td_gray">原客服编号</div>
            <div class="main_content_td_white"><input name="originalEmployeeNo" id="originalEmployeeNo"
                                                      class="easyui-validatebox textbox" style="height: 23px"
                                                      data-options="panelHeight:'auto',required:true,validType:'staffIdValidate',prompt:'请输入正确的客服编号'"/>
            </div>
            <div class="main_content_td_graylast">原客服姓名</div>
            <div class="main_content_td_whitelast"><input name="originalRealName" id="originalRealName"
                                                          class="easyui-validatebox textbox" style="height: 23px"
                                                          data-options="panelHeight:'auto',required:true,validType:'length[1,10]'"/>
            </div>
        </div>
        <div class="div_bottom">
            <div class="main_content_td_gray">修改后客服编号</div>
            <div class="main_content_td_white"><input name="updatedEmployeeNo" id="updatedEmployeeNo" class="easyui-validatebox textbox"
                                                      style="height: 23px"
                                                      data-options="panelHeight:'auto',required:true,validType:'staffIdValidate',prompt:'请输入正确的客服编号'"/>
            </div>
            <div class="main_content_td_graylast">修改后客服姓名</div>
            <div class="main_content_td_whitelast"><input name="updatedRealName" id="updatedRealName"
                                                          class="easyui-validatebox textbox" style="height: 23px"
                                                          data-options="required:true, validType:'length[1,10]'"/></div>
        </div>
        <div class="clear"></div>
    </div>
</form>
<br><br><br><br>
<div class="div_bottom">
    <div class="linkbutton_bg" style="float: right;">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="updateSellerSubmit">确定</a>
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-no'" id="updateCloseBtn">关闭</a>
    </div>
</div>
</body>
</html>