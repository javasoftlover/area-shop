
    $(function () {// NOSONAR
    var params = getIframeParams(window.document.location.href);
    var idCard = params.cardId;
    var teamId = params.teamId || 0;
    var sellerId = params.sellerId || 0;
    var mobile = params.mobile;
    var name = decodeURI(params.name);
    var lendRequest;
    var tabIndex = 0;
    var canJumpTabs = [0];
    // 默认的 tab 全局变量
    // 后面几个 tab 页默认置灰
    var $addRequestFormTab = $('#addRequestFormTab');
    $addRequestFormTab.tabs('disableTab',5);
    $addRequestFormTab.tabs('disableTab',6);
    $addRequestFormTab.tabs('disableTab',7);
    $addRequestFormTab.tabs('disableTab',8);
    // 经营信息默认置灰
    $addRequestFormTab.tabs('disableTab',9);

    if (teamId != 0 && sellerId != 0) {
        $.ajax({
            url: basePath + "/lendRequest/toLendRequestForm/" + idCard + "/" + teamId + "/" + sellerId,
            type: "post",
            async: false,
            success: function (data) {
                setSellerAndOrganizationAndIdCard(data.result);
            },
            error: function () {
                $.messager.alert('提示消息','当前用户不存在门店信息！','info');
            }
        });
    } else {
        var data1 = {
            seller: "",
            sellerId: "",
            group: "",
            groupId: "",
            shop: "",
            cardId: idCard
        };
        setSellerAndOrganizationAndIdCard(data1);
    }
    //申请产品
    $("#product_request").combobox({
        valueField:'typeCode',
        textField:'typeName',
        required:true,
        url : basePath + '/lendRequest/queryAllLendProduct'
    });
    // 设置销售、组织和身份证号码.
    function setSellerAndOrganizationAndIdCard(data) {
        try {
            var sellerName = data.seller;
            var sellerId = data.sellerId;
            var sellGroupName = data.group;
            var sellGroupId = data.groupId;
            var shopName = data.shop;
            var idCard = data.cardId;
        } catch (e) {
            // ignore
        }

        var $lendCustomerGender2 = $('#lendCustomer_gender');
        $lendCustomerGender2.combobox({
            url: basePath + "/dictionary/option/7",
            onLoadSuccess:function () {
                var gender = 0;
                if (idCard.length === 18) {
                    gender = parseInt(idCard.slice(idCard.length - 2, idCard.length - 1));
                } else if (idCard.length === 15) {
                    gender = parseInt(idCard.slice(idCard.length - 1, idCard.length));
                } else {
                    $.messager.alert('提示消息', '身份证号错误！', 'warning');
                }

                // 性别
                var $lendCustomerGender = $lendCustomerGender2;
                $lendCustomerGender.combobox('select', gender % 2 === 0 ? 'FEMALE' : 'MALE');
                $lendCustomerGender.combobox('readonly', true);
            }
        });

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

        var $lendCustomerIdNo = $('#lendCustomer_idNo');
        $lendCustomerIdNo.val(idCard);
        $lendCustomerIdNo.validatebox('readonly', true);
        $lendCustomerIdNo.validatebox('enableValidation').validatebox('validate');

        var $lendCustomerName = $('#lendCustomer_name');
        $lendCustomerName.val(name);
        $lendCustomerName.validatebox('readonly', true);
        $lendCustomerName.validatebox('enableValidation').validatebox('validate');


        var $lendCustomerMobile = $('#lendCustomer_mobile');
        $lendCustomerMobile.val(mobile);
        $lendCustomerMobile.validatebox('readonly', true);
        $lendCustomerMobile.validatebox('enableValidation').validatebox('validate');

    }

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
        if (productRequest === 'BUSINESS2.0_GORGEOUS' ||
            productRequest === 'BUSINESS2.0_FAMILY' ||
            productRequest === 'BUSINESS2.0_HAPPY' ||
            productRequest === 'BUSINESS2.0_ROOM') {
            result = $('#manageForm').form('validate');
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

    $addRequestFormTab.tabs({
       border: false,
       onSelect: function (title, index) {
           changeTab(tabIndex,index);
       }
    });
    /**
     * tab 之间跳转触发事件
     * @param sourceIndex
     * @param index
     */
    function changeTab(sourceIndex,index) {
        if (sourceIndex === 3 && index !== 3) {
            try {
                var temp = [];
                for (var i = 0; i <= 3; i++) {
                    temp.push($('#lendCustomer_contacts' + i + '_subMobile').val());
                }
                var uniqueArr = [];
                $.each(temp, function(i, el){
                    if($.inArray(el, uniqueArr) === -1) {
                        uniqueArr.push(el);
                    }
                });
                if (temp.length !== uniqueArr.length && temp.indexOf("") === -1){
                    $('#addRequestFormTab').tabs("select", sourceIndex);
                    $.messager.alert('提示消息','联系人信息手机号重复','warning');
                    return;
                }
            }catch (e){
                return;
            }
        }
        var beforeTab = $addRequestFormTab.tabs('getTab',sourceIndex);
        var validate = beforeTab.form('validate');
        if (canJumpTabs.indexOf(index) !== -1) {
            $addRequestFormTab.tabs("select", index);
            return;
        }

        
        if (!validate && index !== sourceIndex) {
            $.messager.alert('提示消息','在当前表单还有未填项，请填完后再切换','warning');
            // 通过下标去获取
            $addRequestFormTab.tabs("select", sourceIndex);
        } else {
        	canJumpTabs.push(tabIndex);
            tabIndex = index;	
        }
    }

    $('#saveAll').linkbutton({
        onClick: function () {
            var isValid = checkFormValid();
            if (!isValid) {
                $.messager.alert('提示信息', '请将所有必填项填写完毕后再保存');
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
            result['status'] = "DRAFT";
            result['lendCustomer.contacts[2].relationShip'] = 'COLLEAGUE';
            // 组装学历信息
            var degreeType = $('#lendCustomer_lendDegree_Certificate_degreeType').combobox('getValue');
            if (degreeType && degreeType !== 'MAINLAN_DHIGHEST_ACADEMIC') {
                result['lendCustomer.lendDegreeCertificate.degreeNumber'] = $('#lendCustomer_lendDegreeCertificate_degreeNumber1').val() + '-' + $('#lendCustomer_lendDegreeCertificate_degreeNumber2').val() + '-' + $('#lendCustomer_lendDegreeCertificate_degreeNumber3').val();
            }
            result['lendCustomer.occupationInfo.industryType'] = $('#lendCustomer_occupationInfo_industryType').combobox('getValues').join(';');
            // 联系人信息关系类型。
            result['lendCustomer.contacts[0].relationshipType'] = 'LINEAL_RELATIVES';
            result['lendCustomer.contacts[1].relationshipType'] = 'LINEAL_RELATIVES';
            result['lendCustomer.contacts[2].relationshipType'] = 'WORK_CERTIFICATE';
            result['lendCustomer.contacts[3].relationshipType'] = 'OTHER_CONTACTS';

            if ($('#lendCustomer_companyInfoOfCustomer_registrationCapital').numberbox('getValue')) {
                result['lendCustomer.companyInfoOfCustomer.registrationCapital'] = $('#lendCustomer_companyInfoOfCustomer_registrationCapital').numberbox('getValue') * 10000;
            }
            $('#saveAll').hide();
            $.messager.progress();
            $.ajax({
                url: basePath + "/lendRequest/addNewRequest",
                type: "post",
                data: result,
                success: function (data) {
                    $.messager.progress('close');
                    if (data.code === '200') {
                        $.messager.alert('提示消息', data.result, 'info', function () {
                            var tab = parent.$("#tabs").tabs("getTab", "新增进件");
                            if (tab) {
                                var url = $(tab.panel('options').content).attr('src');
                                parent.$('#tabs').tabs('update', {
                                    tab: tab,
                                    options: {
                                        src: url
                                    }
                                });
                            }
                            // 关闭 tab
                            parent.$("#tabs").tabs("close", "申请表录入");
                        });
                    } else if (data.code === '400') {
                        $.messager.alert('提示消息', data.message, 'error');
                        $('#saveAll').show();
                    } else {
                        $.messager.alert('提示消息', data.result, 'error', function () {
                            // 关闭 tab
                            parent.$("#tabs").tabs("close", "申请表录入");
                            // reload
                            $('#lendRequestTable').datagrid("reload");
                        });
                    }
                },error:function () {
                    $.messager.alert('提示消息', '系统错误，请联系管理员', 'error', function () {
                        // 关闭 tab
                        parent.$("#tabs").tabs("close", "申请表录入");
                        // reload
                        $('#lendRequestTable').datagrid("reload");
                    });
                }
            });
        }
    });

    //与共有人关系
    $('#lendCustomer_lendHouseProperty_property_people').combobox({
        onSelect: function (newValue) {
            if (newValue.value === 'SHARE') { // 共有
                $('#relationshipForShareDiv').show();
                $('#messageOfPropertyPeopleDiv').hide();
                $('#relationshipForShare').combobox({required: true});
                $('#messageOfPropertyPeople').val('');
                $('#messageOfPropertyPeople').validatebox({required: false});
            } else if (newValue.value === 'OTHER') { // 其他
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
    });

    $('#lendCustomer_lendCarPropertyType').combobox({
        onChange: function (data) {
            if (data === 'HAVE_CAR_AND_LOAN_WITHOUT' || data === 'HAVE_CAR_AND_LOAN') { // 如果是有车有贷款或者是有车无贷款
                $('#carDiv').show();
            } else {
                $('#carDiv').hide();
                $('#lendCustomer_carNum').val('');
                $('#lendCustomer_isCarMortgage').combobox('setValue', '');
            }
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

    $('#product_request').combobox({
        onSelect:function(){
            $('#loanPurposeFirst')[0].style.display="none";
            $('#loanPurposeSecond')[0].style.display="none";
            $('#loanPurpose').validatebox({required:false});
            var productValue = $('#product_request').combobox('getValue');
            // 房薪贷的房产信息必填，如果不是房薪贷，下拉框默认状态为初始状态
            var $isHouse = $('#isHouse');
            // 跟房子相关的，房产证必填
            var houseVal = $isHouse.combobox("getData");
            if(productValue === 'BUSINESS2.0_FAMILY' || productValue === 'BUSINESS2.0_ROOM' || productValue === 'SALARY2.0_ROOM' ) {
                $isHouse.combobox('setValue', houseVal[0].value);
                $isHouse.combobox('setText', houseVal[0].text);
                $isHouse.combobox('readonly', true);
            } else if (productValue === 'SALARY2.0_HOUSE') { // 如果是房薪贷，是否提供房产证默认选是，可以修改。
                $isHouse.combobox('setValue', houseVal[0].value);
                $isHouse.combobox('setText', houseVal[0].text);
                $isHouse.combobox('readonly', false);
            } else {
                $isHouse.combobox('setValue', houseVal[1].value);
                $isHouse.combobox('setText', houseVal[1].text);
                $isHouse.combobox('readonly', false);
            }


            // 家盈贷，申请人的配偶姓名必填
            if (productValue === 'BUSINESS2.0_FAMILY') {
                $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouse').validatebox({required: true});
                $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouseIdno').validatebox({required: true});
            } else {
                $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouse').validatebox({required: false});
                $('#lendCustomer_lendHouseholdRegister_householdRegisterSpouseIdno').validatebox({required: false});
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
            // 职业信息的约束
            // 盈贷的约束
            var $enterCompany = $('#enterCompany');
            var $workYears = $('#workYears');
            var $department = $('#department');
            var $jobTitleType = $('#jobTitleType');
            var $companyType = $('#companyType');
            var $lendCustomerOccupationInfoSalaryGetForm = $('#lendCustomer_occupationInfo_salaryGetForm');
            var $lendCustomerLendSoFundType = $('#lendCustomer_lendSoFundType');
            var $lendCustomerIsProvideWageCard = $('#lendCustomer_isProvideWageCard');
            if(productValue.indexOf('BUSINESS') !== -1) {
                $addRequestFormTab.tabs('enableTab',9);
                $('#loanPurposeType').combobox({url: basePath + '/dictionary/option/34'});
                //  隐藏
                $('#lendCustomer_isProvideWageCard_first')[0].style.display="none";
                $('#lendCustomer_isProvideWageCard_second')[0].style.display="none";
                $('#profession_first')[0].style.display="none";
                $('#profession_second')[0].style.display="none";
                // 将上层的 div 打开，之前关闭的原因是美观。lendCustomer_occupationInfo_lendTurnOverType_first
                $('#occupation_detail')[0].style.display="";
                $('#lendCustomer_occupationInfo_lendTurnOverType_first')[0].style.display="";
                $('#lendCustomer_occupationInfo_lendTurnOverType_second')[0].style.display="";
                $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display="none";
                $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display="none";
                $('#lendCustomer_lendSoFundType_first')[0].style.display="none";
                $('#lendCustomer_lendSoFundType_second')[0].style.display="none";

                // 将【提供工资卡流水】设置为必填，其他设置为选填，并且将内容置空
                $('#lendCustomer_occupationInfo_lendTurnOverType').combobox({required: true});
                $lendCustomerOccupationInfoSalaryGetForm.combobox({required: false});
                $lendCustomerLendSoFundType.combobox({required: false});
                $lendCustomerIsProvideWageCard.combobox({required: false});
                $lendCustomerIsProvideWageCard.val('');
                // 置空
                $lendCustomerOccupationInfoSalaryGetForm.val('');
                $lendCustomerLendSoFundType.val('');

                // 将这几项内容置空
                $enterCompany.val('');
                $workYears.val('');
                $department.val('');
                $jobTitleType.val('');
                $companyType.val('');

                $enterCompany.datebox({required:false});
                $workYears.numberbox({required:false});
                $department.validatebox({required:false});
                $jobTitleType.combobox({required:false});
                $companyType.combobox({required:false});
            }else if (productValue.indexOf('SALARY') !== -1) {
                $addRequestFormTab.tabs('disableTab',9);
                $('#lendCustomer_occupationInfo_lendTurnOverType_first')[0].style.display="none";
                $('#lendCustomer_occupationInfo_lendTurnOverType_second')[0].style.display="none";
                $('#lendCustomer_occupationInfo_lendTurnOverType').combobox({required: false});
                $('#manageForm').form('clear');

                $('#loanPurposeType').combobox({url: basePath + '/dictionary/option/5'});
                // 薪贷的约束
                //  显示
                $('#profession_first')[0].style.display="";
                $('#profession_second')[0].style.display="";
                // 必填
                $enterCompany.datebox({required:true});
                $workYears.numberbox({required:true});
                $department.validatebox({required:true});
                $jobTitleType.combobox({required:true});
                $companyType.combobox({required:true});
            }

            // 不同的薪贷对应的职业信息工资部分不相同。
            //、选择乐薪贷和才薪贷时，仅提示工资发放形式。安薪贷，提供工资卡流水（默认为是），显示工资发放形式。悦薪贷，提供公司卡流水（可选择）、工资发放形式、提供社保\公积金明细
            // 才薪贷【仅提示工资发放形式】
            if (productValue === 'SALARY2.0_HAPPY' || productValue === 'SALARY2.0_TALENT' || productValue === 'SALARY2.0_HOUSE' || productValue === 'SALARY2.0_SAFETY' || productValue === 'SALARY2.0_ROOM') {
                $('#occupation_detail')[0].style.display="";
                $('#lendCustomer_isProvideWageCard_first')[0].style.display="none";
                $('#lendCustomer_isProvideWageCard_second')[0].style.display="none";
                $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display="";
                $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display="";
                $('#lendCustomer_lendSoFundType_first')[0].style.display="none";
                $('#lendCustomer_lendSoFundType_second')[0].style.display="none";
                $lendCustomerOccupationInfoSalaryGetForm.combobox({required: true});
                $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', false);

                // 将【提供工资卡流水】设置为必填，其他设置为选填，并且将内容置空
                $lendCustomerIsProvideWageCard.combobox({required: false});
                $lendCustomerLendSoFundType.combobox({required: false});
                $lendCustomerIsProvideWageCard.combobox('readonly', false);
                // 置空
                $lendCustomerIsProvideWageCard.val('');
                $lendCustomerLendSoFundType.val('');
                $lendCustomerOccupationInfoSalaryGetForm.val('');
            } else if(productValue === 'SALARY2.0_SECURITY' || productValue === 'SALARY2.0_WISDOM') {
                // 如果慧薪贷，提供工资卡流水默认为是，工资发放形式为【由公司汇入个人银行卡】
                $('#occupation_detail')[0].style.display = "";
                $('#lendCustomer_isProvideWageCard_first')[0].style.display = "";
                $('#lendCustomer_isProvideWageCard_second')[0].style.display = "";
                $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display = "";
                $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display = "";
                
                $('#lendCustomer_lendSoFundType_first')[0].style.display="none";
                $('#lendCustomer_lendSoFundType_second')[0].style.display="none";

                $lendCustomerIsProvideWageCard.combobox({required: true});
                $lendCustomerOccupationInfoSalaryGetForm.combobox({required: true});

                var val = $lendCustomerOccupationInfoSalaryGetForm.combobox("getData");
                $lendCustomerOccupationInfoSalaryGetForm.combobox('setValue', val[0].value);
                $lendCustomerOccupationInfoSalaryGetForm.combobox('setText', val[0].text);
                $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', true);

                var val = $lendCustomerIsProvideWageCard.combobox("getData");
                $lendCustomerIsProvideWageCard.combobox('setValue', val[0].value);
                $lendCustomerIsProvideWageCard.combobox('setText', val[0].text);
                $lendCustomerIsProvideWageCard.combobox('readonly', true);

                $lendCustomerLendSoFundType.combobox({required: false});
                $lendCustomerLendSoFundType.val('');
            } else if (productValue === "SALARY2.0_DELIGHT") {
                $lendCustomerIsProvideWageCard.combobox({required: true});
                $lendCustomerOccupationInfoSalaryGetForm.combobox({required: true});
                $lendCustomerLendSoFundType.combobox({required: true});
                $lendCustomerIsProvideWageCard.combobox('readonly', false);

                $lendCustomerOccupationInfoSalaryGetForm.combobox('readonly', false);
                $lendCustomerIsProvideWageCard.combobox('setValue', '');
                $lendCustomerIsProvideWageCard.combobox('setText', '');
                $lendCustomerLendSoFundType.val('');
                $lendCustomerOccupationInfoSalaryGetForm.val('');

                //悦薪贷，提供公司卡流水（可选择）、工资发放形式、提供社保\公积金明细
                $('#occupation_detail')[0].style.display="";
                $('#lendCustomer_isProvideWageCard_first')[0].style.display="";
                $('#lendCustomer_isProvideWageCard_second')[0].style.display="";
                $('#lendCustomer_occupationInfo_salaryGetForm_first')[0].style.display="";
                $('#lendCustomer_occupationInfo_salaryGetForm_second')[0].style.display="";
                $('#lendCustomer_lendSoFundType_first')[0].style.display="";
                $('#lendCustomer_lendSoFundType_second')[0].style.display="";
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
    });

    // 现单位职位
    $('#jobTitleType').combobox({
        onChange:function (data) {
            var productValue = $('#product_request').combobox('getValue');
            // 如果是精英贷并且是创作类自由职业者
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
    });
    $('#lendCustomer_occupationInfo_lendTurnOverType').combobox({
        onChange: function (data) {
            var productValue = $('#product_request').combobox('getValue');

            var $lendCustomerOccupationInfoTurnOverBankNameOne = $('#lendCustomer_occupationInfo_turnOverBankNameOne');
            var $lendCustomerOccupationInfoTurnOverBankNameTwo = $('#lendCustomer_occupationInfo_turnOverBankNameTwo');
            // 如果是优盈贷，并且选择个人流水时，新增两个银行名称输入框。
            if (data === 'PERSONAL_TURNOVER' && productValue === 'BUSINESS2.0_EXCELLENT') {
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
    });

    $('#is_lendHouseholdRegister').combobox({
        onChange:function(){
            var houseValue = $('#is_lendHouseholdRegister').combobox('getValue');
            if(houseValue === 'true') {
                $('#addRequestFormTab').tabs('enableTab',6);
            } else {
                $('#addRequestFormTab').tabs('disableTab',6);
                $('#hukouForm').form('clear');
            }
        }
    });
    $('#lendCustomer_lendHousePropertyType').combobox({
        onChange: function (newValue) {
            var productValue = $('#product_request').combobox('getValue');
            if (productValue === 'BUSINESS2.0_ROOM' || productValue === 'SALARY2.0_ROOM' || productValue === 'SALARY2.0_HOUSE') {
                if (newValue === 'HAVE_HOUSE_AND_LOAN') {
                    $('#lendCustomer_repayMonthlyOfHousingLoans').numberbox({required: true});
                } else {
                    $('#lendCustomer_repayMonthlyOfHousingLoans').numberbox({required: false});
                }
            }
        }
    });
    // start
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
            }
        }
    });
// 现单位性质
    $('#companyType').combobox({
        onChange:function(){
            var companyType = $('#companyType').combobox('getValue');
            if(companyType === 'OTHER_COMPANY') {
                $('#lendCustomer_occupationInfo_messageOfCompanyType_first')[0].style.display="";
                $('#lendCustomer_occupationInfo_messageOfCompanyType_second')[0].style.display="";
                $('#lendCustomer_occupationInfo_messageOfCompanyType').validatebox({required:true});
            } else {
                $('#lendCustomer_occupationInfo_messageOfCompanyType_first')[0].style.display="none";
                $('#lendCustomer_occupationInfo_messageOfCompanyType_second')[0].style.display="none";
                $('#lendCustomer_occupationInfo_messageOfCompanyType').validatebox({required:false});
                $('#lendCustomer_occupationInfo_messageOfCompanyType').val('');
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
            }
        }
    });
    // 如何了解到凡普下拉框效果
    $('#resourceType_id').combobox({
        onChange:function(){
            var resourceType = $('#resourceType_id').combobox('getValue');
            // 选择其他
            if(resourceType === 'OTHERS') {
                $('#messageOfResourceType_first').html('请说明');
                $('#messageOfResourceType_second')[0].style.display="";
                $('#messageOfResourceType_first')[0].style.display="";
                $('#messageOfResourceType_id').validatebox({required:true});
            } else if (resourceType === 'PEER_RECOMMENDATION'){
                // 选择同业推荐
                $('#messageOfResourceType_second')[0].style.display="";
                $('#messageOfResourceType_first')[0].style.display="";
                $('#messageOfResourceType_first').html('同业名称');
                $('#messageOfResourceType_id').validatebox({required:true});
            } else if (resourceType === 'INTERMEDIATY_RECOMMENDATION') {
                // 选择中介推荐
                $('#messageOfResourceType_second')[0].style.display="";
                $('#messageOfResourceType_first')[0].style.display="";
                $('#messageOfResourceType_first').html('中介名称');
                $('#messageOfResourceType_id').validatebox({required:true});
            } else {
                $('#messageOfResourceType_second')[0].style.display="none";
                $('#messageOfResourceType_first')[0].style.display="none";
                $('#messageOfResourceType_first').html('');
                $('#messageOfResourceType_id').validatebox({required:false});
            }
        }
    });

    // 学历证书效果
    $('#lendCustomer_lendDegree_Certificate_degreeType').combobox({
        onChange:function(){
            var degreeType = $('#lendCustomer_lendDegree_Certificate_degreeType').combobox('getValue');
            // 国内大陆最高学历证书编号
            if(degreeType === 'MAINLAN_DHIGHEST_ACADEMIC') {
                $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1').validatebox({required:true});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2').validatebox({required:true});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber1').validatebox({required:false});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber2').validatebox({required:false});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber3').validatebox({required:false});

                $('#lendDegreeCertificate_degreeNumber_first')[0].style.display="";
                $('#lendDegreeCertificate_degreeNumber_second')[0].style.display="";
                $('#lendDegreeCertificate_degreeNumber_third')[0].style.display="";
                $('#lendDegreeCertificate_degreeNumber_forth')[0].style.display="";
                $('#lendDegreeCertificate_degreeNumber_fifth')[0].style.display = "none";
                $('#lendDegreeCertificate_degreeNumber_sixth')[0].style.display = "none";
            } else {
                $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_1').validatebox({required:false});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber_main_2').validatebox({required:false});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber1').validatebox({required:true});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber2').validatebox({required:true});
                $('#lendCustomer_lendDegreeCertificate_degreeNumber3').validatebox({required:true});

                $('#lendDegreeCertificate_degreeNumber_first')[0].style.display="none";
                $('#lendDegreeCertificate_degreeNumber_second')[0].style.display="none";
                $('#lendDegreeCertificate_degreeNumber_third')[0].style.display="none";
                $('#lendDegreeCertificate_degreeNumber_forth')[0].style.display="none";
                $('#lendDegreeCertificate_degreeNumber_sixth')[0].style.display = "";
                $('#lendDegreeCertificate_degreeNumber_fifth')[0].style.display = "";
            }
        }
    });

    // end
    $('#is_lendMarriageCertificate').combobox({
        onChange:function(){
            var houseValue = $('#is_lendMarriageCertificate').combobox('getValue');
            if(houseValue === 'true') {
                $('#addRequestFormTab').tabs('enableTab',7);
            } else {
                $('#addRequestFormTab').tabs('disableTab',7);
                $('#weddingForm').form('clear');
            }
        }
    });
    $('#is_lendDegreeCertificate').combobox({
        onChange:function(){
            var houseValue = $('#is_lendDegreeCertificate').combobox('getValue');
            if(houseValue === 'true') {
                $('#addRequestFormTab').tabs('enableTab',8);
            } else {
                $('#addRequestFormTab').tabs('disableTab',8);
                $('#educationForm').form('clear');
            }
        }
    });
    //------房产，户口本，结婚证，学历证书默认选择否，在触发 onLoadSuccess 事件并且没有数据（第一次加载）的时候将值置为【否】
    $('#isHouse').combobox({
        onLoadSuccess:function(){
            var $isHouse = $('#isHouse');
            if ($isHouse.combobox('getValue') === '') {
                $isHouse.combobox('setValue', 'false');
            }
        }
    });
    $('#is_lendHouseholdRegister').combobox({
        onLoadSuccess:function(){
            var $isLendHouseholdRegister = $('#is_lendHouseholdRegister');
            if ($isLendHouseholdRegister.combobox('getValue') === '') {
                $isLendHouseholdRegister.combobox('setValue', 'false');
            }
        }
    });
    $('#is_lendMarriageCertificate').combobox({
        onLoadSuccess:function(){
            if ($('#is_lendMarriageCertificate').combobox('getValue') === '') {
                $('#is_lendMarriageCertificate').combobox('setValue', 'false');
            }
        }
    });
    $('#is_lendDegreeCertificate').combobox({
        onLoadSuccess:function(){
            if ($('#is_lendDegreeCertificate').combobox('getValue') === '') {
                $('#is_lendDegreeCertificate').combobox('setValue', 'false');
            }
        }
    });
    //------------------
    // 入职时间推断工作年限
    $('#enterCompany').datebox({
        onSelect:function(date){
            $('#workYears').numberbox('setValue',(new Date() - date)/1000/60/60/24/365);
        }
    });
    $('#isHouse').combobox({
        onChange:function(){
            var houseValue = $('#isHouse').combobox('getValue');
            if(houseValue === 'true') {
                $('#addRequestFormTab').tabs('enableTab',5);
            } else {
                $('#addRequestFormTab').tabs('disableTab',5);
                // 清除表单内容，防止先填写完表单，然后选择不提供房产证
                $('#houseForm').form('clear');
            }
        }
    });

    $('#live_house_type').combobox({
        onChange:function(){
            var liveHouseType = $('#live_house_type').combobox('getValue');
            if(liveHouseType === 'OTHER_HOUSE') {
                $('#LendCustomer_messageOfLendHouseType_div').show();
                $('#LendCustomer_messageOfLendHouseType').validatebox({required:true});
            } else {
                $('#LendCustomer_messageOfLendHouseType_div').hide();
                // 将值置空
                $('#LendCustomer_messageOfLendHouseType').validatebox({required:false});
                $('#LendCustomer_messageOfLendHouseType').val('');
            }
        }
    });

    $('#lendCustomer_house_type').combobox({
        onChange:function(){
            var liveHouseType = $('#lendCustomer_house_type').combobox('getValue');
            if(liveHouseType === 'OTHER') {
                $('#messageOfHousePropertyType_first')[0].style.display="";
                $('#messageOfHousePropertyType_second')[0].style.display="";
                $('#messageOfHousePropertyTypeId').validatebox({required:true});
            } else {
                $('#messageOfHousePropertyType_first')[0].style.display="none";
                $('#messageOfHousePropertyType_second')[0].style.display="none";
                $('#messageOfHousePropertyTypeId').validatebox({required:false});
                $('#messageOfHousePropertyTypeId').val('');
            }
        }
    });

});

// 经营信息客户身份
$('#lendCustomer_companyInfoOfCustomer_identity').combobox({
    onSelect: function (newValue) {
        if (newValue.value === 'SHAREHOLDER') { // 共有
            $('#lendCustomer_companyInfoOfCustomer_proportionOfShares_div').show();
            $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity_div').hide();
            $('#lendCustomer_companyInfoOfCustomer_proportionOfShares').numberbox({required: true});
            $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').validatebox({required: false});
            $('#lendCustomer_companyInfoOfCustomer_messageOfIdentity').val('');
        } else if (newValue.value === 'OTHER') { // 其他
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
//# sourceURL=source.addRequestForm