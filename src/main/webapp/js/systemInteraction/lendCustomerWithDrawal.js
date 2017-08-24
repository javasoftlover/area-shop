/**
 * Created by dongChen on 2017/2/21.
 */
$(function () {
    var $obj = $('#customerWithdrawalDiv').dialog('options');
    var $lendRequestId = $obj["queryParams"].lendRequestId;

    var $account = $obj["queryParams"].account;
    $('#totalAmount').numberbox("setValue",$account);
});