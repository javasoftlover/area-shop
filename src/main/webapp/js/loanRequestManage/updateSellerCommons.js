/**
 * Created by dongChen on 2016/10/25.
 */

var $updateLendRequestData = {
    /**
     * 预览
     * @returns {boolean}
     */
    submiterEdit: function (document,row) {
        $('<div id="sumbiterEditDiv"></div>').dialog({
            title: '修改客服',
            width: 580,
            height: 'auto',
            closed: false,
            content: '<div class="main_content_table">'
            + '<div class="div_bottom">'
            + '<div class="main_content_td_graylast_small">客服:</div>'
            + '<div class="main_content_td_whitelast_small">'
            + '<input type="text" name="submiterName" id="submiterName" class="easyui-combobox" data-options="url:\'../../lendExamine/distribution/submiter/' + row.shopId + '\', required:true,prompt:\'请选择客服\'" />'
            + '</div></div>'
            + '  <div class="clear"></div></div>',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    var $submiter = $('#submiterName').combobox('getValue');
                    if (!$submiter) {
                        return false;
                    }
                    $.messager.progress();
                    var $params = {'lendRequestId': row.lendRequestId, 'submiter': $submiter};
                    $.post('../../lendRequestManage/submiter/update', $params)
                        .success(function (data) {
                            $.messager.progress('close');
                            if (data.code === '200') {
                                $.closeDialog('#sumbiterEditDiv');
                                document.datagrid('reload');
                                document.datagrid('clearSelections');
                                $.messager.alert('提示消息', "修改客服成功!", 'info');
                            } else {
                                $.messager.alert('提示信息', ' 修改客服失败,请稍后再试', 'warning');
                            }


                        });
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#sumbiterEditDiv');
                }
            }],
            onClose: function () {
                $.closeDialog('#sumbiterEditDiv');
            }
        });
    },
    sellerEdit: function (document) {
        $('<div id="sellerEditDiv"></div>').dialog({
            title: '修改销售',
            width: 680,
            height: 'auto',
            closed: false,
            href: '../../page/lendRequestManage/editSeller.html',
            modal: true,
            buttons: [{
                text: '确定',
                handler: function () {
                    $.messager.progress();
                    $('#editSellerForm').form('submit', {
                        url: '../../lendRequestManage/seller/update',
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
                                $.closeDialog('#sellerEditDiv');
                                document.datagrid('reload');
                                document.datagrid('clearSelections');
                                $.messager.alert('提示消息', "修改销售成功!", 'info');
                            }
                        },
                        onLoadError: function (data) {
                            $.messager.progress('close');
                            $.messager.alert('提示消息', "修改销售超时,亲稍后再试!", 'warning');
                        }

                    })
                }
            }, {
                text: '取消',
                handler: function () {
                    $.closeDialog('#sellerEditDiv');
                }
            }],
            onLoad: function () {
                $.includeFile('#sellerEditDiv', ['/js/lendRequestManage/editSeller.js']);
            },
            onClose: function () {
                $.closeDialog('#sellerEditDiv');
            }
        });
    }
};

