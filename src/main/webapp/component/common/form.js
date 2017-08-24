$.extend(
	$.fn.form.methods, {
		getDataObj : function(jq) {
		// 获得form中的具体数值
		var dataObj = {};
		$(jq.selector).find('input').each(function(i) {
			var inputType = $(this).attr("type");
			if (inputType != "button") {
				if ($(this).attr("name")) {
					// 判断是否为空
					if (($(this).val() != "") && ($(this).val() != " ")) {
						dataObj[$(this).attr("name")] = $(this).val();
					}
				}
			}
		});
		$(jq.selector).find('textarea').each(function(i) {
			if ($(this).attr("name")) {
				if (($(this).val() != "") && ($(this).val() != " ")) {
					dataObj[$(this).attr("name")] = $(this).val();
				}
			}
		});
		return dataObj;
	},
	// form只读和隐藏边框
	readOnlyAndNoborder : function(jq) {
		$(jq.selector).find('input').each(function(i) {
			var inputType = $(this).attr("type");
			if (inputType != "button") {
				if ($(this).attr("name")) {
					$(this).css("border", "0px");
				}
				$(this).attr("readonly", "true");
			}
		});
		$(jq.selector).find('textarea').each(function(i) {
			$(this).css("border", "0px");// 去掉边框
			$(this).attr("readonly", "true");// 只读属性
		});
		$(jq.selector).find('.easyui-textbox').each(function(i) {
			$(this).combobox('disable');
		});
		$(jq.selector).find('.easyui-numberbox').each(function(i) {
			$(this).combobox('disable');
		});
		$(jq.selector).find('.easyui-combobox').each(function(i) {
			$(this).combobox('disable');
		});
		$(jq.selector).find('.easyui-datebox').each(function(i) {
			$(this).datebox('disable');
		});
		$(jq.selector).find('.easyui-combotree').each(function(i) {
			$(this).combotree('disable');
		});
		$(jq.selector).find('input[type="radio"]').each(function(i) {
			$(this).attr("disabled", "true");// 只读属性
		});
		//隐藏上传按钮
		$(jq.selector).find('.icon-upload_loan').parents('a').hide();
	},
	// 显示边框和非readOnly;
	noReadOnlyAndborder : function(jq) {		
		$(jq.selector).find('input').each(function(i) {			
			var inputType = $(this).attr("type");
			if (inputType !== "button") {
				if ($(this).attr("name")) {					
					$(this).css("border", "#A4BED4 solid 1px");
				}
				$(this).removeAttr("readonly");
                $(this).attr("disabled", "false");
			}
		});
        $(jq.selector).find('textarea').each(function(i) {
            $(this).css("border", "#A4BED4 solid 1px");// 去掉边框
            $(this).attr("readonly", "false");// 只读属性
        });
        $(jq.selector).find('.easyui-textbox').each(function(i) {
            $(this).combobox('enable');
        });
        $(jq.selector).find('.easyui-numberbox').each(function(i) {
            $(this).combobox('enable');
        });
        $(jq.selector).find('.easyui-combobox').each(function(i) {
            $(this).combobox('enable');
        });
        $(jq.selector).find('.easyui-datebox').each(function(i) {
            $(this).datebox('enable');
        });
        $(jq.selector).find('.easyui-combotree').each(function(i) {
            $(this).combotree('enable');
        });
        $(jq.selector).find('input[type="radio"]').each(function(i) {
            $(this).attr("disabled", "false");// 只读属性
        });
	},
	// 清空form数据的事件
	clearFormData : function(jq) {
		$(jq.selector).find('input').each(function(i) {
			var inputType = $(this).attr("type");
			if (inputType != "button") {
				$(this).val('');
				if (inputType == "file") {
					$(this).after($(this).clone().val(""));
					$(this).remove();
				}
			}
		});
		$(jq.selector).find('textarea').each(function(i) {
			$(this).val('');
		});
	},
	//获取FORM所有值
	getDataJson : function(jq) {
		// 获得form中的具体数值
		var dataObj = {};
		$(jq.selector).find('input').each(function(i) {			
			var inputType = $(this).attr("type");			
			if(inputType!='button'&&inputType!='checkbox'&&inputType!='radio'){
				if ($(this).attr("name")) {
						dataObj[$(this).attr("name")] = $(this).val();
				}
			}
		});
		$(jq.selector).find('textarea').each(function(i) {
			if ($(this).attr("name")) {
					dataObj[$(this).attr("name")] = $(this).val();
			}
		});
		
		$(jq.selector).find('input[type="radio"]:checked').each(function(i) {
			var name = $(this).attr("name");
			if (name) {
				dataObj[$(this).attr("name")] =$(this).val();				 
				dataObj[$(this).attr("name")+"Name"] =$(this).next("span").html();
			}
		});
		$(jq.selector).find('input:checkbox:checked').each(function(i) {
			var name = $(this).attr("name");
			if (name) {
				dataObj[$(this).attr("name")] =$(this).val();
				dataObj[$(this).attr("name")+"Name"] =$(this).html();
			}
		});
		$(jq.selector).find('select').each(function(i) {					 
			if ($(this).attr("id")) {				
					if($(this).combobox("getValue")!=''){
						dataObj[$(this).attr("id")] = $(this).combobox("getValue");
					    dataObj[$(this).attr("id")+"Name"] =$(this).combobox("getText");
					}else{
						dataObj[$(this).attr("id")] = "";
					    dataObj[$(this).attr("id")+"Name"] ="";
					}
			}
		});
		
		return dataObj;
	},
	disableValidation : function (jq){
		$(jq.selector).find('.validatebox-text').each(function(i) {	
			var _26=$.data(this,"validatebox").options;
			_26.required=false;
			$(this).removeClass("validatebox-invalid");
			$(this).removeClass("easyui-validatebox");
			$(this).removeClass("validatebox-text");
		});
	},
	objLoad : function (jq, param) {
		return jq.each(function () {
			load(this, param);
		});
		function load(target, param) {
			if (!$.data(target, "form")) {
				$.data(target, "form", {
					options : $.extend({}, $.fn.form.defaults)
				});
			}
			var options = $.data(target, "form").options;
			if (typeof param == "string") {
				var params = {};
				if (options.onBeforeLoad.call(target, params) == false) {
					return;
				}
				$.ajax({
					url : param,
					data : params,
					dataType : "json",
					success : function (rsp) {
						loadData(rsp);
					},
					error : function () {
						options.onLoadError.apply(target, arguments);
					}
				});
			} else {
				loadData(param);
			}
			function loadData(dd) {
				var form = $(target);
				var formFields = form.find("input[name],select[name],textarea[name]");
				formFields.each(function(){
					var name = this.name;
					var value = jQuery.proxy(function(){try{return eval('this.'+name);}catch(e){return "";}},dd)();
					var rr = setNormalVal(name,value);
					if (!rr.length) {
						var f = form.find("input[numberboxName=\"" + name + "\"]");
						if (f.length) {
							f.numberbox("setValue", value);
						} else {
							$("input[name=\"" + name + "\"]", form).val(value);
							$("textarea[name=\"" + name + "\"]", form).val(value);
							$("select[name=\"" + name + "\"]", form).val(value);
						}
					}
					setPlugsVal(name,value);
				});
				options.onLoadSuccess.call(target, dd);
				$(target).form("validate");
			};
			function setNormalVal(key, val) {
				var rr = $(target).find("input[name=\"" + key + "\"][type=radio], input[name=\"" + key + "\"][type=checkbox]");
				rr._propAttr("checked", false);
				rr.each(function () {
					var f = $(this);
					if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
						f._propAttr("checked", true);
					}
				});
				return rr;
			};
			function setPlugsVal(name, val) {
				var field = $(target).find('[textboxName="'+name+'"],[sliderName="'+name+'"]');
				if (field.length){
					for(var i=0; i<options.fieldTypes.length; i++){
						var type = options.fieldTypes[i];
						var state = field.data(type);
						if (state){
							if (state.options.multiple || state.options.range){
								field[type]('setValues', val);
							} else {
								field[type]('setValue', val);
							}
							return true;
						}
					}
				}
				return false;
			};
		};
	}
});