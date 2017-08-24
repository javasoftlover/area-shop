$(function () {
    //Enter搜索
    var $lendRequestSearchForm = $('#lendRequestSearchForm');
    $lendRequestSearchForm.keypress(function(e){
        var keyNumber = e.which;
        if(keyNumber === 13){ //按下“Enter”键
            var $requestManageSearchBtn = $('#requestManageSearchBtn');
            $requestManageSearchBtn.focus();
            $requestManageSearchBtn.click();
        }
    });

    var _grid = $('#lendRequestTable');

    /**
     * 搜索按钮
     */
    $('#requestManageSearchBtn').click(function () {
        var data = $lendRequestSearchForm.form('getDataObj');
        _grid.datagrid('load', data);
        _grid.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#requestManageClearBtn').click(function () {
        $lendRequestSearchForm.form('reset');
        $('#status').combobox('clear');
    });

    $('#inputSelect').click(function () {
        var $rows = $('#lendRequestTable').datagrid('getSelections');
        if (filter($rows)) {
            parent.addTabs("查看进件" + $rows[0].lendRequestId, "page/newInput/inputUpdate/inputUpdate.jsp?id=" + $rows[0].lendRequestId + '&view=true');
        }
    });

    $('#attachmentUpload').click(function () {
        var $rows = $('#lendRequestTable').datagrid('getSelections');
        if (filter($rows)) {
            var _rows = _grid.datagrid('getSelections');
            parent.addTabs('附件管理' + _rows[0].lendRequestId, 'page/lendAttachment/LendAttachmentManager.jsp?lendRequestId='
                + _rows[0].lendRequestId + '&customName=' + _rows[0].customerName + '&productCode=' + _rows[0].productCode + "&lendSoFundType=" + _rows[0].lendSoFundType + "&view=true");
        }
    });

    $('#download').click(function () {
        var data = $lendRequestSearchForm.form('getDataObj');
        var isEmpty = $.isEmptyObject(data);
        if (isEmpty) {
            $.messager.alert('提示信息', '请选择搜索条件！', 'warning');
            return;
        }

        window.open(basePath + '/requestSearch/download?'+$.param(data),"文件下载");

    });



    /**
     * 过滤条件
     * dongchen
     * @param rows
     * @returns {boolean}
     */
    function filter(rows) {
        if (rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        return true;
    }
});