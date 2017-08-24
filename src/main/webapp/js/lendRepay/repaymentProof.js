$(function () {
    var _lendRepayRecordId = $('#lendRepayRecordId').val();
    //定义文件上传组件
    var uploader = $.uploader('proofUpload', basePath+'/lendRepay/proof/upload', function (data) {
        var dataObj = $.parseJSON(data.response);
        if (dataObj.code === "200") {
            queryProof();
            $.messager.alert("成功", dataObj.message, "info");
        } else {
            $.messager.alert("失败", dataObj.message, "error");
        }
    });
    uploader.bind('BeforeUpload', function (uploader) {
        var json = {
             'lendRepayRecordId': _lendRepayRecordId
        };
        uploader.settings.multipart_params = json;
    });

    // 获取凭条信息
    queryProof();
    function queryProof(){
        $.ajax({
            url:basePath + '/lendRepay/proof/query?lendRepayRecordId='+_lendRepayRecordId,
            type:"get",
            success: function (data) {
                var sizeStr;
                if(data.fileSize){
                    var sizeValue = parseInt(data.fileSize/1024);
                    if(sizeValue<1024){
                        sizeStr = sizeValue +"KB";
                    }else{
                        sizeStr = parseInt(sizeValue/1024)+"MB";
                    }
                }
                $('#fileSizeDiv').text(sizeStr)
                $('#idDiv').text(data.id);
                $('#originalFilenameDiv').text(data.originalFilename);
                if(data.createTime){
                    $('#createTimeDiv').text($.formatDateTime(data.createTime));
                }
            }
        });
    }


    //下载
    $('#downloadBtn').click(function () {
        if($('#idDiv').text()){
            window.location.href = basePath + '/lendRepay/proof/download?lendRepayRecordId='+_lendRepayRecordId;
        } else {
            $.messager.alert("失败", "凭条不存在", "error");
        }
    });

    //删除
    $('#delBtn').click(function () {
        if($('#idDiv').text()){
            $.messager.confirm('提示信息','确定删除凭条？', function(r) {
                if(r){
                    $.ajax({
                        url: basePath + '/lendRepay/proof/del?lendRepayRecordId=' + _lendRepayRecordId,
                        type: "get",
                        success: function (data) {
                            if (data.code === "200") {
                                $('#idDiv').text("");
                                $('#originalFilenameDiv').text("");
                                $('#fileSizeDiv').text("");
                                $('#createTimeDiv').text("");
                                $.messager.alert("成功", data.message, "info");
                            } else {
                                $.messager.alert("失败", data.message, "error");
                            }
                        }
                    });
                }
            });
        } else {
            $.messager.alert("失败", "凭条不存在", "error");
        }

    });
});