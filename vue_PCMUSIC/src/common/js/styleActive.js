//  给对应的添加class
export function styleActive(eles,eventType,className) {
	if (eles instanceof Array) {
		eles[0].on(eventType,eles[1],function () {
			eles[0].find(eles[1]).each(function (index,item) {
				$(item).removeClass(className);
			});
			$(this).addClass(className);
		});
	} else {
		eles.on(eventType,function () {
			eles.each(function (index,item) {
				$(item).removeClass(className);
			});
			$(this).addClass(className);
		});
	}
}

//按钮样式
export function stylePlayBtn($ele,playType) {
	var html_play='<i class="fa fa-play" aria-hidden="true"></i>';
	var html_pause='<i class="fa fa-pause" aria-hidden="true"></i>';
	$ele.html((playType==="play"?html_pause:html_play));

};
