$(function () {

    $('#sampleSearchBtn').click(function () {
        var data = $('#sampleSearchForm').form('getDataObj');
        $('#sampleTable').datagrid('load', data);
    });
    $('#sampleClearBtn').click(function () {
        $('#sampleSearchForm').form("reset");
    });

    $('#orgTree').combotree({
        url: basePath + '/dictionary/orgTree',
        method: 'post',
        idFiled: 'id',
        textFiled: 'name',
        parentField: 'pid',
        checkbox: true,
        lines: true,
        panelHeight: '200',
        onLoadSuccess: function () {
            $('#orgTree').combotree('tree').tree("collapseAll");
        }
    });

    // 添加用户按钮
    $('#addUser').click(function () {
        $('<div id="userAddDiv"></div>').dialog({
            title: '添加用户信息',
            width: 800,
            height: 'auto',
            closed: false,
            cache: false,
            href: basePath + '/page/taskManager/userAdd.jsp',
            modal: true,
            onLoad: function () {
                $.includeFile("#userAddDiv", ['/js/taskManager/userAdd.js']);
            },
            onClose: function () {
                $.closeDialog('#userAddDiv');
            }
        });
    });

    // 编辑用户按钮
    $('#editUser').click(function () {
        var _rows = $('#sampleTable').datagrid('getSelections');
        if (_rows.length !== 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        if (_rows[0].positionType === "LEND_MANAGER" || _rows[0].positionType === "OTHER") {
            $.messager.alert('提示信息', '该用户你不能修改！');
            return false;
        }

        $('<div id="userEditDiv"></div>').dialog({
            title: '修改用户信息',
            width: 800,
            height: 'auto',
            closed: false,
            cache: false,
            href: basePath + '/page/taskManager/userEdit.jsp',
            modal: true,
            onLoad: function () {
                $('#updateUserId').val(_rows[0].id);
                $.includeFile("#userEditDiv", ['/js/taskManager/userEdit.js']);
            },
            onClose: function () {
                $.closeDialog('#userEditDiv');
            }
        });
    });

    // 启用用户按钮
    $('#enable').click(function () {
        optRow("enable");
    });
    //禁用用户
    $('#unable').click(function () {
        optRow("forbid");
    });
    //重置密码
    $('#resetPassWord').click(function () {
        optRow("pwd");
    });
    //重新生成证书
    $('#resetCertificate').click(function () {
        optRow("cert");
    });

    function optRow(opt) {
        var _rows = $('#sampleTable').datagrid('getSelections');
        if (_rows.length !== 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        if (_rows[0].positionType === "LEND_MANAGER" || _rows[0].positionType === "OTHER") {
            $.messager.alert('提示信息', '该用户你不能修改！');
            return false;
        }
        var msg;
        var tmpUrl;
        if(opt === "enable"){
            msg = "确认启用该用户？";
            tmpUrl = basePath + '/userManager/user/enable?staffId=' + _rows[0].id;
        } else if(opt === "forbid"){
            msg = "确认禁用该用户？";
            tmpUrl = basePath + '/userManager/user/forbid?staffId=' + _rows[0].id;
        } else if(opt === "pwd"){
            msg = "确认重置该用户密码？";
            tmpUrl = basePath + '/userManager/user/resetPwd?staffId=' + _rows[0].id;
        } else {
            msg = "确认重新生成该用户证书？";
            tmpUrl = basePath + '/userManager/user/reIssueCert?staffId=' + _rows[0].id;
        }
        $.messager.confirm('操作用户', msg, function (r) {
            if (r) {
                $.ajax({
                    url: tmpUrl,
                    method: 'get',
                    data: {lendRequestId: _rows[0].lendRequestId},
                    success: function (data) {
                        if (data.code === "200") {
                            $.messager.alert("成功", "操作成功", "info");
                            $('#sampleTable').datagrid("reload");
                        } else {
                            $.messager.alert("错误", data.result, "error");
                        }
                    },
                    error: function() {
                        $.messager.alert('提示信息', "请求出现错误！", "error");
                    }
                });
            }
        });
    }

    //进件客服修改
    $('#updateCustomer').click(function () {
        $('<div id="updateSellerDiv"></div>').dialog({
            title: '客服离职时该客服的所有进件进行客服修改',
            width: 800,
            height: 'auto',
            closed: false,
            cache: false,
            href: basePath + '/page/taskManager/updateSeller.jsp',
            modal: true,
            onLoad: function () {
                $.includeFile("#updateSellerDiv", ['/js/taskManager/updateSeller.js']);
            },
            onClose: function () {
                $.closeDialog('#updateSellerDiv');
            }
        });
    });
});