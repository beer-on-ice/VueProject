<template>
    <!-- page_menu 页面顶部菜单 -->
	<div class="page_menu clearfix">
		<div class="menu_logo"><img src="../common/images/netease-logo.png" alt=""></div>
		<div class="menu_btngroups">
			<a href="javascript:void(0);" class="btn backward"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
			<a href="javascript:void(0);" class="btn forward"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
		</div>
		<div class="menu_search">
			<input
			type="text"
			placeholder="探索音乐、歌手、歌词、用户"
			autofocus=""
			id="inpSearch"
			class="search_inp"
			@keyup = 'suggest'
			value=""/>
			<span class="search_btn" id="top_searchBtn" @click='pageUpAndSearch'><i class="fa fa-search" aria-hidden="true"></i></span>
		</div>
		<div class="menu_login" @click='loginIn'>
			<img :src="loginUser.avatarUrl" alt="" class='useravatar'>
			<span class='status'>{{loginUser.nickname}}</span>
		</div>
		<div class="menu_search_suggest" v-show="suggestShow">
			<div class="hot"></div>
			<dl>
				<dt v-show='songs.length'><i class="fa fa-music"></i>{{type[0]}}</dt>
				<dd v-for="item in songs" @click='tuen(item.name)'>{{item.name}}</dd>
				<dt v-show='singers.length'><i class="fa fa-user"></i>{{type[1]}}</dt>
				<dd v-for="item in singers" @click='(item.name)'>{{item.name}}</dd>
				<dt v-show='albums.length'><i class="fa fa-life-ring"></i>{{type[2]}}</dt>
				<dd v-for="item in albums" @click='tuen(item.name)'>{{item.name}}</dd>
				<dt v-show='mvs.length'><i class="fa fa-youtube-play "></i>{{type[3]}}</dt>
				<dd v-for="item in mvs" @click='tuen(item.name)'>{{item.name}}</dd>
				<dt v-show='playlists.length'><i class="fa fa-bars"></i>{{type[4]}}</dt>
				<dd v-for="item in playlists" @click='tuen(item.name)'>{{item.name}}</dd>
			</dl>
		</div>
	</div>
</template>

<script>

import axios from 'axios'
import showTipBox from 'common/js/showTip'
import {funcSearch} from 'common/js/funcSearch'

import http from '../utils/http'
import api from '../utils/api'


export default {
	data() {
		return {
			show: false, // 控制loading组件
			suggestShow:false,
			loginUser:{
				avatarUrl: require("../common/images/user_face2.png"),
				nickname:'未登录',
				userid:''
			},
			suggestion:[],
			type: [
				'单曲',
				'歌手',
				'专辑',
				'MV',
				'歌单'
			]
		}
	},
	// 搜索建议分类
	computed: {
	    albums: function () {
	        return this.suggestion.filter(function (album) {
	      		return album.type === 0
	        })
	    },
		singers: function () {
	        return this.suggestion.filter(function (singer) {
	      		return singer.type === 1
	        })
	    },
		mvs: function () {
	        return this.suggestion.filter(function (mv) {
	      		return mv.type === 2
	        })
	    },
		playlists: function () {
	        return this.suggestion.filter(function (playlist) {
	      		return playlist.type === 3
	        })
	    },
		songs: function () {
	        return this.suggestion.filter(function (song) {
	      		return song.type === 4
	        })
	    },
  	},
	// 登录后改变右上角信息
	created() {
		let that = this
		this.$root.bus.$on('userMess',function(data) {
			that.$set(that.loginUser,'avatarUrl',data.avatarUrl)
			that.$set(that.loginUser,'nickname',data.nickname)
		})
	},
	methods: {
		// 搜索建议
		suggest() {
			this.fetchData()
			this.suggestShow = true
		},
		// 搜索建议点击填充input
		tuen(name) {
			$('#inpSearch').val(name)
			this.suggestShow = false
		},
		// 搜索点击
		pageUpAndSearch() {
			this.suggestShow = false

			var str = $('#inpSearch').val().trim()
			if (!str) {
				showTipBox("error","不能为空哟！");
				return;
			}
			funcSearch()

			this.fetchData()

		},
		loginIn() {
			this.$emit('onLogin')
		},
		fetchData: async function () {
		    let params = {
			    keywords: $('#inpSearch').val()
		    }
		    const res = await http.get(api.search, params)
			const res2 = await http.get(api.suggest, params)

		    if (res && res.data.code === 200) {
				this.show = true

				this.$root.bus.$emit('takeNum',res.data.result);

				this.$root.bus.$emit('takeName',$('#inpSearch').val());

				this.$emit('passData',res.data.result)
		    }
			// 搜索建议
			if (res2 && res2.data.code === 200) {
				let suggests = []
				res2.data.result.albums && res2.data.result.albums.forEach(function(item) {
					suggests.push({name:item.name,id:item.id,type: 0})
				})
				res2.data.result.artists && res2.data.result.artists.forEach(function(item) {
					suggests.push({name:item.name,id:item.id,type: 1})
				})
				res2.data.result.mvs && res2.data.result.mvs.forEach(function(item) {
					suggests.push({name:item.name,id:item.id,type: 2})
				})
				res2.data.result.playlists && res2.data.result.playlists.forEach(function(item) {
					suggests.push({name:item.name,id:item.id,type: 3})
				})
				res2.data.result.songs && res2.data.result.songs.forEach(function(item) {
					suggests.push({name:item.name,id:item.id,type: 4})
				})
				this.suggestion = suggests

		    }
		}
	},
}
</script>

<style lang="css">
/* ------------------------page_menu------------------------------- */
.page_menu  {
	position:fixed;
	top:0;left:0;
	width:100%;
	height:60px;
	padding:0 15px;
	box-sizing:border-box;
	background-color:#c52f30;
	z-index:99999;
}
.page_menu>div {
	float:left;
    position:relative;
    top:50%;left:0;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
}
.menu_btngroups {
	margin:0 10px 0 100px;
	width:70px;
}
.menu_btngroups>.btn {
	width:50px;
	padding:3px 10px;
	border:1px solid #982b26;
	color:#ffefe4;
}
.menu_btngroups>.btn.backward {
	border-top-left-radius:5px;
	border-bottom-left-radius:5px;
}
.menu_btngroups>.btn.forward {
	margin-left:-5px;
	border-top-right-radius:5px;
	border-bottom-right-radius:5px;
}
.menu_btngroups>.btn>.fa {
	font-size:1rem;
}
.menu_search {
	position:relative;
}
.menu_search>.search_inp {
	display:inline-block;
	border:none;
	outline:none;
	width:160px;
	padding:5px 30px 5px 10px;
	border-radius:10px;
	background-color:rgba(0,0,0,0.5);
	color:#ccc;
}
.menu_search>.search_btn {
	position:absolute;
	top:50%;right:10px;
	-webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
    cursor:pointer;
}
.menu_search>.search_btn>.fa {
	font-size:0.7rem;
	color:#ccc;
}

.page_menu>.menu_login {
	position:absolute;
	left:1700px;
	cursor: pointer;
}
.page_menu>.menu_login>.useravatar {
	float:left;
	width:30px;
	height:30px;
	border-radius: 30px;
}
.page_menu>.menu_login>.status {
	float:right;
	line-height:30px;
	margin-left:15px;
	color:white;
}

.page_menu> .menu_search_suggest {
	width:222px;
	height:200px;
	z-index:99999999;
	position:fixed;
	top:150px;
	left:320px;
}

.page_menu> .menu_search_suggest> .hot {
	width:222px;
	height:43px;
	background: url('../common/images/hot.png')
}

.page_menu> .menu_search_suggest > dl {
	background:#fafafa;
	width:220px;
	border:1px solid #ccc;
	border-top:none;
	margin-top:-6px;
}

.page_menu> .menu_search_suggest > dl dt{
	height:25px;
	background: #e6e7ea;
	padding-left:5px;
}

.page_menu> .menu_search_suggest > dl dt i{
	margin: 0 5px;
}

.page_menu> .menu_search_suggest > dl dd{
	margin:6px 20px;
	width:200px;
	font:14px/20px '微软雅黑';
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
</style>
