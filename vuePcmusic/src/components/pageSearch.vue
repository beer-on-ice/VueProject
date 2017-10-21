<template>
    <!-- page_Search 搜索列表 -->
	<div class="page_search R_page" id="pageSearch">
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
									@dblclick='playMusic()'
									@click='readyPlay(song.id,song,artists[i])'>
									<td class="index">{{(i+1) <10 ? "0"+(i+1) : (i+1)}}</td>
										<td><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;<i class="fa fa-download" aria-hidden="true"></i></td>
										<td>{{song.name}}</td>
										<td>{{artists[i]}}</td>
										<td>{{song.album.name}}</td>
										<td>{{timeObj[i].I}}:{{timeObj[i].S}}</td>
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
import axios from 'axios'
import http from '../utils/http'
import api from '../utils/api'

import {formatTime,toDB} from 'common/js/formatTime'
import playStyle from 'common/js/playStyle'
import {formatLyricTime} from 'common/js/lyric'

export default {
	data() {
		return {
			artistsName:[],
			songDuration:[],
			musicid:'',
			songMess: {
				name:'',
				url:'',
				singer:'',
				albumUrl:'',
				albumName:'',
				lyric:''
			},
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
		this.$root.bus.$on('takeName', (data) => {$("#search_count").find(".input").html(data)})
		this.$root.bus.$on('takeNum',(data)=> {
			$("#search_count").find(".count").html(data.songCount)
		})
	},
	methods: {
		playMusic() {
			playStyle()
			this.$root.bus.$emit('playOn'); // 点击播放按钮变化
			this.$emit('mediaOn');
		},
		readyPlay(musicid,song,singer) {
			let that = this
			this.fetchData(musicid,song,singer,function(songUrl,picUrl,lyric){
					that.songMess.name = song.name
					that.songMess.albumName = song.album.name
					that.songMess.url = songUrl
					that.songMess.singer = singer
					that.songMess.albumUrl = picUrl
					that.songMess.lyric = lyric
			})
			this.$emit('mediaMess',this.songMess)
		},
		fetchData: async function (musicid,song,singer,cb) {
			let params = {
				id: musicid
			}
			let params2 = {
				ids: musicid
			}
			const lyric = await http.get(api.lyric, params)
			const res = await http.get(api.songD, params)
			const res2 = await http.get(api.songAD, params2)
			if (res && res.data.code === 200) {
				if (res2 && res2.data.code === 200) {
					if(lyric.data.lrc) {
						cb(res.data.data[0].url,res2.data.songs[0].al.picUrl,lyric.data.lrc.lyric)
					} else {
						cb(res.data.data[0].url,res2.data.songs[0].al.picUrl,'')
					}
				}
			}
		}
	}
}
</script>

<style></style>
