$(function(){
	var params = getIframeParams(window.document.location.href);
	var _id = params.id;
	var _firstBillDate= params.firstBillDate;

	$('#detailTable').datagrid({
		fit: false,
		fitColumns:false,
		autoRowHeight:false,
		pagination:false,
		idField:'isNowPhase',
		url: basePath+'/lendRepay/queryRepayDetail/'+_id,
		method:'get',
		columns:[[
			{field:'dueDate',title:'还款日',align:'center',formatter:$.formatDate,width:92},
			{field:'amount',title:'应还本息',align:'center',formatter:$.formatMoney,width:92},
			{field:'finalPrincipal',title:'期末本金',align:'center',formatter:$.formatMoney,width:92},
			{field:'overdueDays',title:'逾期天数',align:'center'},
			{field:'shouldPenaltyFee',title:'应还违约金',align:'center',formatter:$.formatMoney},
			{field:'shouldOverdueFee',title:'应还罚息',align:'center',formatter:$.formatMoney},
			{field:'overDueAmt',title:'逾期总额',align:'center',formatter:$.formatMoney},
			{field:'period',title:'总期数',align:'center'},
			{field:'phase',title:'当前期数',align:'center'},
			{field:'status',title:'状态',align:'center',formatter: function (value, data) {
				return data.status.value;
			}}

		]],
		rowStyler:function(index,row){
			var $status=row.status;
			if( $status && $status.key === 'UNREPAID'){
				return 'color:#ff0000;';
			}else{
				return null;
			}
		},
		onSelect:function(rowIndex, rowData){

			if(rowData.status.key === "UNREPAID"){

				$.ajax({
					url:basePath+'/lendRepay/calculateInRepayAmount/'+_id+'/'+rowData.phase,
					method:'GET',
					cache:false,
					dataType : "json",
					success:function (data){
						if(data.code == '200'){
							var result = data.result;
                            $('#inRepayPhase').val(result.inRepayPhase);
                            $('#totalRepayAmount').val(DecimalUtil.format(result.totalRepayAmount));
                            $('#accountAmount').val(DecimalUtil.format(result.accountAmount));
                            $('#reduceAmount').val(DecimalUtil.format(result.reduceAmount));
                            $('#shouldRepayAmount').val(DecimalUtil.format(result.shouldRepayAmount));
                           
						}
					},
					onLoadError: function (data) {
						var $data = $.parseJSON(data.responseText);
						$.messager.alert('提示消息', $data.message, 'warning');

					}
				});
			}else{
				$.messager.alert('提示信息',"请选择未偿还记录！");
				document.getElementById("reduceAmountForm").reset();
			}

		},
		onLoadSuccess:function(data){
			$('#detailTable').datagrid('selectRecord',true);
		}

	});

	// 获取客户相关信息
	$.ajax({
		url: basePath + '/lendRepay/queryLendRequestDetail/'+ _id ,
		type: "get",
		success: function (data) {
			var lendCustomerRepayDetailVo = data.result;
			if(data.code == '200') {
				$('#customerDetailForm').form('objLoad', lendCustomerRepayDetailVo);
				$('#customerDignForm').form('objLoad', lendCustomerRepayDetailVo);
				$('#firstBillDate').val(_firstBillDate);
				$('#monthlyTotalRate').val((lendCustomerRepayDetailVo.monthlyTotalRate * 100).toFixed(2) + '%');
				$('#signedTime').val($.formatDate(lendCustomerRepayDetailVo.signedTime));
				$('#passTime').val($.formatDate(lendCustomerRepayDetailVo.passTime));
				$('#signedAmount').val(DecimalUtil.format(lendCustomerRepayDetailVo.signedAmount));
				$('#amount').val(DecimalUtil.format(lendCustomerRepayDetailVo.amount));
				$('#monthlyRepay').val(DecimalUtil.format(lendCustomerRepayDetailVo.monthlyRepay));
				$('#bankBranchName').attr("title", lendCustomerRepayDetailVo.bankBranchName)
			}

		},
		onLoadError: function (data) {
			var $data = $.parseJSON(data.responseText);
			$.messager.alert('提示消息', $data.message, 'warning');
		}
	});

});