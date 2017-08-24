// 银行卡变更
$(function () {

    //Enter搜索
    var $bankCardChangeSearchForm = $('#bankCardChangeSearchForm');
    $bankCardChangeSearchForm.keypress(function(e){
        var keyNumber = e.which;
        if(keyNumber === 13){ //按下“Enter”键
            var $bankCardChangeSearchBtn = $('#bankCardChangeSearchBtn');
            $bankCardChangeSearchBtn.focus();
            $bankCardChangeSearchBtn.click();
        }
    });


    var _grid = $('#bankCardChangeTable'),
        _bankCardChangeForm = $bankCardChangeSearchForm;

    /**
     * 搜索按钮
     */
    $('#bankCardChangeSearchBtn').click(function () {
        var data = _bankCardChangeForm.form('getDataObj');
        _grid.datagrid('load', data);
        _grid.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#bankCardChangeClearBtn').click(function () {
        _bankCardChangeForm.form('reset');
    });

    /**
     * 修改主卡
     */
    $('#edit_master_card').linkbutton({
        onClick: function () {
            var $rows = $('#bankCardChangeTable').datagrid('getSelections');
            var row = $rows[0];
            if (fifter($rows)) {
                parent.addTabs("修改主卡" + row.lendRequestId, "page/taskManager/bankCardChange/bankCardDetail.jsp?lendRequestId=" + row.lendRequestId + "&card=main&isAdd=false");
            }
        }
    });

    /**
     * 修改副卡
     */
    $('#edit_vice_card').linkbutton({
        onClick: function () {
            var $rows = $('#bankCardChangeTable').datagrid('getSelections');
            var row = $rows[0];
            var isAdd = !row.viceBranchName && !row.viceCardNo;
            if (fifter($rows)) {
                parent.addTabs((isAdd?"添加":"修改") + "副卡" + row.lendRequestId, "page/taskManager/bankCardChange/bankCardDetail.jsp?lendRequestId=" + row.lendRequestId + "&card=vice&isAdd=" + isAdd);
            }

        }
    });

    $('#update_record').linkbutton({
        onClick: function () {
            var $rows = $('#bankCardChangeTable').datagrid('getSelections');
            var row = $rows[0];
            if (fifter($rows)) {
                $('<div id="updateRecord"></div>').dialog({
                    title: '银行卡变更记录',
                    width: 980,
                    height: 400,
                    closed: false,
                    href: basePath + '/page/taskManager/bankCardChange/updateRecord.jsp',
                    modal: true,
                    onLoad: function () {
                        $('#lendRequestId').val(row.lendRequestId);
                        $.includeFile('#updateRecord', ['/js/taskManager/bankCardChange/updateRecord.js']);
                    },
                    onClose: function () {
                        $.closeDialog('#updateRecord');
                    }
                });
            }
        }
    });

    /**
     * 过滤条件
     * dongchen
     * @param rows
     * @returns {boolean}
     */
    function fifter(rows) {
        if (rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        return true;
    }
});
//@ sourceURL=source.bankCardChange