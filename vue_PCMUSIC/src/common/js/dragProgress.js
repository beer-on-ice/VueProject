//	各类进度条拖拽事件
export default function dragProgress(data) {
	var progressArc = data.progressArc,
		progressBar = data.progressBar,
		progressBox = data.progressBox,
		audio = data.audio
	//获取进度条初始位置
	var progressBoxOffset = progressBox.get(0).getBoundingClientRect();
	var changeVal = 0;
	//	鼠标按下
	progressArc.on('mousedown',function(e) {
		var x = e.clientX;
		//获取拖动按钮的位置
		var arcOffset = progressArc.get(0).getBoundingClientRect();
		var arcOffsetL = arcOffset.left;
	    var disX = x - arcOffsetL;
		function moveArc(e) {
			var nowX = e.clientX;
			// 计算出移动了多少(鼠标当前位置 - 进度条距离左边框位置 - 鼠标点击初始位置/进度条可视宽)得出比例
			var nowdisX = (((nowX- progressBoxOffset.left - disX)/progressBoxOffset.width)*100).toFixed(2);
			// 过界处理
			nowdisX = nowdisX <= 0 ? 0:( nowdisX >= 100?100 : nowdisX);
			// 判断是否可以播放
	        if (!!audio.attr("src")) {
				//	进度条样式更新
		        progressBar.css("width", nowdisX + "%");
	           	// 改变系统音量同步
	           	changeVal = data.callback_move && data.callback_move( nowdisX );
	        }
		}
		function onmouseup() {
			$(document).off("mousemove",moveArc);
			$(document).off("mouseup",onmouseup);
			// 判断是否可以播放
				//转换成布尔值
			if (!!audio.attr("src")) {
	        	// 改变音乐进度同步
				data.callback_up && data.callback_up(changeVal);
	        }
		};
		// 鼠标移动
		$(document).on('mousemove',moveArc)
		// 鼠标抬起
		$(document).on('mouseup',onmouseup)
	});
};
