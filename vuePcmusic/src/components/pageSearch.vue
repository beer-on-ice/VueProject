<template>
    <!-- page_Search 搜索列表 -->
	<div class="page_search R_page" id="pageSearch" style="display:none;">
		<div class="main_container">
			<div class="listcontainer">
                <p style="margin:20px 40px;color:#bbb;" id="search_count">搜索 "<span class="input" style="color:#0b75c3;">STRING</span>"，共搜到 <span class="count">0</span> 条结果，本页最多显示 100 条结果</p>
                <!-- listtab -->
                <div class="listtab">
                    <div class="tabbtns clearfix">
						<label class="label_btn active" for="song">单曲</label>
						<label class="label_btn" for="singer">歌手</label>
						<label class="label_btn" for="album">专辑</label>
						<label class="label_btn" for="musicvideo">MV</label>
						<label class="label_btn" for="playlist">歌单</label>
						<label class="label_btn" for="songlrc">歌词</label>
						<label class="label_btn" for="fm">主播电台</label>
						<label class="label_btn" for="user">用户</label>
					</div>
                    <!-- song -->
					<input type="radio" id="song" name="tablist_s" checked="" />
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
                            <tbody class="infolist" id="infoList_search">
								<tr
								v-for='song,i in songData.songs'
								@dblclick='playMusic(song.id,song,artists[i])'>
									<td class="index">{{(i+1) <10 ? "0"+(i+1) : (i+1)}}</td>
									<td><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;<i class="fa fa-download" aria-hidden="true"></i></td>
									<td>{{song.name}}</td>
									<td>{{artists[i]}}</td>
									<td>{{song.album.name}}</td>
									<td>{{timeObj[i].I}}:{{timeObj[i].S}}</td>
									<!-- <td style="display:none">{{song.album.picUrl}}</td> -->
								</tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- singer -->
					<input type="radio" id="singer" name="tablist_s" />
					<div class="tabitem singerlist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
					<!-- album -->
					<input type="radio" id="album" name="tablist_s" />
					<div class="tabitem albumlist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
					<!-- musicvideo -->
					<input type="radio" id="musicvideo" name="tablist_s" />
					<div class="tabitem musicvideolist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
					<!-- playlist -->
					<input type="radio" id="playlist" name="tablist_s" />
					<div class="tabitem playlist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
					<!-- songlrc -->
					<input type="radio" id="songlrc" name="tablist_s" />
					<div class="tabitem songlrclist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
					<!-- fm -->
					<input type="radio" id="fm" name="tablist_s" />
					<div class="tabitem fmlist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
					<!-- user -->
					<input type="radio" id="user" name="tablist_s" />
					<div class="tabitem userlist">
						<p style="margin:100px 0;text-align:center;color:#bbb;font-size:1rem;">--分类功能暂未上线--</p>
					</div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>

import {formatTime,toDB} from 'common/js/formatTime'
import axios from 'axios'

export default {
	data() {
		return {
			artistsName:[],
			songDuration:[],
			musicid:''
		}
	},
	props:[
		'songData'
	],
	computed: {
		artists: function() {
			let that = this
			this.songData.songs.forEach(function(song) {
				song.artists.map(artist => {
                    that.artistsName.push(artist.name);
                }).join('');
			})
			return that.artistsName
		},
		timeObj: function() {
			let that = this
			this.songData.songs.forEach(function(song) {
				that.songDuration.push(formatTime(song.duration/1000));
			})
			return that.songDuration
		}
	},
	created() {
		//  搜索概述
		this.$root.bus.$on('takeName', (data)=>{$("#search_count").find(".input").html(data)})
		this.$root.bus.$on('takeNum', (data)=>{$("#search_count").find(".count").html(data.songCount)})
	},
	methods: {
		playMusic(musicid,song,singer) {
			// 双击的歌曲样式变化
			$('#infoList_search tr').find("td.index").each(function(index,item) {
				$(item).removeClass("active").html(toDB(index+1));
			});
			$(event.currentTarget).find("td.index").html('<i class="fa fa-volume-up" aria-hidden="true"></i>').addClass("active");

			let that = this
			axios.get('/api/music/url', {
			    params: {
			        id: musicid
			    }
			}).then(function (res) {
				// 播放按钮变化
				that.$root.bus.$emit('playOn');
				that.$emit('mediaOn',res.data.data[0].url);
				song.singer = singer
				// console.log(song);
			}).catch(function (error) {
			    console.log(error);
			});
			axios.get('/api/song/detail', {
			    params: {
			        ids: musicid
			    }
			}).then(function (res) {
				console.log(res);
				song.picUrl = res.data.songs[0].al.picUrl
				that.$emit('sendMusicDetail',song);
				// console.log(res.data.songs[0].al.picUrl);
			}).catch(function (error) {
			    console.log(error);
			});
		}
	}
}
</script>

<style lang="css" scoped>
/* ------------------------R_page page_right------------------------------- */
.R_page{
    padding:60px 0 60px 220px;
    height:100%;
    box-sizing:border-box;
}
.R_page>.main_container{
    height:100%;
    overflow-y:scroll;
}
.listcontainer{
    width:100%;
    overflow:hidden;
}
/* listinfo s */
.listcontainer>.listinfo{
    padding:20px 40px;
    margin-bottom:30px;
}
.listcontainer>.listinfo>.info_listpic{
    float:left;
    width:200px;
    margin-right:40px;
    position:relative;
}
.listcontainer>.listinfo>.info_listpic>img{
    width:100%;
    height:auto;
}
.listcontainer>.listinfo>.info_detailtext{
    float:left;
    width:calc(100% - 200px - 40px);
    position:relative;
}
.listcontainer>.listinfo>.info_detailtext>.playinfo{
    position:absolute;
    top:0;right:0;
}
.listcontainer>.listinfo>.info_detailtext>.playinfo>span{
    margin:0 5px;
    color:#646464;
}
.listcontainer>.listinfo>.info_detailtext>.detail_name>.listtag{
    display:inline-block;
    padding:5px 10px;
    background-color:#c52f30;
    color:#f1f1f1;
}
.listcontainer>.listinfo>.info_detailtext>.detail_name>.listname{
    margin:0 5px;
    font-size:1rem;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time{
    margin:15px 0;
    padding-left:50px;
    position:relative;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time>span{
    margin:0 5px;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time>.userpic{
    display:inline-block;
    position:absolute;
    top:50%;left:0;
    width:30px;
    height:30px;
    border:1px solid #dadadc;
    border-radius:50%;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
    overflow:hidden;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time>.userpic>a>img{
    width:100%;
    height:auto;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn{
    display:inline-block;
    margin:0 5px;
    padding:5px 10px;
    border:1px solid #dadadc;
    border-radius:5px;
    cursor:pointer;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn.playall{
    margin-right:0;
    border-top-right-radius:0;
    border-bottom-right-radius:0;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn.plus{
    margin-left:0;
    border-left:none;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn:hover{
    background-color:#f5f5f7;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn>.fa{
    font-size:0.8rem;
}
    /*listinfo e*/
    /* listtab s */
.listcontainer>.listtab>.tabbtns{
	padding:0 40px;
	border-bottom:1px solid #c52f30;
}
.listcontainer>.listtab>.tabbtns>label{
	display:inline-block;
	padding:0.5em 2em;
	margin:0 3px;
	border:1px solid #dadadc;
	border-bottom:none;
	cursor:pointer;
}
.listcontainer>.listtab>.tabbtns>label:hover{
	background-color:#e3e3e5;
}
.listcontainer>.listtab>.tabbtns>label.active{
	background-color:#c52f30;
	color:#f1f1f1;
	border-color:#c52f30;
}
.listcontainer>.listtab>.tabbtns>.menu_search{
	float:right;
    position:relative;
}
.listcontainer>.listtab>.tabbtns>.menu_search>.search_inp{
	background-color:#fff;
	color:#666;
	border:1px solid #dadadc;
    display:inline-block;
	outline:none;
	width:160px;
	padding:5px 30px 5px 10px;
	border-radius:10px;
}
.listcontainer>.listtab>.tabbtns>.menu_search>.search_btn {
    position: absolute;
    top: 50%;
    right: 10px;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
    cursor: pointer;
}
.listcontainer>.listtab>.tabbtns>.menu_search>.search_btn>.fa {
    font-size: 0.7rem;
    color: #ccc;
}
.listcontainer>.listtab>.tabitem{
	display:none;
}
.listcontainer>.listtab>input{
	position:fixed;
	top:0;
    left:-9999px;
}
.listcontainer>.listtab>input:checked + .tabitem{
	display:block;
}
/* listtab e */
/*musiclist s*/
.musiclist>table{
	width:100%;
	text-align:left;
	vertical-align:middle;
	background-color:#fafafa;
	color:#313131;
}
.musiclist>table td,
.musiclist>table th{
	padding-left:15px;
	max-width:200px;
	height:2rem;
	font-weight:lighter;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.musiclist>table th{
	border-right:1px solid #e0e0e0;
	box-sizing:border-box;
	color:#6d7172;
}
.musiclist>table th:last-of-type{
	border:none;
}
.musiclist>table td>img{
	width:100%;
	height:auto;
}
.musiclist>table>tbody>tr:nth-of-type(odd){
	background-color:#f5f5f7;
}
.musiclist>table>tbody>tr:hover,
.musiclist>table>tbody>tr.active{
	background-color:#e3e3e5;
}
.musiclist>table>tbody>tr>td:first-of-type{
	padding-right:10px;
	text-align:right;
	color:#9c9c9c;
}
.musiclist>table>tbody>tr>td.index.active{
	font-size:0.8rem;
	color:#c52f30;
}
/*musiclist e*/
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
</style>
