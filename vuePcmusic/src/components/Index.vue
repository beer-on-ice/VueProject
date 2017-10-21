<template>
    <div class="mianer" onselectstart="return false;" ondragstart="return false;">
        <top-nav @passData='getData'></top-nav>
        <left-list
            :song-mess='songMess'></left-list>
        <player-bar
            @playPrevSong='prevSong'
            @playNextSong='nextSong'
            @playActiveSong='activeSong'></player-bar>
        <page-find></page-find>
        <page-main
            @listSongPlay='listPlay'
            @listReadyPlay='listReady'></page-main>
        <page-search
            :song-data='songData'
            @mediaOn = 'mediaPlay'
            @mediaMess='songReady'></page-search>
        <song-detail
            :song-mess='songMess'></song-detail>
        <tip-box></tip-box>
        <!-- audio -->
    	<audio
            id="audio"
            ref='audio'
            @canplay='ready'
            @timeupdate='update'
            @ended='end'>您的该版本浏览器不支持AUDIO标签！！！</audio>
    </div>
</template>

<script>
    import LeftList from './leftList'
    import TopNav from './topNav'
    import PlayerBar from './playerBar'
    import PageMain from './PageMain'
    import PageSearch from './pageSearch'
    import SongDetail from './songDetail'
    import PageFind from './PageFind'
    import TipBox from './TipBox'

    import {roundOn,roundOff} from 'common/js/turnRound'
    import playStyle from 'common/js/playStyle'
    import {stylePlayBtn} from 'common/js/styleActive'
    import showTipBox from 'common/js/showTip'

    import http from '../utils/http'
    import api from '../utils/api'

    export default {
        data() {
            return {
                songData:{},
                src:'',
                songMess:{},
                isPlay: false,
                readyMess:{}
            }
        },
        methods: {
            getData(data,boolean) {
                this.songData = data
            },
            songReady(data) {
                this.readyMess = data
            },
            listReady(data) {
                this.readyMess = data
            },
            // 监控音乐进度
            update() {
                this.$root.bus.$emit('updateTimeBar')
            },
            ready() {
                this.isPlay = true
                if(this.isPlay) {
                    this.$refs.audio.play()
                    this.isPlay = false
                }
            },
            end() {
                // 循环播放 this.$refs.audio.currentTime = 0
                // 下一首
                let nextSong = $('td.index.active').parent().next('tr')
                if(!nextSong.length) {
                    roundOff()
                    showTipBox("info","已经是最后一首音乐了！")
                    stylePlayBtn($('#playBtnGroup').find(".play"),"paused");
                } else {
                    nextSong.click()// 先点击下一首歌
                    playStyle() //给下一首歌切换样式
                    this.isPlay = true
                }
            },
            prevSong() {
                let prevSong = $('td.index.active').parent().prev('tr')
                if (!this.$refs.audio.src && !$(".infolist").find('tr.active').length) {
                    showTipBox("info","没有播放资源，请选择曲目");
                } else if(!prevSong.length) {
                    roundOn()
                    stylePlayBtn($('#playBtnGroup').find(".play"),"play");
                    this.$refs.audio.currentTime = 0
                } else {
                    prevSong.click()// 先点击上一首歌
                    this.songMess = this.readyMess
                    playStyle() //给上一首歌切换样式
                    roundOn()
                    this.$root.bus.$emit('playOn');
                    this.isPlay = true
                }
            },
            nextSong() {
                let nextSong = $('td.index.active').parent().next('tr')
                if (!this.$refs.audio.src && !$(".infolist").find('tr.active').length) {
                    showTipBox("info","没有播放资源，请选择曲目");
                } else if(!nextSong.length) {
                    showTipBox("info","已经是最后一首音乐了！")
                } else {
                    nextSong.click()// 先点击下一首歌
                    this.songMess = this.readyMess
                    playStyle() //给下一首歌切换样式
                    roundOn()
                    this.$root.bus.$emit('playOn');
                    this.isPlay = true
                }
            },
            activeSong() {
                // 如果没有歌曲在播放，且没有选中任意歌曲，就出提示框
                if (!this.$refs.audio.src && !$(".infolist").find('tr.active').length) {
                    showTipBox("info","没有播放资源，请选择曲目");
                } else {
                    // 如果有歌曲在播放，就执行暂停播放功能
                    if(this.$refs.audio.src) {
                        if (!this.$refs.audio.paused) {
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
                        this.songMess = this.readyMess
                        // 如果没有歌曲在播放，就执行选中的歌曲点击按钮播放
                        this.$refs.audio.src = this.songMess.url
                        this.$root.bus.$emit('btnPlayMusic')
                        stylePlayBtn($('#playBtnGroup').find(".play"),"play");
                        playStyle()
                        roundOn()
                    }
                }
            },
            mediaPlay() {
                this.songMess = this.readyMess
                this.$root.bus.$emit('songPlaystatus',this.songMess)
                this.$refs.audio.src = this.songMess.url
                roundOn()
            },
            listPlay(data) {
                this.$root.bus.$emit('songPlaystatus',data)
                this.$refs.audio.src = data.url
                stylePlayBtn($('#playBtnGroup').find(".play"),"play");
                playStyle()
                roundOn()
            }
        },
        watch: {
            readyMess: {
                handler:function(val,oldVal) {
                    if(this.isPlay) {
                        this.$refs.audio.src = val.url
                        this.isPlay = false
                    }
                },
                deep:true
            }
        },
        components: {
            LeftList,
            TopNav,
            PlayerBar,
            PageMain,
            PageSearch,
            SongDetail,
            TipBox,
            PageFind
        }
    }
</script>

<style lang="css"></style>
