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
						{{lyric}}
						<!-- <p>暂无歌词</p> -->
					</div>
				</div>
			</div>
			<lineBar :name="names[0]"></lineBar>
			<div class="commentsection clearfix">
				<input type="radio" id="comment" name="tablist" />
                <div class="tabitem commentlist">
                    <div class="commentbox clearfix">
                        <textarea name="" id="" cols="30" rows="10" maxlength="140"></textarea>
                        <a href="javascript:void(0);" class="btn emoji"><i class="fa fa-smile-o" aria-hidden="true"></i></a>
                        <a href="javascript:void(0);" class="btn at"><i class="fa fa-at" aria-hidden="true"></i></a>
                    </div>
                    <div class="commenttable">
                        <div class="comment new">
                            <div class="title" v-show="allcomments.comments[0].hotComments.length">精彩评论({{allcomments.comments[0].hotComments.length}})</div>
                            <div class="content" v-for='item in allcomments.comments[0].hotComments'>
                                <p><span class="username"><a href="javascript:void(0);">{{item.name}}</a></span>：<span class="usersay">{{item.content}}</span></p>
                                <div class="btngroups clearfix">
                                    <span class="time">{{item.time}}</span>
                                    <span class="btn">
										<a href="javascript:void(0);" class="btn_support"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>({{item.likedCount}})</a>&nbsp;&nbsp;|&nbsp;&nbsp;
										<a href="javascript:void(0);" class="btn_share">分享</a>&nbsp;&nbsp;|&nbsp;&nbsp;
									<a href="javascript:void(0);" class="btn_reply">回复</a>
                                    </span>
                                </div>
                                <div class="userface"><a href="javascript:void(0);"><img :src="item.img" alt="" /></a></div>
                            </div>

							<div class="title" v-show="allcomments.comments[0].total">最新评论({{allcomments.comments[0].total}})</div>
                            <div class="content" v-for='item in allcomments.comments[0].comments'>
                                <p><span class="username"><a href="javascript:void(0);">{{item.name}}</a></span>：<span class="usersay">{{item.content}}</span></p>
                                <div class="btngroups clearfix">
                                    <span class="time">{{item.time}}</span>
                                    <span class="btn">
                                        <a href="javascript:void(0);" class="btn_support"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>({{item.likedCount}})</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a href="javascript:void(0);" class="btn_share">分享</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a href="javascript:void(0);" class="btn_reply">回复</a>
                                    </span>
                                </div>
                                <div class="userface"><a href="javascript:void(0);"><img :src="item.img" alt="" /></a></div>
                            </div>
                        </div>
                    </div>
					<p style='margin-top:20px;font-size:16px;' v-show="allcomments.comments[0].total === 0">
						暂无评论,快来抢沙发吧~
					</p>
                </div>
			</div>
			<lineBar :name="names[1]" class='lineSim'></lineBar>
			<ul class="similarSongsection clearfix">
				<li v-for='item in songMess.simsongs'>
					<span>{{item.name}}</span>
					<span>{{item.singer}}</span>
				</li>
			</ul>
			<lineBar :name="names[2]" class='lineSim2'></lineBar>
			<ul class="similarUsersection clearfix">
				<li v-for='item in songMess.simusers'>
					<div class="">
						<img :src="item.avatarUrl" alt="">
						<span>{{item.name}}</span>
					</div>
					<p>{{item.reason}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import mainLrcScroll from 'common/js/lyric'
import LineBar from './lineBar'

export default {
	data() {
		return {
			srcUrl:require('../common/images/disc-o.png'),
			songS:'--SONGNAME--',
			singerS: '--SINGERNAME--',
			albumS:'--ALBUMNAME--',
			canChange: false,
			names:[
				'听友评论',
				'相似歌曲',
				'最近5个听过此歌的人'
			],
			allcomments: {
				comments:[
					{
						total:0,
						hotComments:[],
						comments:[]
					}
				]
			}
		}
	},
	props: [
		'songMess'
	],
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
		albumName: function() {
			if(this.canChange) {
				return this.songMess.albumName
			} else {
				return this.albumS
			}
		},
		singerName: function() {
			if(this.canChange) {
				return this.songMess.singer
			} else {
				return this.albumS
			}
		},
		lyric: function() {
			if(this.canChange && this.songMess.lyric) {
				mainLrcScroll({
					"jQ_lrcContainer":$("#lrcContainer"),
					"jQ_lrcBox":$("#lrcBox"),
					"jQ_audio":$("#audio"),
					"str":this.songMess.lyric
				})
			} else {
				$("#lrcBox").html("<p>暂无歌词</p>");
			}
		}
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
			that.songMess.name = data.name
			that.songMess.singer = data.singer
			that.songMess.albumUrl = data.albumUrl
			that.songMess.albumName = data.albumName
			that.songMess.lyric = data.lyric
			that.songMess.comments = data.comments
			that.songMess.simsongs = data.simsongs
			that.songMess.simusers = data.simusers

		})
	},
	methods: {
		closeDetail() {
			$("#pageSongDetail").css({
				"top":"100%",
				"right":"100%",
				"opacity":0
			});
		}
	},
	components: {
		LineBar
	},
	watch: {
		songMess: {
			handler:function(val,oldVal) {
				if(val.comments[0]) {
					this.allcomments = val
				}
			},
			deep:true
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
	z-index:9999;
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


.page_songdetail>.maincontainer>.linewrap {
	float:left;
	margin-top:88px;
	width:620px;
}
.page_songdetail>.maincontainer>.commentsection {
	float:left;
}

.page_songdetail>.maincontainer>.commentsection> #comment {
	visibility: hidden;
}
/*comments s*/
.page_songdetail>.maincontainer>.commentsection>.commentlist{
	padding:15px 0;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commentbox{
	width:600px;
	padding:10px 10px 15px 10px;
	background-color:#f0f0f2;
	position:relative;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commentbox>textarea {
	margin-bottom:10px;
	padding:5px 10px;
	width:100%;
	height:40px;
	resize:none;
	outline:none;
	border:1px solid #e3e3e5;
	background-color:#fff;
	box-sizing:border-box;
}

.page_songdetail>.maincontainer>.commentsection>.commentlist>.commentbox>.btn.emoji,
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commentbox>.btn.at{
	position:absolute;
	right:10px;
	bottom:33px;
	margin-right:10px;
	font-size:1rem;
}

.page_songdetail>.maincontainer>.commentsection>.commentlist>.commentbox>.btn.emoji {
	right:40px;
}

.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable{
	margin:30px 0;
	width:600px;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.title{
	margin:10px 0;
	font-size:0.8rem;
	color:#a5a4a9;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content{
	padding:1em 0 1em 60px;
	border-top:1px solid #eee;
	position:relative;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>.userface{
	position:absolute;
	top:1em;left:0;
	width:40px;
	height:40px;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>.userface>a>img{
	width:100%;
	height:auto;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>p{
	margin-bottom:1em;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>p>.username>a{
	color:#0b75c3;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>p>.usersay{
	color:#343434;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>.btngroups>.time{
	float:left;
	color:#939393;
}
.page_songdetail>.maincontainer>.commentsection>.commentlist>.commenttable>.comment>.content>.btngroups>.btn{
	float:right;
}
/*comments e*/


.page_songdetail>.maincontainer>.lineSim {
	width:250px;
	margin:-40px 0 0 100px;
}
.page_songdetail>.maincontainer>.similarSongsection {
	float:left;
	width:250px;
	margin:20px 0 0 100px;
}

.page_songdetail>.maincontainer>.similarSongsection li{
	width:100%;
	float:left;
	margin-top: 20px;
}

.page_songdetail>.maincontainer>.similarSongsection span:nth-of-type(1){
	float:left;
}
.page_songdetail>.maincontainer>.similarSongsection span:nth-of-type(2){
	float:right;
}

.page_songdetail>.maincontainer>.lineSim2 {
	width:250px;
	margin:150px 0 0 100px;
}

.page_songdetail>.maincontainer>.similarUsersection {
	float:left;
	width:250px;
	margin:20px 0 0 100px;
}

.page_songdetail>.maincontainer>.similarUsersection li {
	width:100%;
	float:left;
	margin-top:20px;
}

.page_songdetail>.maincontainer>.similarUsersection div img{
	width:30px;
	float:left;
	border-radius:50%;
}

.page_songdetail>.maincontainer>.similarUsersection div span{
	float:left;
	margin:5px 0 0 5px;
}

.page_songdetail>.maincontainer>.similarUsersection p{
	margin-top:5px;
	float:right;
}
</style>
