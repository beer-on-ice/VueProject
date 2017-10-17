<template>
    <div class="mianer" onselectstart="return false;">
        <top-nav @passData='getData'></top-nav>
        <left-list :song-info='songInfo'></left-list>
        <player-bar
        @playPrevSong='prevSong'
        @playNextSong='nextSong'
        @playActiveSong='activeSong'></player-bar>
        <page-main></page-main>
        <page-search
        :song-data='songData'
        @mediaOn = 'mediaPlay'
        @sendMusicDetail='getMusicDetail'
        @mediaMess='songReady'></page-search>
        <song-detail :song-info='songInfo'></song-detail>
        <tip-box></tip-box>
        <!-- audio -->
    	<audio
        id="audio"
        ref='audio'
        @canplay='ready'
        @timeupdate='update'
        @ended='end'
        >您的该版本浏览器不支持AUDIO标签！！！</audio>
    </div>
</template>

<script>
    import LeftList from './leftList'
    import TopNav from './topNav'
    import PlayerBar from './playerBar'
    import PageMain from './PageMain'
    import PageSearch from './pageSearch'
    import SongDetail from './songDetail'
    import TipBox from './TipBox'

    import {roundOn,roundOff} from 'common/js/turnRound'
    import audioError from 'common/js/audioError'
    import {stylePlayBtn} from 'common/js/styleActive'


    export default {
        data() {
            return {
                songData:{},
                src:'',
                songInfo:{},
                songMess:{}
            }
        },
        methods: {
            getData(data) {
                this.songData = data
            },
            getMusicDetail(song) {
                this.songInfo = song
            },
            // 监控音乐进度
            update() {
                this.$root.bus.$emit('updateTimeBar')
            },
            ready() {
                this.$refs.audio.play()
            },
            mediaPlay(src) {
                this.$refs.audio.src = src
                roundOn()
            },
            end() {
                // 循环播放
                this.$refs.audio.currentTime = 0
            },
            prevSong() {
                this.$refs.audio.currentTime = 0

            },
            nextSong() {
                this.$refs.audio.currentTime = 0
            },
            activeSong() {
                // 如果没有歌曲在播放，且没有选中任意歌曲，就出提示框
                if (!$('#audio').get(0).src && !$("#infoList_search").find('tr.active').length) {
                    showTipBox("info","没有播放资源，请选择曲目");
                } else {
                    // 如果有歌曲在播放，就执行暂停播放功能
                    if($('#audio').get(0).src) {
                        if (!$('#audio').get(0).paused) {
                            $('#audio').get(0).pause();
                            // play按钮样式
                            stylePlayBtn($('#playBtnGroup').find(".play"),"pause");
                            roundOff()
                        } else {
                            $('#audio').get(0).play();
                            // play按钮样式
                            stylePlayBtn($('#playBtnGroup').find(".play"),"play");
                            roundOn()
                        }
                    } else {
                        // 如果没有歌曲在播放，就执行选中的歌曲点击按钮播放
                        this.$refs.audio.src = this.songMess.url
                        stylePlayBtn($('#playBtnGroup').find(".play"),"play");
                        $("tr.active").find("td.index").html('<i class="fa fa-volume-up" aria-hidden="true"></i>').addClass("active");
                    }
                }
            },
            songReady(songMess) {
                this.songMess = songMess
            }
        },
        components: {
            LeftList,
            TopNav,
            PlayerBar,
            PageMain,
            PageSearch,
            SongDetail,
            TipBox
        }
    }
</script>

<style lang="css"></style>
