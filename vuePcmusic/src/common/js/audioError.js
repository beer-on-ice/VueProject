export default function audioError(audio) {
	// 音频数据出错
    // 0 = NETWORK_EMPTY - 音频/视频尚未初始化
    // 1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
    // 2 = NETWORK_LOADING - 浏览器正在下载数据
    // 3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
    switch (+audio.networkState) {
    	case 0:
    		showTipBox("error","音频尚未初始化");
	    	break;
    	case 1:
    		// showTipBox("error","音频是活动的且已选取资源，但并未使用网络");
	    	break;
    	case 2:
    		showTipBox("error","浏览器正在下载数据");
	    	break;
    	case 3:
    		showTipBox("error","未找到音频来源");
	    	break;
    	default:console.warn("SWITCH ERROR");
	    	break;
    }
}
