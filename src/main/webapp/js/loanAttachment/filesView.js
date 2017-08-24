$(function () {
    var $obj = $('#fileShowDiv').dialog('options');
    var $lendRequestId = $obj["queryParams"].lendRequestId;
    var $fileId = $obj["queryParams"].id;
    $('#fileViewTable').datagrid({
        url: basePath + '/lendRequestUpload/preview/compress',
        pagination: false,
        columns: [
            [
                {field: 'fileID', title: '文件编号', hidden: true, width: 40, align: 'center'},
                {field: 'fileName', title: '文件名称', width: 440, align: 'center'},
                {field: 'fileSize', title: '文件大小', width: 140, align: 'center'},
                {
                    field: 'opt',
                    title: '操作',
                    width: 140,
                    align: 'center',
                    formatter: function (fieldVal, rowData) {
                        var params = rowData.fileID + ',' + rowData.fileName;
                        var view = $.opButton('#viewFileDiv', 'viewFileDiv', '预览', params);
                        var download = $.opButton('#downloadDiv', 'downloadDiv', '下载', rowData.fileID);
                        return view + download;
                    }
                }

            ]
        ],
        onBeforeLoad: function (param) {
            param.id = $fileId;
            param.lendRequestId = $lendRequestId;
        },
        onLoadSuccess: function () {
            $('.viewFileDiv').click(function () {

                var param = $(this).attr('data').split(',');
                var fileName = param[1].toLocaleLowerCase();
                if (fileName.indexOf('.html') !== -1 || fileName.indexOf('.htm') !== -1) {
                    window.open(basePath + '/lendRequestUpload/browseAttachment/' + $lendRequestId + '/' + $fileId + '/' + param[0] + '/html',
                        '详细', 'height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                } else if (fileName.indexOf(".pdf") !== -1) {
                    window.open(basePath + '/lendRequestUpload/browseAttachment/' + $lendRequestId + '/' + $fileId + '/' + param[0] + '/pdf',
                        '详细', 'height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                } else {
                    window.open(basePath + '/lendRequestUpload/browseAttachment/' + $lendRequestId + '/' + $fileId + '/' + param[0] + '/img',
                        '详细', 'height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                }
            });


            $('.downloadDiv').click(function () {
                var id = $(this).attr('data');
                downLoad(id);
            });
        }
    });

    function downLoad(id) {
        window.location.href = basePath + '/lendRequestUpload/browseAttachment/' + $lendRequestId + '/' + $fileId + '/' + id + '/download';
    }


});

//@ sourceURL=source.aaa