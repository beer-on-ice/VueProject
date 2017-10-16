<template>
    <!-- page_lyric 歌曲详情页 -->
	<div class="page_songdetail" id="pageSongDetail">
		<!-- 模糊背景 -->
		<div class="g_blurbg" id="bgBlur"></div>
		<div class="maincontainer clearfix">
			<div class="compressbtn" id="btnCompressPlayBox" title="收起音乐详情页" @click='closeDetail'>
				<i class="fa fa-compress" aria-hidden="true"></i>
			</div>
			<div class="discsection">
				<div class="disc_needle" id="discNeedle"><img src="../common/images/needle.png" alt=""></div>
				<div class="disc_arc" id="bgDisc" >
					<div class="poster"><img :src="src" alt=""></div>
				</div>
				<div class="disc_btns">
					<span class="btn playall"><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;&nbsp;喜欢</span>
					<span class="btn playall"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;收藏</span>
					<span class="btn playall"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;下载</span>
					<span class="btn playall"><i class="fa fa-share-square-o" aria-hidden="true"></i>&nbsp;&nbsp;分享</span>
				</div>
			</div>
			<div class="lyricsection">
				<div class="lrcinfo" id="songDetail">
					<p class="info_song"><span class="songname">{{songName}}</span><span class="label mv">MV</span><span class="label quality">320k</span></p>
					<p class="info_album">
						<span class="album">专辑：<span class="albumname">{{albumName}}</span>
						</span>
						<span class="singer">歌手：<span class="singersname">{{singerName}}</span>
						</span>
						<span class="origin">来源：<span class="originname">孤独的键</span>
						</span>
					</p>
				</div>
				<div class="lrccontainer" id="lrcContainer">
					<div class="lrcbox" id="lrcBox">
						<!-- <p>暂无歌词</p> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			srcUrl:require('../common/images/disc-o.png')
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
		albumName: function() {
			if(this.songInfo.album) {
				return this.songInfo.album.name
			} else {
				return '--ALBUMNAME--'
			}
		},
		singerName: function() {
			if(this.songInfo.singer) {
				return this.songInfo.singer
			} else {
				return '--SINGERNAME--'
			}
		}
	},
	methods: {
		closeDetail() {
			$("#pageSongDetail").css({
				"top":"100%",
				"right":"100%",
				"opacity":0
			});
		}
	}
}
</script>

<style>
/* ------------------------page_lric------------------------------- */
.page_songdetail{
	position:fixed;
	top:100%;right:100%;
	width:100%;
	height:100%;
	background-color:#fff;
	overflow:auto;
	-webkit-transition:all 0.5s ease;
	transition:all 0.5s ease;
	z-index:8;
}
.page_songdetail>.maincontainer{
	width:1000px;
	margin:50px auto;
	position:relative;
}
.page_songdetail>.maincontainer>.compressbtn{
	position:absolute;
	top:0;left:101%;
	padding:5px 10px;
	border:1px solid #dee2e3;
	border-radius:5px;
	font-size:1rem;
	background-color:#f8f9fb;
	cursor:pointer;
}
.page_songdetail>.maincontainer>.compressbtn:hover{
	background-color:#f5f5f7;
}
.page_songdetail>.maincontainer>.lyricsection,
.page_songdetail>.maincontainer>.discsection{
	float:left;
	height:400px;
}
.page_songdetail>.maincontainer>.lyricsection{
	width:55%;
}
.page_songdetail>.maincontainer>.discsection{
	width:45%;
	position:relative;
}
.page_songdetail>.maincontainer>.lyricsection>.lrcinfo{
	height:100px;
}
.page_songdetail>.maincontainer>.lyricsection>.lrcinfo>.info_song,
.page_songdetail>.maincontainer>.lyricsection>.lrcinfo>.info_album{
	max-width:100%;
	margin-bottom:10px;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.page_songdetail>.maincontainer>.lyricsection>.lrcinfo>.info_song>.songname{
	font-size:1rem;
}
.page_songdetail>.maincontainer>.lyricsection>.lrcinfo>.info_song>.label{
	display:inline-block;
	margin:0 6px;
	padding:2px;
	border:1px solid #f00;
	color:#f00;
}
.page_songdetail>.maincontainer>.lyricsection>.lrcinfo>.info_album>span{
	display:inline-block;
	margin-right:10px;
}
.page_songdetail>.maincontainer>.lyricsection>.lrccontainer{
	height:calc(100% - 100px);
	border-right:1px solid #ccc;
	overflow:auto;
}
.page_songdetail>.maincontainer>.lyricsection>.lrccontainer>.lrcbox>.lrc{
	padding:10px 0;
	color:#202016;
}
.page_songdetail>.maincontainer>.lyricsection>.lrccontainer>.lrcbox>.lrc.current{
	text-shadow:0 0 3px #333;
	color:#f9fcf5;
}
.page_songdetail>.maincontainer>.discsection>.disc_arc{
	width:320px;
	height:320px;
	border-radius:50%;
	background-color:rgba(251, 251, 251, 0.08);
	background-image:url("../common/images/disc.png");
	background-repeat:no-repeat;
	background-position:center center;
	background-size:68%;
	border:3px solid rgba(251, 251, 251, 0.08);
	overflow:hidden;
}
.page_songdetail>.maincontainer>.discsection>.disc_arc>.poster{
	width:100%;
	height:100%;
	overflow:hidden;
}
.page_songdetail>.maincontainer>.discsection>.disc_arc>.poster>img{
	display:block;
	width:100%;
	height:100%;
}
.page_songdetail>.maincontainer>.discsection>.disc_needle{
	position:absolute;
	top:-72px;left:30%;
	-webkit-transform:rotate(-40deg);
	transform:rotate(-40deg);
	transform-origin:16px 16px;
	-webkit-transition:all 0.3s ease;
	transition:all 0.3s ease;
	z-index:6;
}
.page_songdetail>.maincontainer>.discsection>.disc_btns{
	position:absolute;
	bottom:0;left:0;
	width:100%;
}
.page_songdetail>.maincontainer>.discsection>.disc_btns>.btn{
	display:inline-block;
	margin:0 5px;
	padding:5px 10px;
	border:1px solid #c1c5c6;
	border-radius:5px;
	background-color:#f6fafb;
	cursor:pointer;
}
.page_songdetail>.maincontainer>.discsection>.disc_btns>.btn:hover{
	background-color:#f5f5f7;
}
/* animation */
.page_songdetail>.maincontainer>.discsection>.disc_needle.play{
	-webkit-transform:rotate(-8deg);
	transform:rotate(-8deg);
}
.page_songdetail>.maincontainer>.discsection>.disc_arc{
	-webkit-animation:rotateARC linear 20s infinite normal;
	animation:rotateARC linear 20s infinite normal;
	-webkit-animation-play-state:paused;
	animation-play-state:paused;
}
@keyframes rotateARC{
	0%{
		-webkit-transform:rotate(0deg);
		transform:rotate(0deg);
	}
	100%{
		-webkit-transform:rotate(360deg);
		transform:rotate(360deg);
	}
}
.g_blurbg{
	position:absolute;
	top:0;left:0;
	bottom:0;right:0;
	background-color:#fff;
	/*background-image:url("../images/poster001.jpg");*/
	background-repeat:no-repeat;
	background-position:center 0;
	background-size:60% 60%;
	-webkit-filter:blur(100px);
	filter:blur(100px);
	z-index:-1;
    background-image:url('../common/images/al8.png');
}
</style>
