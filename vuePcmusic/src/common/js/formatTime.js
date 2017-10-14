// 歌曲时间转换
export function formatTime(seconds) {
	var h=0,
		i=0,
		s=Math.floor(seconds);
		h=Math.floor(s/3600);
		i=Math.floor((s%3600)/60);
		s=s%3600%60;
	return {
		H:h=h<10?"0"+h:h,
		I:i=i<10?"0"+i:i,
		S:s=s<10?"0"+s:s
	};
};


// 时间补零操作
export function toDB(nub) {
	return nub<10 ? "0" + nub : "" + nub;
}
