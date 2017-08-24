/**
 * Created by DongChen on 2016/10/12.
 */

$(function() {
    var $row = $('#lendRequestManageTable').datagrid('getSelections')[0];
    $('#lendRequestId').val($row.lendRequestId);
    $('#sellGroup').combobox({
        required: true,
        url: '../../lendRequestManage/sellerGroup/' + $row.shopId,
        onLoadSuccess: function () {
            $('#sellGroup').combobox('select', $row.sellGroup);
        },
        onSelect: function (record) {
            $('#seller').combobox({
                required: true,
                url: '../../lendRequest/sellers/' + record.value,
                onLoadSuccess: function () {
                    $('#seller').combobox('select', $('#sellGroup').combobox('getValue') === $row.sellGroup ? $row.seller : null);
                }
            })
        }
    })
});
