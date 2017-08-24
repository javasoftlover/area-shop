/**
 * Created by dongChen on 2016/12/13.
 */

$(function () {
    var $obj = $('#updateMonitorDiv').dialog('options');
    var $id = $obj["queryParams"].id;
    $('#id').val($id);
    $.get(basePath + '/monitorConfig/monitorConfig/' + $id).success(function (data) {
        if (data.code === '200') {
            $('#monitorConfigForm').form('load', data.result);
            $('#enabled').combobox('setValue', data.result.enabled.toString());

        }
    })
});
