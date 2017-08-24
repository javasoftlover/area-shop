_fmOpt = {
    partner: 'puhuifinance',
    appName: 'puhuifinance_web',
    token: uuid(),
    fpHost: 'https://fptest.fraudmetrix.cn',
    staticHost: 'statictest.fraudmetrix.cn',
    tcpHost: 'fptest.fraudmetrix.cn',
    wsHost: 'fptest.fraudmetrix.cn:9090'
};
var cimg = new Image(1, 1);
cimg.onload = function () {
    _fmOpt.imgLoaded = true;
};
cimg.src = "https://fptest.fraudmetrix.cn/fp/clear.png?partnerCode=puhuifinance&appName=puhuifinance_web&tokenId=" + _fmOpt.token;
var fm = document.createElement('script');
fm.type = 'text/javascript';
fm.async = true;
fm.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'statictest.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(fm, s);
$('#token').val(_fmOpt.token);
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}



//查看进件信息
function view(lendRequestId){
    parent.addTabs("查看进件" + lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + lendRequestId + '&view=true');
}
$(function () {
    var $flag = true;
    var staffResult;
    var canChange = true;
    init();
    $.ajax({
        url: basePath + "/lendRequest/toLendRiskJudgment",
        success: function (data) {
            staffResult = data.result;
        }
    });
    $('#riskJudgmentSubmitBtn').linkbutton({
        onClick: function () {
            $('#riskJudgmentClearBtn').linkbutton('disable');
            var cardId = $('#cardIdOfValidate').val();
            var lendTelephoneSaleId = $('#lendTelephoneSaleId').val();
            var teamId = 0, sellId = 0;
            var name = $('#name').val();
            var phone = $('#phone').val();
            var token = $('#token').val();
            var operation = 'RISK_VALIDATE';
            var positionName = staffResult.positionName;
            if (positionName === 'CUSTOMER_SERVICE') {
                teamId = $('#sellGroup').combobox('getValue');
                if (!teamId) {
                    $.messager.alert('提示信息', '团队不能为空','warning');
                    $('#riskJudgmentClearBtn').linkbutton('enable');
                    return;
                }
                sellId = $('#seller').combobox('getValue');
                if (!sellId) {
                    $.messager.alert('提示信息', '客户经理不能为空','warning');
                    $('#riskJudgmentClearBtn').linkbutton('enable');
                    return;
                }
            }
            if (!$('#name').validatebox('isValid')) {
                $.messager.alert('提示信息', '客户姓名不正确','warning');
                $('#riskJudgmentClearBtn').linkbutton('enable');
                return;
            }

            if (!$('#phone').validatebox('isValid')) {
                $.messager.alert('提示信息', '手机号不正确','warning');
                $('#riskJudgmentClearBtn').linkbutton('enable');
                return;
            }
            if (!$('#cardIdOfValidate').validatebox('isValid')) {
                $.messager.alert('提示信息', '手机号不正确','warning');
                $('#riskJudgmentClearBtn').linkbutton('enable');
                return;
            }
            var isCardValid = $('#cardIdOfValidate').validatebox('isValid');
            var isPhone = $('#phone').validatebox('isValid');
            if (isCardValid && isPhone) {
                $('#infoOfCardId').html('');
                $('#riskJudgmentNextStep').linkbutton('disable');
                $('#riskJudgmentSubmitBtn').linkbutton('disable');
                $.ajax({
                    url: basePath + "/lendRequest/validateCardId",
                    cache: false,
                    type: 'POST',
                    dataType: "json",
                    data: {
                        "cardId": cardId,
                        "teamId": teamId,
                        "operation": operation,
                        "sellId": sellId,
                        "name": name,
                        "phone": phone,
                        "token": token,
                        "phoneType": "WEB"
                    },
                    success: function (data) {
                        $('#riskJudgmentSubmitBtn').linkbutton('enable');
                        $('#riskJudgmentClearBtn').linkbutton('enable');
                        if (data.code !== "200") {
                            $.messager.alert('提示信息', data.message,'warning');
                            return;
                        }
                        if (data.result.success === true) {
                            if (data.result.toolTip === true) {
                                $.messager.confirm('提示信息', data.result.msg, function (r) {
                                    if (r) {
                                        $('#riskJudgmentNextStep').linkbutton('enable');
                                    } else {
                                        $('#riskJudgmentNextStep').linkbutton('disable');
                                    }
                                });
                            }
                            $('#riskJudgmentNextStep').linkbutton('enable');
                            canChange = false;
                        }

                        $('#infoOfCardId').html(data.result.msg);
                    },
                    error: function (XMLHttpRequest) {
                        $('#riskJudgmentClearBtn').linkbutton('enable');
                        $.messager.alert('提示信息', XMLHttpRequest.responseText,'error');
                    }
                });
            } else {
                if ($.trim(cardId) === '') {
                    $('#infoOfCardId').html('身份证不能为空');
                } else {
                    $('#infoOfCardId').html('身份证或手机号格式不正确');
                }
            }
        }
    });


    $('#riskJudgmentNextStep').linkbutton({
        onClick:function () {
            var idCard = $('#cardIdOfValidate').val();
            var teamId = $('#sellGroup').combobox('getValue');
            var sellerId = $('#seller').combobox('getValue');
            var mobile = $('#phone').val();
            var name = $('#name').val();
            parent.addTabs("申请表录入", "page/newInput/inputEdit/addRequestForm.jsp?cardId=" + idCard + "&teamId=" + teamId + "&sellerId=" + sellerId + "&name=" + name + "&mobile=" + mobile);
            parent.$("#tabs").tabs("close","添加进件");
        }
    });

    $('.validate').textbox({
        onChange:function () {
            if (!canChange) {
                $('#riskJudgmentNextStep').linkbutton('disable');
                $('#infoOfCardId').html('');
                canChange = true;
            }
        }
    });

    $('#riskJudgmentClearBtn').linkbutton({
        onClick: function () {
            $('#riskJudgmentForm').form("reset");
            $('#riskJudgmentNextStep').linkbutton('disable');
            $('#infoOfCardId').html('');
        }
    });
    $('#repetitionSubmitBtn').click(function () {
        var data = $('#repetitionForm').form('getDataObj');
        $('#repetitionTable').datagrid('load', data);
    });
    $('#repetitionClearBtn').click(function () {
        $('#repetitionForm').form("reset");
    });



    /**
     * 初始化参数
     */
    function init() {
        $.get('../../lendRequest/principal').success(function(data) {
            if (data !== 'CUSTOMER_SERVICE') {
                $flag = false;
            }
            initCombobox();
        }).error(function(data) {
            var $responseText = $.parseJSON(data.responseText);
            $.messager.alert('提示消息', $responseText.message, 'error');
        })
    }

    function initCombobox() {
        $('#sellGroup').combobox({
            required: true,
            url: '../../lendRequest/sellerGroup',
            onSelect: function (record) {
                $('#seller').combobox({
                    panelHeight: '200px',
                    required: true,
                    url: '../../lendRequest/sellers/' + record.value
                })
            }
        });
        if ($flag === false) {
            $('#sellGroup').combobox('disable', 'true');
            $('#seller').combobox('disable', 'true');
        }
    }
});

//@ sourceURL=source.riskJudgment
