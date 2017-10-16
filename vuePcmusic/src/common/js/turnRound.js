export function roundOn() {
    // 转盘动画恢复
	$('#bgDisc').css({
		"-webkit-animation-play-state":"running",
		"animation-play-state":"running"
	});
	// 磁针放下
	$('#discNeedle').addClass("play");
}

export function roundOff() {
    // 转盘动画停止
	$('#bgDisc').css({
		"-webkit-animation-play-state":"paused",
		"animation-play-state":"paused"
	});
	// 磁针抬起
	$('#discNeedle').removeClass("play");
}
