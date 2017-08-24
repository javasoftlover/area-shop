/**
 * Created by DongChen on 2016/10/13.
 */

$(function () {
    var $params = getIframeParams(window.document.location.href);
    var $lendRequestId = $params.lendRequestId;
    var $videoStatus = $params.videoStatus;
    var opts = {
        'WAIT_CONTRACT': {
            'verificationCode': false,
            'viewContract': true,
            'afreshContract': false,
            'uploadContract': false
        },
        'WAIT_FOR_ELECTRONIC_SIGNATURE': {
            'verificationCode': true,
            'viewContract': true,
            'afreshContract': true,
            'uploadContract': false
        },
        'WAIT_SIGN': {
            'verificationCode': false,
            'viewContract': true,
            'afreshContract': true,
            'uploadContract': true
        },
        'PASS_FAILED': {
            'verificationCode': false,
            'viewContract': true,
            'afreshContract': true,
            'uploadContract': true
        }
    };
    $('div').data('lendRequestId', $lendRequestId);
    $('div').data('videoStatus', $videoStatus);

    /**
     * 初始化签约操作所需数据,通过数据判定按钮和div的隐藏或者显示
     *initSign挂载在window下,方便子页面调用
     * @param lendRequestId
     */
    window.initSign = function (lendRequestId) {
        //判断div下面是否动态添加了子元素,如果有先删除,后续再添加
        $('#viewMainContentTable').empty();
        //页面刷新时清空验证码 防止重新制作合同时默认显示验证码
        $('#messageCode').val('');


        $.get('../../../lendSign/initSingData/' + lendRequestId).success(function (data) {
            var $lendRequest = data.result.lendRequest;
            var $status = opts[$lendRequest.status];
            for (var key in $status) {
                if ($status[key] === true) {
                    $('#' + key).show();
                } else {
                    $('#' + key).hide();
                }
            }
            viewContract();
            viewUploadContract();
            if (data.result.isHideAuthBtn === true) {
                $('#isShowCreateContractDiv').show();
                $('#bank_card_auth_ok').show();
            }
            // add videoSignBtn by yhl
            if (data.result.isVideoSignBtn === true) {
                $('#isShowVideoSignDiv').show();
            }

            $('div').data('lendRequest', $lendRequest);
            $('div').data('isHideAuthBtn', data.result.isHideAuthBtn);
            $('div').data('isHideContractBtn', data.result.isHideContractBtn);
            $('div').data('main', data.result.main);
            $('div').data('vice', data.result.vice);
            $('div').data('viceCardAuthFlag', data.result.viceCardAuthFlag);
            $('#lendSignForm').form('objLoad', $lendRequest);
        }).fail(function () {

        });
    };
    initSign($lendRequestId);

    /**
     * 银行卡鉴权按钮点击事件
     * 2 查看 1 重新鉴权 3 第一次进入
     */
    $('#bankCardAuth').linkbutton({
        onClick: function () {
            var isEdit = 1;
            if ($('div').data('lendRequest').status === 'WAIT_CONTRACT' && (  $('div').data('main') != null || $('div').data('vice') != null)) {
                //$.messager.defaults = {ok: "查询", cancel: "重新鉴权"};
                $.messager.confirm('警告', '该银行卡已鉴权通过,选择‘确认’代表查询,选择‘取消’表示重新鉴权?', function (r) {
                    if (r) {
                        isEdit = 2;
                    }
                    checkOrUpdateBankCard(isEdit);
                });
            } else if ($('div').data('lendRequest').status != 'WAIT_CONTRACT' && $('div').data('isHideAuthBtn') === true) {
                checkOrUpdateBankCard(2);
            } else {
                checkOrUpdateBankCard(3);
            }
        }

    });

    function checkOrUpdateBankCard(isEdit) {
        $('<div id="bankCardAuthDiv"></div>').dialog({
            title: '银行卡鉴权',
            width: 780,
            height: 'auto',
            closed: false,
            href: '../../../page/lendRequestManage/sign/authBankCard.html',
            modal: true,
            queryParams: {
                'isEdit': isEdit
            },
            onLoad: function () {
                $.includeFile('#bankCardAuthDiv', ['/js/lendRequestManage/sign/authBankCard.js']);
            },
            onClose: function () {
                $.closeDialog('#bankCardAuthDiv');
            }
        });
    }


    /**
     * 生成合同按钮点击事件
     */
    $('#createContract').linkbutton({
        onClick: function () {
            $('<div id="createContractDiv"></div>').dialog({
                title: '生成合同',
                width: 780,
                height: 'auto',
                closed: false,
                href: '../../../page/lendRequestManage/sign/createContract.html',
                modal: true,

                onLoad: function () {
                    $.includeFile('#createContractDiv', ['/js/lendRequestManage/sign/createContract.js']);
                },
                onClose: function () {
                    $.closeDialog('#createContractDiv');
                }
            });
        }
    });

    /**
     * 发送短信验证码
     */
    $('#messageCodeBtn').linkbutton({
        onClick: function () {
            var $mobile = $('div').data('lendRequest').lendCustomer.mobile;
            $.get("../../../lendSign/send/message/" + $mobile);
            var $step = 120;
            $('#messageCodeBtn').linkbutton({
                text: '重新发送120'
            });
            var $res = setInterval(function () {
                $('#messageCodeBtn').linkbutton({
                    text: '重新发送' + $step,
                    disabled: true
                });
                $step -= 1;
                if ($step <= 0) {
                    $('#messageCodeBtn').linkbutton({
                        text: '获取验证码',
                        disabled: false
                    });
                    clearInterval($res);//清除setInterval
                }
            }, 1000);
        }
    });


    $('#authMessageAndSealBtn').linkbutton({
        onClick: function () {
            if (!$('#messageCode').validatebox('isValid')) {
                return false;
            }
            $.messager.progress();
            var $mobile = $('div').data('lendRequest').lendCustomer.mobile;
            $.get(basePath + '/lendSign/validate/' + $mobile + '/' + $('#messageCode').val()).success(function (data) {
                seal();
            }).fail(function (data) {
                $.messager.progress('close');
                var $responseText = $.parseJSON(data.responseText);
                $.messager.alert('提示消息', $responseText.message, 'error');
            });
        }
    });

    $('#afreshContractBtn').linkbutton({
        onClick: function () {
            $.messager.confirm('确认', '您确定要进行重新生成合同操作吗?', function (r) {
                if (r) {
                    $.messager.progress();
                    $.get('../../../lendSign/afreshContract/' + $('div').data('lendRequestId')).success(function () {
                        $.messager.progress('close');
                        $.messager.alert('提示消息', "重新制作合同成功!", 'info');
                        initSign($lendRequestId);
                    }).fail(function (data) {
                        $.messager.progress('close');
                        $.messager.alert('提示消息', "重新生成合同失败！", 'error');
                    });
                }
            });
        }
    });

    //初始化上传手机详单控件
    uploadSignContract('uploadMobileInfoBtn', 'MOBILE_INFO');
    //初始化上传签约照片控件
    uploadSignContract('uploadSignPhotoBtn', 'SIGN_PHOTO');
    //初始化上传签约合同控件
    uploadSignContract('uploadSignContractBtn', 'SIGN_CONTRACT');


    function uploadSignContract(flag, type) {
        var uploader = $.uploader(flag, '../../../lendSign/upload/signContract', function (data) {
            $.messager.alert('提示消息', "上传成功!", 'info');
            initSign($('div').data('lendRequestId'));

        });
        uploader.bind('BeforeUpload', function (uploader, file) {
            var json = {
                'lendRequestId': $('div').data('lendRequestId'),
                'lendRequestUploadType': type
            };
            uploader.settings.multipart_params = json
        });
    }

    /**
     * 调用签章
     */
    function seal() {
        var $lendRequestId = $('div').data('lendRequestId');
        $.get('../../../lendSign/seal/' + $lendRequestId).success(function (data) {
            $.messager.progress('close');
            if (data.code === '200') {
                $.messager.alert('提示消息', "盖章成功!", 'info');
                initSign($lendRequestId);
            } else {
                $.messager.alert('提示消息', data.message, 'error');
            }


        }).fail(function (data) {
            $.messager.progress('close');
            var $responseText = $.parseJSON(data.responseText);
            $.messager.alert('提示消息', $responseText.message, 'error');
        });
    }

    /**
     * 是否显示预览合同
     */
    function viewContract() {
        //解绑onclick事件
        $('div').off('click.viewContract');
        $('div').off('click.downloadContract');
        $.get('../../../lendSign/contracts/' + $('div').data('lendRequestId')).success(function (data) {
            if (data.length > 0) {
                $('#create_contract_ok').show();
                $('#afreshContract').show();
                var str = '';
                $.map(data, function (item, index) {
                    str += '<div class="div_bottom"> ' +
                        '<div class="main_content_td_gray_small2">' + item.contractTemplate.displayName + '</div>' +
                        '<div class="main_content_td_whitelast_small2">'
                        + '<a href="#" id="view' + index + '" class="easyui-linkbutton c1" style="margin-left: 60px" >预览</a>'
                        + '<a href="#" id="download' + index + '" class="easyui-linkbutton c1" style="margin-left: 60px" >下载</a>'
                        + '</div>'
                        + '</div>';
                    $('div').on('click.viewContract', '#view' + index, function (evt) {
                        evt.stopPropagation();
                        parent.addTabs(item.lendRequestId + item.contractTemplate.displayName, 'page/lendRequestManage/sign/viewContract.html?contractId=' + item.id + '&fileName=' + item.contractTemplate.name);
                    });

                    $('div').on('click.downloadContract', '#download' + index, function (evt) {
                        $.messager.progress();
                        evt.stopPropagation();
                        setTimeout(function () {
                            $.messager.progress('close');
                            window.location.href = basePath + '/lendSign/download/contract/' + item.id + '/' + item.contractTemplate.name;
                        }, 2000);
                    });
                });
                str += ' <div class="clear"></div>';
                var object = $(str).appendTo($('#viewMainContentTable'));
                $.parser.parse(object);
            } else {
                $("#viewContract").hide();
                $('#create_contract_ok').hide();
            }
        });

    };

    /**
     * 是否显示上传合同材料
     */
    function viewUploadContract() {
        var $visible = $("#uploadContract").is(":visible");
        if ($visible) {
            $.get('../../../lendSign/signContract/' + $('div').data('lendRequestId')).success(function (data) {
                $.map(data, function (item, index) {
                    $('#' + item.lendType + '_VIEW').attr('flag', item.id);
                    $('#' + item.lendType + '_VIEW').attr('fileName', item.originalFileName);
                    $('#' + item.lendType + '_VIEW').attr('flag', item.id);
                    $('#' + item.lendType + '_OK').show();
                });
                if (data.length === 3 && $('div').data('lendRequest').status === 'WAIT_SIGN') {
                    $('#Auditing').show();
                } else {
                    $('#Auditing').hide();
                }
            })
        } else {
            $('#Auditing').hide();
        }
    }

    /**
     * 手机详单预览
     */
    $('#MOBILE_INFO_VIEW').linkbutton({
        onClick: function () {
            var $flag = $('#MOBILE_INFO_VIEW').attr('flag');
            var $fileName = $('#MOBILE_INFO_VIEW').attr('fileName');
            $attachment.previewHandle($flag, $fileName, $lendRequestId);
        }
    });
    /**
     * 签约照片预览
     */
    $('#SIGN_PHOTO_VIEW').linkbutton({
        onClick: function () {
            var $flag = $('#SIGN_PHOTO_VIEW').attr('flag');
            var $fileName = $('#SIGN_PHOTO_VIEW').attr('fileName');
            $attachment.previewHandle($flag, $fileName, $lendRequestId);
        }
    });
    /**
     * 签约合同预览
     */
    $('#SIGN_CONTRACT_VIEW').linkbutton({
        onClick: function () {
            var $flag = $('#SIGN_CONTRACT_VIEW').attr('flag');
            var $fileName = $('#SIGN_CONTRACT_VIEW').attr('fileName');
            $attachment.previewHandle($flag, $fileName, $lendRequestId);
        }
    });

    /**
     * 提交签约合同操作
     */
    $('#sumbitBtn').linkbutton({
        onClick: function () {
            $.messager.confirm('确认', '您确定提交签约合同吗？', function (r) {
                if (r) {
                    $.messager.progress();
                    var $lendRequestId = $('div').data('lendRequestId');
                    $.get(basePath + '/lendSign/submit/auditing/' + $lendRequestId).success(function (data) {
                        $.messager.progress('close');
                        $.messager.alert('提示信息', '签约成功，等待客服经理审核！', 'info', function () {
                            //操作完成后刷新父tab页列表 保证状态统一一致性
                            var tab = parent.$("#tabs").tabs("getTab", "签约管理");
                            var url = $(tab.panel('options').content).attr('src');
                            parent.$('#tabs').tabs('update', {
                                tab: tab,
                                options: {
                                    src: url
                                }
                            });
                            parent.$("#tabs").tabs("close", "签约" + $lendRequestId);
                        });
                    }).fail(function (data) {
                        $.messager.progress('close');
                        var $responseText = $.parseJSON(data.responseText);
                        $.messager.alert('提示消息', $responseText.message, 'error');
                    });
                }
            })
        }
    });
});
//@ sourceURL=source.lendsign