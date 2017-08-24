/**
 * Created by dongChen on 2016/10/25.
 */

var $attachment = {
    /**
     * 预览
     * @returns {boolean}
     */
    preview: function () {
        var _rows = $('#lendAttachmentTable').datagrid('getSelections');
        if (_rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        var $id = _rows[0].id;
        this.previewHandle($id, _rows[0].originalFileName,_rows[0].lendRequestId);
    },
    previewHandle: function (id, fileName,lendRequestId) {
        if (!fileName) {
            $.messager.alert('提示信息', '请选择已上传文件预览！', 'warning');
            return false;
        }
        var $fileName = fileName.toLocaleLowerCase();
        //获取文件不带后缀
         var   $fileBaseName=$fileName.split(".")[0];
        //pdf html 文件类型处理
        if ($fileName.indexOf(".html") !== -1 || $fileName.indexOf(".htm") !== -1) {
            window.open(basePath+'/lendRequestUpload/browseAttachment/'+lendRequestId+'/'+id+'/' + $fileBaseName + '/html',
                '详细','height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
            //rar zip文件类型处理
        } else if ($fileName.indexOf(".pdf") !== -1) {
            window.open(basePath+'/lendRequestUpload/browseAttachment/'+lendRequestId+'/'+id+'/' + $fileBaseName + '/pdf',
                '详细','height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
        }
        else if ($fileName.indexOf(".rar") !== -1 || $fileName.indexOf(".zip") !== -1) {
            //解压
            this.decompression(id,lendRequestId);
        }
        //图片类型
        else {
            window.open(basePath+'/lendRequestUpload/browseAttachment/'+lendRequestId+'/'+id+'/' + $fileBaseName + '/img',
                '详细','height=800,width=1024,top=50,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
        }
    },
    attachmentDownLoad: function () {
        var _rows = $('#lendAttachmentTable').datagrid('getRows');
        for (var i = 0; i < _rows.length;i++) {
            if (_rows[i].originalFileName) {
                break;
            } else {
                if (i === _rows.length - 1) {
                    $.messager.alert('提示信息', '您还没有上传过文件！', 'warning');
                    return;
                }
            }
        }
        $.messager.progress();
        setTimeout(function(){$.messager.progress('close');window.location.href = '../../lendRequestUpload/batchDownload/' + $('#lendRequestId').val();},2000);

    },
    attachmentDownLoadOne: function () {
        var _rows = $('#lendAttachmentTable').datagrid('getSelections');
        if (_rows.length < 1) {
            $.messager.alert('提示信息', '请选择一条记录！', 'warning');
            return false;
        }
        if (!_rows[0].originalFileName) {
            $.messager.alert('提示信息', '请选择已上传文件下载！', 'warning');
            return false;
        }
        $.messager.progress();
        setTimeout(function(){$.messager.progress('close');  window.location.href = '../../lendRequestUpload/browseAttachment/' + _rows[0].id + '/download';},2000);
    },

    /**
     * 加压rar,zip dialog窗口
     */
    decompression: function (id,lendRequestId) {
        $('<div id="fileShowDiv"></div>').dialog({
            title: '附件预览',
            width: 600,
            height: 400,
            closed: false,
            cache: false,
            href: basePath + '/page/lendAttachment/filesView.html',
            modal: true,
            queryParams: {id: id,lendRequestId:lendRequestId},

            onLoad: function () {
                $.includeFile('#fileShowDiv', ['/js/lendAttachment/filesView.js']);
            },
            onClose: function () {
                $.closeDialog('#fileShowDiv');
            }
        });
    }
};

