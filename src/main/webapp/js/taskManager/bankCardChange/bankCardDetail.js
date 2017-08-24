// 银行卡变更
$(function () {
    var params = getIframeParams(window.document.location.href);
    // 用户信息
    var lendRequestId = params.lendRequestId;
    var isAdd = params.isAdd;
    var card = params.card;

    var lendBankCardId;

    var bankData;
    var mobile;

    var $res;

    var uploadId;
    var fileName;

    var $viceChangeCardAuthFlag;
    $('#lendBankViceInfo_bankName').combobox({

        onSelect:function(data){
            if(data.bankCode!=='YOU_ZHENG' && $viceChangeCardAuthFlag){
                messageFlag(true);
            }else{
                messageFlag(false);
            }
        }
    });

    //设置验证码框 显示 隐藏
    function messageFlag(flag){
        if(flag){
            $('#messageCodeDiv').show();
        }else{
            $('#messageCodeDiv').hide();
        }
        $('#viceVerifyValue').textbox({required:flag});
    }
    /**
     * 发送短信验证码
     */
    $('#getViceChangeMessageCodeBtn').linkbutton({

        onClick: function () {
            var viceCardNo = $('#lendBankViceInfo_cardNo').val();
            var orderViceMobile = $('#orderMobile1').val();
            var bankViceName = $('#lendBankViceInfo_bankName').combobox('getValue');
            if(!orderViceMobile){
                $.messager.alert('提示信息','副卡预留手机不能为空');
                return;
            }
            if(!viceCardNo){
                $.messager.alert('提示信息','副卡卡号不能为空');
                return;
            }

            var $params = {'requestId': lendRequestId,'bankViceName': bankViceName,'viceCardNo':viceCardNo,'orderViceMobile':orderViceMobile};
            $.post(basePath + '/lendSign/getOtherMessage', $params).success(function (data) {
                $.messager.progress('close');
                if (data.code === '200' && data.result.authResult) {
                    $('#viceUniqueId').val(data.result.uniqueId);
                    $.messager.alert('提示', "短信验证码已发送至:"+orderViceMobile, 'info');
                } else if( data.result.authCode === '000000'){
                    $.messager.alert('提示', "无需获取验证码,请继续进行鉴权流程！", 'info');
                    messageFlag(false);
                }else {
                    $.messager.alert('提示', "副卡鉴权失败，原因为:"+data.result.authMessage, 'error');
                }
            }).fail(function (data) {
                $.messager.progress('close');
                var $data = $.parseJSON(data.responseText);
                $.messager.alert('提示', $data.message, 'error');
            })

            var $step = 60;
            $('#getViceChangeMessageCodeBtn').linkbutton({
                text: '重新发送60'
            });
            var $res = setInterval(function () {
                $('#getViceChangeMessageCodeBtn').linkbutton({
                    text: '重新发送' + $step,
                    disabled: true
                });
                $step -= 1;
                if ($step <= 0) {
                    $('#getViceChangeMessageCodeBtn').linkbutton({
                        text: '获取验证码',
                        disabled: false
                    });
                    clearInterval($res);//清除setInterval
                }
            }, 1000);
        }
    });
    // 主卡
    $('#lendBankInfo_bankProvince').combobox({
        required: true,
        url: '../../../dictionary/region/-1',
        method: 'GET',
        prompt: '开户行省份',
        onChange: function (record) {
            $('#lendBankInfo_bankCity').combobox({
                required: true,
                method: 'GET',
                prompt: '开户行城市',
                url: '../../../dictionary/region/' + record,
                onChange: function (newValue, oldValue) {
                    $('#lendBankInfo_bankBranchName').combobox('setText', '');
                    $('#lendBankInfo_branchNo').val('');
                },
                onSelect: function (record) {
                    loadBankBranchName();
                }
            });
            $('#lendBankInfo_bankBranchName').combobox('setText', '');
            $('#lendBankInfo_branchNo').val('');
        }
    });

    // 副卡
    $('#lendBankViceInfo_bankProvince').combobox({
        required: true,
        url: '../../../dictionary/region/-1',
        method: 'GET',
        prompt: '开户行省份',
        onChange: function (newValue) {
            $('#lendBankViceInfo_bankCity').combobox({
                required: true,
                method: 'GET',
                prompt: '开户行城市',
                url: '../../../dictionary/region/' + newValue,
                onChange: function (newValue, oldValue) {
                    $('#lendBankViceInfo_bankBranchName').combobox('setText', '');
                    $('#lendBankViceInfo_branchNo').val('');

                },
                onSelect: function () {
                    loadBankViceBranchName();
                }
            });
            $('#lendBankViceInfo_bankBranchName').combobox('setText', '');
            $('#lendBankViceInfo_branchNo').val('');
        }

    });

    // 银行卡变更流程对应到页面
    var status2Map = new HashMap();
    status2Map.put('AUTHENTICATION', 1);
    status2Map.put('ENTRUST_AUTHORIZATION', 2);
    status2Map.put('APPLY_SIGN', 3);
    status2Map.put('UPLOAD_SIGN_CONTRACT', 4);
    status2Map.put('CREATE_CONTRACT', 2);
    status2Map.put('WAIT_EXAMINE', 5);
    status2Map.put('EXAMINE_REJECT', 5);
    status2Map.put('EXAMINE_PASS', 5);

    $.ajax({
        url: basePath + '/bankCardChange/initPageData/' + lendRequestId + '/' + card,
        async: false,
        success: function (data) {
            if (data.code === '200') {
                bankData = data.result;
                $("#baseInfoForm").form('objLoad', data.result.userInfo);
                mobile = data.result.userInfo.mobile;
                $viceChangeCardAuthFlag = data.result.viceChangeCardAuthFlag;
                var $viceAuthenticationIdDiv = $('#viceAuthenticationIdDiv');
                var $mainAuthenticationIdDiv = $('#mainAuthenticationIdDiv');
                if (card === 'main') {
                    $('#mainCardId').show();
                    $('#viceCardId').hide();
                    $mainAuthenticationIdDiv.show();
                    $viceAuthenticationIdDiv.hide();
                    var $main = data.result.bankCard.main;
                    if ($main) {
                        $('#mainCardInfo').form('objLoad', $main);
                    }
                } else if (card === 'vice' && isAdd === 'false') {
                    $('#viceCardId').show();
                    $('#mainCardId').hide();
                    var $vice = data.result.bankCard.vice;
                    if ($vice) {
                        $('#viceCardInfo').form('objLoad', $vice);
                    }
                    $mainAuthenticationIdDiv.hide();
                    $viceAuthenticationIdDiv.show();
                } else {
                    $('#viceCardId').show();
                    $('#mainCardId').hide();
                    $mainAuthenticationIdDiv.hide();
                    $viceAuthenticationIdDiv.show();
                }

                setStatusByNumber(0);

                // 之前已经变更过银行卡
                // 如果已经有变更记录
                if (data.result.changeInfo) {
                    var changeInfo = data.result.changeInfo;
                    // 需要将银行卡置为不可修改。
                    var status = changeInfo.lendBankCardChangeStatus;
                    lendBankCardId = changeInfo.id;
                    var newBankCardData = changeInfo.newBankCardData;
                    var newBankCard = $.parseJSON(newBankCardData);

                    var statusNumber = status2Map.get(status);
                    if (data.result.upload) {
                        uploadId = data.result.upload.uploadId;
                        fileName = data.result.upload.fileName;
                    }
                    setStatusByNumber(statusNumber);

                    if (newBankCard.lendBankInfo_bankProvince && newBankCard.lendBankInfo_bankCity) {
                        $('#lendBankInfo_bankProvince').combobox('select', newBankCard.lendBankInfo_bankProvince);
                        $('#lendBankInfo_bankCity').combobox('select', newBankCard.lendBankInfo_bankCity);
                        $('#replayCardNo').val(newBankCard.lendBankInfo_cardNo);
                    }

                    if (newBankCard.lendBankViceInfo_bankProvince && newBankCard.lendBankViceInfo_bankCity) {
                        $('#lendBankViceInfo_bankProvince').combobox('select', newBankCard.lendBankViceInfo_bankProvince);
                        $('#lendBankViceInfo_bankCity').combobox('select', newBankCard.lendBankViceInfo_bankCity);
                        $('#replayViceCardNo').val(newBankCard.lendBankViceInfo_cardNo);
                    }
                    $viceAuthenticationIdDiv.form('objLoad', newBankCard);
                    $mainAuthenticationIdDiv.form('objLoad', newBankCard);
                    $viceAuthenticationIdDiv.form('readOnlyAndNoborder');
                    $mainAuthenticationIdDiv.form('readOnlyAndNoborder');
                } else {
                    $('#entrust_authorization').linkbutton('disable');
                    $('#apply_sign').linkbutton('disable');
                    $('#upload_authorization').linkbutton('disable');
                    $('#submitBtn').linkbutton('disable');
                }

            } else if (data.code === '400'){
                $.messager.alert("警告信息",data.result,'error',function () {
                    var tab = parent.$('#tabs').tabs('getSelected');
                    var index = parent.$('#tabs').tabs('getTabIndex',tab);
                    parent.$('#tabs').tabs('close',index);
                });
            }
        },
        error: function (data) {
            $.messager.alert("警告信息", data.message, 'error');
        }
    });


    /**
     * 从后台加载自动化补全,如果输入为空值或者特殊符号或者不是中文不请求后台.保证性能
     * @param q
     * @param province
     * @param city
     * @param bankName
     * @param success
     * @param error
     * @returns {boolean}
     */
    function complement(q, province, city, bankName, success, error) {
        var $q = q || '';
        if ($q.length <= 1) {
            return false
        }
        var $paten = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        if ($paten.test($q)) {
            return false;
        }

        //判定输入中文才进行自动补全
        var reg = /^[\u2E80-\u9FFF]+$/;
        if (!reg.test($q)) {
            return false;
        }
        $.ajax({
            url: '../../../lendSign/branchNo',
            dataType: 'json',
            data: {
                bankProvince: province,
                bankCity: city,
                bankName: bankName,
                startsWith: $q
            },
            success: function (data) {
                var items = $.map(data, function (item) {
                    return {
                        branchNo: item.VALUE,
                        bankBranchName: item.text
                    };
                });
                success(items);
            },
            error: function () {
                error.apply(this, arguments);
            }
        })
    }

    function getBankData() {
        var data;
        if (card === 'vice') {
            var $viceAuthenticationId = $('#viceAuthenticationId');
            if (!$viceAuthenticationId.form('validate')) {
                $.messager.alert('提示消息', '请将银行卡信息填写正确', 'error');
                return false;
            }
            data = $viceAuthenticationId.form('getDataObj');
            data['lendBankViceInfo_exists'] = true;
            if (bankData.bankCard.vice) {
                data['lendBankViceInfo_id'] = bankData.bankCard.vice.id;
            }
            data['lendBankViceInfo_bankBranchName'] = $('#lendBankViceInfo_bankBranchName').combobox('getText');
        } else {
            var $mainAuthenticationId = $('#mainAuthenticationId');
            if (!$mainAuthenticationId.form('validate')) {
                $.messager.alert('提示消息', '请将银行卡信息填写正确', 'error');
                return false;
            }
            data = $mainAuthenticationId.form('getDataObj');
            data['lendBankInfo_exists'] = true;
            data['lendBankInfo_id'] = bankData.bankCard.main.id;
            data['lendBankInfo_bankBranchName'] = $('#lendBankInfo_bankBranchName').combobox('getText');
        }
        data['lendRequestId'] = lendRequestId;
        data['viceUniqueId'] = $("#viceUniqueId").val();
        data['viceVerifyValue'] = $("#viceVerifyValue").val();
        return data;
    }

    /**
     * 银行卡鉴权
     */
    $('#bank_card_auth').linkbutton({
        onClick: function () {
            if (card === 'main') {
                var sourceValue = $('#mainCardNo').val();
                var nowValue = $('#lendBankInfo_cardNo').val();
                if (sourceValue === nowValue) {
                    $.messager.alert('提示消息', '变更前后卡号不能相同', 'error');
                    return;
                }
            } else if (card === 'vice') {
                var sourceValue = $('#viceCardNo').val();
                var nowValue = $('#lendBankViceInfo_cardNo').val();
                if (sourceValue === nowValue) {
                    $.messager.alert('提示消息', '变更前后卡号不能相同', 'error');
                    return;
                }
            }

            // 已经点击过，意味着重新银行卡鉴权
            if ($('#bank_card_auth').attr('isClick') === 'true') {
                $.messager.confirm('提示', '您确定重新银行卡鉴权吗?', function (r) {
                    if (r) {
                        $('#viceAuthenticationId').form('reset');
                        $('#mainAuthenticationId').form('reset');

                        $('#mainAuthenticationIdDiv .easyui-combobox').combobox({
                            readonly: false,
                            disabled: false
                        });
                        $('#mainAuthenticationIdDiv .easyui-validatebox').validatebox({
                            readonly: false,
                            disabled: false
                        });
                        $('#viceAuthenticationIdDiv .easyui-combobox').combobox({
                            readonly: false,
                            disabled: false
                        });
                        $('#viceAuthenticationIdDiv .easyui-validatebox').validatebox({
                            readonly: false,
                            disabled: false
                        });

                        $('#lendBankInfo_branchNo').validatebox('readonly');
                        $('#lendBankViceInfo_branchNo').validatebox('readonly');
                        $('#bank_card_auth').attr('isClick', 'false');
                        setStatusByNumber(0);
                        return;
                    } else {
                        return;
                    }

                });
            } else {
                var data = getBankData();
                if(!data){
                    return;
                }
                $.messager.progress();
                $.ajax({
                    url: basePath + '/bankCardChange/authentication',
                    data: data,
                    method: 'POST',
                    success: function (data) {
                        $.messager.progress('close');
                        if (data.code === '200') {
                            if (data.result.authResult) { // 通过
                                $('#viceAuthenticationId').form('readOnlyAndNoborder');
                                $('#mainAuthenticationId').form('readOnlyAndNoborder');
                                $('#bank_card_auth').attr('isClick', 'true');
                                $('#messageCodeDiv').hide();
                                setStatusByNumber(1);
                            } else {
                                $.messager.alert('提示消息', data.result.authMessage, 'error');
                            }
                        } else if (data.code === '400') {
                            $.messager.alert('提示消息', data.result, 'error');
                        }
                    },
                    error: function () {
                        $.messager.progress('close');
                        $.messager.alert('提示消息', '系统异常，请稍后再试', 'error');
                    }
                });
            }
        }
    });

    function generateAuth() {
        var data = getBankData();
        if(!data){return;}
        if (card === 'vice') { // 需要在委托划扣授权书上显示中文
            data['lendBankViceInfo_bankBranchName'] = $('#lendBankViceInfo_bankBranchName').combobox('getText');
        } else {
            data['lendBankInfo_bankBranchName'] = $('#lendBankInfo_bankBranchName').combobox('getText');
        }

        $.messager.progress();
        $.ajax({
            url: basePath + '/bankCardChange/generateAuthorization',
            data: data,
            method: 'POST',
            success: function (data) {
                $.messager.progress('close');
                if (data.code === '200') { // 通过
                    $('#viceAuthenticationId').form('readOnlyAndNoborder');
                    $('#mainAuthenticationId').form('readOnlyAndNoborder');
                    $('#entrust_authorization').attr('isClick', 'true');

                    $('#view_entrust_authorization').linkbutton('enable');
                    $('#download_entrust_authorization').linkbutton('enable');

                    lendBankCardId = data.result.id;
                    setStatusByNumber(2);
                } else {
                    $.messager.alert('提示消息', data.message, 'error');
                }
            },
            error: function () {
                $.messager.progress('close');
                $.messager.alert('提示消息', '系统异常，请稍后再试', 'error');
            }
        });
    }

    $('#view_entrust_authorization').linkbutton({
        onClick: function () {
            parent.addTabs("委托划扣授权书" + (card === 'vice' ? "副卡" : "主卡") + lendRequestId, 'page/taskManager/bankCardChange/viewAuthorization.html?lendRequestId=' + lendRequestId + '&card=' + card);
        }
    });

    $('#download_entrust_authorization').linkbutton({
        onClick: function () {
            window.location.href = basePath + '/bankCardChange/authorization/' + lendRequestId + '/' + card + '/download';
        }
    });

    /**
     * 生成委托划扣授权书
     */
    $('#entrust_authorization').linkbutton({
        onClick: function () {
            // 已经点击过，意味着重新生成委托划扣授权书
            if ($('#entrust_authorization').attr('isClick') === 'true') {
                $.messager.confirm('提示', '您确定重新生成委托划扣授权书吗?', function (r) {
                    if (r) {
                        var $bankCardAuth = $('#entrust_authorization');
                        $('#entrust_authorization').attr('isClick', 'false');
                        $bankCardAuth.linkbutton({
                            text: '生成委托划扣授权书'
                        });
                        $('#entrust_authorization_ok').hide();
                        generateAuth();
                        return;
                    } else {
                        return;
                    }

                });
            } else {
                generateAuth();
            }
        }
    });


    function setStatusByNumber(number) {
        var $bankCardAuth = $('#bank_card_auth');
        var $entrustAuthorization = $('#entrust_authorization');

        var $messageCode = $('#messageCode');
        var $uploadAuthorization = $('#upload_authorization');
        if (number === 0) { // 初始状态
            $bankCardAuth.linkbutton('enable');
            $bankCardAuth.linkbutton({
                text: '银行卡鉴权'
            });
            $('#bank_card_auth_ok').hide();
            $bankCardAuth.attr('isClick', 'false');
            $('#entrust_authorization').linkbutton('disable');

            $('#verificationCode .easyui-linkbutton').linkbutton('disable');
            $messageCode.validatebox('disable');
            $uploadAuthorization.linkbutton('disable');
            $('#submitBtn').linkbutton('disable');

            $entrustAuthorization.linkbutton({
                text: '生成委托划扣授权书'
            });
            $entrustAuthorization.linkbutton('disable');
            $('#view_entrust_authorization').linkbutton('disable');
            $('#download_entrust_authorization').linkbutton('disable');
            $entrustAuthorization.linkbutton('disable');
            $entrustAuthorization.attr('isClick', 'false');
            $uploadAuthorization.attr('isClick', 'false');
            $('#view_authorization').linkbutton('disable');

            $('#entrust_authorization_ok').hide();
            clearInterval($res);//清除setInterval

            $uploadAuthorization.linkbutton({
                text: '上传委托划扣授权书'
            });
            $uploadAuthorization.attr('isClick', 'false');
            $('#upload_authorization_ok').hide();

            $('#container_upload_authorization_div').hide();


        }
        if (number > 0) { // 银行卡鉴权
            $bankCardAuth.linkbutton({
                text: '重新银行卡鉴权'
            });
            $('#bank_card_auth_ok').show();
            $bankCardAuth.attr('isClick', 'true');
            $bankCardAuth.linkbutton('enable');
            $('#entrust_authorization').linkbutton('enable');
            $('#entrust_authorization_ok').hide();
            $('#verificationCode .easyui-linkbutton').linkbutton('disable');
            $messageCode.validatebox({
                disable: true
            });
            $uploadAuthorization.linkbutton('disable');
            $('#view_authorization').linkbutton('disable');

            clearInterval($res);//清除setInterval

            $uploadAuthorization.linkbutton({
                text: '上传委托划扣授权书'
            });
            $uploadAuthorization.attr('isClick', 'false');
            $('#upload_authorization_ok').hide();
            $('#container_upload_authorization_div').hide();

        }

        if (number > 1) { // 生成委托划扣授权书
            $entrustAuthorization.linkbutton({
                text: '重新生成委托划扣授权书'
            });
            $entrustAuthorization.linkbutton('enable');
            $('#entrust_authorization_ok').show();
            $('#view_entrust_authorization').linkbutton('enable');
            $('#download_entrust_authorization').linkbutton('enable');

            $messageCode.validatebox('enable');
            $('#messageCodeBtn').linkbutton('enable');
            $('#authMessageAndSealBtn').linkbutton('enable');
            $('#view_authorization').linkbutton('disable');


            $uploadAuthorization.linkbutton('disable');
            clearInterval($res);//清除setInterval

            $uploadAuthorization.linkbutton({
                text: '上传委托划扣授权书'
            });
            $uploadAuthorization.attr('isClick', 'false');
            $('#upload_authorization_ok').hide();
            $('#container_upload_authorization_div').hide();

        }

        if (number > 2) { // 申请电子签章
            $('#verificationCode .easyui-linkbutton').linkbutton('disable');
            $messageCode.validatebox({
                disable: true
            });
            $messageCode.validatebox('disable');
            $messageCode.val('');

            $('#messageCodeBtn').linkbutton('disable');
            $('#authMessageAndSealBtn').linkbutton('disable');
            $('#view_authorization').linkbutton('disable');

            $uploadAuthorization.linkbutton('enable');
            $uploadAuthorization.linkbutton({
                text: '上传委托划扣授权书'
            });
            $('#container_upload_authorization_div').show();

        }


        if (number > 3) { // 上传委托划扣授权书
            $uploadAuthorization.linkbutton({
                text: '重新上传委托划扣授权书'
            });
            $uploadAuthorization.attr('isClick', 'true');
            $('#upload_authorization_ok').show();
            $('#submitBtn').linkbutton('enable');
            $('#view_authorization').linkbutton('enable');
            $('#container_upload_authorization_div').show();
        }

        if (number > 4) { // 等待审核
            $('.easyui-linkbutton').linkbutton('disable');
            $('#download_entrust_authorization').linkbutton('enable');
            $('#view_entrust_authorization').linkbutton('enable');
            $('#view_authorization').linkbutton('enable');
            $('#container_upload_authorization_div').show();
        }


    }

    $('#submitBtn').linkbutton({
        onClick: function () {
            $.messager.progress();
            $.ajax({
                url: basePath + '/bankCardChange/submit/' + lendBankCardId,
                success: function (data) {
                    $.messager.progress('close');
                    if (data.code === '200') { // 通过
                        $('#submitBtn').linkbutton('disable');
                        $.messager.alert('提示消息', data.result, 'info');
                        setStatusByNumber(5);
                    } else {
                        $.messager.alert('提示消息', data.result, 'error');
                    }
                },
                error: function () {
                    $.messager.progress('close');
                    $.messager.alert('提示消息', '系统异常，请稍后再试', 'error');
                }
            });
        }
    });


    var mainCardLoader = function (param, success, error) {
        complement(param.q, $('#lendBankInfo_bankProvince').combobox('getValue'), $('#lendBankInfo_bankCity').combobox('getValue'), $('#lendBankInfo_bankName').combobox('getValue'), success, error);
    };

    var viceCardLoader = function (param, success, error) {
        complement(param.q, $('#lendBankViceInfo_bankProvince').combobox('getValue'), $('#lendBankViceInfo_bankCity').combobox('getValue'), $('#lendBankViceInfo_bankName').combobox('getValue'), success, error);
    };


    /**
     * 加载主卡银行支行
     */
    function loadBankBranchName() {
        var $selectRow;
        $('#lendBankInfo_bankBranchName').combobox({
            required: true,
            prompt: '支行名称',
            mode: 'remote',
            loader: mainCardLoader,
            valueField: 'branchNo',
            textField: 'bankBranchName',
            hasDownArrow: false,
            editable: true,
            onSelect: function (data) {
                $selectRow = data;
                $('#lendBankInfo_branchNo').val(data.branchNo);
                $('#lendBankInfo_branchNo').validatebox('enableValidation').validatebox('validate');
            },
            onHidePanel: function () {
                var $value = $(this).combobox('getValue');
                if ($selectRow === null || $value !== $selectRow.branchNo) {
                    $('#lendBankInfo_branchNo').val('');
                }
            }
        });
    }

    /**
     * 加载副卡银行支行
     */
    function loadBankViceBranchName() {
        var $selectRow;
        $('#lendBankViceInfo_bankBranchName').combobox({
            required: true,
            prompt: '支行名称',
            mode: 'remote',
            loader: viceCardLoader,
            valueField: 'branchNo',
            textField: 'bankBranchName',
            hasDownArrow: false,
            editable: true,
            onSelect: function (data) {
                if (data) {
                    $selectRow = data;
                    $('#lendBankViceInfo_branchNo').val(data.branchNo);
                    $('#lendBankViceInfo_branchNo').validatebox('enableValidation').validatebox('validate');
                }
            },
            onHidePanel: function () {
                var $value = $(this).combobox('getValue');
                if ($selectRow === null || $value !== $selectRow.branchNo) {
                    $('#viceBranchNo').val('');
                }
            }

        });
    }

    $('#resetBtn').linkbutton({
        onClick: function () {
            var $message = card === 'main' ? "确定重置主卡操作吗?" : "确定重置副卡操作吗?";
            $.messager.confirm('警告', $message, function (r) {
                if (r) {
                    $.messager.progress();
                    $.get(basePath + '/bankCardChange/reset/' + lendRequestId).success(function (data) {
                        $.messager.progress('close');
                        if (data.code === '200') {
                            $.messager.alert('提示', "重置成功！", 'info', function () {
                                var tab = parent.$('#tabs').tabs('getSelected');
                                var index = parent.$('#tabs').tabs('getTabIndex', tab);
                                parent.$('#tabs').tabs('close', index);
                            });
                        }
                    }).fail(function (data) {
                        $.messager.progress('close');
                        var $data = $.parseJSON(data.responseText);
                        $.messager.alert('提示', $data.message, 'error');
                    })
                }
            });
        }
    });


    /**
     * 发送短信验证码
     */
    $('#messageCodeBtn').linkbutton({
        onClick: function () {
            $.get(basePath + "/lendSign/send/message/" + mobile);
            var $step = 120;
            $('#messageCodeBtn').linkbutton({
                text: '重新发送120'
            });
            $res = setInterval(function () {
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
            var $messageCode = $('#messageCode');
            if (!$messageCode.validatebox('isValid')) {
                return false;
            }
            $.messager.progress();
            $.get(basePath + '/lendSign/validate/' + mobile + '/' + $messageCode.val()).success(function (data) {
                $('#messageCodeBtn').linkbutton({
                    text: '获取验证码',
                    disabled: false
                });
                clearInterval($res);//清除setInterval
                seal();

            }).fail(function (data) {
                $.messager.progress('close');
                var $responseText = $.parseJSON(data.responseText);
                $.messager.alert('提示消息', $responseText.message, 'error');
            });
        }
    });
    $('#view_authorization').linkbutton({
        onClick: function () {
            $attachment.previewHandle(uploadId, fileName, lendRequestId);
        }
    });

    $('#upload_authorization').linkbutton({
        onClick: function () {
        }
    });

    // // 已经点击过，意味着重新生成委托划扣授权书
    // // 定义文件上传组件


    var uploader = $.uploader('upload_authorization', basePath + '/bankCardChange/uploadSignContract/' + lendBankCardId, function (data) {
        var dataObj = $.parseJSON(data.response);
        if (dataObj.code === "200") {
            var $uploadAuthorization = $('#upload_authorization');
            $uploadAuthorization.attr('isClick', 'true');
            setStatusByNumber(4);
            $uploadAuthorization.linkbutton({
                text: '重新上传委托划扣授权书'
            });
            fileName = dataObj.result.fileName;
            uploadId = dataObj.result.uploadId;
        } else {
            $.messager.alert("失败", "请求失败，请联系技术人员", "error");
        }
    });
    uploader.bind('BeforeUpload', function (uploader) {
    });

    /**
     * 调用签章
     */
    function seal() {
        $.get(basePath + '/bankCardChange/seal/' + lendRequestId + '/' + lendBankCardId).success(function (data) {
            $.messager.progress('close');
            if (data.code === '200') {
                $.messager.alert('提示消息', "盖章成功!", 'info');
                setStatusByNumber(3);
                // 刷新当前页面
                window.location.reload();
            } else {
                $.messager.alert('提示消息', data.message, 'error');
            }

        }).fail(function (data) {
            $.messager.progress('close');
            var $responseText = $.parseJSON(data.responseText);
            $.messager.alert('提示消息', $responseText.message, 'error');
        });
    }


});

//# sourceURL=source.bankCardDetail