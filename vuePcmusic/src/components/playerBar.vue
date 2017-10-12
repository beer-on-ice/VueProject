<template>
    <!-- page_playerbar 页面底部播放控制条 -->
    <div class="page_playerbar clearfix">
        <!-- 播放控制按钮组 -->
        <div class="playerbar_playbtngroup" id="playBtnGroup">
            <div class="btn prev"><i class="fa fa-step-backward" aria-hidden="true"></i></div>
            <div class="btn play"><i class="fa fa-play" aria-hidden="true"></i></div>
            <div class="btn next"><i class="fa fa-step-forward" aria-hidden="true"></i></div>
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
                <div class="mutebtn" id="muteBtn" title="静音"><i class="fa fa-volume-up" aria-hidden="true"></i></div>
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
export default {
}
</script>

<style lang="css" scoped>
/* ------------------------page_playerbar------------------------------- */
.page_playerbar{
    position:fixed;
    bottom:0;left:0;
    width:100%;
    height:60px;
    border-top:1px solid #dadadc;
    background-color:#f6f6f8;
    z-index:9;
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
.playerbar_playbtngroup>.btn.play{
    width:44px;
    height:44px;
}
.playerbar_playbtngroup>.btn>.fa{
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
