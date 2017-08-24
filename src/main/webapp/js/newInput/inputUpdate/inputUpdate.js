var loadDataForContract = function (contact,index) {
    $('#lendCustomer_contacts_subName' + index).val(contact.subName);
    $('#lendCustomer_contacts' + index + '_subMobile').val(contact.subMobile);
    $('#lendCustomer_contacts_telephone' + index).val(contact.telephone);
    $('#lendCustomer_contacts_id' + index).val(contact.id);
    if (index === 2) {
        $('#lendCustomer_contacts_department2').val(contact.department);
    } else {
        $('#lendCustomer_contacts_relationShip' + index).combobox('setValue',contact.relationShip);
        $('#lendCustomer_contacts_messageOfRelationship' + index).val(contact.messageOfRelationship);
    }
};

function setBankInfo(data,productCode) {
    var $lendCustomerOccupationInfoTurnOverBankNameOne = $('#lendCustomer_occupationInfo_turnOverBankNameOne');
    var $lendCustomerOccupationInfoTurnOverBankNameTwo = $('#lendCustomer_occupationInfo_turnOverBankNameTwo');

    if (data === 'PERSONAL_TURNOVER' && productCode === 'BUSINESS2.0_EXCELLENT') {
        $('#bank_name').show();
        $lendCustomerOccupationInfoTurnOverBankNameOne.validatebox({required: true});
        $lendCustomerOccupationInfoTurnOverBankNameTwo.validatebox({required: true});
    } else {
        $('#bank_name').hide();
        $lendCustomerOccupationInfoTurnOverBankNameOne.validatebox({required: false});
        $lendCustomerOccupationInfoTurnOverBankNameOne.val('');
        $lendCustomerOccupationInfoTurnOverBankNameTwo.validatebox({required: false});
        $lendCustomerOccupationInfoTurnOverBankNameTwo.val('');
    }
}

// 设置注册资本
function setCompanyInfoOfCustomerRegistrationCapital(lendRequest) {
    if (lendRequest.lendCustomer.companyInfoOfCustomer) {
        $('#lendCustomer_companyInfoOfCustomer_registrationCapital').numberbox('setValue', lendRequest.lendCustomer.companyInfoOfCustomer.registrationCapital / 10000);
    }
}
function setCarProperty(data) {
    if (data === 'HAVE_CAR_AND_LOAN_WITHOUT' || data === 'HAVE_CAR_AND_LOAN') { // 如果是有车有贷款或者是有车无贷款
        $('#carDiv').show();
    } else {
        $('#carDiv').hide();
        $('#lendCustomer_carNum').val('');
        $('#lendCustomer_isCarMortgage').combobox('setValue', '');
    }
}
$(function () {// NOSONAR
    var params = getIframeParams(window.document.location.href);
    var id = params.id;
    var status = params.status;
    var view = params.view;
    var sourceTitle = decodeURI(params.sourceTitle);
    var $updateRequestFormTab = $('#updateRequestFormTab');
    var lendRequest;
    if (view === 'true') { // 如果是查看进件，那么就显示为只读。并且产品下拉框的 url 改变
        var $productRequest = $('#product_request');
        $productRequest.combobox({
            url: basePath + "/dictionary/lendProduct/28"
        });
        var $loanPurposeType = $('#loanPurposeType');
        var data1 = [];
            $.get(
                basePath + "/dictionary/option/34",
                function (data) {
                    data1.concat(data);
                }
            );
        $.get(
            basePath + "/dictionary/option/5",
            function (data) {
                data1.concat(data);
            }
        );
        $loanPurposeType.combobox({data: data1});
    } else {
        var $productRequest2 = $('#product_request');
        $productRequest2.combobox({
            url: basePath + "/dictionary/option/28"
        });
    }

    // 设置学历相关信息
    function setDegree() {
        if (lendRequest.lendCustomer.lendDegreeCertificate) {
            var degreeType = lendRequest.lendCustomer.lendDegreeCertificate.degreeType;
            if (degreeType) {
                setDegreeInfo(degreeType);
                var degreeNumber = lendRequest.lendCustomer.lendDegreeCertificate.degreeNumber;
                if (degreeType !== 'MAINLAN_DHIGHEST_ACADEMIC') {
                    var split = degreeNumber.split('-');
                    for (var i = 1; i <= split.length; i++) {
                        $('#lendCustomer_lendDegreeCertificate_degreeNumber' + i).val(split[i - 1]);
                    }
                }

                if (degreeType && degreeType === 'MAINLAN_DHIGHEST_ACADEMIC') {
                    var $lendCustomerLendDegreeCertificateDegreeNumberMain1 = $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1');
                    $lendCustomerLendDegreeCertificateDegreeNumberMain1.val(lendRequest.lendCustomer.lendDegreeCertificate.degreeNumber);
                    var $lendCustomerLendDegreeCertificateDegreeNumberMain2 = $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2');
                    $lendCustomerLendDegreeCertificateDegreeNumberMain2.val(lendRequest.lendCustomer.lendDegreeCertificate.degreeNumber);
                    $lendCustomerLendDegreeCertificateDegreeNumberMain1.validatebox('enableValidation').validatebox('validate');
                    $lendCustomerLendDegreeCertificateDegreeNumberMain2.validatebox('enableValidation').validatebox('validate');
                }

            }
        }
    }
    
    $.ajax({
        url : basePath + '/lendRequest/queryLendRequestDetail/'+id,
        cache : false,
        type : 'GET',
        success : function(data) { // NOSONAR
            if (data.code === '200') {
                lendRequest = data.result.lendRequest;
                var productValue = lendRequest.lendProductCode;
                if (view === 'true') { // 如果是查看进件，那么就显示为只读。并且产品下拉框的 url 改变
                    var $productRequest = $('#product_request');
                    $productRequest.combobox({
                        url: basePath + "/dictionary/lendProduct/28",
                        onLoadSuccess: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].value.indexOf(lendRequest.lendProductCode) !== -1) {
                                    $productRequest.combobox('setValue', data[i].value);
                                }
                            }
                        }
                    });
                    var $loanPurposeType = $('#loanPurposeType');
                    var data1 = [];
                    $.get(
                        basePath + "/dictionary/option/34",
                        function (data) {
                            data1.concat(data);
                        }
                    );
                    $.get(
                        basePath + "/dictionary/option/5",
                        function (data) {
                            data1.concat(data);
                        }
                    );
                    $loanPurposeType.combobox({data: data1});

                    $('#tab-tools').hide();
                } else {
                    //申请产品
                    $("#product_request").combobox({
                        valueField:'typeCode',
                        textField:'typeName',
                        required:true,
                        url : basePath + '/lendRequest/queryAllLendProduct?lendProductCode=' + productValue
                    });
                }


                setValueByProductValue(productValue, $updateRequestFormTab, lendRequest);
                // 设置学历相关
                setDegree();
                var loanPurposeType = lendRequest.resourceType;
                // 设置如何了解到凡普
                setHowToLearnPuhui(loanPurposeType);
                // 当银行流水选择个人流水的时候
                if (lendRequest.lendCustomer.occupationInfo.lendTurnOverType) {
                    setBankInfo(lendRequest.lendCustomer.occupationInfo.lendTurnOverType, lendRequest.lendProductCode);
                }
                if (lendRequest.lendCustomer.occupationInfo.jobTitleType) {
                    setEliteFreedom(lendRequest.lendCustomer.occupationInfo.jobTitleType, lendRequest.lendProductCode);
                }
                // 设置与共有人关系
                if (lendRequest.lendCustomer.lendHouseProperty !== null && lendRequest.lendCustomer.lendHouseProperty.propertyPeople !== null) {
                    setCommonRelationShip(lendRequest.lendCustomer.lendHouseProperty.propertyPeople);
                }
                if (lendRequest.lendCustomer.companyInfoOfCustomer !== null && lendRequest.lendCustomer.companyInfoOfCustomer.identity !== null) {
                    setManageCommonRelationShip(lendRequest.lendCustomer.companyInfoOfCustomer.identity);
                }
                if (lendRequest.lendCustomer.lendHouseProperty !== null && lendRequest.lendCustomer.lendHouseProperty.housePropertyType !== null) {
                    setLendCustomerHomeType(lendRequest.lendCustomer.lendHouseProperty.housePropertyType);
                }
                if (lendRequest.lendCustomer.occupationInfo !== null && lendRequest.lendCustomer.occupationInfo.companyType !== null) {
                    setCompanyType(lendRequest.lendCustomer.occupationInfo.companyType);
                }
                if (lendRequest.lendCustomer.lendHouseType !== null) {
                    setLendHouseType(lendRequest.lendCustomer.lendHouseType);
                }

                $('#lendCustomer_lendHouseProve').combobox('clear');
                $('#borrowingForm').form('objLoad', lendRequest);
                $('#baseForm').form('objLoad', lendRequest);
                $('#professionForm').form('objLoad', lendRequest);
                $('#idCardForm').form('objLoad', lendRequest);
                $('#houseForm').form('objLoad', lendRequest);
                $('#hukouForm').form('objLoad', lendRequest);
                $('#weddingForm').form('objLoad', lendRequest);
                $('#educationForm').form('objLoad', lendRequest);
                $('#manageForm').form('objLoad', lendRequest);
                var contacts = lendRequest.lendCustomer.contacts;
                $('#lendCustomer_secretToFamily').combobox('setValue', lendRequest.lendCustomer.secretToFamily);
                $('#lendCustomer_secretToColleague').combobox('setValue', lendRequest.lendCustomer.secretToColleague);
                setCompanyInfoOfCustomerRegistrationCapital(lendRequest);
                var tempIndex = 0;
                for (var index = 0;index<contacts.length;index++) {
                    if (contacts[index].relationshipType === 'LINEAL_RELATIVES'){ // 如果是直系亲属
                        loadDataForContract(contacts[index],tempIndex);
                        tempIndex++;
                    }
                    if (contacts[index].relationshipType === 'WORK_CERTIFICATE') { // 如果是工作证明人
                        loadDataForContract(contacts[index],2);
                    }
                    if (contacts[index].relationshipType === 'OTHER_CONTACTS') { // 如果是其他联系人
                        loadDataForContract(contacts[index],3);

                    }
                }
                $('#contractForm').form('enableValidation');
                // 初始化四个 combobox ，是否打开
                initClose(lendRequest, $updateRequestFormTab);
                // 房薪贷的房产信息必填，如果不是房薪贷，下拉框默认状态为初始状态
                setSellerAndOrganization(data);
                setAddressInfo(lendRequest);
                //现职单位/经营主体所属行业
                if(lendRequest.lendCustomer.occupationInfo.industryType != null){
                    $('#lendCustomer_occupationInfo_industryType').combobox('setValues',lendRequest.lendCustomer.occupationInfo.industryType.split(';'));
                }
                if(lendRequest.lendCustomer.lendHouseProve && lendRequest.lendCustomer.lendHouseProve !== ''){
                    $('#lendCustomer_lendHouseProve').combobox('setValues',lendRequest.lendCustomer.lendHouseProve.split(';'));
                }
                if (lendRequest.lendCustomer.lendCarPropertyType) {
                    setCarProperty(lendRequest.lendCustomer.lendCarPropertyType);
                }
                // 对学历证书特殊处理
                if (lendRequest.lendCustomer.lendDegreeCertificate) {
                    var degreeType = lendRequest.lendCustomer.lendDegreeCertificate.degreeType;
                    if (degreeType) {
                        var $lendCustomerLendDegreeCertificateDegreeNumberMain1 = $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1');
                        var $lendCustomerLendDegreeCertificateDegreeNumberMain2 = $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2');
                        if (degreeType !== 'MAINLAN_DHIGHEST_ACADEMIC') {
                            // 将国内大陆最高学历证书编号置空
                            $lendCustomerLendDegreeCertificateDegreeNumberMain1.val('');
                            $lendCustomerLendDegreeCertificateDegreeNumberMain2.val('');
                            $lendCustomerLendDegreeCertificateDegreeNumberMain1.validatebox({required:false});
                            $lendCustomerLendDegreeCertificateDegreeNumberMain2.validatebox({required:false});
                        }

                        if (degreeType === 'MAINLAN_DHIGHEST_ACADEMIC') {
                            $lendCustomerLendDegreeCertificateDegreeNumberMain1.validatebox('enableValidation').validatebox('validate');
                            $lendCustomerLendDegreeCertificateDegreeNumberMain2.validatebox('enableValidation').validatebox('validate');
                        }

                    }
                }
                // 设置【是否】下拉框
                setTrueOrFalseField(lendRequest);
                if (view === 'true') { // 如果是查看进件，那么就显示为只读。并且产品下拉框的 url 改变
                    var $productRequest3 = $('#product_request');
                    var data = $productRequest3.combobox('getData');
                    for (var i = 0;i<data.length;i++) {
                        if (data[i].value.indexOf(productValue) !== -1) {
                            $productRequest3.combobox('setValue', data[i].value);
                            break;
                        }
                    }
                    $('#borrowingForm').form('readOnlyAndNoborder');
                    $('#baseForm').form('readOnlyAndNoborder');
                    $('#professionForm').form('readOnlyAndNoborder');
                    $('#contractForm').form('readOnlyAndNoborder');
                    $('#idCardForm').form('readOnlyAndNoborder');
                    $('#houseForm').form('readOnlyAndNoborder');
                    $('#hukouForm').form('readOnlyAndNoborder');
                    $('#weddingForm').form('readOnlyAndNoborder');
                    $('#educationForm').form('readOnlyAndNoborder');
                    $('#manageForm').form('readOnlyAndNoborder');
                }
            } else {
                $.messager.alert('提示信息', data.message, 'warning');
            }
        },error : function() {
            $.messager.alert('警告信息', "系统繁忙，稍后重试。", 'error',function () {
                if (view === 'true') {
                    parent.$("#tabs").tabs("close","查看进件" + id);
                } else {
                    parent.$("#tabs").tabs("close","修改进件" + id);
                }
            });
        }
    });

    $('#lendCustomer_lendHouseholdRegister_householdRegisterChildIdnos').textbox({
        onChange: function (newData) {
            if (newData === '' || !newData) {
                $('#lendCustomer_lendHouseholdRegister_householdRegisterChildBirthdays').datebox('clear');
                return;
            }
            var year = newData.substring(6, 10);
            var month = newData.substring(10, 12);
            var day = newData.substring(12, 14);
            try {
                $('#lendCustomer_lendHouseholdRegister_householdRegisterChildBirthdays').datebox('setValue', year + '-' + month + '-' + day);
            } catch (e) {
                $.messager.alert('提示消息', '身份证号填写错误', 'info', function () {
                    $('#lendCustomer_lendHouseholdRegister_householdRegisterChildBirthdays').datebox('clear');
                    $('#lendCustomer_lendHouseholdRegister_householdRegisterChildIdnos').textbox('clear');
                });
            }
        }
    });
    // 默认的 tab 全局变量
    var tabIndex = 0;
    /**
     * 检测所有的表单是否都已经填完
     */
    function checkFormValid() {
        var result = $('#baseForm').form('validate') && $('#borrowingForm').form('validate') && $('#contractForm').form('validate')
            && $('#idCardForm').form('validate') && $('#professionForm').form('validate') ;
        if (!result) {
            return false;
        }

        var productRequest = $('#product_request').combobox('getValue');
        if (productRequest.indexOf("BUSINESS") !== -1) {
            result = result && $('#manageForm').form('validate');
        }

        if ($('#isHouse').combobox('getValue') === 'true') {
            result = result && $('#houseForm').form('validate');
        }
        if ($('#is_lendHouseholdRegister').combobox('getValue') === 'true') {
            result = result && $('#hukouForm').form('validate');
        }
        if ($('#is_lendMarriageCertificate').combobox('getValue') === 'true') {
            result = result && $('#weddingForm').form('validate');
        }
        if ($('#is_lendDegreeCertificate').combobox('getValue') === 'true') {
            result = result && $('#educationForm').form('validate');
        }

        return result;
    }

    $('#updateAll').click(function () {
        var isValid = checkFormValid();
        if (!isValid) {
            $.messager.alert('提示信息','请将所有必填项填写完毕后再保存');
            return;
        }
        if ($("#product_request").combobox("getValue") === 'BUSINESS2.0_FAMILY' && $("#is_lendHouseholdRegister").combobox("getValue") === 'false' && $("#is_lendMarriageCertificate").combobox("getValue") === 'false') {
            $.messager.alert('提示信息', '家盈贷产品户口本和结婚证至少提供一项!');
            return false;
        }
        var baseFormData = $('#baseForm').form('getDataObj');
        var borrowingFormData = $('#borrowingForm').form('getDataObj');
        var contractFormData = $('#contractForm').form('getDataObj');
        var educationFormData = $('#educationForm').form('getDataObj');
        var houseFormData = $('#houseForm').form('getDataObj');
        var hukouFormData = $('#hukouForm').form('getDataObj');
        var idCardFormData = $('#idCardForm').form('getDataObj');
        var professionFormData = $('#professionForm').form('getDataObj');
        var weddingFormData = $('#weddingForm').form('getDataObj');
        var manageFormData = $('#manageForm').form('getDataObj');
        // 获取到所有 form 的 JSON
        var result = $.extend({}, baseFormData, borrowingFormData, contractFormData, educationFormData
            , houseFormData, hukouFormData, idCardFormData, professionFormData, weddingFormData, manageFormData);
        result['status'] = status;

        result['lendCustomer.contacts[2].relationShip'] = 'COLLEAGUE';

        result['lendCustomer.contacts[0].relationshipType'] = 'LINEAL_RELATIVES';
        result['lendCustomer.contacts[1].relationshipType'] = 'LINEAL_RELATIVES';
        result['lendCustomer.contacts[2].relationshipType'] = 'WORK_CERTIFICATE';
        result['lendCustomer.contacts[3].relationshipType'] = 'OTHER_CONTACTS';

        if(lendRequest.appLendRequestId !== null) {
            result['appLendRequestId'] = lendRequest.appLendRequestId;
        }
        // 组装学历信息
        var degreeType = $('#lendCustomer_lendDegree_Certificate_degreeType').combobox('getValue');
        if(degreeType && degreeType !== 'MAINLAN_DHIGHEST_ACADEMIC') {
            result['lendCustomer.lendDegreeCertificate.degreeNumber'] = $('#lendCustomer_lendDegreeCertificate_degreeNumber1').val() + '-' + $('#lendCustomer_lendDegreeCertificate_degreeNumber2').val() + '-' + $('#lendCustomer_lendDegreeCertificate_degreeNumber3').val();
        }
        result['lendCustomer.occupationInfo.industryType'] = $('#lendCustomer_occupationInfo_industryType').combobox('getValues').join(';');
        if ($('#lendCustomer_lendHouseProve').combobox('getValues') && $('#lendCustomer_lendHouseProve').combobox('getValues') !== '') {
            result['lendCustomer.lendHouseProve'] = $('#lendCustomer_lendHouseProve').combobox('getValues').join(';');
        }
        if ($('#lendCustomer_companyInfoOfCustomer_registrationCapital').numberbox('getValue')) {
            result['lendCustomer.companyInfoOfCustomer.registrationCapital'] = $('#lendCustomer_companyInfoOfCustomer_registrationCapital').numberbox('getValue') * 10000;
        }
        // 初始化 id 信息
        insert2Result(result, lendRequest);
        // 防止用户重复点击，将按钮隐藏掉。
        $('#updateAll').hide();
        $.messager.progress();
        $.ajax({
            url: basePath + "/lendRequest/updateNewRequest",
            type: "post",
            data: result,
            success: function (data) {
                $.messager.progress('close');
                if (data.code === '200') {
                    $.messager.alert('提示消息', data.message, 'info',function(){
                        parent.$("#tabs").tabs("close","修改进件" + id);
                        var sourceTab = parent.$("#tabs").tabs("getTab", sourceTitle);
                        var url = $(sourceTab.panel('options').content).attr('src');
                        parent.$('#tabs').tabs('update', {
                            tab : sourceTab,
                            options : {
                                src : url
                            }
                        });
                    });

                } else if (data.code === '400') {
                    $.messager.alert('提示消息', data.message, 'error');
                    $('#updateAll').show();
                } else {
                    $.messager.alert('提示消息', data.message, 'error',function(){
                        // 关闭 tab
                        parent.$("#tabs").tabs("close","修改进件" + id);

                        $('#lendRequestTable').datagrid("reload");
                    });
                }
            }
        });
    });

    $('#product_request').combobox({
        onSelect:function(){
            $('#loanPurposeFirst')[0].style.display="none";
            $('#loanPurposeSecond')[0].style.display="none";
            $('#loanPurpose').validatebox({required:false});
            var productValue = $('#product_request').combobox('getValue');
            // 房薪贷的房产信息必填，如果不是房薪贷，下拉框默认状态为初始状态
            var $isHouse = $('#isHouse');
            var houseType = $isHouse.combobox("getData");
            if(productValue === 'BUSINESS2.0_FAMILY' || productValue === 'BUSINESS2.0_ROOM' || productValue === 'SALARY2.0_ROOM') {
                $isHouse.combobox('setValue', houseType[0].value);
                $isHouse.combobox('setText', houseType[0].text);
                $isHouse.combobox('readonly', true);
            } else if (productValue === 'SALARY2.0_HOUSE') { // 如果是房薪贷，是否提供房产证默认选是，可以修改。
                $isHouse.combobox('setValue', houseType[0].value);
                $isHouse.combobox('setText', houseType[0].text);
                $isHouse.combobox('readonly', false);
            } else {
                $isHouse.combobox('readonly', false);
            }

            setValueByProductValue(productValue, $updateRequestFormTab,lendRequest);
        }
    });

    $('#lendCustomer_occupationInfo_lendTurnOverType').combobox({
        onChange: function (data) {
            var lendProductCode = $('#product_request').combobox('getValue');
            setBankInfo(data,lendProductCode);
        }
    });

    //与共有人关系
    $('#lendCustomer_lendHouseProperty_property_people').combobox({
        onSelect: function (newValue) {
            // 设置与共有人关系
            setCommonRelationShip(newValue.value);

        }
    });

    // 经营信息客户身份
    $('#lendCustomer_companyInfoOfCustomer_identity').combobox({
        onSelect: function (newValue) {
            // 设置经营信息客户身份
            setManageCommonRelationShip(newValue.value);
        }
    });

    $('#lendCustomer_lendCarPropertyType').combobox({
        onChange: function (data) {
            setCarProperty(data);
        }
    });

    // 入职时间推断工作年限
    $('#enterCompany').datebox({
        onSelect:function(date){
            $('#workYears').numberbox('setValue',(new Date() - date)/1000/60/60/24/365);
        }
    });

    $('#loanPurposeType').combobox({
        onChange:function(){
            var loanPurposeType = $('#loanPurposeType').combobox('getValue');
            if(loanPurposeType === 'OTHER') {
                $('#loanPurposeFirst')[0].style.display="";
                $('#loanPurposeSecond')[0].style.display="";
                $('#loanPurpose').validatebox({required:true});
            } else {
                $('#loanPurposeFirst')[0].style.display="none";
                $('#loanPurposeSecond')[0].style.display="none";
                $('#loanPurpose').validatebox({required:false});
                $('#loanPurpose').val('');
            }
        }
    });
    // 联系人信息选其他，关系说明必填
    $('#lendCustomer_contacts_relationShip0').combobox({
        onChange:function(){
            var relationShip = $('#lendCustomer_contacts_relationShip0').combobox('getValue');
            if(relationShip === 'OTHERS') {
                $('#lendCustomer_contacts_messageOfRelationship0').validatebox({required:true});
            } else {
                $('#lendCustomer_contacts_messageOfRelationship0').validatebox({required:false});
                $('#lendCustomer_contacts_messageOfRelationship0').val('');
            }
        }
    });
    // 联系人信息选其他，关系说明必填
    $('#lendCustomer_contacts_relationShip1').combobox({
        onChange:function(){
            var relationShip = $('#lendCustomer_contacts_relationShip1').combobox('getValue');
            if(relationShip === 'OTHERS') {
                $('#lendCustomer_contacts_messageOfRelationship1').validatebox({required:true});
            } else {
                $('#lendCustomer_contacts_messageOfRelationship1').validatebox({required:false});
                $('#lendCustomer_contacts_messageOfRelationship1').val('');
            }
        }
    });
    // 联系人信息选其他，关系说明必填
    $('#lendCustomer_contacts_relationShip3').combobox({
        onChange:function(){
            var relationShip = $('#lendCustomer_contacts_relationShip3').combobox('getValue');
            if(relationShip === 'OTHERS') {
                $('#lendCustomer_contacts_messageOfRelationship3').validatebox({required:true});
            } else {
                $('#lendCustomer_contacts_messageOfRelationship3').validatebox({required:false});
                $('#lendCustomer_contacts_messageOfRelationship3').val('');

            }
        }
    });
    $('#lendCustomer_companyInfoOfCustomer_customerCompanyType').combobox({
        onChange:function(){
            var customerCompanyType = $('#lendCustomer_companyInfoOfCustomer_customerCompanyType').combobox('getValue');
            if(customerCompanyType === 'OTHER') {
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType_first')[0].style.display="";
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType_second')[0].style.display="";
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType').validatebox({required:true});
            } else {
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType_first')[0].style.display="none";
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType_second')[0].style.display="none";
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType').validatebox({required:false});
                $('#lendCustomer_companyInfoOfCustomer_messageOfCompanyType').val('');
            }
        }
    });

    // 如何了解到凡普下拉框效果
    $('#resourceType_id').combobox({
        onChange:function(){
            var resourceType = $('#resourceType_id').combobox('getValue');
            // 选择其他
            setHowToLearnPuhui(resourceType);
        }
    });

    // 学历证书效果
    $('#lendCustomer_lendDegree_Certificate_degreeType').combobox({
        onChange:function(){
            var degreeType = $('#lendCustomer_lendDegree_Certificate_degreeType').combobox('getValue');
            // 国内大陆最高学历证书编号
            setDegreeInfo(degreeType);
        }
    });

    $('#is_lendHouseholdRegister').combobox({
        onChange:function(){
            var houseValue = $('#is_lendHouseholdRegister').combobox('getValue');
            if(houseValue === 'true') {
                $updateRequestFormTab.tabs('enableTab',6);
            } else {
                $updateRequestFormTab.tabs('disableTab',6);
                $('#hukouForm').form('clear');
            }
        }
    });

    $('#is_lendMarriageCertificate').combobox({
        onChange:function(){
            var houseValue = $('#is_lendMarriageCertificate').combobox('getValue');
            if(houseValue === 'true') {
                $updateRequestFormTab.tabs('enableTab',7);
            } else {
                $updateRequestFormTab.tabs('disableTab',7);
                $('#weddingForm').form('clear');
            }
        }
    });
    $('#is_lendDegreeCertificate').combobox({
        onChange:function(){
            var houseValue = $('#is_lendDegreeCertificate').combobox('getValue');
            if(houseValue === 'true') {
                $updateRequestFormTab.tabs('enableTab',8);
            } else {
                $updateRequestFormTab.tabs('disableTab',8);
                $('#educationForm').form('clear');
            }
        }
    });
    $('#isHouse').combobox({
        onChange:function(){
            var houseValue = $('#isHouse').combobox('getValue');
            if(houseValue === 'true') {
                $updateRequestFormTab.tabs('enableTab',5);
            } else {
                $updateRequestFormTab.tabs('disableTab',5);
                // 清除表单内容，防止先填写完表单，然后选择不提供房产证
                $('#houseForm').form('clear');
            }
        }
    });
    // 现单位职位
    $('#jobTitleType').combobox({
        onChange:function (data) {
            var productValue = $('#product_request').combobox('getValue');
            // 如果是精英贷并且是创作类自由职业者
            setEliteFreedom(data, productValue);
        }
    });
    // 现单位性质
    $('#companyType').combobox({
        onChange:function(){
            var companyType = $('#companyType').combobox('getValue');
            // 设置现单位性质
            setCompanyType(companyType);
        }
    });
    $('#live_house_type').combobox({
        onChange:function(){
            var liveHouseType = $('#live_house_type').combobox('getValue');
            setLendHouseType(liveHouseType);
        }
    });

    $('#lendCustomer_house_type').combobox({
        onChange:function(){
            var liveHouseType = $('#lendCustomer_house_type').combobox('getValue');
            // 设置房产类型
            setLendCustomerHomeType(liveHouseType);
        }
    });
    $("#housePropertyCheckbox").change(function() {
        var isSelected = $("#housePropertyCheckbox")[0].checked;
        // 如果选中
        if (isSelected) {
            $('#houseProvince').combobox('setValue', $('#baseInfoProvince').combobox('getValue'));
            $('#houseProvince').combobox('setText', $('#baseInfoProvince').combobox('getText'));

            $('#houseCity').combobox('setValue', $('#baseInfoCity').combobox('getValue'));
            $('#houseCity').combobox('setText', $('#baseInfoCity').combobox('getText'));

            $('#houseCountry').combobox('setValue', $('#baseInfoCountry').combobox('getValue'));
            $('#houseCountry').combobox('setText', $('#baseInfoCountry').combobox('getText'));

            $('#houseTown').val($('#baseInfoTown').val());
            $('#houseHouseNumber').val($('#baseInfoHouseNumber').val());
            $('#houseHouseNumber').val($('#baseInfoHouseNumber').val());
            // 手动执行一下验证。
            $('#houseHouseNumber').validatebox('enableValidation').validatebox('validate');
            $('#houseTown').validatebox('enableValidation').validatebox('validate');

        }
    });
    $('#idCardStart').datebox({
        onSelect: function(){
            var startDate = $('#idCardStart').datebox('getValue');
            var endDate = $('#idCardEnd').datebox('getValue');
            var now = new Date();
            if(endDate !== "" && startDate > endDate ) {
                $.messager.alert('提示消息', '开始时间不允许大于结束时间，请重新填写。','warning');
                $('#idCardStart').datebox("setValue", "");
                $('#idCardEnd').datebox("setValue", "");
            }
            if(startDate > now){
                $.messager.alert('提示消息','开始时间不允许大于当前时间，请重新填写。','warning');
                $('#idCardStart').datebox("setValue", "");
                $('#idCardEnd').datebox("setValue", "");
            }
        }
    });
});
/**
 * 通用设置地址信息类，需要提供省市县的 code 码 和省市县的 div id
 * @param provinceCode 省编码
 * @param cityCode 市编码
 * @param cityId 市 div id
 * @param countryCode 县编码
 * @param countryId 县 div id
 */
function setCommonAddressInfo(provinceCode, cityCode, cityId, countryCode, countryId) {
    $('#' + cityId).combobox({url: basePath + '/dictionary/region/' + provinceCode});
    $('#' + countryId).combobox({url: basePath + '/dictionary/region/' + cityCode});
    try {
        $('#' + cityId).combobox('select', cityCode);
    } catch (err) {
        // 忽略
    }
    $('#' + countryId).combobox('select', countryCode);
}
/**
 * 设置地址信息
 */
function setAddressInfo(lendRequest) {
    // 设置职业信息 tab 页面地址 必填
    var occupationInfo_companyAddress_province = lendRequest.lendCustomer.occupationInfo.companyAddress.province;
    var professionalCity = lendRequest.lendCustomer.occupationInfo.companyAddress.city;
    var professionalCountry = lendRequest.lendCustomer.occupationInfo.companyAddress.dist;
    setCommonAddressInfo(occupationInfo_companyAddress_province, professionalCity,"professionalCity", professionalCountry,"professionalCountry");
    // 设置基本信息 tab 页面地址 必填
    var baseInfoProvinceCode = lendRequest.lendCustomer.livingAddress.province;
    var baseInfoCityCode = lendRequest.lendCustomer.livingAddress.city;
    var baseInfoDistCode = lendRequest.lendCustomer.livingAddress.dist;
    setCommonAddressInfo(baseInfoProvinceCode, baseInfoCityCode, "baseInfoCity", baseInfoDistCode, "baseInfoCountry");
    // 设置身份证 tab 页面地址 必填
    if (lendRequest.lendCustomer.lendIdentificationCard != null) {
        var identificationCardProvinceCode = lendRequest.lendCustomer.lendIdentificationCard.identificationCardAddress.province;
        var identificationCardCityCode = lendRequest.lendCustomer.lendIdentificationCard.identificationCardAddress.city;
        var identificationCardDistCode = lendRequest.lendCustomer.lendIdentificationCard.identificationCardAddress.dist;
        setCommonAddressInfo(identificationCardProvinceCode, identificationCardCityCode, "idCardCity", identificationCardDistCode, "idCardCountry");
    }
    // 设置房产证 tab 页面地址 选填
    if (lendRequest.lendCustomer.lendHouseProperty) {
        var houseInfoProvinceCode = lendRequest.lendCustomer.lendHouseProperty.housePropertyAddress.province;
        var houseInfoCityCode = lendRequest.lendCustomer.lendHouseProperty.housePropertyAddress.city;
        var houseInfoDistCode = lendRequest.lendCustomer.lendHouseProperty.housePropertyAddress.dist;
        setCommonAddressInfo(houseInfoProvinceCode, houseInfoCityCode, "houseCity", houseInfoDistCode, "houseCountry");
    }
    // 设置户口本 tab 页面地址 选填
    if (lendRequest.lendCustomer.lendHouseholdRegister) {
        var householdInfoProvinceCode = lendRequest.lendCustomer.lendHouseholdRegister.householdRegisterAddress.province;
        var householdInfoCityCode = lendRequest.lendCustomer.lendHouseholdRegister.householdRegisterAddress.city;
        var householdInfoDistCode = lendRequest.lendCustomer.lendHouseholdRegister.householdRegisterAddress.dist;
        setCommonAddressInfo(householdInfoProvinceCode, householdInfoCityCode, "hukouCity", householdInfoDistCode, "hukouCountry");
    }
}
function setValueByProductValue(productValue, $updateRequestFormTab,lendRequest) {// NOSONAR
    // 家盈贷，申请人的配偶姓名必填
    if (productValue === 'BUSINESS2.0_FAMILY') {
        $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouse').validatebox({required: true});
        $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouseIdno').validatebox({required: true});
    } else {
        $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouse').validatebox({required: false});
        $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouseIdno').validatebox({required: false});
    }

    // 优盈贷，不需要填银行名称
    if (productValue !== 'BUSINESS2.0_EXCELLENT') {
        $('#bank_name').hide();
        var $lendCustomerOccupationInfoTurnOverBankNameTwo = $('#lendCustomer_occupationInfo_turnOverBankNameTwo');
        $lendCustomerOccupationInfoTurnOverBankNameTwo.validatebox({required: false});
        var $lendCustomerOccupationInfoTurnOverBankNameOne = $('#lendCustomer_occupationInfo_turnOverBankNameOne');
        $lendCustomerOccupationInfoTurnOverBankNameOne.validatebox({required: false});
        $lendCustomerOccupationInfoTurnOverBankNameTwo.val('');
        $lendCustomerOccupationInfoTurnOverBankNameOne.val('');
    }

    if (productValue !== 'SALARY2.0_ELITE') {
        var $lendCustomerOccupationInfoPartnerPhone = $('#lendCustomer_occupationInfo_partnerPhone');
        var $lendCustomerOccupationInfoPartnerName = $('#lendCustomer_occupationInfo_partnerName');
        $('#partnerDiv').hide();
        $lendCustomerOccupationInfoPartnerName.validatebox({required: false});
        $lendCustomerOccupationInfoPartnerPhone.validatebox({required: false});
        $lendCustomerOccupationInfoPartnerName.val('');
        $lendCustomerOccupationInfoPartnerPhone.val('');

        $('#lendCustomer_occupationInfo_areaCode').validatebox({required: true});
        $('#lendCustomer_occupationInfo_phone').validatebox({required: true});
        $('#lendCustomer_occupationInfo_companyName').validatebox({required: true});
    }

    if (productValue === 'BUSINESS2.0_ROOM' || productValue === 'SALARY2.0_ROOM' || productValue === 'SALARY2.0_HOUSE') {
        $('#lendCustomer_repayMonthlyOfHousingLoans_Div').show();
        $('#lendCustomer_lendHouseProve').combobox({required: true});
        var lendCustomer_lendHousePropertyType;
        try {
            lendCustomer_lendHousePropertyType = $('#lendCustomer_lendHousePropertyType').combobox('getValue');
        }catch (e) {
            lendCustomer_lendHousePropertyType = '';
        }
        if (lendCustomer_lendHousePropertyType === 'HAVE_HOUSE_AND_LOAN') {
            $('#lendCustomer_repayMonthlyOfHousingLoans').numberbox({required: true});
        }
    } else {
        $('#lendCustomer_repayMonthlyOfHousingLoans_Div').hide();
        $('#lendCustomer_repayMonthlyOfHousingLoans').numberbox({required: false});
        $('#lendCustomer_lendHouseProve').combobox({required: false});
    }

    // 职业信息的约束
    // 盈贷的约束
    var $loanPurposeType = $('#loanPurposeType');
    var $lendCustomerOccupationInfoSalaryGetForm = $('#lendCustomer_occupationInfo_salaryGetForm');
    var $lendCustomerLendSoFundType = $('#lendCustomer_lendSoFundType');
    var $lendCustomerIsProvideWageCard = $('#lendCustomer_isProvideWageCard');
    var $enterCompany = $('#enterCompany');
    var $workYears = $('#workYears');
    var $department = $('#department');
    var $jobTitleType = $('#jobTitleType');
    var $companyType = $('#companyType');
    if (productValue.indexOf("BUSINESS") !== -1) {
        $updateRequestFormTab.tabs('enableTab', 9);
        $loanPurposeType.combobox('setValue',lendRequest.loanPurposeType);
        $loanPurposeType.combobox({url: basePath + '/dictionary/option/34'});
        //  隐藏
        $('#lendCustomer_isProvideWageCard_first')[0].style.display = "none";
        $('#lendCustomer_isProvideWageCard_second')[0].style.display = "none";
        $('#profession_first')[0].style.display = "none";
        $('#profession_second')[0].style.display = "none";
        // 将上层的 div 打开，之前关闭的原因是美观。lendCustomer_occupationInfo_lendTurnOverType_first
        $('#occupation_detail')[0].style.display = "";
        $('#lendCustomer_occupationInfo_lendTurnOverType_first')[0].style.display = "";
        $('#lendCustomer_occupationInfo_lendTurnOverType_second')[0].style.display = "";
        $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display = "none";
        $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display = "none";
        $('#lendCustomer_lendSoFundType_first')[0].style.display = "none";
        $('#lendCustomer_lendSoFundType_second')[0].style.display = "none";

        // 将【提供工资卡流水】设置为必填，其他设置为选填，并且将内容置空
        $('#lendCustomer_occupationInfo_lendTurnOverType').combobox({required: true});
        $lendCustomerOccupationInfoSalaryGetForm.combobox({required: false});
        $lendCustomerLendSoFundType.combobox({required: false});
        $lendCustomerIsProvideWageCard.combobox({required: false});
        $lendCustomerIsProvideWageCard.combobox('setValue','');
        // 置空
        $lendCustomerOccupationInfoSalaryGetForm.combobox('setValue','');
        $lendCustomerLendSoFundType.combobox('setValue','');

        // 将这几项内容置空
        $enterCompany.val('');
        $workYears.val('');
        $department.val('');
        $jobTitleType.val('');
        $companyType.val('');

        $enterCompany.datebox({required: false});
        $workYears.numberbox({required: false});
        $department.validatebox({required: false});
        $jobTitleType.combobox({required: false});
        $companyType.combobox({required: false});

    } else if (productValue.indexOf("SALARY") !== -1) {
        $updateRequestFormTab.tabs('disableTab', 9);
        $loanPurposeType.combobox('setValue',lendRequest.loanPurposeType);
        $loanPurposeType.combobox({url: basePath + '/dictionary/option/5'});
        $('#lendCustomer_occupationInfo_lendTurnOverType_first')[0].style.display = "none";
        $('#lendCustomer_occupationInfo_lendTurnOverType_second')[0].style.display = "none";
        $('#lendCustomer_occupationInfo_lendTurnOverType').combobox({required: false});
        $('#manageForm').form('clear');

        // 薪贷的约束
        //  显示
        $('#profession_first')[0].style.display = "";
        $('#profession_second')[0].style.display = "";
        // 必填
        $enterCompany.datebox({required: true});
        $workYears.numberbox({required: true});
        $department.validatebox({required: true});
        $jobTitleType.combobox({required: true});
        $companyType.combobox({required: true});
    }

    // 不同的薪贷对应的职业信息工资部分不相同。
    //、选择乐薪贷和才薪贷时，仅提示工资发放形式。安薪贷，提供工资卡流水（默认为是），显示工资发放形式。悦薪贷，提供公司卡流水（可选择）、工资发放形式、提供社保\公积金明细
    // 才薪贷【仅提示工资发放形式】
    if (productValue === 'SALARY2.0_HAPPY' || productValue === 'SALARY2.0_TALENT'|| productValue === 'SALARY2.0_HOUSE' || productValue === 'SALARY2.0_SAFETY' || productValue === 'SALARY2.0_ROOM') {
        $('#occupation_detail')[0].style.display = "";
        $('#lendCustomer_isProvideWageCard_first')[0].style.display = "none";
        $('#lendCustomer_isProvideWageCard_second')[0].style.display = "none";
        $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display = "";
        $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display = "";
        $('#lendCustomer_lendSoFundType_first')[0].style.display = "none";
        $('#lendCustomer_lendSoFundType_second')[0].style.display = "none";
        $lendCustomerOccupationInfoSalaryGetForm.combobox({required: true});
        $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', false);

        // 将【提供工资卡流水】设置为必填，其他设置为选填，并且将内容置空
        $lendCustomerIsProvideWageCard.combobox({required: false});
        $lendCustomerLendSoFundType.combobox({required: false});
        $lendCustomerIsProvideWageCard.combobox('readonly', false);
        // 置空
        $lendCustomerIsProvideWageCard.combobox('setValue','');
        $lendCustomerLendSoFundType.combobox('setValue','');
        $lendCustomerOccupationInfoSalaryGetForm.combobox('setValue','');
    } else if (productValue === "SALARY2.0_DELIGHT") { // 悦薪贷
        $lendCustomerIsProvideWageCard.combobox({required: true});
        $lendCustomerOccupationInfoSalaryGetForm.combobox({required: true});
        $lendCustomerLendSoFundType.combobox({required: true});
        $lendCustomerIsProvideWageCard.combobox('readonly', false);

        $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', false);
        $lendCustomerIsProvideWageCard.combobox('setValue', '');
        $lendCustomerIsProvideWageCard.combobox('setText', '');
        $lendCustomerLendSoFundType.combobox('setValue','');
        $lendCustomerOccupationInfoSalaryGetForm.combobox('setValue','');

        //悦薪贷，提供公司卡流水（可选择）、工资发放形式、提供社保\公积金明细
        $('#occupation_detail')[0].style.display = "";
        $('#lendCustomer_isProvideWageCard_first')[0].style.display = "";
        $('#lendCustomer_isProvideWageCard_second')[0].style.display = "";
        
        $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display = "";
        $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display = "";
        $('#lendCustomer_lendSoFundType_first')[0].style.display = "";
        $('#lendCustomer_lendSoFundType_second')[0].style.display = "";
    } else if(productValue === 'SALARY2.0_SECURITY' || productValue === 'SALARY2.0_WISDOM') {
        // 如果慧薪贷，提供工资卡流水默认为是，工资发放形式为【由公司汇入个人银行卡】
        $('#occupation_detail')[0].style.display = "";
        $('#lendCustomer_isProvideWageCard_first')[0].style.display = "";
        $('#lendCustomer_isProvideWageCard_second')[0].style.display = "";
        $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display = "";
        $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display = "";
        
        $('#lendCustomer_lendSoFundType_first')[0].style.display = "none";
        $('#lendCustomer_lendSoFundType_second')[0].style.display = "none";

        $lendCustomerIsProvideWageCard.combobox({required: true});
        $lendCustomerOccupationInfoSalaryGetForm.combobox({required: true});

        var val = $lendCustomerOccupationInfoSalaryGetForm.combobox("getData");
        $lendCustomerOccupationInfoSalaryGetForm.combobox('setValue', val[0].value);
        $lendCustomerOccupationInfoSalaryGetForm.combobox('setText', val[0].text);
        $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', true);

        var val1 = $lendCustomerIsProvideWageCard.combobox("getData");
        $lendCustomerIsProvideWageCard.combobox('setValue', val1[0].value);
        $lendCustomerIsProvideWageCard.combobox('setText', val1[0].text);
        $lendCustomerIsProvideWageCard.combobox('readonly', true);

        $lendCustomerLendSoFundType.combobox({required: false});
        $lendCustomerLendSoFundType.val('');
    }
    
    if(productValue === 'SALARY2.0_SECURITY' || productValue === 'SALARY2.0_WISDOM' || productValue === 'SALARY2.0_DELIGHT'){
    	//当提供工资卡流水选择是时，需要输入银行卡号信息
        $('#lendCustomer_isProvideWageCard').combobox({
        	onChange: function (newVal,oldVal){
        		if($('#lendCustomer_isProvideWageCard').combobox('getValue')==="true"){
        			$('#lendCustomer_occupationInfo_bankCard_first').show();
                    $('#lendCustomer_occupationInfo_bankCard_second').show();
        		}else{
        			$('#lendCustomer_occupationInfo_bankCard').val("");
        			$('#lendCustomer_occupationInfo_bankCard_first').hide();
                    $('#lendCustomer_occupationInfo_bankCard_second').hide();
        		}
        	}
        });
        
        if(productValue === 'SALARY2.0_SECURITY' || productValue === 'SALARY2.0_WISDOM'){
        	var val = $lendCustomerIsProvideWageCard.combobox("getData");
            $lendCustomerIsProvideWageCard.combobox('setValue', val[0].value);
            $lendCustomerIsProvideWageCard.combobox('setText', val[0].text);
        	$lendCustomerIsProvideWageCard.combobox('readonly', true);
        }else{
        	$lendCustomerIsProvideWageCard.combobox('readonly', false);
        }
    }else{
    	$('#lendCustomer_occupationInfo_bankCard_first').hide();
        $('#lendCustomer_occupationInfo_bankCard_second').hide();
    }
}
function setSellerAndOrganization(data) {
    var sellerName = data.result.staff.realName;
    var sellerId = data.result.staff.id;
    var sellGroupName = data.result.sellGroup.name;
    var sellGroupId = data.result.sellGroup.id;
    var shopName = data.result.shop.name;
    var $sellerGroup = $('#sellerGroup');
    $sellerGroup.combobox('setValue', sellGroupId);
    $sellerGroup.combobox('setText', sellGroupName);
    $sellerGroup.combobox('readonly', true);

    var $seller = $('#seller');
    $seller.combobox('setValue', sellerId);
    $seller.combobox('setText', sellerName);
    $seller.combobox('readonly', true);

    var $shop = $('#shop');
    $shop.val(shopName);
    $shop.attr('readonly',true);
    $shop.validatebox('enableValidation').validatebox('validate');
}
function setTrueOrFalseField(lendRequest) {
    var isPayOfSocialSecurityFund = lendRequest.lendCustomer.occupationInfo.isPayOfSocialSecurityFund;
    var $isPayOfSocialSecurityFund = $('#isPayOfSocialSecurityFund');
    if (isPayOfSocialSecurityFund) {
        $isPayOfSocialSecurityFund.combobox('setValue', 'true');
        $isPayOfSocialSecurityFund.combobox('setText', '是');
    } else {
        $isPayOfSocialSecurityFund.combobox('setValue', 'false');
        $isPayOfSocialSecurityFund.combobox('setText', '否');
    }
    if (lendRequest.lendCustomer.lendIdentificationCard != null) {
        var isHouseCity = lendRequest.lendCustomer.lendIdentificationCard.isHouseCity;
        var $isIdcardSameToAddress = $('#isIdcardSameToAddress');
        if (isHouseCity) {
            $isIdcardSameToAddress.combobox('setValue', 'true');
            $isIdcardSameToAddress.combobox('setText', '是');
        } else {
            $isIdcardSameToAddress.combobox('setValue', 'false');
            $isIdcardSameToAddress.combobox('setText', '否');
        }
    }
    if (lendRequest.lendCustomer.carMortgage !== null) {
        var $lendCustomerLendCardInfoIsCarMortgage = $('#lendCustomer_isCarMortgage');
        if (lendRequest.lendCustomer.carMortgage === true) {
            $lendCustomerLendCardInfoIsCarMortgage.combobox('setValue', 'true');
            $lendCustomerLendCardInfoIsCarMortgage.combobox('setText', '是');
        } else {
            $lendCustomerLendCardInfoIsCarMortgage.combobox('setValue', 'false');
            $lendCustomerLendCardInfoIsCarMortgage.combobox('setText', '否');
        }
    }
}
// 设置学历信息
function setDegreeInfo(degreeType) {
    var $lendCustomerLendDegreeCertificateDegreeNumber1 = $('#lendCustomer_lendDegreeCertificate_degreeNumber1');
    var $lendCustomerLendDegreeCertificateDegreeNumber2 = $('#lendCustomer_lendDegreeCertificate_degreeNumber2');
    var $lendCustomerLendDegreeCertificateDegreeNumber3 = $('#lendCustomer_lendDegreeCertificate_degreeNumber3');
    if (degreeType === 'MAINLAN_DHIGHEST_ACADEMIC') {
        $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1').validatebox({required: true});
        $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2').validatebox({required: true});
        $lendCustomerLendDegreeCertificateDegreeNumber1.validatebox({required: false});
        $lendCustomerLendDegreeCertificateDegreeNumber2.validatebox({required: false});
        $lendCustomerLendDegreeCertificateDegreeNumber3.validatebox({required: false});
        $lendCustomerLendDegreeCertificateDegreeNumber1.val("");
        $lendCustomerLendDegreeCertificateDegreeNumber2.val("");
        $lendCustomerLendDegreeCertificateDegreeNumber3.val("");

        $('#lendDegreeCertificate_degreeNumber_first')[0].style.display = "";
        $('#lendDegreeCertificate_degreeNumber_second')[0].style.display = "";
        $('#lendDegreeCertificate_degreeNumber_third')[0].style.display = "";
        $('#lendDegreeCertificate_degreeNumber_forth')[0].style.display = "";
        $('#lendDegreeCertificate_degreeNumber_fifth')[0].style.display = "none";
        $('#lendDegreeCertificate_degreeNumber_sixth')[0].style.display = "none";
    } else {
        $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1').validatebox({required: false});
        $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2').validatebox({required: false});
        $lendCustomerLendDegreeCertificateDegreeNumber1.validatebox({required: true});
        $lendCustomerLendDegreeCertificateDegreeNumber2.validatebox({required: true});
        $lendCustomerLendDegreeCertificateDegreeNumber3.validatebox({required: true});
        $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1').val("");
        $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2').val("");

        $('#lendDegreeCertificate_degreeNumber_first')[0].style.display = "none";
        $('#lendDegreeCertificate_degreeNumber_second')[0].style.display = "none";
        $('#lendDegreeCertificate_degreeNumber_third')[0].style.display = "none";
        $('#lendDegreeCertificate_degreeNumber_forth')[0].style.display = "none";
        $('#lendDegreeCertificate_degreeNumber_sixth')[0].style.display = "";
        $('#lendDegreeCertificate_degreeNumber_fifth')[0].style.display = "";
    }
}
function setHowToLearnPuhui(resourceType) {
    if (resourceType === 'OTHERS') {
        $('#messageOfResourceType_first').html('请说明');
        $('#messageOfResourceType_second')[0].style.display = "";
        $('#messageOfResourceType_first')[0].style.display = "";
        $('#messageOfResourceType_id').validatebox({required: true});
    } else if (resourceType === 'PEER_RECOMMENDATION') {
        // 选择同业推荐
        $('#messageOfResourceType_second')[0].style.display = "";
        $('#messageOfResourceType_first')[0].style.display = "";
        $('#messageOfResourceType_first').html('同业名称');
        $('#messageOfResourceType_id').validatebox({required: true});
    } else if (resourceType === 'INTERMEDIATY_RECOMMENDATION') {
        // 选择中介推荐
        $('#messageOfResourceType_second')[0].style.display = "";
        $('#messageOfResourceType_first')[0].style.display = "";
        $('#messageOfResourceType_first').html('中介名称');
        $('#messageOfResourceType_id').validatebox({required: true});
    } else {
        $('#messageOfResourceType_second')[0].style.display = "none";
        $('#messageOfResourceType_first')[0].style.display = "none";
        $('#messageOfResourceType_first').html('');
        $('#messageOfResourceType_id').validatebox({required: false});
        $('#messageOfResourceType_id').val('');
    }
}
function setCommonRelationShip(newValue) {
    if (newValue === 'SHARE') { // 共有
        $('#relationshipForShareDiv').show();
        $('#messageOfPropertyPeopleDiv').hide();
        $('#relationshipForShare').combobox({required: true});
        $('#messageOfPropertyPeople').val('');
        $('#messageOfPropertyPeople').validatebox({required: false});
    } else if (newValue === 'OTHER') { // 其他
        $('#relationshipForShareDiv').hide();
        $('#messageOfPropertyPeopleDiv').show();
        $('#relationshipForShare').combobox({required: false});
        $('#relationshipForShare').combobox('setValue', '');
        $('#messageOfPropertyPeople').validatebox({required: true});
    } else {
        $('#relationshipForShareDiv').hide();
        $('#messageOfPropertyPeopleDiv').hide();
        $('#relationshipForShare').combobox({required: false});
        $('#messageOfPropertyPeople').validatebox({required: false});
        $('#messageOfPropertyPeople').val('');
        $('#relationshipForShare').combobox('setValue', '');
    }
}
function setManageCommonRelationShip(newValue) {
    if (newValue === 'SHAREHOLDER') { // 共有
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares_div').show();
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity_div').hide();
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares').numberbox({required: true});
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').validatebox({required: false});
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').val('');
    } else if (newValue === 'OTHER') { // 其他
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares_div').hide();
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity_div').show();
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares').numberbox({required: false});
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares').numberbox('setValue','');
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').validatebox({required: true});
    } else {
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares_div').hide();
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity_div').hide();
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares').numberbox({required: false});
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').validatebox({required: false});
        $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').val('');
        $('#lendCustomer_companyInfoOfCustomer_proportionOfShares').numberbox('setValue','');
    }
}
function setLendCustomerHomeType(liveHouseType) {
    if (liveHouseType === 'OTHER') {
        $('#messageOfHousePropertyType_first')[0].style.display = "";
        $('#messageOfHousePropertyType_second')[0].style.display = "";
        $('#messageOfHousePropertyTypeId').validatebox({required: true});
    } else {
        $('#messageOfHousePropertyType_first')[0].style.display = "none";
        $('#messageOfHousePropertyType_second')[0].style.display = "none";
        $('#messageOfHousePropertyTypeId').validatebox({required: false});
        $('#messageOfHousePropertyTypeId').val('');
    }
}
// 设置现单位性质
function setCompanyType(companyType) {
    if (companyType === 'OTHER_COMPANY') {
        $('#lendCustomer_occupationInfo_messageOfCompanyType_first')[0].style.display = "";
        $('#lendCustomer_occupationInfo_messageOfCompanyType_second')[0].style.display = "";
        $('#lendCustomer_occupationInfo_messageOfCompanyType').validatebox({required: true});
    } else {
        $('#lendCustomer_occupationInfo_messageOfCompanyType_first')[0].style.display = "none";
        $('#lendCustomer_occupationInfo_messageOfCompanyType_second')[0].style.display = "none";
        $('#lendCustomer_occupationInfo_messageOfCompanyType').validatebox({required: false});
        $('#lendCustomer_occupationInfo_messageOfCompanyType').val('');
    }
}
// 精英贷并且是自由职业者
function setEliteFreedom(data,productValue) {
    var $lendCustomerOccupationInfoPartnerPhone = $('#lendCustomer_occupationInfo_partnerPhone');
    var $lendCustomerOccupationInfoPartnerName = $('#lendCustomer_occupationInfo_partnerName');
    if (data === 'FREEDOM' && productValue === 'SALARY2.0_ELITE') {
        $('#partnerDiv').show();
        $lendCustomerOccupationInfoPartnerName.validatebox({required: true});
        $lendCustomerOccupationInfoPartnerPhone.validatebox({required: true});
        $('#lendCustomer_occupationInfo_areaCode').validatebox({required: false});
        $('#lendCustomer_occupationInfo_phone').validatebox({required: false});
        $('#lendCustomer_occupationInfo_companyName').validatebox({required: false});
    } else {
        $('#partnerDiv').hide();
        $lendCustomerOccupationInfoPartnerName.validatebox({required: false});
        $lendCustomerOccupationInfoPartnerPhone.validatebox({required: false});
        $lendCustomerOccupationInfoPartnerName.val('');
        $lendCustomerOccupationInfoPartnerPhone.val('');

        $('#lendCustomer_occupationInfo_areaCode').validatebox({required: true});
        $('#lendCustomer_occupationInfo_phone').validatebox({required: true});
        $('#lendCustomer_occupationInfo_companyName').validatebox({required: true});
    }
}
function setLendHouseType(liveHouseType) {
    if (liveHouseType === 'OTHER_HOUSE') {
        $('#LendCustomer_messageOfLendHouseType_div').show();
        $('#LendCustomer_messageOfLendHouseType').validatebox({required: true});
    } else {
        $('#LendCustomer_messageOfLendHouseType_div').hide();
        // 将值置空
        $('#LendCustomer_messageOfLendHouseType').validatebox({required: false});
        $('#LendCustomer_messageOfLendHouseType').val('');
    }
}
function initClose(lendRequest, $updateRequestFormTab) {
    var $isHouse = $('#isHouse');
    var $isLendHouseholdRegister = $('#is_lendHouseholdRegister');
    var $isLendMarriageCertificate = $('#is_lendMarriageCertificate');
    var $isLendDegreeCertificate = $('#is_lendDegreeCertificate');
    var val = [{"text": "是", "value": "true"}, {"text": "否", "value": "false"}];
    if  (lendRequest.callCenter) {
        $('#callCenter').combobox('setValue', val[0].value);
        $('#callCenter').combobox('setText', val[0].text);
    } else {
        $('#callCenter').combobox('setValue', val[1].value);
        $('#callCenter').combobox('setText', val[1].text);
    }

    if (lendRequest.appLendRequestId == null) {
        if (!lendRequest.lendCustomer.lendHouseProperty) {
            $updateRequestFormTab.tabs('disableTab', 5);
            $isHouse.combobox('setValue', val[1].value);
            $isHouse.combobox('setText', val[1].text);
        } else {
            $updateRequestFormTab.tabs('enableTab', 5);
            $isHouse.combobox('setValue', val[0].value);
            $isHouse.combobox('setText', val[0].text);
        }
    } else {
        // 考虑到从 APP 推送过来，如果选择的是房类产品，需要在个贷这边填写房产信息。
        var productValue = lendRequest.lendProductCode;
        if (lendRequest.lendCustomer.lendHouseProperty) {
            $updateRequestFormTab.tabs('enableTab', 5);
            $isHouse.combobox('setValue', val[0].value);
            $isHouse.combobox('setText', val[0].text);
        } else {
            $updateRequestFormTab.tabs('disableTab', 5);
            $isHouse.combobox('setValue', val[1].value);
            $isHouse.combobox('setText', val[1].text);
        }
        var houseType = $isHouse.combobox("getData");
        if(productValue === 'BUSINESS2.0_FAMILY' || productValue === 'BUSINESS2.0_ROOM' || productValue === 'SALARY2.0_ROOM') {
            $isHouse.combobox('setValue', houseType[0].value);
            $isHouse.combobox('setText', houseType[0].text);
            $isHouse.combobox('readonly', true);
        } else {
            $isHouse.combobox('readonly', false);
        }
        if (productValue === 'SALARY2.0_SECURITY' || productValue === 'SALARY2.0_WISDOM') {
            var $lendCustomerIsProvideWageCard = $('#lendCustomer_isProvideWageCard');
            var $lendCustomerOccupationInfoSalaryGetForm = $('#lendCustomer_occupationInfo_salaryGetForm');
            // 兼容慧薪贷，因为这个需要在个贷这边填写。
            var val2 = $lendCustomerOccupationInfoSalaryGetForm.combobox("getData");
            $lendCustomerOccupationInfoSalaryGetForm.combobox('setValue', val2[0].value);
            $lendCustomerOccupationInfoSalaryGetForm.combobox('setText', val2[0].text);
            $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', true);

            var val3 = $lendCustomerIsProvideWageCard.combobox("getData");
            $lendCustomerIsProvideWageCard.combobox('setValue', val3[0].value);
            $lendCustomerIsProvideWageCard.combobox('setText', val3[0].text);
            $lendCustomerIsProvideWageCard.combobox('readonly', true);
        }
    }
    if (!lendRequest.lendCustomer.lendHouseholdRegister) {
        $updateRequestFormTab.tabs('disableTab', 6);
        $isLendHouseholdRegister.combobox('setValue', val[1].value);
        $isLendHouseholdRegister.combobox('setText', val[1].text);
    }else {
        $updateRequestFormTab.tabs('enableTab', 6);
        $isLendHouseholdRegister.combobox('setValue', val[0].value);
        $isLendHouseholdRegister.combobox('setText', val[0].text);
    }
    if (lendRequest.lendCustomer.lendMarriageCertificate == null) {
        $updateRequestFormTab.tabs('disableTab', 7);
        $isLendMarriageCertificate.combobox('setValue', val[1].value);
        $isLendMarriageCertificate.combobox('setText', val[1].text);
    }else {
        $updateRequestFormTab.tabs('enableTab', 7);
        $isLendMarriageCertificate.combobox('setValue', val[0].value);
        $isLendMarriageCertificate.combobox('setText', val[0].text);
    }
    if (!lendRequest.lendCustomer.lendDegreeCertificate) {
        $updateRequestFormTab.tabs('disableTab', 8);
        $isLendDegreeCertificate.combobox('setValue', val[1].value);
        $isLendDegreeCertificate.combobox('setText', val[1].text);
    }else {
        $updateRequestFormTab.tabs('enableTab', 8);
        $isLendDegreeCertificate.combobox('setValue', val[0].value);
        $isLendDegreeCertificate.combobox('setText', val[0].text);
    }
    if (lendRequest.appLendRequestId == null) {
        if (!lendRequest.lendCustomer.companyInfoOfCustomer) {
            $updateRequestFormTab.tabs('disableTab', 9);
        } else {
            $updateRequestFormTab.tabs('enableTab', 9);
        }

    } else if (productValue.indexOf('BUSINESS') !== -1) {
        $updateRequestFormTab.tabs('enableTab', 9);

    }
}
function insert2Result(result, lendRequest) {
    result['lendCustomer.id'] = lendRequest.lendCustomer.id;
    result['id'] = lendRequest.id;

    if (lendRequest.lendCustomer.lendDegreeCertificate != null && $('#lendCustomer_lendDegree_Certificate_degreeType')) {
        result['lendCustomer.lendDegreeCertificate.id'] = lendRequest.lendCustomer.lendDegreeCertificate.id;
    }
    if (lendRequest.lendCustomer.lendHouseProperty != null && $('#lendCustomer_lendHouseProperty_area')) {
        result['lendCustomer.lendHouseProperty.id'] = lendRequest.lendCustomer.lendHouseProperty.id;
        if (lendRequest.lendCustomer.lendHouseProperty.housePropertyAddress != null) {
            result['lendCustomer.lendHouseProperty.housePropertyAddress.id'] = lendRequest.lendCustomer.lendHouseProperty.housePropertyAddress.id;
        }
    }

    if (lendRequest.lendCustomer.lendHouseholdRegister != null && $('#lendCustomer_lendHouseholdRegister_houseHolderName')) {
        result['lendCustomer.lendHouseholdRegister.id'] = lendRequest.lendCustomer.lendHouseholdRegister.id;
        if (lendRequest.lendCustomer.lendHouseholdRegister.householdRegisterAddress.id) {
            result['lendRequest.lendCustomer.lendHouseholdRegister.householdRegisterAddress.id'] = lendRequest.lendCustomer.lendHouseholdRegister.householdRegisterAddress.id;
        }
    }

    if (lendRequest.lendCustomer.lendIdentificationCard != null) {
        result['lendCustomer.lendIdentificationCard.id'] = lendRequest.lendCustomer.lendIdentificationCard.id;
        if (lendRequest.lendCustomer.lendIdentificationCard.identificationCardAddress != null) {
            result['lendCustomer.lendIdentificationCard.identificationCardAddress.id'] = lendRequest.lendCustomer.lendIdentificationCard.identificationCardAddress.id;
        }
    }

    if (lendRequest.lendCustomer.lendMarriageCertificate != null && $('#lendCustomer_lendMarriageCertificate_marriageCertificateSpouse')) {
        result['lendCustomer.lendMarriageCertificate.id'] = lendRequest.lendCustomer.lendMarriageCertificate.id;
    }
    if (lendRequest.lendCustomer.companyInfoOfCustomer != null && $('#lendCustomer_companyInfoOfCustomer_businessSubjectRange').val()) {
        result['lendCustomer.companyInfoOfCustomer.id'] = lendRequest.lendCustomer.companyInfoOfCustomer.id;
    }

    // 必填项！
    result['lendCustomer.occupationInfo.id'] = lendRequest.lendCustomer.occupationInfo.id;
    result['lendCustomer.occupationInfo.companyAddress.id'] = lendRequest.lendCustomer.occupationInfo.companyAddress.id;
    result['lendCustomer.livingAddress.id'] = lendRequest.lendCustomer.livingAddress.id;
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//# sourceURL=source.inputUpdate