/**
 * Created by DongChen on 2016/10/13.
 */
$(function () {

    var $lendRequestId = $('div').data('lendRequestId');
    var $obj = $('#bankCardAuthDiv').dialog('options');
    var $isEdit = $obj["queryParams"].isEdit;
    var $mainCard = $('div').data('main');
    var $vice = $('div').data('vice');
    var $viceCardAuthFlag = $('div').data('viceCardAuthFlag');
    $('#bankViceName').combobox({

        onSelect:function(data){
            if(data.bankCode!=='YOU_ZHENG' && $viceCardAuthFlag){
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
    // false,加载数据并设置为只读模式,并且去掉验证
    if ($isEdit !== 3) {
        if ($isEdit === 2) {
            $('#authBtn').hide();
            $('#changeMainCard').hide();
            $('#authBankCardForm').form('disableValidation');
            $('#authBankCardForm').form('readOnlyAndNoborder');
        }
        $('#bankName').combobox('setValue', $mainCard.bankName);
        $('#cardNo').val($mainCard.cardNo);
        $('#replayCardNo').val($mainCard.cardNo);
        $('#orderMobile').val($mainCard.orderMobile);

        if ($vice) {
            $('#bankViceName').combobox('setValue', $vice.bankName);
            $('#viceCardNo').val($vice.cardNo);
            $('#orderViceMobile').val($vice.orderMobile);
            $('#replayViceCardNo').val($vice.cardNo);
            if($isEdit === 1 && $vice.bankName !=='YOU_ZHENG' && $viceCardAuthFlag){
                $('#messageCodeDiv').show();
                $('#viceVerifyValue').textbox({required:true});
            }
        }
       
    }

    $('#requestId').val($lendRequestId);
    $('#authBankCardCancelBtn').click(function () {
        $.closeDialog('#bankCardAuthDiv');
    });

    /**
     * 鉴权确认按钮
     */
    $('#authBankCardOkBtn').click(function () {
        $.messager.progress();
        $('#authBankCardForm').form('submit', {
            url: basePath + '/lendSign/authBankCard',
            onSubmit: function () {
                var $isValid = $(this).form('validate');
                if (!$isValid) {
                    $.messager.progress('close');
                    return false;
                }
            },
            success: function (data) {
                var $data = $.parseJSON(data);
                $.messager.progress('close');
                if ($data.code == '200') {
                    $.closeDialog('#bankCardAuthDiv');
                    $.messager.alert('提示消息', "银行卡鉴权成功!", 'info');
                    initSign($lendRequestId);
                } else {
                    $.messager.alert('提示消息', $data.result, 'error');
                }
            }
        })
    });
    /**
     * 银行卡主副卡对换
     */
    $('#changeMainCard').click(function () {
        var $bankName = $('#bankName').combobox('getValue');
        var $bankViceName = $('#bankViceName').combobox('getValue');
        var $orderMobile = $('#orderMobile').val();
        var $orderViceMobile = $('#orderViceMobile').val();
        var $cardNo = $('#cardNo').val();
        var $viceCardNo = $('#viceCardNo').val();
        var $replayCardNo = $('#replayCardNo').val();
        var $replayViceCardNo = $('#replayViceCardNo').val();
        $('#bankName').combobox('setValue', $bankViceName);
        $('#bankViceName').combobox('setValue', $bankName);
        $('#orderMobile').val($orderViceMobile);
        $('#orderViceMobile').val($orderMobile);
        $('#cardNo').val($viceCardNo);
        $('#viceCardNo').val($cardNo);
        $('#replayCardNo').val($replayViceCardNo);
        $('#replayViceCardNo').val($replayCardNo);

        if($bankName!=='YOU_ZHENG' && $viceCardAuthFlag){
            messageFlag(true);
        }else{
            messageFlag(false);
        }
    })

    /**
     * 发送短信验证码
     */
    $('#getViceMessageCodeBtn').linkbutton({

        onClick: function () {
            var viceCardNo = $('#viceCardNo').val();
            var orderViceMobile = $('#orderViceMobile').val();
            var bankViceName = $('#bankViceName').combobox('getValue');
            if(!orderViceMobile){
                $.messager.alert('提示信息','副卡预留手机不能为空');
                return;
            }
            if(!viceCardNo){
                $.messager.alert('提示信息','副卡卡号不能为空');
                return;
            }

            var $params = {'requestId': $lendRequestId,'bankViceName': bankViceName,'viceCardNo':viceCardNo,'orderViceMobile':orderViceMobile};
            $.post(basePath + '/lendSign/getOtherMessage', $params).success(function (data) {
                $.messager.progress('close');
                console.log(data.result);
                if (data.code === '200' && data.result.authResult) {
                    $('#viceUniqueId').val(data.result.uniqueId);
                    $.messager.alert('提示', "短信验证码已发送至:"+orderViceMobile, 'info');
                } else if( data.result.authCode === '000000'){
                    $.messager.alert('提示', "无需获取验证码,请继续进行鉴权流程！", 'info');
                    messageFlag(false);
                }else{
                    $.messager.alert('提示', "副卡鉴权失败，原因为:"+data.result.authMessage, 'error');
                }
            }).fail(function (data) {
                $.messager.progress('close');
                var $data = $.parseJSON(data.responseText);
                $.messager.alert('提示', $data.message, 'error');
            })

            var $step = 60;
            $('#getViceMessageCodeBtn').linkbutton({
                text: '重新发送60'
            });
            var $res = setInterval(function () {
                $('#getViceMessageCodeBtn').linkbutton({
                    text: '重新发送' + $step,
                    disabled: true
                });
                $step -= 1;
                if ($step <= 0) {
                    $('#getViceMessageCodeBtn').linkbutton({
                        text: '获取验证码',
                        disabled: false
                    });
                    clearInterval($res);//清除setInterval
                }
            }, 1000);
        }
    });
});
//@ sourceURL=source.authBankCard