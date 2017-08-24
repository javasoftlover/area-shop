$.extend($.fn.validatebox.defaults.rules, {
    // 固话验证
    tel: {
        validator: function (value) {
            if (value) {
                return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
                    .test(value);
            } else {
                return true;
            }
        },
        message: '电话号码格式错误'
    },
    //中文或英文验证
    CHS: {
        validator: function (value) {
            return /^[A-Za-z\u4e00-\u9fa5.·]+$/.test(value);
        },
        message: '请输入汉字或者字母'
    },
    //车牌号验证
    CAR: {
        validator: function (value) {
            return /^[A-Za-z\u4e00-\u9fa50-9]+$/.test(value);
        },
        message: '请输入正确的车牌号'
    },
    mobileAndTel:{
        validator: function (value) {
            var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isMob = /^1[3|5|8|7|4][0-9]\d{8}$/;
            if (isMob.test(value) || isPhone.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        message: '请输入手机号或固定电话'
    },
    //中文验证
    chinese: {
        validator: function (value) {
            return /^[\u4e00-\u9fa5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    chineseAndNumber: {
        validator: function (value) {
            return /^[a-zA-Z0-9_\.]+$/.test(value);
        },
        message: '只能是数字跟字母'
    },
    //验证金额大于0
    moreThanZero: {
        validator: function (value, param) {
            return $(param[0]).val() > 0;
        },
        message: '请输入大于0的值.'
    },
    //验证值相等
    equals: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '字段不相同.'
    },
    //验证月还款额小于借款金额
    big: {
        validator: function (value, param) {
            return $(param[0]).val() >= value;
        },
        message: '请输入的月接受还款额小于期望贷款金额.'
    },
    //身份证号验证
    idcard: {
        validator: function (value) {
            return /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        },
        message: '请输入正确的身份证号码'
    },

    // 验证空格
    space: {
        validator: function (value) {
            return /.*[^ ].*/.test(value);
        },
        message: '输入值不能全部为空'
    },
    unNormal : {// 验证是否包含空格和非法字符
        validator : function(value) {
            return !/[ @#\$%\^&\*]+/g.test(value);
        },
        message : '输入值不能为空和包含其他非法字符'
    },
    // 验证是否小于 3
    lessThanThree: {
        validator: function (param) {
            return param >= 3;
        },
        message: '此保险为缴费年限小于3，为无效险'
    },
    // 验证是否小于 6
    lessThanSix: {
        validator: function (param) {
            return param >= 6;
        },
        message: '此保险为生效时长小于6，为无效险'
    },
    // 验证是否小于 6
    lessThanFive: {
        validator: function (param) {
            return param >= 5;
        },
        message: '此保险为生效时长小于5，为无效险'
    },
    //手机号码验证
    mobile: {
        validator: function (value) {
            return /^1[3|5|8|7|4][0-9]\d{8}$/.test(value);
        },
        message: '手机号码不正确'
    },
    //借款申请额度
    loanAmountValidate: {
        validator: function (value) {
            return value >= 10000;
        },
        message: '请输入大于等于10000的值！'
    },
    //每月可还款金额
    monthlyRepayBearValidate: {
        validator: function (value, param) {
            return $(param[0]).val() * 10000 >= value;
        },
        message: '请输入的每月可还款金额小于借款申请额度'
    },
    //邮编验证
    postCodeValidate: {
        validator: function (value) {
            return /^[0-9]{6}$/.test(value);
        },
        message: '请输入合法的邮编！'
    },
    //生活时长验证
    lifeYearsValidate: {
        validator: function (value) {
            return (value >= 0) && (value <= 70);
        },
        message: '请输入正确的生活时长！'
    },
    //区号验证
    areaCodeValidate: {
        validator: function (value) {
            return /^\d{3,4}$/.test(value);
        },
        message: '请输入正确的区号！'
    },
    //固定电话号码验证
    numberPhoneValidate: {
        validator: function (value) {
            return /^\d{7,8}$/.test(value);
        },
        message: '请输入正确的号码！'
    },
    //两次输入验证
    sameValidate: {
        validator: function (value, param) {
            return ('' + value).localeCompare($(param[0]).val()) == 0;
        },
        message: '两次输入证书号不匹配！'
    },
    //前后是否相同
    sameBank: {
        validator: function (value, param) {
            var realValue = $(param[0]).val();
            if (!realValue) {
                return true
            } else {
                return value !== realValue;
            }
        },
        message: '前后银行不能一致'
    },
    //非纯数字验证
    notOnlyNumberValidate: {
        validator: function (param) {
            return !/^\d+$/.test(param);
        },
        message: '不能输入纯数字！'
    },
    //不能包含数字验证
    notNumberValidate: {
        validator: function (value, param) {
            return !/\d+/g.test($(param[0]).val());
        },
        message: '不能包含数字！'
    },
    //纯数字验证
    onlyNumberValidate: {
        validator: function (value) {
            return /^\d+$/.test(value);
        },
        message: '请输入纯数字！'
    },
    //银行流水电话验证
    bankPhoneValidate: {
        validator: function (value) {
        	if(value.length>11||value.length<5){
        		return false;
        	}
            return /^\d+$/.test(value);
        },
        message: '请输入正确的电话！'
    },
    //纯数字且字符数固定验证
    onlyNumberValidateAndCount: {
        validator: function (value, param) {
            $.fn.validatebox.defaults.rules.onlyNumberValidateAndCount.message = '请输入' + param[1] + '位纯数字';
            var va = $(param[0]).val();
            if (/^\d+$/.test(va)) {
                return ('' + va).length == param[1];
            }
            return false;
            message: '请输入 4 位纯数字！'
        },
        //进入现职单位时间验证
        enterCompanyValidate: {
            validator: function (value,param) {
                return Date.parse(value) < new Date().getTime();
            },
            message: '请输入今天以前的时间！'
        },
        //企业注册时间验证
        registrationTimeValidate: {
            validator: function (value) {
                $.messager.alert('提示消息', '请输入今天以前的时间!', 'warning');
                return Date.parse(value) < new Date().getTime();
            },
            message: '请输入今天以前的时间！'
        },
        md: {
            validator: function (value, param) {
                var startTime = $(param[0]).datetimebox('getValue');
                var d1 = $.fn.datebox.defaults.parser(startTime);
                var d2 = $.fn.datebox.defaults.parser(value);
                return d1 <= d2;
            },
            message: '结束时间必须大于开始时间！'
        },

        //手机号重复验证
        mobileRepeatValidate: {
            validator: function (value, param) {
                if (/^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(value)) {
                    $.fn.validatebox.defaults.rules.mobileRepeatValidate.message = '手机号已存在！';
                    return '' + value != $(param[0]).val();
                } else {
                    $.fn.validatebox.defaults.rules.mobileRepeatValidate.message = '手机号码不正确';
                    return false;
                }
            }
        },
        message: ''
    },
    //联系电话验证
    contactValidate: {
        validator: function (value) {
            return /^\d+-?\d+-?\d+$/.test(value);
        },
        message: '请输入正确的格式'
    },
    //身份证号验证
    cardIdValidate: {
        validator: function (value) {
            if (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) && birthdayValid(value)) {
                return true;
            } else {
                return false;
            }
        },
        message: '请输入正确18位身份证号码'
    },
    // 最大长度验证
    maxLength: {
        validator: function (value, param) {
            return param[0] >= value.length;
        },
        message: '最大长度不能大于{0}.'
    },
    // 最小长度验证
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '最小长度不能小于{0}.'
    },
    // 长度区间验证
    length: {
        validator: function (value, param) {
            return value.length >= param[0] && param[1] >= value.length;
        },
        message: '长度范围{0}-{1}.'
    },
    //股份比例验证
    sharesValidate: {
        validator: function (value) {
            return (value >= 0) && (value <= 100);
        },
        message: '请输入正确的股份比例'
    },

    //签约降额
    signReduceAmountValidate: {
        validator: function (value, param) {
            var v = new Number(value);
            var p = new Number(param[0]);
            if ((p - v) % 1000 != 0) {
                return false;
            } else {
                return true;
            }
        },
        message: '调整单位为1000元！'
    },
    //确认银行卡号
    equalTo: {
        validator: function (value, param) {
            return $(param[0]).val() == value;
        },
        message: '您两次输入的银行卡号不一致'
    },
    //主副卡是否相等
    isEqual: {
        validator: function (value, param) {
            if (!$(param[0]).val()) {
                return true;
            } else {
                return $(param[0]).val() != value;
            }
        },
        message: '主卡银行卡号与副卡银行卡号不能相同！'
    },

    //原银行卡是否相等
    isEqualTwo: {
        validator: function (value, param) {
            if (!$(param[0]).val()) {
                return true;
            } else {
                return $(param[0]).val() != value;
            }
        },
        message: '现银行卡号不能与原银行卡号相同！'
    },


    //和当前时间比较
    compareDate: {
        validator: function (value) {
            var $result = DateUtil.compare(value, DateUtil.format(new Date(), 'yyyy-MM-dd'));
            return $result !== 1;
        },
        message: '不能选择小于当前日期的还款日！'
    },
    //小于当前时间
    lessThanToday: {
        validator: function (value) {
            var $result = DateUtil.compare(value, DateUtil.format(new Date(), 'yyyy-MM-dd'));
            return $result === 1;
        },
        message: '选择时间应早于当前时间'
    },
    // 大于当前时间
    moreThanToday: {
        validator: function (value) {
            var $result = DateUtil.compare(value, DateUtil.format(new Date(), 'yyyy-MM-dd'));
            return $result !== 1;
        },
        message: '选择时间应晚于当前时间'
    },
    //员工编号的验证
    staffIdValidate: {
        validator: function (value) {
            return /^([0-9])\d{5}$/.test(value);
        },
        message: '员工编号不合法'
    },
    //还款时间
    repayValidate: {
        validator: function(value, param) {
            //账单日之后的日期
            return new Date(value) <= new Date(  $(param[0]).val());
        },
        message: '请选择账单日或账单日之前的日期'
    }
});