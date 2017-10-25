<template>
    <!-- page_list 页面左侧歌单 -->
	<div class="page_list">
		<div class="list_container" id="listContainer">
			<div class="list list_recommend">
				<p class="title">推荐</p>
				<div class="btngroups">
					<p class="btn find" v-for='item,i in options.recommends' :class="{active: i === defaultOne}"><i class="fa" :class="item.ico" aria-hidden="true"></i>&nbsp;&nbsp;{{item.name}}</p>
				</div>
			</div>
			<div class="list list_me">
				<p class="title">我的音乐</p>
				<div class="btngroups">
					<p class="btn local" v-for='item in options.myLists'><i class="fa" :class='item.ico' aria-hidden="true"></i>&nbsp;&nbsp;{{item.name}}</p>
				</div>
			</div>
			<div class="list list_create">
				<p class="title">创建的歌单
					<span class="title_btngroups">
						<a href="javascript:void(0);" class="btn addlist" id="addList"><i class="fa fa-plus-circle" aria-hidden="true"></i></a>
						<a href="javascript:void(0);" class="btn unfoldlist" @click='toggleList'><i class="fa fa-angle-down" aria-hidden="true"></i></a>
					</span>
				</p>
				<div class="btngroups">
					<p class="btn list_create_001" v-for='item,i in userSongList' @click='sendListDetail(item)' ><i class="fa fa-music" aria-hidden="true" :class='{"fa-heart-o": i === defaultOne}'></i>&nbsp;&nbsp;{{item.name}}</p>
				</div>
			</div>
			<div class="list list_collect">
				<p class="title">收藏的歌单
					<span class="title_btngroups">
						<a href="javascript:void(0);" class="btn unfoldlist"  @click='toggleList'><i class="fa fa-angle-down" aria-hidden="true"></i></a>
					</span>
				</p>
				<div class="btngroups">
					<p class="btn list_collect_id001" v-for='item in saveSongList' @click='sendListDetail(item)'><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;{{item.name}}</p>
				</div>
			</div>
		</div>
		<!-- 全屏小窗 -->
		<div class="playlist_smallwindow clearfix">
			<div class="poster" id="btnExpandPlayBox" @click='expandDetail'>
				<img :src="src" alt="" id="smallwindow_albumPic" />
				<div class="poster_hoverback"><i class="fa fa-expand" aria-hidden="true"></i></div>
			</div>
			<div class="info">
				<p class="songname" id="smallwindow_songName">{{songName}} </p>
				<p class="singername" id="smallwindow_singerName">{{singerName}}</p>
			</div>
			<div class="btngroups">
				<div class="btn collect"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
				<div class="btn share"><i class="fa fa-share-square-o" aria-hidden="true"></i></div>
			</div>
		</div>
	</div>
</template>

<script>
import {styleActive} from 'common/js/styleActive'
import http from '../utils/http'
import api from '../utils/api'

export default {
	data() {
		return {
			defaultOne: 0,
			srcUrl:require('../common/images/temp_pic001.jpg'),
			songS:'-SONGNAME-',
			singerS: '-SINGER-',
			canChange: false,
			userSongList: [],
			saveSongList:[],
			options: {
				recommends:[
					{
						ico: 'fa-music',
						name: '发现音乐'
					},
					{
						ico: 'fa-bullseye',
						name: '私人FM'
					},
					{
						ico: 'fa-youtube-play',
						name: 'MV'
					},
					{
						ico: 'fa-user-plus',
						name: '我的朋友'
					}
				],
				myLists:[
					{
						ico:'fa-music',
						name: '本地音乐'
					},
					{
						ico:'fa-download',
						name: '下载管理'
					},
					{
						ico:'fa-cloud',
						name: '我的音乐云盘'
					},
					{
						ico:'fa-user-plus',
						name: '我的歌手'
					},
					{
						ico: 'fa-youtube-play',
						name: '我的MV'
					},
					{
						ico: 'fa-bullseye',
						name: '我的电台'
					}
				]
			}
		}
	},
	props: [
		'songMess'
	],
	created() {
		///////////////////  基础的交互样式       //////////////////////
		$(function () {
			// tab选项卡切换样式
			styleActive([$(".R_page .tabbtns"),".label_btn"],"click","active");
			// list切换样式
			styleActive([$("#listContainer>.list>.btngroups"),".btn"],"click","active");
			// tr切换样式
			styleActive([$(".infolist"),"tr"],"click","active");
		})
		let that = this
		this.$root.bus.$on('userMess',function(data) {
			that.fetchData(data.userid) // 获取用户歌单
		})

	},
	mounted() {

		let that = this
		this.$root.bus.$on('btnPlayMusic',function() {
			that.canChange = true
		})
		this.$root.bus.$on('playOn',function() {
			that.canChange = true
		})
		this.$root.bus.$on('songPlaystatus',function(data) {
			that.canChange = true
			that.songMess.singer = data.singer
			that.songMess.albumUrl = data.albumUrl
			that.songMess.name = data.name
		})
	},
	computed: {
		src: function() {
			if(this.canChange) {
				return this.songMess.albumUrl
			} else {
				return this.srcUrl
			}
		},
		songName: function() {
			if(this.canChange) {
				return this.songMess.name
			} else {
				return this.songS
			}
		},
		singerName: function() {
			if(this.canChange) {
				return this.songMess.singer
			} else {
				return this.singerS
			}
		}
	},
	methods: {
		expandDetail() {
			$("#pageSongDetail").css({
				"top":"60px",
				"right":0,
				"opacity":1
			});
		},
		toggleList(e) {
			// 收起 | 展开 歌单列表
			var $btnGroups = $(e.currentTarget).parents(".list").find(".btngroups");
			if ($btnGroups.css("display")==="block") {
				$btnGroups.slideUp(500);
				$(this).html('<i class="fa fa-angle-right" aria-hidden="true"></i>');
			} else {
				$btnGroups.slideDown(500);
				$(this).html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
			}
		},
		sendListDetail(data) {
			this.$root.bus.$emit('sendDetail',data)
			this.$emit('showDetail')
		},
		fetchData: async function(id) {
			let params = {uid: id}
			const res = await http.get(api.userList, params)
			if (res && res.data.code === 200) {
				for(var i=0;i<res.data.playlist.length;i++) {
					if(res.data.playlist[i].creator.userId === id) {
						this.userSongList.push(res.data.playlist[i])
					} else {
						this.saveSongList.push(res.data.playlist[i])
					}
				}

			}
		}
	}
}
</script>

<style lang="css">
/* ------------------------page_list------------------------------- */
.page_list {
	position:fixed;
	top:0;left:0;
	width:220px;
	height:100%;
	padding:60px 0 120px 0;
	border-right:1px solid #dadadc;
	background-color:#f5f5f7;
	box-sizing:border-box;
	z-index:9999;
}
.page_list>.list_container {
	height:100%;
	overflow-y:scroll;
}
.list_container>.list {
	width:100%;
	margin-bottom:10px;
}
.list>.title {
	padding-left:10px;
	line-height:2rem;
	color:#8a8a8c;
	position:relative;
}
.list>.title>.title_btngroups {
	position:absolute;
	top:50%;right:15px;
	-webkit-transform:translate(0,-50%);
	transform:translate(0,-50%);
}
.list>.title>.title_btngroups>.btn {
	margin:0 3px;

}
.list>.title>.title_btngroups>.btn>.fa {
	font-size:0.8rem;
}
.list>.btngroups>.btn {
	padding-left:20px;
	line-height:2rem;
	border-left:3px solid transparent;
	color:#656567;
	cursor:pointer;
	text-overflow:ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.list>.btngroups>.btn:hover {
	color:#111;
}
.list>.btngroups>.btn.active {
	border-color:#c52f30;
	background-color:#e3e3e5;
	color:#111;
}
.page_list>.playlist_smallwindow {
	position:absolute;
	bottom:60px;left:0;
	width:220px;
	height:60px;
	border:1px solid #dadadc;
	border-left:none;
	box-sizing:border-box;
	background-color:#f6f6f8;
	z-index:6;
}
.playlist_smallwindow>.poster {
	float:left;
	width:30%;
	height:100%;
	position:relative;
	overflow:hidden;
}
.poster>img {
	width:100%;
	height:100%;
}
.poster>.poster_hoverback {
	display:none;
	position:absolute;
	top:0;left:0;
	width:100%;
	height:100%;
	background-color:rgba(0,0,0,0.5);
	color:rgba(255,255,255,0.65);
	cursor:pointer;
}
.poster>.poster_hoverback>.fa {
	position:relative;
	top:50%;left:50%;
	-webkit-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
	font-size:1.8rem;
	font-weight:lighter;
}
.poster:hover>.poster_hoverback {
	display:block;
}
.playlist_smallwindow>.info {
	float:left;
	width:55%;
}
.playlist_smallwindow>.info>p {
	margin:5px 10px;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
	cursor:pointer;
}
.playlist_smallwindow>.btngroups {
	position:absolute;
	top:0;right:15px;
	height:100%;
}
.playlist_smallwindow>.btngroups>.btn {
	height:50%;
	text-align:center;
	cursor:pointer;
}
.playlist_smallwindow>.btngroups>.btn>.fa {
	position:relative;
	top:50%;left:0;
	-webkit-transform:translate(0,-50%);
	transform:translate(0,-50%);
	font-size:0.8rem;
}

</style>
