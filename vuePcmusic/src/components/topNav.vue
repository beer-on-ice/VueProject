<template>
    <!-- page_menu 页面顶部菜单 -->
	<div class="page_menu clearfix">
		<div class="menu_logo"><img src="../common/images/netease-logo.png" alt=""></div>
		<div class="menu_btngroups">
			<a href="javascript:void(0);" class="btn backward"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
			<a href="javascript:void(0);" class="btn forward"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
		</div>
		<div class="menu_search">
			<input type="text" placeholder="探索音乐、歌手、歌词、用户" autofocus="" id="inpSearch" class="search_inp" value=""/>
			<span class="search_btn" id="top_searchBtn" @click='pageUpAndSearch'><i class="fa fa-search" aria-hidden="true"></i></span>
		</div>
		<div class="menu_login" @click='loginIn'>
			<img :src="loginUser.avatarUrl" alt="" class='useravatar'>
			<span class='status'>{{loginUser.nickname}}</span>
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
			loginUser:{
				avatarUrl: require("../common/images/user_face2.png"),
				nickname:'未登录',
				userid:''
			}
		}
	},
	created() {
		let that = this
		this.$root.bus.$on('userMess',function(data) {
			that.$set(that.loginUser,'avatarUrl',data.avatarUrl)
			that.$set(that.loginUser,'nickname',data.nickname)
		})
	},
	methods: {
		pageUpAndSearch() {
			var str = $('#inpSearch').val().trim()
			if (!str) {
				showTipBox("error","不能为空哟！");
				return;
			}
			this.fetchData()
		},
		loginIn() {
			this.$emit('onLogin')
		},
		fetchData: async function () {
			let that = this

			funcSearch()

		    let params = {
			    keywords: $('#inpSearch').val()
		    }
		    const res = await http.get(api.search, params)
		    if (res && res.data.code === 200) {
				this.show = true

				that.$root.bus.$emit('takeNum',res.data.result);

				that.$root.bus.$emit('takeName',$('#inpSearch').val());

				that.$emit('passData',res.data.result, this.show)
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


</style>
