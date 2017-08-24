$(function () {

    // 初始化入职时间默认当天
    $("#entryTime").datebox("setValue", $.formatDate(new Date()));

    $('#orgTreeEdit').combotree({
        url : basePath+'/dictionary/orgTree',
        method: 'post',
        idFiled:'id',
        textFiled:'name',
        parentField : 'pid',
        checkbox:true,
        lines : true,
        panelHeight : '200',
        onLoadSuccess: function () {
            $('#orgTreeEdit').combotree('tree').tree("collapseAll");
        }
    });

    var _updateUserId = $('#updateUserId').val();
    if(_updateUserId){
        $.ajax({
            url: basePath + '/userManager/user/'+ _updateUserId + "/id",
            cache: false,
            type: 'GET',
            success: function (data) {
                $('#userEditForm').form('objLoad', data);
            }
        });
    }

    $('#editSubmitBtn').click(function () {
        if ($('#userEditForm').form('validate')) {
            var btn = $('#editSubmitBtn');
            btn.attr('disabled', true);
            $.messager.progress();

            var preUrl = basePath + '/userManager/user/update';
            $('#userEditForm').ajaxSubmit({
                url: preUrl,
                type:"post",
                dataType: 'json',
                success: function (data) {
                    $.messager.progress('close');
                    if (data.code === "200") {
                        $.messager.alert("成功", "修改用户成功！", "info");
                        $("#userEditDiv").dialog('close');
                        $("#sampleTable").datagrid("reload");
                    } else {
                        $.messager.alert("失败", data.result, "error");
                        $("#userEditDiv").dialog('close');
                    }
                },
                error: function (){
                    $.messager.progress('close');
                    $.messager.alert("失败", "请求失败", "error");
                    $("#userEditDiv").dialog('close');
                }
            });
        }
    });
    $('#editCloseBtn').click(function () {
        $.closeDialog('#userEditDiv');
    });

});