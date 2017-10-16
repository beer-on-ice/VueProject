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
        @sendMusicDetail='getMusicDetail'></page-search>
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

    import {roundOn} from 'common/js/turnRound'
    import audioError from 'common/js/audioError'

    export default {
        data() {
            return {
                songData:{},
                src:'',
                songInfo:{}
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
                $('#infoList_search').find("tr.active")
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
