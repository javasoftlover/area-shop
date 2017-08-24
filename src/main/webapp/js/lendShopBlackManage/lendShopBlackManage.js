/**
 * Created by yangzq on 2017/2/27 12:03.
 */


$(function () {

    var _grid = $('#lendShopBlackManageTable'),
        _lendShopBlackManagetoolForm = $('#lendShopBlackManagetoolForm');
    /**
     * 搜索按钮
     */
    $('#lendShopBlackManagetoolbarSearchBtn').click(function () {
        var data = _lendShopBlackManagetoolForm.form('getDataObj');
        _grid.datagrid('load', data);
        _grid.datagrid('clearSelections');
    });

    /**
     * 重置
     */
    $('#lendShopBlackManagetoolbarBtn').click(function () {
        _lendShopBlackManagetoolForm.form('reset');
    });

    $('#lendShopBlackManageTable').datagrid({
        onLoadSuccess: function () {
            $('.viewShopBlackDiv').click(function () {
                var id = $(this).attr('data');
                parent.addTabs("查看黑名单" + id, "page/lendShopBlackManage/shopBlackManage.jsp?id=" + id);

            });
        }
    });

    /**
     * 初始化变量
     */
         var _grid = $('#lendShopBlackManageTable');


    /**
     * 门店黑名单添加
     */
    $('#addLendBlack').click(function () {
        parent.addTabs('添加门店黑明单', 'page/lendShopBlackManage/shopBlackManage.jsp');

    });




});


//@ sourceURL=source.lendShopBlackManage