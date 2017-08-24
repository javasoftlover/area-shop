$(function () {

    var _lendRequestId = $('#repayLendRequestId').val();
    var _lendRepayRecordId = $('#repayLendRepayRecordId').val();
    var _billDate = $('#repaybillDate').val();

    /**
     * 修改dateBox规则 控制预约时间大于等于当前时间小于等于账单日可预约
     *
     */
    $("#appointmentTime").datebox('calendar').calendar({
        validator: function (date) {
            var billDate = new Date(_billDate);
            var now = new Date();
            var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var d2 = new Date(billDate.getFullYear(), billDate.getMonth(), billDate.getDate());
            return d1 <= date && date <= d2;
        }
    });
    baseRepayInfo();

    /**
     *初始化还款信息
     */
    function baseRepayInfo() {
        $.get(basePath + '/lendRepay/queryRepayRequest?lendRequestId=' + _lendRequestId + "&lendRepayRecordId=" + _lendRepayRecordId).success(function (data) {
            if (data.code === '200') {
                var $data = data.result;
                $('#accountAmount').val(DecimalUtil.format($data.accountAmount));
                $('#amount').val(DecimalUtil.format($data.amount));
                $('#policyAmount').val($data.policyAmount);//政策激励金额
                $('#friendAmount').val($data.friendAmount);//邀请好友激励金额
                $('#version').val($data.version);//邀请好友激励金额
                $('#inRepayAmount').val(DecimalUtil.format($data.inRepayAmount));
                var $balanceAccount = Arith.add($data.accountAmount, $data.policyAmount, $data.friendAmount);
                var repayMoney = Arith.sub($data.amount, $balanceAccount);
                $('#repayMoney').numberbox('setValue', repayMoney);
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
     * 预览凭条
     */
    $('#previewUpload').click(function () {
        var $lendRepayRecordUploadId = $('#lendRepayRecordUploadId').val();
        if (!$lendRepayRecordUploadId) {
            $.messager.alert("警告", "请先上传凭条再预览！", "warm");
            return false;
        }
        window.open(basePath + '/lendRepay/browseAttachment/' + $lendRepayRecordUploadId,
            '详细', 'height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
    });


//银行卡信息
    $('#lendBankCardType').combobox({
        panelHeight: 60,
        valueField: 'value',
        textField: 'text',
        url: basePath + '/lendRepay/queryBankInfo?lendRequestId=' + _lendRequestId,
        onSelect: function (data) {
            $('#repayBankName').val(data.bankName);
            $('#repayBankCard').val(data.bankValue);
        },
        onLoadSuccess: function (data) {
            $.each(data, function (name, value) {
                if (value.selected) {
                    $('#repayBankName').val(value.bankName);
                    $('#repayBankCard').val(value.bankValue);
                }
            })
        }
    });

    /**
     * 选择还款类型逻辑
     */
    $('#repayType').combobox({
        panelHeight: 'auto',
        url: '../../dictionary/option/55',
        onLoadSuccess: function () {
            var val = $(this).combobox('getData');
            for (var item in val[0]) {
                if (item == 'value') {
                    $(this).combobox('select', val[0][item]);
                }
            }
        },
        onChange: function (newValue) {
            var shouldRepayAmount = 0;
            if (newValue === 'COMMON_REPAY') {
                // 获取正常还款金额并显示 使用账户余额可选
                $('#amount').show();
                $('#inRepayAmount').hide();
                $('#useAmount').attr("disabled", false);
                shouldRepayAmount = DecimalUtil.parse($('#amount').val());
            } else if (newValue === 'IN_REPAY') {
                // 获取提前还款金额并显示 使用账户余额不可选 默认使用
                $('#amount').hide();
                $('#inRepayAmount').show();
                shouldRepayAmount = DecimalUtil.parse($('#inRepayAmount').val());
                $("#useAmount").prop("checked", true);
                $('#useAmount').attr("disabled", true);
            }
            // 获取账户余额
            var accountAmount = 0;
            if ($('#useAmount').is(':checked')) {
                accountAmount = DecimalUtil.parse($('#accountAmount').val());
            }
            var repayMoney = Arith.sub(DecimalUtil.parse(shouldRepayAmount), accountAmount);
            //$('#repayMoney').numberbox({max: repayMoney});
            $('#repayMoney').numberbox('setValue', repayMoney);
        }
    });


    $('#appointmentTime').datebox({
        onSelect: function (date) {
            loadAppointmentHours($.formatDate(date))
        }
    });


    /**
     * 加载划扣时间点
     */
    function loadAppointmentHours(date) {
        $('#hourTime').combobox({
            width: 120,
            panelHeight: 'auto',
            required: true,
            valueField: 'text',
            textField: 'value',
            url: '../../lendRepay/deductTimes',
            queryParams: {
                "billDate": date
            },
            onLoadSuccess: function () {
                var val = $(this).combobox('getData');
                if (val.length === 0) {
                    $.messager.alert("成功", "没有划扣时间！默认开启实时划扣", "info", function () {
                        $('#deductMethods').combobox('setValue', 'false');
                    });
                } else {
                    for (var item in val[0]) {
                        if (item == 'text') {
                            $(this).combobox('select', val[0][item]);
                        }
                    }
                }
            }
        });
    }

    /**
     * 使用账户余额
     */
    $("#useAmount").click(function () {
        calculateShouldRepayAmount(true);
    });

    /**
     * flag 是否是用红包金额，汇款不使用
     * @param flag
     */
    function calculateShouldRepayAmount(flag) {
        var accountAmount = 0;
        if ($('#useAmount').is(':checked')) {
            accountAmount = DecimalUtil.parse($('#accountAmount').val());
        }
        var shouldRepayAmount = 0;
        var repayTypeValue = $('#repayType').combobox("getValue");
        if (repayTypeValue === 'COMMON_REPAY') {
            shouldRepayAmount = DecimalUtil.parse($('#amount').val());
        } else if (repayTypeValue === 'IN_REPAY') {
            shouldRepayAmount = DecimalUtil.parse($('#inRepayAmount').val());
        }
        var repayMoney;
        if (flag) {
            var $policyAmount = $('#policyAmount').val();//政策激励金额
            var $friendAmount = $('#friendAmount').val();//邀请好友激励金额
            var $balanceAccount = Arith.add(accountAmount, $policyAmount, $friendAmount);
            repayMoney = Arith.sub(shouldRepayAmount, $balanceAccount);
        } else {
            repayMoney = Arith.sub(shouldRepayAmount, accountAmount);
        }
        $('#repayMoney').numberbox('setValue', repayMoney);
    }

    /**
     * 还款方式 划扣or汇款
     */
    $('#repayMethod').combobox({
        panelHeight: 'auto',
        url: '../../dictionary/option/39',
        onLoadSuccess: function () {
            var val = $(this).combobox('getData');
            for (var item in val[0]) {
                if (item == 'value') {
                    $(this).combobox('select', val[0][item]);
                }
            }
        },
        onChange: function (newValue) {
            if (newValue === 'TRANSFER') {
                initUploadPlug();
                $('.transferDiv').show();
                $('.deductDiv').hide();
                $('.realTimeDiv').hide();
                //选择汇款时重置划扣时效
                $('#deductMethods').combobox('setValue', 'false');

                // 初始化还款日期
                $("#remittanceTime").datebox("setValue", _billDate);
                $('#rewardAmountDiv').hide();
                calculateShouldRepayAmount(false);

            } else if (newValue === 'DEDUCT') {
                $('.transferDiv').hide();
                $('.deductDiv').show();
                var deductMethodsValue = $('#deductMethods').combobox("getValue");
                if (deductMethodsValue === 'false') {
                    $('.realTimeDiv').hide();
                } else if (deductMethodsValue === 'true') {
                    $('.realTimeDiv').show();
                }
                $('#rewardAmountDiv').show();
                calculateShouldRepayAmount(true);
            }
        }
    });
    /**
     *划扣时效
     */
    $('#deductMethods').combobox({
        //panelHeight: 'auto',
        url: '../../dictionary/option/56',
        onLoadSuccess: function () {
            var val = $(this).combobox('getData');
            for (var item in val[0]) {
                if (item == 'value') {
                    $(this).combobox('select', val[0][item]);
                }
            }
        },
        onChange: function (newValue) {
            if (newValue === 'false') {
                $('.realTimeDiv').hide();

            } else if (newValue === 'true') {
                $('#appointmentTime').datebox("setValue", _billDate);//划扣时间
                loadAppointmentHours($('#appointmentTime').datebox('getValue'));
                $('.realTimeDiv').show();

            }
        }
    });


    /**
     * 还款方式选择汇款时初始化上传组件
     */
    function initUploadPlug() {
        //定义文件上传组件
        var uploader = $.uploader('proofUpload', basePath + '/lendRepay/proof/upload/' + _lendRepayRecordId, function (data) {
            var dataObj = $.parseJSON(data.response);
            if (dataObj.code === "200") {
                var $proofVo = dataObj.result;
                var $lendRepayRecordUploadId = $proofVo.lendRepayRecordUploadId;
                $('#fileName').text($proofVo.fileName);
                //上传凭条后回显凭条Id
                $('#lendRepayRecordUploadId').val($lendRepayRecordUploadId);
                $.messager.alert("成功", "上传凭条成功！", "info");
            }
        });
    }
})
//@ sourceURL=source.repaymentApply;