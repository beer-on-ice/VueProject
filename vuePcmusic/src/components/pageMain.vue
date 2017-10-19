<template>
    <!-- page_main 歌单：我喜欢的音乐 -->
	<div class="page_main R_page" id="pageMain">
		<div class="main_container">
			<div class="listcontainer">
                <!-- listinfo -->
				<div class="listinfo clearfix">
					<div class="info_listpic">
						<img :src="src" alt="" id="playlist_listPic" />
					</div>
					<div class="info_detailtext">
						<div class="playinfo">
							<span><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;<span id="playlist_trackCount">{{info.songNum}}</span></span>
							<span><i class="fa fa-play-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;<span id="playlist_playCount">{{info.actNum}}</span></span>
						</div>
						<div class="detail_name">
							<span class="listtag">歌单</span>
							<span class="listname" id="playlist_listName">{{info.name}}</span>
						</div>
						<div class="detail_time">
							<span class="userpic"><a href="javascript:void(0);"><img :src="avaSrc" alt="" id="playlist_userFace" /></a></span>
							<span class="username"><a href="javascript:void(0);" id="playlist_userName">{{info.creator}}</a></span>
							<span class="createtime" id="playlist_createTime">{{info.createTime}}</span>
							<span>创建</span>
						</div>
						<div class="detail_btns">
							<span class="btn playall"><i class="fa fa-play-circle-o" aria-hidden="true" style="color:#c52f30;"></i>&nbsp;&nbsp;播放全部</span><!--
							--><span class="btn plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
							<span class="btn playall"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;收藏({{info.subscribedCount}})</span>
							<span class="btn playall"><i class="fa fa-share-square-o" aria-hidden="true"></i>&nbsp;&nbsp;分享(0)</span>
							<span class="btn playall"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;下载全部</span>
						</div>
						<div class="detail_description">
							<p class='description'>
								{{info.description}}
							</p>
						</div>
					</div>
				</div>

                <!-- listtab -->
                <div class="listtab">
                    <div class="tabbtns clearfix">
						<label class="label_btn active" for="music">歌单列表</label>
						<label class="label_btn" for="comment">评论(0)</label>
						<label class="label_btn" for="follower">收藏者</label>
						<div class="menu_search">
							<input type="text" placeholder="搜索歌单音乐" class="search_inp" />
							<span class="search_btn"><i class="fa fa-search" aria-hidden="true"></i></span>
						</div>
					</div>
                    <!-- musiclist -->
                    <input type="radio" id="music" name="tablist" checked="" />
                    <div class="tabitem musiclist">
                        <table>
                            <thead>
                                <tr>
                                    <th>&nbsp;&nbsp;</th>
                                    <th>操作</th>
                                    <th>音乐标题</th>
                                    <th>歌手</th>
                                    <th>专辑</th>
                                    <th>时长</th>
                                </tr>
                            </thead>
                            <tbody class="infolist" id="infoList_playlist">
								<tr
								v-for='item,i in songLists'
								@dblclick='listPlaySong(item)'
								@click='listReadyPlay(item)'>
									<td class="index">{{(i+1) <10 ? "0"+(i+1) : (i+1)}}</td>
									<td><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;<i class="fa fa-download" aria-hidden="true"></i></td>
									<td>{{item.name}}</td>
									<td>{{item.singer}}</td>
									<td>{{item.albumName}}</td>
									<td>{{item.duration.I}}:{{item.duration.S}}</td>
								</tr>
                            </tbody>
                            </tfoot>
                        </table>
                    </div>

                    <!-- comments -->
                    <input type="radio" id="comment" name="tablist" />
                    <div class="tabitem commentlist">
                        <div class="commentbox clearfix">
                            <textarea name="" id="" cols="30" rows="10" maxlength="140"></textarea>
                            <span class="wordslen">140</span>
                            <a href="javascript:void(0);" class="btn emoji"><i class="fa fa-smile-o" aria-hidden="true"></i></a>
                            <a href="javascript:void(0);" class="btn at"><i class="fa fa-at" aria-hidden="true"></i></a>
                            <a href="javascript:void(0);" class="btn comment">评论</a>
                        </div>
                        <div class="commenttable">
                            <div class="comment new">
                                <div class="title">最新评论(0)</div>
                                <div class="content">
                                    <p><span class="username"><a href="javascript:void(0);">用户008</a></span>：<span class="usersay">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, earum cupiditate facere suscipit tenetur quia ab quasi ea eligendi, neque esse quidem. Eius, quasi! Odit veniam repellat amet, accusamus voluptatem.</span></p>
                                    <div class="btngroups clearfix">
                                        <span class="time">2016年12月31日 10:35:06</span>
                                        <span class="btn">
                                            <a href="javascript:void(0);" class="btn_report">举报</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_support"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>(0)</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_share">分享</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_reply">回复</a>
                                        </span>
                                    </div>
                                    <div class="userface"><a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a></div>
                                </div>
                                <div class="content">
                                    <p><span class="username"><a href="javascript:void(0);">用户008</a></span>：<span class="usersay">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></p>
                                    <div class="btngroups clearfix">
                                        <span class="time">2016年12月31日 10:35:06</span>
                                        <span class="btn">
                                            <a href="javascript:void(0);" class="btn_report">举报</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_support"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>(0)</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_share">分享</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_reply">回复</a>
                                        </span>
                                    </div>
                                    <div class="userface"><a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a></div>
                                </div>
                            </div>
                            <div class="comment prefect">
                                <div class="title">精彩评论(0)</div>
                                <div class="content">
                                    <p style="color:#ccc;">-- 暂无评论 --</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- followers -->
                    <input type="radio" id="follower" name="tablist" />
                    <div class="tabitem followerlist">
                        <figure>
                            <a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a>
                            <figcaption><a href="javascript:void(0);">-USERNAME-</a></figcaption>
                        </figure>
                        <figure>
                            <a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a>
                            <figcaption><a href="javascript:void(0);">-USERNAME-</a></figcaption>
                        </figure>
                        <figure>
                            <a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a>
                            <figcaption><a href="javascript:void(0);">-USERNAME-</a></figcaption>
                        </figure>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
import {toYMD} from 'common/js/formatTime'
import {funcMain} from 'common/js/funcSearch'
import {formatTime,toDB} from 'common/js/formatTime'
import http from '../utils/http'
import api from '../utils/api'


export default {
	data() {
		return {
			info: {
				name:'我喜欢的音乐',
				creator: '李锦',
				createTime:'1995-10-00',
				actNum:'1000',
				songNum:'1000',
				subscribedCount:'999',
				coverImg:require('../common/images/temp_pic001.jpg'),
				avatorImg:require('../common/images/user_face.png'),
				description:'暂无简介'
			},
			songLists: [],
		}
	},
	created() {
		let that = this
	  	this.$root.bus.$on('sendDetail',function(item) {
			// if(!$('.infolist tr').length) {
			// 	$('#loadingBox').css('display','block')
			// }

			funcMain() // 显示主页

			that.fetchData(item.id) // 获取歌单详情

			that.info.name = item.name
			that.info.creator = item.creator.nickname
			that.info.coverImg = item.coverImgUrl
			that.info.createTime = toYMD(item.createTime)
			that.info.actNum = item.playCount
			that.info.songNum = item.trackCount
			that.info.subscribedCount = item.subscribedCount
			that.info.coverImg = item.coverImgUrl
			that.info.avatorImg = item.creator.avatarUrl
		})
	},
	computed: {
		src: function() {
			if(this.info.coverImg) {
				return this.info.coverImg
			} else {
				return this.srcUrl
			}
		},
		avaSrc: function() {
			if(this.info.avatorImg) {
				return this.info.avatorImg
			} else {
				return this.srcUrl
			}
		}
	},
	methods: {
		listPlaySong(data) {
			this.$root.bus.$emit('songPlaystatus',data)
			this.$emit('listSongPlay',data)
		},
		listReadyPlay(data) {
			this.$emit('listReadyPlay',data)
		},
		fetchData: async function(id) {
			let list = []
			let params =  {id: id}
			const res = await http.get(api.listDetail, params)
			// 歌曲简介
			if(res.data.playlist.description) {
				this.info.description = res.data.playlist.description
			} else {
				this.info.description = '暂无简介'
			}
			// 歌单所有歌曲信息
			for(var i=0;i<res.data.privileges.length;i++) {
				let params2 =  {id: res.data.privileges[i].id}
				const res2 = await http.get(api.songD, params2)
				let params3 =  {ids: res.data.privileges[i].id}
				const res3 = await http.get(api.songAD, params3)
				const lyric = await http.get(api.lyric, params2)
				if(lyric.data.lrc) {
					list.push({
						name: res3.data.songs[0].name,
						albumName: res3.data.songs[0].al.name,
						albumUrl:res3.data.songs[0].al.picUrl,
						singer:res3.data.songs[0].ar[0].name,
						url:res2.data.data[0].url,
						lyric:lyric.data.lrc.lyric,
						duration:formatTime(res3.data.songs[0].dt/1000)
					})
				} else {
					list.push({
						name: res3.data.songs[0].name,
						albumName: res3.data.songs[0].al.name,
						albumUrl:res3.data.songs[0].al.picUrl,
						singer:res3.data.songs[0].ar[0].name,
						url:res2.data.data[0].url,
						duration:formatTime(res3.data.songs[0].dt/1000)
					})
				}
			}
			this.songLists = list
		}
	}
}
</script>

<style lang="css">
/*comments s*/
.commentlist{
	padding:15px 40px;
}
.commentlist>.commentbox{
	width:100%;
	padding:10px 10px 15px 10px;
	background-color:#f0f0f2;
	position:relative;
}
.commentlist>.commentbox>textarea{
	margin-bottom:10px;
	padding:5px 10px;
	width:100%;
	height:80px;
	resize:none;
	outline:none;
	border:1px solid #e3e3e5;
	background-color:#fff;
	box-sizing:border-box;
}
.commentlist>.commentbox>.wordslen{
	position:absolute;
	top:66px;right:15px;
	color:#8b8b86;
}
.commentlist>.commentbox>.btn.comment{
	float:right;
	display:inline-block;
	padding:5px 10px;
	border:1px solid #e3e3e5;
	border-radius:5px;
	background-color:#fdfdfd;
}
.commentlist>.commentbox>.btn.emoji,
.commentlist>.commentbox>.btn.at{
	float:left;
	margin-right:10px;
	font-size:1rem;
}
.commentlist>.commenttable{
	margin:30px 0;
}
.commentlist>.commenttable>.comment>.title{
	margin:10px 0;
	font-size:0.8rem;
	color:#a5a4a9;
}
.commentlist>.commenttable>.comment>.content{
	padding:1em 0 1em 60px;
	border-top:1px solid #eee;
	position:relative;
}
.commentlist>.commenttable>.comment>.content>.userface{
	position:absolute;
	top:1em;left:0;
	width:40px;
	height:40px;
}
.commentlist>.commenttable>.comment>.content>.userface>a>img{
	width:100%;
	height:auto;
}
.commentlist>.commenttable>.comment>.content>p{
	margin-bottom:1em;
}
.commentlist>.commenttable>.comment>.content>p>.username>a{
	color:#0b75c3;
}
.commentlist>.commenttable>.comment>.content>p>.usersay{
	color:#343434;
}
.commentlist>.commenttable>.comment>.content>.btngroups>.time{
	float:left;
	color:#939393;
}
.commentlist>.commenttable>.comment>.content>.btngroups>.btn{
	float:right;
}
/*comments e*/

/*followers s*/
.followerlist{
	padding:20px 50px;
}
.followerlist>figure{
	display:inline-block;
	width:80px;
	margin:10px 20px;
	text-align:center;
}
.followerlist>figure>a>img{
	display:inline-block;
	width:60px;
	height:60px;
	border-radius:50%;
}
.followerlist>figure>figcaption{
	width:100%;
	white-space:nowrap;
	text-overflow:ellipsis;
	font-size:0.6rem;
	overflow:hidden;
}
/*followers e*/

.detail_description {
	margin-top:10px;
	height: 100px;
	line-height:20px;
	overflow-y:scroll;
	text-indent: 20px;
}
</style>
