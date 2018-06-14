<template>
    <div class="mianer" onselectstart="return false;" ondragstart="return false;">
        <top-nav
            @passData='getData'
            @onLogin='on'></top-nav>
        <left-list
            :song-mess='songMess'></left-list>
        <player-bar
            @playPrevSong='prevSong'
            @playNextSong='nextSong'
            @playActiveSong='activeSong'></player-bar>
        <page-find></page-find>
        <page-main
            @listSongPlay='listPlay'
            @listPlayReady='listReady'></page-main>
        <page-search
            :song-data='songData'
            @mediaOn = 'mediaPlay'
            @mediaMess='songReady'></page-search>
        <song-detail
            :song-mess='songMess'></song-detail>
        <tip-box></tip-box>
        <login
            @offLogin="off"
            v-if="isLogin"></login>
        <!-- audio -->
    	<audio
            id="audio"
            ref='audio'
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
    import Login from './login'

    import {roundOn,roundOff} from 'common/js/turnRound'
    import playStyle from 'common/js/playStyle'
    import {stylePlayBtn} from 'common/js/styleActive'
    import showTipBox from 'common/js/showTip'

    import http from '../utils/http'
    import api from '../utils/api'

    export default {
        data() {
            return {
                songData:{},  // pageSearch 信息
                songMess:{},  // 播放的歌曲信息
                readyMess:{},  // 准备播放的歌曲信息
                src:'',
                isPlay: false, // 是否播放开关
                isLogin: false // 登录框开关
            }
        },
        methods: {
            // 登录框判断
            on() {
                this.isLogin = true
            },
            off() {
                this.isLogin = false
            },
            // 渲染search页
            getData(result) {
                this.songData = result
            },
            // search页歌曲单击信息储存到readyMess
            songReady(data) {
                this.songMess = data
            },
            // 歌单页歌曲单击信息储存到readyMess
            listReady(data) {
                this.songMess = data
            },
            // 监控音乐进度
            update() {
                this.$root.bus.$emit('updateTimeBar')
            },
            // 播放结束
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
            // 上一首按钮点击（判断是否有上一首？是否选择音乐播放？）
            prevSong() {
                let prevSong = $('td.index.active').parent().prev('tr')
                if (!this.$refs.audio.src && !$(".infolist").find('tr.active').length) {
                    showTipBox("info","没有播放资源，请选择曲目");
                } else if(!prevSong.length) {
                    roundOn()
                    this.$root.bus.$emit('playOn');
                    stylePlayBtn($('#playBtnGroup').find(".play"),"play");
                    this.$refs.audio.currentTime = 0
                } else {
                    prevSong.click()// 先点击上一首歌

                    playStyle() //给上一首歌切换样式
                    roundOn()
                    this.$root.bus.$emit('playOn');
                    this.isPlay = true
                }
            },
            // 下一首按钮点击（判断是否有下一首？是否选择音乐播放？）
            nextSong() {
                let nextSong = $('td.index.active').parent().next('tr')
                if (!this.$refs.audio.src && !$(".infolist").find('tr.active').length) {
                    showTipBox("info","没有播放资源，请选择曲目");
                } else if(!nextSong.length) {
                    showTipBox("info","已经是最后一首音乐了！")
                } else {
                    nextSong.click()// 先点击下一首歌
                    this.isPlay = true

                    playStyle() //给下一首歌切换样式
                    roundOn()
                    this.$root.bus.$emit('playOn');
                }
            },
            // 当前播放按钮点击（判断是否选择音乐播放？是否暂停/播放？）
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
                        // 如果没有歌曲在播放，就执行选中的歌曲点击按钮播放
                        this.isPlay = true
                        this.$root.bus.$emit('songPlaystatus',this.songMess)

                        playStyle()
                        roundOn()
                        this.$root.bus.$emit('playOn'); // 点击播放按钮变化
                    }
                }
            },
            // search页双击播放
            mediaPlay() {
                this.$root.bus.$emit('songPlaystatus',this.songMess)
                this.isPlay = true
                // 播放样式改变
                playStyle()
                roundOn()
                this.$root.bus.$emit('playOn'); // 点击播放按钮变化
            },
            // 歌单页双击播放
            listPlay() {
                this.$root.bus.$emit('songPlaystatus',this.songMess)
                this.isPlay = true
                // 播放样式改变
                playStyle()
                roundOn()
                this.$root.bus.$emit('playOn'); // 点击播放按钮变化
            }
        },
        watch: {
            // 监测开关变化
            isPlay: {
                handler:function(val,oldVal) {
                    if(this.isPlay) {
                        let that = this
                        // 延时，以等待信息全部获取
                        setTimeout(function() {
                            that.$refs.audio.src = that.songMess.url
                            that.$refs.audio.play()
                            that.isPlay = false
                        },2000)
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
            PageFind,
            Login
        }
    }
</script>

<style lang="css">

</style>
