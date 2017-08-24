
$(function () {

    $('#blackListTypeDiv').hide();
    var params = getIframeParams(window.document.location.href);
    var id = '';
    if (params.id) {
        id = params.id;
    }

    //id为''则为添加 否则为修改
    $.get(basePath + "/lendShopBlackManage/initShopBlackData?id=" + id).success(function (data) {
        var result = data.result;
        if (id) {
            $('#blackListTypeDiv').show();

            var blocklistCustomerInfo = data.result.blocklistCustomerInfo;

            var lendBlacklistSource = data.result.lendBlacklistSource;
            var blocklistInfoResultList = data.result.blocklistInfoResultList;
            var blocklistInfoResultListLength = blocklistInfoResultList.length;

            $('#blacklistTypeName').val(blocklistCustomerInfo.blacklistTypeName);
            $('#name').textbox('setValue', blocklistCustomerInfo.name);
            $('#idNo').textbox('setValue', blocklistCustomerInfo.idNo);
            $('#sourceOrg').combobox('setValue', lendBlacklistSource.sourceOrg);
            $('#sourceOrgName').textbox('setValue', lendBlacklistSource.sourceOrgName);
            $('#sourceInformation').combobox('setValue', lendBlacklistSource.sourceInformation);
            $('#sourceAddress').textbox('setValue', lendBlacklistSource.sourceAddress);
            $('#classOneTypeId').combobox('setValue', blocklistCustomerInfo.classOneType);
            $('#classTwoTypeId').combobox('setValue', blocklistCustomerInfo.classTwoType);
            $('#reason').textbox('setValue', blocklistCustomerInfo.reason);
            for (var i = 1; i < blocklistInfoResultListLength + 1; i++) {

                if (i == 1) {
                    $('#blockListKey' + i).combobox('setValue', blocklistInfoResultList[i - 1].typeName);
                    $('#blockListKeyDesc' + i).textbox('setValue', blocklistInfoResultList[i - 1].blacklistValue);
                } else {
                    addContent();
                    $('#blockListKey' + i).combobox('setValue', blocklistInfoResultList[i - 1].typeName);
                    $('#blockListKeyDesc' + i).textbox('setValue', blocklistInfoResultList[i - 1].blacklistValue);
                }
            }
            $('#blacklistTypeName').attr("readonly", true);
            $('.easyui-combobox').combobox('readonly');
            $('.easyui-textbox').textbox('readonly');
            $('.easyui-linkbutton').hide();
        }
        $('#creater').val(result.creater);
        $('#shop').val(result.shop);
        $('#area').val(result.area);
        $('#organizationCode').val(result.organizationCode);
        $('#commitPersion').val(result.commitPersion);
        $('#shopName').textbox('setValue', result.shopName);
        $('#cityName').textbox('setValue', result.cityName);
        $('#provinceName').textbox('setValue', result.provinceName);
        $('#areaName').textbox('setValue', result.areaName);
    }).fail(function () {

    });
    $('#sourceOrg').combobox({
        required: true,
        url: basePath + "/dictionary/lendProduct/52",
        prompt: '来源机构',
        onSelect: function (record) {
        }
    });

    $('#sourceInformation').combobox({
        required: true,
        url: basePath + "/dictionary/lendProduct/53",
        prompt: '资源信息',
        onSelect: function (record) {
        }
    });

    //申请类别 下拉框
    $("#classOneTypeId").combobox({
        valueField: 'id',
        textField: 'dicName',
        panelHeight: 120,
        required: true,
        url: basePath + "/lendShopBlackManage/queryBlackListClassTypeList",
        onSelect: function (data) {
            $("#classTwoTypeId").combobox("clear");

            var url = basePath + "/lendShopBlackManage/queryBlackListClassTypeListByPid/" + data.id;
            $("#classTwoTypeId").combobox({
                valueField: 'id',
                textField: 'dicName',
                panelHeight: 120,
                url: url
            });


        }
    });

    //具体明细 下拉框
    $("#blockListKey").combobox({
        valueField: 'id',
        textField: 'dicName',
        panelHeight: 80,
        required: false,
        url: basePath + "/lendShopBlackManage/queryBlackListClassKeyFieldList"
    });

    init();
    /**
     * 增加div块
     * dongchen
     */
    $('#ContentTypeAdd').click(function () {
        addContent();
        init();
    });

    function addContent() {
        var _div_bottom_length = $("input[name='blockListKey']").length;
        _div_bottom_length = _div_bottom_length + 1;
        if (_div_bottom_length === 8) {
            $.messager.alert('提示消息', '您已达到添加具体明细上限！', 'warning');
            return;
        }


        var content = '<div class="div_bottom"><div class="main_content_td_gray_small">具体明细:</div>' +
            '<div class="main_content_td_white_small"><input type="text" id="blockListKey' + _div_bottom_length + '"' + 'name="blockListKey" class="easyui-combobox"></div>' +
            '<div class="main_content_td_white_small">' +
            '<input type="text" id="blockListKeyDesc' + _div_bottom_length + '"' + 'name="blockListKeyDesc" class="easyui-textbox" data-options="required:true"></div> ' +
            '<a href="#" id="delete' + _div_bottom_length + '"' + 'class="easyui-linkbutton">删除</a></div></div>';
        var object = $(content).appendTo($('#blockList'));
        $.parser.parse(object);
    }

    /**
     * 动态初始化combobox和删除事件
     * dongchen
     */
    function init() {

        var _div_bottom_length = $("input[name='blockListKey']").length;

        $('#blockListKey' + _div_bottom_length + '').combobox({
            valueField: 'id',
            textField: 'dicName',
            panelHeight: 80,
            required: true,
            url: basePath + "/lendShopBlackManage/queryBlackListClassKeyFieldList"
        })

        $('#delete' + _div_bottom_length + '').click(function () {
            $(this).parent('div').remove();
        })
    }

    $('#saveAll').click(function () {

        if(!$('#shopBlackForm').form('validate')){
            $.messager.alert('提示信息','请将所有必填项填写完毕后再保存');
            return;
        }
        $.messager.progress();
        var $obj = $('#shopBlackForm').serializeObject();
        var blockListKey = $obj.blockListKey;

        if (!(blockListKey instanceof Array)) {
            $obj.blockListKey = [blockListKey];
            $obj.blockListKeyDesc = [$obj.blockListKeyDesc];
        }

        $.ajax({
            url: basePath + '/lendShopBlackManage/addLendShopBlack',
            data: JSON.stringify($obj),
            contentType: 'application/json;charset=utf-8',
            method: 'POST',
            success: function (data) {
                $.messager.progress('close');

                if (data.code === '200') {

                    $.messager.alert('提示消息', '添加成功', 'info', function () {
                        parent.$("#tabs").tabs("close", "添加门店黑明单");
                        $('#lendShopBlackManageTable').datagrid("reload");

                    });

                } else {
                    $.messager.alert('提示消息', data.result, 'error');
                }
            }
        });


    });


});


//@ sourceURL=source.shopBlackManage