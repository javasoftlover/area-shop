$(function () {

    // 初始化入职时间默认当天
    $("#entryTime").datebox("setValue", $.formatDate(new Date()));

    $('#orgTreeAdd').combotree({
        url : basePath+'/dictionary/orgTree',
        method: 'post',
        idFiled:'id',
        textFiled:'name',
        parentField : 'pid',
        checkbox:true,
        lines : true,
        panelHeight : '200',
        onLoadSuccess: function () {
            $('#orgTreeAdd').combotree('tree').tree("collapseAll");
        }
    });

    $('#addSubmitBtn').click(function () {
        if ($('#userAddForm').form('validate')) {
            var btn = $('#addSubmitBtn');
            btn.attr('disabled', true);
            $.messager.progress();

            var preUrl = basePath + '/userManager/user/add';
            $('#userAddForm').ajaxSubmit({
                url: preUrl,
                type:"post",
                dataType: 'json',
                success: function (data) {
                    $.messager.progress('close');
                    if (data.code === "200") {
                        $.messager.alert("成功", "添加用户成功", "info");
                        $("#userAddDiv").dialog('close');
                        $("#sampleTable").datagrid("reload");
                    } else {
                        $.messager.alert("失败", data.result, "error");
                    }
                },
                error: function (){
                    $.messager.progress('close');
                    $.messager.alert("失败", "请求失败", "error");
                    $("#userAddDiv").dialog('close');
                }
            });
        }
    });
    $('#addCloseBtn').click(function () {
        $.closeDialog('#userAddDiv');
    });

});