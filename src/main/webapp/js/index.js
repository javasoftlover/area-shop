$(function() {
	$('.index-navi-tab').click(function() {
		var $this = $(this);
		var url = $this.attr('src');
		var title = $this.text();
		addTabs(title, url);
	});
	var accordion_head = $('.accordion > li > a'),accordion_body = $('.accordion li > .sub-menu');
	accordion_head.first().addClass('active').next().slideDown('normal');
	accordion_head.on('click', function(event) {
		event.preventDefault();
		if ($(this).attr('class') !== 'active'){
			//accordion_body.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_head.removeClass('active');
			$(this).addClass('active');
		}
	});
});

function addTabs(title, href) {
	var tab = $('#tabs');
	if (tab.tabs('exists', title)) {
		tab.tabs('select', title);
	} else {
		tab.tabs('add', {
			title : title,
			content : '<iframe scrolling="no" frameborder="0" src="' + href + '" style="width:100%;height:100%;"></iframe>',
			closable : true
		});
	}
}

function getIframeParams(iframeSrc) {
    var regexpParam = /\??([\w\d%]+)=([\w-\d%\.]*)&?/g;
    var param = {};
    var ret;
    while((ret = regexpParam.exec(iframeSrc)) !== null) {
		param[ret[1]] = ret[2];
	}
    return param;
}