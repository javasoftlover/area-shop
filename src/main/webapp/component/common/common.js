$.extend({
    // 引入js/css文件到当前页面
    includeFile: function (id, file) {
        var url = top.location.href;
        url = url.substring(0, url.lastIndexOf("/"));
        var files = typeof file == "string" ? [file] : file;
        for (var i = 0; i < files.length; i++) {
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + url + name + "'";
            if ($(tag + "[" + link + "]").length == 0) {
                $("<" + tag + attr + link + "></" + tag + ">").insertAfter(id);
            }
        }
    },
    randomString: function (length) {
        length = length || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < length; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    // 获取路径上下文
    getContextPath: function () {
        var url = top.location.href;
        return url.substring(0, url.lastIndexOf("/"));
    },
    // 获取随机数
    getIndexTime: function () {
        return new Date().getTime();
    },
    // 关闭dialog
    closeDialog: function (dialogId) {
        $(dialogId).panel('open').panel('destroy');
        $(dialogId).parent().remove();
    },
    // 格式化时间(yyyy-MM-dd)
    formatDate: function (value) {
        return formatColDate(value);
    },
    // 格式化时间(yyyy-MM-dd hh:mm)
    formatDateTime: function (value) {
        if (value) {
            return DateUtil.format(new Date(value), "yyyy-MM-dd HH:mm");
        } else {
            return null;
        }
    },
    // 格式化时间到秒(yyyy-MM-dd HH:mm:ss)yyyy-MM-dd HH:mm:ss
    formatDateTime2Second: function (value) {
        if (value) {
            return DateUtil.format(new Date(value), "yyyy-MM-dd HH:mm:ss");
        } else {
            return null;
        }
    },
    // 格式化时间(yyyy-MM)
    formatYearMonth: function (date) {
        return DateUtil.format(date, "yyyy-MM");
    },
    // 格式化时间(yyyy-MM)
    parserYearMonth: function (date) {
        return DateUtil.parse(date, "yyyy-MM");
    },
    // 格式化金额(#,##0.00)
    formatMoney: function (value) {
        if (value) {
            return DecimalUtil.format(value);
        } else {
            return '0.00';
        }
    },
    // 格式化金额(#,##0.00)
    formatMoneyOfNumber: function (value) {
        if (typeof(value) == 'number') {
            return DecimalUtil.format(value);
        } else {
            return value;
        }
    },
    // 格式化金额(###0.00)
    formatNumber: function (value) {
        if (value) {
            return DecimalUtil.format(value, "number");
        }
    },
    //格式化文件大小
    formatFileSize: function (value) {
        if (value === undefined) {
            return 0;
        }
        var sizeValue = parseInt(value / 1024);
        if (sizeValue == 0) {
            return 0;
        } else if (sizeValue < 1024) {
            return sizeValue + "KB";
        } else {
            return parseInt(sizeValue / 1024) + "MB";
        }
    },
    // 本地分页
    pagerFilter: function (data) {
        if (typeof data.length == 'number' && typeof data.splice == 'function') {
            data = {
                total: data.length,
                rows: data
            };
        }
        var dg = $(this);
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                pager.pagination('refresh', {
                    pageNumber: pageNum,
                    pageSize: pageSize
                });
                dg.datagrid('loadData', data);
            }
        });
        if (!data.originalRows) {
            data.originalRows = (data.rows);
        }
        var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
        var end = start + parseInt(opts.pageSize);
        data.rows = (data.originalRows.slice(start, end));
        return data;
    },
    // 必输项样式
    renderCssStyle: function () {
        var objs = (document.all) ? document.all : document.getElementsByTagName("*");
        for (var i = 0, len = objs.length, obj = null, clzName = null; i < len; i++) {
            obj = objs[i];
            clzName = obj.className;
            if (!clzName) continue;
            if (clzName.indexOf("field_required") != -1) {
                var node = obj.firstChild;
                if ("*" != node.innerText) {
                    var font = document.createElement("font");
                    font.style.fontSize = 12;
                    font.style.color = "red";
                    font.innerText = "*";
                    obj.insertBefore(font, node);
                }
            }
        }
    },
    // 构建按钮
    opButton: function (buttonId, classname, title, data) {
        var text = $.trim($(buttonId).html());
        if (text) {
            var astart = "<a href='#' class='" + classname + "'  title='" + title + "' data='" + data + "' >";
            return astart + text + "</a>";
        }
        return '';
    },
    // 构建链接
    opLink: function (classname, title, data, value) {
        if (value) {
            return "<a href='#' class='" + classname + "' title='" + title + "' data='" + data + "' >" + value + "</a>";
        }
    },
    /**
     * 隐藏form表单除了datagrid的元素，查看功能使用
     */
    hideFormElements: function (formId) {
        $(formId).find(".easyui-linkbutton").remove();
        //隐藏form表单除了datagrid的元素的元素，datagrid为倒数第二个元素。
        $(formId + " >div.div_bottom").eq($(formId + " >div.div_bottom").length - 2).siblings().hide();
    }
});