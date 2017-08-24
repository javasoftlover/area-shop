/**
 * Created by dongChen on 2017/2/21.
 */
$(function () {

    var $systemInteractionForm = $('#systemInteractionForm');
    var $systemInteractionTable = $('#systemInteractionTable');

    $('#systemInteractionSearchBtn').click(function () {
        var data = $systemInteractionForm.form('getDataObj');
        $systemInteractionTable.datagrid('load', data);
        $systemInteractionTable.datagrid('clearSelections');
    });


    /**
     * 上传sql文件
     */
    var uploader = $.uploader('parseSQL', '../../systemInteraction/upload/sql', function (data) {
        alert(data);
        if (data.code === '200') {
            $.messager.alert('提示消息', '上传附件成功！', 'info');
        } else {
            $.messager.alert('提示消息', data.result, 'error');
        }
    });


    /**
     * 重置
     */
    $('#systemInteractionClearBtn').click(function () {
        $systemInteractionForm.form('reset');
    });

    $('#getAttachment').click(function () {
        var $rows = $systemInteractionTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }

        $('<div id="getAttachmentDiv"></div>').dialog({
            title: '获取附件',
            width: 580,
            height: 'auto',
            closed: false,
            content: '<div class="main_content_table">'
            + '<div class="div_bottom">'
            + '<div class="main_content_td_graylast_small">附件类型:</div>'
            + '<div class="main_content_td_whitelast_small">'
            + '<input type="text" name="lendRequestUploadType" id="lendRequestUploadType" class="easyui-combobox" data-options="url:\'../../systemInteraction/uploads/list/' + $rows[0].lendRequestId + '\', required:true,prompt:\'请选择附件类型\'" />'
            + '</div></div>'
            + '  <div class="clear"></div></div>',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    var $lendRequestUploadType = $('#lendRequestUploadType').combobox('getValue');
                    if (!$lendRequestUploadType) {
                        return false;
                    }
                    $.messager.progress();
                    var $params = {
                        'lendRequestId': $rows[0].lendRequestId,
                        'lendRequestUploadType': $lendRequestUploadType
                    };
                    $.get('../../systemInteraction/afreshAttachment/' + $rows[0].lendRequestId + '/' + $lendRequestUploadType)
                        .success(function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.closeDialog('#getAttachmentDiv');
                                $systemInteractionTable.datagrid('clearSelections');
                                $.messager.confirm('警告', '是否跳转到附件管理查询附件获取情况?', function (r) {
                                    if (r) {
                                        parent.addTabs('附件管理' + $rows[0].lendRequestId, 'page/lendAttachment/LendAttachmentManager.jsp?lendRequestId='
                                            + $rows[0].lendRequestId + '&customName=' + $rows[0].customerName + '&productCode=' + $rows[0].lendProductCode);
                                    }
                                })

                            } else {
                                $.messager.alert('提示信息', ' 获取附件失败', 'warning');
                            }


                        });
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#getAttachmentDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#getAttachmentDiv');
            }
        });
    });


    $('#getAttachments').click(function () {

        $('<div id="getAttachmentDivs"></div>').dialog({
            title: '批量获取附件',
            width: 580,
            height: 'auto',
            closed: false,
            content: '<div class="main_content_table">'
            + '<div class="div_bottom">'
            + '<div class="main_content_td_graylast_small">进件号:</div>'
            + '<div class="main_content_td_whitelast_small">'
            + '<input type="text" name="lendRequestIds" id="lendRequestIds" style="width:400px" />'
            + '</div></div>'
            + '  <div class="clear"></div></div>',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {

                    $.messager.progress();
                    var $params = {'lendRequestIds': $('#lendRequestIds').val()};
                    if (!$params) {
                        $.messager.alert('提示消息', '请输入进件号！', 'info');
                        return;
                    }
                    $.post(basePath + '/systemInteraction/getUploads', $params, function (data) {
                        $.messager.progress('close');
                        if (data.code === '200') {
                            $.messager.alert('提示消息', '获取附件成功！', 'info');
                            $("#getAttachmentDivs").dialog('close');

                        } else {
                            $.messager.alert('提示消息', '操作失败,请稍后再试！', 'error');
                        }

                    }).fail(function (error) {
                        $.messager.progress('close');
                        var $responseText = $.parseJSON(error.responseText);
                        $.messager.alert('提示消息', $responseText.message, 'error');
                    })


                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#getAttachmentDivs');
                }
            }],
            onClose: function () {
                $.closeDialog('#getAttachmentDivs');
            }
        });
    });

    /**
     * 修改进件
     */
    $('#lendRequestEdit').click(function () {
        var $rows = $systemInteractionTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        parent.addTabs("修改进件" + $rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + $rows[0].lendRequestId + '&status=' + $rows[0].lendRequestStatus.key + '&sourceTitle= 系统交互处理');
    });


    /**
     * 字典表缓存
     */
    $('#dictionaryCache').click(function () {
        $.messager.confirm('警告', '确定初始化字典表缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/dictionaryCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    /**
     * 省市区缓存
     */
    $('#cityCache').click(function () {
        $.messager.confirm('警告', '确定初始化省市区缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/cityCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    /**
     * 省市区缓存
     */
    $('#neo4jCache').click(function () {
        $.messager.confirm('警告', '确定初始化知识图谱拒贷码缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/neo4jCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    /**
     * 一级渠道缓存
     */
    $('#oneChannelCache').click(function () {
        $.messager.confirm('警告', '确定初始化一级渠道缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/oneChannelCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    /**
     * 二级渠道缓存
     */
    $('#secondChannelCache').click(function () {
        $.messager.confirm('警告', '确定初始化二级渠道缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/secondChannelCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    /**
     * 渠道关系缓存
     */
    $('#channelRelationCache').click(function () {
        $.messager.confirm('警告', '确定初始化渠道关系缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/channelCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    /**
     * 黑名单字典缓存
     */
    $('#lendShopBlackCache').click(function () {
        $.messager.confirm('警告', '确定初始化黑名单字典缓存吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/lendShopBlackCache').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "缓存初始化成功！", 'info');
                })
            }
        });
    });

    $('#mainCardPushCore').click(function () {
        var $rows = $systemInteractionTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.messager.confirm('警告', '确定推送主卡信息到资产服务吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/systemInteraction/bankCard/' + $rows[0].lendRequestId + '/main').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "推送资产服务成功！", 'info');
                }).fail(function (error) {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', '推送资产服务失败', 'error');

                });

            }});
    });
    /**
     * 开启副卡京东鉴权缓存
     */
    $('#viceAuthOneCache').click(function () {
        $.messager.confirm('警告', '确定开启副卡京东鉴权吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/initViceFlag/1').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "开启副卡京东鉴权成功！", 'info');
                })
            }
        });
    });


    /**
     * 关闭副卡京东鉴权缓存
     */
    $('#viceAuthZeroCache').click(function () {
        $.messager.confirm('警告', '确定关闭副卡京东鉴权吗?', function (r) {
            if (r) {
                $.messager.progress();
                $.get(basePath + '/dictionary/initViceFlag/0').success(function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', "关闭副卡京东鉴权成功！", 'info');
                })
            }
        });
    });

    $('#infoEdit').click(function () {
        var $rows = $systemInteractionTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }

        $('<div id="infoEditDiv"></div>').dialog({
            title: '更改信息',
            width: 780,
            height: 'auto',
            closed: false,
            href: '../../page/systemInteraction/changeInfo.html',
            modal: true,
            queryParams: {
                'lendRequestId': $rows[0].lendRequestId
            },
            buttons: [{
                text: '确定',
                handler: function () {
                    if ($('#baseInfoForm').form('validate')) {
                        $.messager.progress();
                        var $obj = $('#baseInfoForm').form('getDataObj');
                        $obj.lendRequestId = $rows[0].lendRequestId;
                        $.post(basePath + '/systemInteraction/baseInfo', $obj, function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.messager.alert('提示消息', '更改信息成功！', 'info');
                                $("#infoEditDiv").dialog('close');
                                $("#systemInteractionTable").datagrid("reload");
                                $("#systemInteractionTable").datagrid('clearSelections');
                            } else {
                                $.messager.alert('提示消息', '操作失败,请稍后再试！', 'error');
                            }

                        }).fail(function (error) {
                            $.messager.progress('close');
                            var $responseText = $.parseJSON(error.responseText);
                            $.messager.alert('提示消息', $responseText.message, 'error');
                        })
                    }
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#infoEditDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#infoEditDiv');
            },
            onLoad: function () {
                $.includeFile('#infoEditDiv', ['/js/systemInteraction/changeInfo.js']);
            }
        });
    });

    /**
     * 修改终态
     */
    $('#isFinalStateEdit').click(function () {

        $('<div id="isFinalStateEditDiv"></div>').dialog({
            title: '修改终态',
            width: 600,
            height: 'auto',
            closed: false,
            href: '../../page/systemInteraction/editIsFinalState.html',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    if ($('#editIsFinalStateForm').form('validate')) {
                        $.messager.progress();
                        var $obj = $('#editIsFinalStateForm').form('getDataObj');
                        $.post(basePath + '/systemInteraction/editIsFinalState', $obj, function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.messager.alert('提示消息', '修改终态成功！', 'info');
                                $("#isFinalStateEditDiv").dialog('close');
                                $("#systemInteractionTable").datagrid("reload");
                                $("#systemInteractionTable").datagrid('clearSelections');
                            } else {
                                $.messager.alert('提示消息', '操作失败,请稍后再试！', 'error');
                            }

                        }).fail(function (error) {
                            $.messager.progress('close');
                            var $responseText = $.parseJSON(error.responseText);
                            $.messager.alert('提示消息', $responseText.message, 'error');
                        })
                    }
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#isFinalStateEditDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#isFinalStateEditDiv');
            }
        });
    });

    /**
     * 删除bankInfo
     */
    $('#deleteBankInfo').click(function () {
        $.messager.prompt('删除bankInfo数据', '请输入bankInfo主键', function(r){
            if (r){
               $.get(basePath+'/systemInteraction//bankInfo/delete/'+r).success(function(data){
                   $.messager.alert('提示信息', '删除成功！', 'ok');
               })
            }
        });

    });

    $('#pushRepay').click(function () {
        $.messager.prompt('推送贷后', '请输入核心进件号', function(r){
            if (r){
                $.get(basePath+'/systemInteraction/pushRepay/'+r).success(function(data){
                    $.messager.alert('提示信息', '推送成功！', 'ok');
                })
            }
        });

    });



    /**
     * 提现操作
     */
    $('#customerWithdrawal').click(function () {
        var $account;
        var $rows = $systemInteractionTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        $.get(basePath + '/systemInteraction/validate/withdrawal/' + $rows[0].lendRequestId).success(function (data) {
            customerWithdrawal($rows[0].lendRequestId, data.result);
        }).fail(function (error) {
            var $responseText = $.parseJSON(error.responseText);
            $.messager.alert('提示消息', $responseText.message, 'error');

        });

    });

    function customerWithdrawal(lendRequestId, account) {
        $('<div id="customerWithdrawalDiv"></div>').dialog({
            title: '提现',
            width: 600,
            height: 'auto',
            closed: false,
            href: '../../page/systemInteraction/lendCustomerWithDrawal.html',
            queryParams: {
                account: account
            },
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    if ($('#lendCustomerWithDrawalForm').form('validate')) {
                        $.messager.progress();
                        var $obj = $('#lendCustomerWithDrawalForm').form('getDataObj');
                        $obj.lendRequestId = lendRequestId;
                        $.post(basePath + '/systemInteraction/saveCustomerWithdrawal', $obj, function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.messager.alert('提示消息', '修改终态成功！', 'info');
                                $("#isFinalStateEditDiv").dialog('close');
                                $("#systemInteractionTable").datagrid("reload");
                                $("#systemInteractionTable").datagrid('clearSelections');
                            } else {
                                $.messager.alert('提示消息', '操作失败,请稍后再试！', 'error');
                            }

                        }).fail(function (error) {
                            $.messager.progress('close');
                            var $responseText = $.parseJSON(error.responseText);
                            $.messager.alert('提示消息', $responseText.message, 'error');
                        })
                    }
                }
            },
                {
                    text: '取消',
                    handler: function () {
                        $.closeDialog('#customerWithdrawalDiv');
                    }
                }],
            onClose: function () {
                $.closeDialog('#customerWithdrawalDiv');
            },
            onLoad: function () {
                $.includeFile('#customerWithdrawalDiv', ['/js/systemInteraction/lendCustomerWithDrawal.js']);
            }

        });
    }

    /**
     *
     * 下载签约合同
     */
    $('#downLoadSignContract').click(function () {
        var $account;
        var $rows = $systemInteractionTable.datagrid('getSelections');
        if ($rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }

        $.messager.progress();
        setTimeout(function () {
            $.messager.progress('close');
            window.location.href = basePath + '/systemInteraction/browseAttachment/' + $rows[0].lendRequestId + '/down';
        }, 2000);

    });


    $('#coreErrorList').click(function () {
        $('<div id="coreErrorListDiv"></div>').dialog({
            title: '充值失败数据',
            width: 800,
            height: 400,
            closed: false,
            cache: false,
            href: '../../page/systemInteraction/coreErrorLog.html',
            modal: true,
            onLoad: function () {
                $.includeFile('#coreErrorListDiv', ['/js/systemInteraction/coreErrorLog.js']);
            }
        });
    });

    $('#settlementErrorList').click(function () {
        $('<div id="settlementErrorListDiv"></div>').dialog({
            title: '划扣失败数据',
            width: 800,
            height: 400,
            closed: false,
            cache: false,
            href: '../../page/systemInteraction/settlementErrorLog.html',
            modal: true,
            onLoad: function () {
                $.includeFile('#settlementErrorListDiv', ['/js/systemInteraction/settlementErrorLog.js']);
            }
        });

    });

    });
