/**
 * Created by DongChen on 2016/10/14.
 */

$(function () {
        var $main = $('div').data('main');
        var $vice = $('div').data('vice');
        $('#bankcard').val($main.cardNo);
        $('#bankName').combobox('setValue', $main.bankName);
        if ($vice) {
            $('#bankViceCard').val($vice.cardNo);
            $('#bankViceName').combobox('setValue', $vice.bankName);
        }

        $('#bankProvince').combobox({
            required: true,
            url: '../../../dictionary/region/-1',
            method: 'GET',
            prompt: '开户行省份',
            onChange: function (newValue, oldValue) {
                $('#bankCity').combobox({
                    required: true,
                    method: 'GET',
                    prompt: '开户行城市',
                    url: '../../../dictionary/region/' + newValue,
                    onChange: function (newValue, oldValue) {
                        $('#bankBranchName').combobox('setText', '');
                        $('#branchNo').textbox('setValue', '');
                    },
                    onLoadSuccess: function () {
                        loadBankBranchName();
                        afterBankCardLoadSuccess();
                    }
                });
                $('#bankBranchName').combobox('setText', '');
                $('#branchNo').textbox('setValue', '');
            }

        });

        $('#bankViceProvince').combobox({
            required: true,
            url: '../../../dictionary/region/-1',
            method: 'GET',
            prompt: '开户行省份',
            onChange: function (newValue, oldValue) {
                $('#bankViceCity').combobox({
                    required: true,
                    method: 'GET',
                    prompt: '开户行城市',
                    url: '../../../dictionary/region/' + newValue,
                    onChange: function (newValue, oldValue) {
                        $('#bankViceBranchName').combobox('setText', '');
                        $('#branchViceNo').textbox('setValue', '');
                    },
                    onLoadSuccess: function () {
                        loadBankViceBranchName();
                        afterBankViceCardLoadSuccess();
                    }
                });
                $('#bankViceBranchName').combobox('setText', '');
                $('#branchViceNo').textbox('setValue', '');
            }

        });


        $('#applyDate').datebox({
            required: true,
            prompt: '申请放款日期',
            validType: 'compareDate',
            onSelect: function (date) {
                if (!$('#applyDate').datebox('isValid')) return false;
                var $day = date.getDate();
                var $statementDate = $('#statementDate');
                var $format = DateUtil.format(date, 'yyyy-MM');
                if ($day === 21) {
                    $statementDate.datebox("setValue", $format + '-' + 8);
                } else if ($day === 22) {
                    $statementDate.datebox("setValue", $format + '-' + 9);
                } else if ($day === 23) {
                    $statementDate.datebox("setValue", $format + '-' + 10);
                } else if ($day === 24) {
                    $statementDate.datebox("setValue", $format + '-' + 11);
                } else if ($day === 25) {
                    $statementDate.datebox("setValue", $format + '-' + 12);
                } else if ($day === 26) {
                    $statementDate.datebox("setValue", $format + '-' + 13);
                } else if ($day === 27) {
                    $statementDate.datebox("setValue", $format + '-' + 14);
                } else if ($day === 28) {
                    $statementDate.datebox("setValue", $format + '-' + 15);
                }else if ($day >= 29 && $day <= 31) {
                    $statementDate.datebox("setValue", $format + '-' + 16);
                } else {
                    $statementDate.datebox("setValue", DateUtil.format(date, 'yyyy-MM-dd'));
                }
            }
        });
        var $lendRequestId = $('div').data('lendRequestId');
        var $mainCard = $('div').data('main');
        var $vice = $('div').data('vice');

        // true,加载数据并设置为只读模式,并且去掉验证
        if ($('div').data('isHideContractBtn') === true) {
            $('#createContractOkBtn').hide();
            $('#createContractCancelBtn').hide();
            var $request = $('div').data('lendRequest');

            createBankInfo();

            $('#applyDate').datebox('setValue', $request.applyDate);
            $('#statementDate').datebox('setValue', $request.statementDate);
            $('#signedTime').datebox('setValue', $request.signedTime);
            $('#createContractForm').form('disableValidation');
            $('#createContractForm').form('readOnlyAndNoborder');
        } else if ($mainCard.bankCity) {
            createBankInfo();
        }

        function afterBankCardLoadSuccess() {
            if ($mainCard && $('#bankCity').combobox('getValue')) {
                $('#bankBranchName').combobox('setText', $mainCard.bankBranchName);
            }
        }

        function afterBankViceCardLoadSuccess() {
            if ($vice && $('#bankViceCity').combobox('getValue')) {
                $('#bankViceBranchName').combobox('setText', $vice.bankBranchName);
            }
        }

        function createBankInfo() {
            $('#bankProvince').combobox('select', $mainCard.bankProvince);
            $('#bankViceProvince').combobox('select', $vice.bankProvince);
            $('#bankCity').combobox('select', $mainCard.bankCity);
            $('#bankViceCity').combobox('select', $vice.bankCity);
            $('#branchNo').textbox('setValue', $mainCard.branchNo);
            $('#branchViceNo').textbox('setValue', $vice.branchNo);
            //$('#signOrg').combobox('setValue', $mainCard.signOrg);
            //$('#signViceOrg').combobox('setValue', $vice.signOrg);
        }

        $('#createContractCancelBtn').click(function () {
            $.closeDialog('#createContractDiv');
        });

        $('#createContractOkBtn').click(function () {
            if (!$('#createContractForm').form('validate')) {
                return false;
            }
            $.messager.progress();
            var $obj = $('#createContractForm').form('getDataObj');
            $obj.requestId = $('div').data('lendRequestId');
            $obj.bankBranchName = $('#bankBranchName').combobox('getText');
            $obj.bankViceBranchName = $('#bankViceBranchName').combobox('getText');
            $.post(basePath + '/lendSign/contracts', $obj).success(function (data) {
                $.messager.progress('close');
                if (data.code == '200') {
                    $.closeDialog('#createContractDiv');
                    $.messager.alert('提示消息', "制作合同成功!", 'info');
                    initSign($lendRequestId);
                } else {
                    $.messager.alert('提示消息', data.message, 'error');
                }
            }).fail(function (error) {
                $.messager.progress('close');
                var $responseText = $.parseJSON(error.responseText);
                console.error($responseText.message);
                $.messager.alert('提示消息', $responseText.message, 'error');
            })

        });


        var mainCardLoader = function (param, success, error) {
            complement(param.q, $('#bankProvince').combobox('getValue'), $('#bankCity').combobox('getValue'), $('div').data('main').bankName, success, error);
        };

        var viceCardLoader = function (param, success, error) {
            complement(param.q, $('#bankViceProvince').combobox('getValue'), $('#bankViceCity').combobox('getValue'), $('div').data('vice').bankName, success, error);
        };


        /**
         * 加载主卡银行支行
         */
        function loadBankBranchName() {
            var $selectRow;
            $('#bankBranchName').combobox({
                required: true,
                prompt: '支行名称',
                mode: 'remote',
                loader: mainCardLoader,
                valueField: 'branchNo',
                textField: 'bankBranchName',
                hasDownArrow: false,
                editable: true,
                onSelect: function (data) {
                    if (data) {
                        $selectRow = data;
                        $('#branchNo').textbox('setValue', data.branchNo);
                    }
                },
                onHidePanel: function () {
                    var $value = $(this).combobox('getValue');
                    if ($selectRow == null || $value != $selectRow.branchNo) {
                        $('#branchNo').textbox('setValue', '');
                    }
                },
                onChange: function (newValue, oldValue) {
                    $selectRow = newValue;
                    $('#branchNo').textbox('setValue', $selectRow.branchNo);
                }
            });
        }

        /**
         * 加载副卡银行支行
         */
        function loadBankViceBranchName() {
            var $selectRow;
            $('#bankViceBranchName').combobox({
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
                        $('#branchViceNo').textbox('setValue', data.branchNo);
                    }
                },
                onHidePanel: function () {
                    var $value = $(this).combobox('getValue');
                    if ($selectRow == null || $value != $selectRow.branchNo) {
                        $('#branchViceNo').textbox('setValue', '');
                    }
                }

            });
        }

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
    }
)
;
//@ sourceURL=source.createContract
