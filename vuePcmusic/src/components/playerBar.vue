<template>
    <!-- page_playerbar 页面底部播放控制条 -->
    <div class="page_playerbar clearfix">
        <!-- 播放控制按钮组 -->
        <div class="playerbar_playbtngroup" id="playBtnGroup">
            <div class="btn prev" @click='playBtnPrev'><i class="fa fa-step-backward" aria-hidden="true"></i></div>
            <div class="btn play" @click='playBtnToggle'><i class="fa fa-play" aria-hidden="true"></i></div>
            <div class="btn next" @click='playBtnNext'><i class="fa fa-step-forward" aria-hidden="true"></i></div>
        </div>
        <!-- 进度条 -->
        <div class="playerbar_timeprogress">
            <div class="progress" id="progress_box">
                <div class="progress_cache" id="progress_cache"><!-- 缓冲条 --></div>
                <div class="progress_curbar" id="progress_bar">
                    <div class="curbar_arc" id="progress_arc"></div>
                </div>
                <div class="time start" id="audio_currentTime">00:00</div>
                <div class="time end" id="audio_duration">59:59</div>
            </div>
        </div>
        <!-- 其他控制按钮组 -->
        <div class="playerbar_others">
            <div class="volume">
                <div class="mutebtn" id="muteBtn" title="静音" @click='mute'><i class="fa fa-volume-up" aria-hidden="true"></i></div>
                <div class="progress" id="vol_progress_box">
                    <div class="progress_curbar" id="vol_progress_bar">
                        <div class="curbar_arc" id="vol_progress_arc"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import showTipBox from 'common/js/showTip'
import {formatTime,toDB} from 'common/js/formatTime'
import {roundOn,roundOff} from 'common/js/turnRound'
import dragProgress from 'common/js/dragProgress'
import {stylePlayBtn} from 'common/js/styleActive'


export default {
	created() {
		this.$root.bus.$on('playOn',function() {
			//播放按钮变化
			stylePlayBtn($('#playBtnGroup').find(".play"),"play");
		})
        // 进度条变化
        this.$root.bus.$on('updateTimeBar',function() {
            var media = $("#audio").get(0)
            var objTimeCurTime = formatTime(media.currentTime);
        	var objTimeDuration = formatTime(media.duration);
        	$('#audio_currentTime').html(objTimeCurTime.I+":"+objTimeCurTime.S);
        	$('#audio_duration').html(objTimeDuration.I+":"+objTimeDuration.S);
        	$('#progress_box div:nth-child(2)').css("width",(media.currentTime/media.duration).toFixed(4)*100+"%");
        })

	},
    mounted() {
        var media = $('#audio').get(0)
        var volume = 0.5;
        // 进度条初始化
        $('#progress_box div:nth-child(2)').css("width","0%");
        $('#vol_progress_box div:nth-child(1)').css("width","50%");
        $('#vol_progress_box div:nth-child(1) div').css("width","14px");

        //改变音乐进度条
        dragProgress({
        	progressBar:$('#progress_bar'),
        	progressArc:$('#progress_arc'),
        	progressBox:$('#progress_box'),
        	audio:$(media),
        	callback_move:function (nowdisX) {
        		// 改变播放时间
        			//计算出移动了多少秒
               	var changeVal=(media.duration * nowdisX /100).toFixed(2);
               	var objTime = formatTime(changeVal);
               	$('#audio_currentTime').html(objTime.I+":"+objTime.S);
               	return changeVal;
        	},
        	callback_up:function (changeVal) {
        		// 改变播放位置
        		media.currentTime = changeVal;
        		stylePlayBtn($('#playBtnGroup').find(".play"),"play");
        	}
        })

        // 调节音量
        dragProgress({
        	progressBar:$('#vol_progress_bar'),
        	progressArc:$('#vol_progress_arc'),
        	progressBox:$('#vol_progress_box'),
        	audio:$(media),
        	callback_move:function (nowdisX) {
        		// 更新音量
            	media.volume=(1*nowdisX/100).toFixed(2);
        		//为0则是静音
               	if (media.volume <= 0) {
               		$('#muteBtn').html('<i class="fa fa-volume-off" aria-hidden="true"></i>')
               	} else {
               		$('#muteBtn').html('<i class="fa fa-volume-up" aria-hidden="true"></i>')
               	}
               	return 0;
        	}
        });
    },
    methods: {
        // 播放按钮点击
        playBtnToggle() {
            this.$emit('playActiveSong')
        },
        playBtnPrev() {
            this.$emit('playPrevSong')
            this.$root.bus.$emit('playPrevSongs')
        },
        playBtnNext() {
            this.$emit('playNextSong')
            this.$root.bus.$emit('playNextSongs')
        },
        mute() {
            var media = $('#audio').get(0)
            if (!media.muted) {
        		media.muted = true;
        		$('#muteBtn').html('<i class="fa fa-volume-off" aria-hidden="true"></i>').attr("title","恢复音量");
        		$('#vol_progress_bar').css("display","none");
        	} else {
        		media.muted = false;
                $('#muteBtn').html('<i class="fa fa-volume-up" aria-hidden="true"></i>').attr("title","静音");
        		$('#vol_progress_bar').css("display","block");
        	}
        }
    }
}
</script>

<style lang="css">
/* ------------------------page_playerbar------------------------------- */
.page_playerbar{
    position:fixed;
    bottom:0;left:0;
    width:100%;
    height:60px;
    border-top:1px solid #dadadc;
    background-color:#f6f6f8;
    z-index:99999;
}

.playerbar_playbtngroup{
    float:left;
    width:220px;
    height:100%;
    text-align:center;
}
.playerbar_playbtngroup>.btn{
    display:inline-block;
    width:40px;
    height:40px;
    margin-left:16px;
    border-radius:50%;
    position:relative;
    top:50%;left:0;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
    background-color:#c52f30;
    color:#f7f7f7;
    cursor:pointer;
}
.playerbar_playbtngroup>.btn.play {
    width:44px;
    height:44px;
}
.playerbar_playbtngroup>.btn>.fa {
    position:relative;
    top:50%;left:0;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
    font-size:1rem;
    font-weight:lighter;
}
.playerbar_others{
    float:right;
    height:100%;
}
.playerbar_others>.volume{
    position:relative;
    top:50%;left:0;
    margin:0 15px;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
}
.playerbar_others>.volume>div{
    display:inline-block;
    margin:0 5px;
}
.playerbar_others>.volume>.mutebtn{
    cursor:pointer;
}
.playerbar_others>.volume>.mutebtn>.fa{
    font-weight:lighter;
    font-size:1rem;
    color:#656567;
}
.playerbar_others>.volume>.mutebtn:hover>.fa{
    color:#111;
}
.playerbar_others>.volume>.progress,
.playerbar_timeprogress>.progress{
    position:relative;
    top:50%;left:0;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
    width:150px;
    height:6px;
    border-radius:5px;
    background-color:#cbcfd1;
}
.volume>.progress>.progress_curbar,
.playerbar_timeprogress>.progress>.progress_curbar{
    position:absolute;
    top:0;left:0;
    width:0;
    height:6px;
    height:100%;
    border-radius:5px;
    background-color:#e73d3d;
}
.volume>.progress>.progress_curbar>.curbar_arc,
.playerbar_timeprogress>.progress>.progress_curbar>.curbar_arc{
    position:absolute;
    top:50%;left:100%;
    width:14px;
    height:14px;
    border-radius:50%;
    box-shadow:0 0 2px #bbb;
    -webkit-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
    background-color:#fff;
    cursor:pointer;
}
.volume>.progress>.progress_curbar>.curbar_arc:after,
.playerbar_timeprogress>.progress>.progress_curbar>.curbar_arc:after{
    content:"";
    position:absolute;
    top:50%;left:50%;
    -webkit-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
    width:6px;
    height:6px;
    border-radius:50%;
    background-color:#c52f30;
}
.volume>.progress>.progress_curbar>.curbar_arc:hover,
.playerbar_timeprogress>.progress>.progress_curbar>.curbar_arc:hover{
    box-shadow:0 0 5px rgba(0,0,0,0.3);
}
/* 音量小圆点的显示与隐藏 */
.volume>.progress>.progress_curbar>.curbar_arc{
    visibility:hidden;
}
.volume>.progress:hover>.progress_curbar>.curbar_arc{
    visibility:visible;
}
/* 缓冲进度条 */
.playerbar_timeprogress>.progress>.progress_cache{
    position:absolute;
    top:0;left:0;
    width:0;
    height:100%;
    background-color:#ababab;
    -webkit-transition:width ease 0.5s;
    transition:width ease 0.5s;
}
.playerbar_timeprogress{
    float:left;
    width:calc(100% - 220px - 150px - 150px);
    height:100%;
}
.playerbar_timeprogress>.progress{
    width:85%;
    margin:0 auto;
}
.playerbar_timeprogress>.progress>.time{
    position:absolute;
    top:50%;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
}
.playerbar_timeprogress>.progress>.start{
    right:101%;
}
.playerbar_timeprogress>.progress>.end{
    left:101%;
}
</style>
