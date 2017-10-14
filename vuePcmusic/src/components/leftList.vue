<template>
    <!-- page_list 页面左侧歌单 -->
	<div class="page_list">
		<div class="list_container" id="listContainer">
			<div class="list list_recommend">
				<p class="title">推荐</p>
				<div class="btngroups">
					<p class="btn find"><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;发现音乐</p>
					<p class="btn fm"><i class="fa fa-bullseye" aria-hidden="true"></i>&nbsp;&nbsp;私人FM</p>
					<p class="btn mv"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp;&nbsp;MV</p>
					<p class="btn friends"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;&nbsp;我的朋友</p>
				</div>
			</div>
			<div class="list list_me">
				<p class="title">我的音乐</p>
				<div class="btngroups">
					<p class="btn local"><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;本地音乐</p>
					<p class="btn download"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;下载管理</p>
					<p class="btn cloud"><i class="fa fa-cloud" aria-hidden="true"></i>&nbsp;&nbsp;我的音乐云盘</p>
					<p class="btn singers"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;&nbsp;我的歌手</p>
					<p class="btn me_mv"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp;&nbsp;我的MV</p>
					<p class="btn me_fm"><i class="fa fa-bullseye" aria-hidden="true"></i>&nbsp;&nbsp;我的电台</p>
				</div>
			</div>
			<div class="list list_create">
				<p class="title">创建的歌单
					<span class="title_btngroups">
						<a href="javascript:void(0);" class="btn addlist" id="addList"><i class="fa fa-plus-circle" aria-hidden="true"></i></a>
						<a href="javascript:void(0);" class="btn unfoldlist"><i class="fa fa-angle-down" aria-hidden="true"></i></a>
					</span>
				</p>
				<div class="btngroups">
					<p class="btn list_create_like active" id="list_create_like"><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;&nbsp;孤独的键</p>
					<p class="btn list_create_001"><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;我喜欢的音乐</p>
				</div>
			</div>
			<div class="list list_collect">
				<p class="title">收藏的歌单
					<span class="title_btngroups">
						<a href="javascript:void(0);" class="btn unfoldlist"><i class="fa fa-angle-down" aria-hidden="true"></i></a>
					</span>
				</p>
				<div class="btngroups">
					<p class="btn list_collect_id001"><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;爵士的大脑，后摇的身躯</p>
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
export default {
	data() {
		return {
			srcUrl:require('../common/images/temp_pic001.jpg')
		}
	},
	props: [
		'songInfo'
	],
	computed: {
		src: function() {
			if(this.songInfo.picUrl) {
				return this.songInfo.picUrl
			} else {
				return this.srcUrl
			}
		},
		songName: function() {
			if(this.songInfo.name) {
				return this.songInfo.name
			} else {
				return '-SONGNAME-'
			}
		},
		singerName: function() {
			if(this.songInfo.singer) {
				return this.songInfo.singer
			} else {
				return '-SINGER-'
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
		}
	}
}
</script>

<style lang="css" scoped>
/* ------------------------page_list------------------------------- */
.page_list {
	position:absolute;
	top:0;left:0;
	width:220px;
	height:100%;
	padding:60px 0 120px 0;
	border-right:1px solid #dadadc;
	background-color:#f5f5f7;
	box-sizing:border-box;
}
.page_list>.list_container {
	height:100%;
	overflow-y:scroll;
}
.list_container>.list {
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
