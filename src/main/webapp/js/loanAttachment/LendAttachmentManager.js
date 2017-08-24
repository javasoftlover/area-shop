/**
 * Created by dongchen on 2016/8/28.
 */
$(function () {
    var params = getIframeParams(window.document.location.href);
    var view = params.view;


    $('#creditType').next(".combo").hide();
    //定义文件上传组件
    var uploader = $.uploader('attachmentUplaod', '../../lendRequestUpload/upload/files', function (data) {
        var _rows = $('#lendAttachmentTable').datagrid('getSelections');
        var dataObj = $.parseJSON(data.response);
        if (dataObj.code === '200') {
            if (_rows[0].lendType === 'CREDIT_REPORT') {
                $('#lendCreditReport').show();
            }
            $.messager.alert('提示消息', '上传附件成功！', 'info');
            $('#lendAttachmentTable').datagrid('clearSelections');
            $('#lendAttachmentTable').datagrid('reload');
        } else {
            $.messager.alert('提示消息', dataObj.result, 'error');
        }
    });
    uploader.bind('BeforeUpload', function (uploader, file) {
        var _rows = $('#lendAttachmentTable').datagrid('getSelections');
        var lendRequestId = $('#lendRequestId').val();
        var json;

        if (_rows.length > 0) {
            if (_rows[0].lendType.key === 'CREDIT_REPORT') {
                json = {
                    'lendRequestId': lendRequestId,
                    'lendType': _rows[0].lendType.key,
                    'id': _rows[0].id,
                    'prefix': _rows[0].prefix
                }
            } else {
                json = {
                    'lendRequestId': lendRequestId,
                    'id': _rows[0].id,
                    'lendType': _rows[0].lendType.key,
                    'prefix': _rows[0].prefix
                }
            }
        } else {
            json = {
                'lendRequestId': lendRequestId,
            }
        }
        uploader.settings.multipart_params = json
    });


    /**
     * 初始化tooltip
     */
    $('#attachmentRemove').tooltip({
        position: 'top',
        content: '<span style="color:#fff;font-family: 新宋体;color: snow">提示：仅限其他附件类型可以删除！</span>',
        onShow: function () {
            $(this).tooltip('tip').css({backgroundColor: '#666', borderColor: '#666'});
        }
    });

    $('#attachmentUplaod').tooltip({
        position: 'top',
        content: '<span style="color:#fff;font-family: 新宋体;color: snow">提示：选择附件分类后点击上传按钮，文件命名无约束，系统直接将附件归类到选择的分类；' +
        '不选择附件分类点击上传按钮，文件名称需使用约定的前缀，系统根据前缀将附件归类到相应分类！</span>',
        onShow: function () {
            $(this).tooltip('tip').css({backgroundColor: '#666', borderColor: '#666'});
        }
    });
    $('#attachmentAdd').tooltip({
        position: 'top',
        content: '<span style="color:#fff;font-family: 新宋体;color: snow">提示：仅限添加其他类型附件！</span>',
        onShow: function () {
            $(this).tooltip('tip').css({backgroundColor: '#666', borderColor: '#666'});
        }
    });
    /**
     * 删除其他附件
     */
    $('#attachmentRemove').click(function () {
        var $rows = $('#lendAttachmentTable').datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        var $lendType = $rows[0].lendType.key;
        if ($lendType !== 'OTHER_PROVE') {
            $.messager.alert('提示信息', '不允许删除附件！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定对该附件进行删除操作吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(
                    basePath + '/lendRequestUpload/files/' + $rows[0].id + '/del',
                    function (data) {
                        $.messager.progress("close");
                        if (data.code === '200') {
                            $.messager.alert('提示消息', '删除附件成功！', 'info');
                            $('#lendAttachmentTable').datagrid('clearSelections');
                            $('#lendAttachmentTable').datagrid("reload");
                        } else {
                            $.messager.alert('提示消息', data.result, 'error');
                        }
                    }
                );
            }
        })
    });
    /**
     * 其他附件添加
     */
    $('#attachmentAdd').click(function () {
        $.messager.confirm('警告', '确定添加其他附件类型操作吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.post(
                    basePath + '/lendRequestUpload/addOtherProveAttachment/' + $('#lendRequestId').val(),
                    function (data) {
                        $.messager.progress("close");
                        if (data.code === '200') {
                            $.messager.alert('提示消息', '添加附件成功！', 'info');
                            $('#lendAttachmentTable').datagrid('clearSelections');
                            $('#lendAttachmentTable').datagrid("reload");
                        } else {
                            $.messager.alert('提示消息', data.result, 'error');
                        }
                    }
                );
            }
        })
    });

    /**
     * 删除选填附件
     */
    $('#optionalRemove').click(function () {
        var $rows = $('#lendAttachmentTable').datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        if ($rows[0].lendDictionaryCode === 'ADD_LEND_REQUEST_REQUIRED_FIELD') {
            $.messager.alert('提示信息', '只有选填才可以清空附件！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定清空改选填附件吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/lendRequestUpload/clean/lendRequestUpload/' + $rows[0].id, function (data) {
                    $.messager.progress("close");
                    if (data.code === '200') {
                        $.messager.alert('提示消息', '清空附件成功！', 'info');
                        $('#lendAttachmentTable').datagrid('clearSelections');
                        $('#lendAttachmentTable').datagrid("reload");
                    } else {
                        $.messager.alert('提示消息', data.result, 'error');
                    }
                });
            }
        });
    });
        // 社保
        $('#socialInsurance').click(function () {
            var isAdd = "";
            if (view === 'true') {
                isAdd = "&view=true";
            }
            parent.addTabs("社保" + $('#lendRequestId').val(), "page/lendAttachment/socialInsurance.jsp?lendRequestId=" + $('#lendRequestId').val() + isAdd);
        });
        // 公积金
        $('#lendFund').click(function () {
            var isAdd = "";
            if (view === 'true') {
                isAdd = "&view=true";
            }
            parent.addTabs("公积金" + $('#lendRequestId').val(), "page/lendAttachment/lendFund.jsp?lendRequestId=" + $('#lendRequestId').val() + isAdd);
        });
        // 保单
        $('#lendPolicy').click(function () {
            var isAdd = "";
            if (view === 'true') {
                isAdd = "&view=true";
            }
            parent.addTabs("保单" + $('#lendRequestId').val(), "page/lendPolicy/lendPolicy.jsp?lendRequestId=" + $('#lendRequestId').val() + isAdd);
        });
        // 征信报告
        $('#lendCreditReport').click(function () {
            var isAdd = "";
            if (view === 'true') {
                isAdd = "&isAdd=false";
            }
            var $lendRequestId = $('#lendRequestId').val();
            $.ajax({
                url: basePath + '/lendCreditReport/isUploadCreditReport',
                cache: false,
                type: 'POST',
                dataType: "json",
                data: {lendRequestId: $lendRequestId},
                success: function (data) {
                    if (data.code === '200') {
                        parent.$("#tabs").tabs("add", {
                            closable: true,
                            title: '个人简版信用报告',
                            content: "<iframe name='editCreditReport' id='editCreditReport' scrolling='no' frameborder='0'  src='" + basePath + "/lendCreditReport/querySimpleCreditReport?lendRequestId=" + $lendRequestId + isAdd + "' width='100%' height='99%'></iframe>"
                        });
                    } else if (data.code === '004') {
                        $.messager.alert('提示信息', data.message);
                    }
                },
                error: function () {
                    $.messager.alert('提示信息', '请求出现错误！');
                }
            });

        });
    });

//@ sourceURL=source.lendAttachement