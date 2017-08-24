/**
 * Created by DongChen on 2016/10/3.
 */

$(function(){
        $('#rejectOrGiveUpReasonMaster').combobox({
            required: true,
            url: '../../lendRequestManage/storeRejected/DS12',
            prompt: '请选择主原因',
            onSelect: function (record) {

                loadNextData(record.value,'rejectOrGiveUpReasonSub');
            }
        });


    $('#rejectOrGiveUpReasonSub').combobox({
        prompt:'请选择子原因',
        onSelect:function(record){
            loadNextData(record.value, 'rejectOrGiveUpReasonThird');
        }
    });

    function loadNextData(value,id){
        $.get('../../lendRequestManage/storeRejected/' + value, function(data){
            var $isRequired= data.length>0?true:false;
            $('#'+id).combobox({required: $isRequired});
            $('#'+id).combobox('loadData', data);
        })
    }
});
