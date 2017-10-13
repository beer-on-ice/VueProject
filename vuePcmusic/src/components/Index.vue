<template>
    <div class="mianer">
        <top-nav @passData='getData'></top-nav>
        <left-list></left-list>
        <player-bar></player-bar>
        <page-main></page-main>
        <page-search :song-data='songData'></page-search>
        <song-detail></song-detail>
        <tip-box></tip-box>
        <!-- audio -->
    	<audio id="audio">您的该版本浏览器不支持AUDIO标签！！！</audio>
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

    import {styleActive} from 'common/js/styleActive'

    export default {
        data() {
            return {
                songData:{}
            }
        },
        created() {
            ///////////////////  基础的交互样式       //////////////////////
            $(function () {
            	// tab选项卡切换样式
            	styleActive([$(".R_page .tabbtns"),".label_btn"],"click","active");
            	// list切换样式
            	styleActive([$("#listContainer>.list>.btngroups"),".btn"],"click","active");
            	// tr切换样式
            	styleActive([$(".infolist"),"tr"],"click","active");
            	// 收起 | 展开 歌单列表
            	$("#listContainer>.list>.title .unfoldlist").on("click",function () {
            		var $btnGroups=$(this).parents(".list").find(".btngroups");
            		if ($btnGroups.css("display")==="block") {
            			$btnGroups.slideUp(500);
            			$(this).html('<i class="fa fa-angle-right" aria-hidden="true"></i>');
            		} else {
            			$btnGroups.slideDown(500);
            			$(this).html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
            		}
            	});
            });
        },
        methods: {
            getData(data) {
                this.songData = data
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

<style lang="css" scoped></style>
