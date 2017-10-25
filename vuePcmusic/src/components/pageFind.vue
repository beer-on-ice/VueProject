<template>
    <!-- page_main 歌单：我喜欢的音乐 -->
	<div class="page_find R_page" id="pageFind">
		<div class="main_container">
			<div class="listcontainer">
				<div class="main">
					<div class="center">
						<!-- 导航栏 -->
						<div class="navbarwrap">
							<div class="navbar">
								<div class="nav">
									<span v-for="item,i in nav" :class="{active: i === act}" @click='change(i)'>{{item}}</span>
								</div>
							</div>
						</div>
						<!-- banner -->
						<div id="automatic">
						    <a class="prevImg" href="javascript:;"
							@click='prevImg'
							@mouseover='mouseoverPrev'
							@mouseout='mouseoutPrev'>
						        <span class="ico1"></span>
						        <span class="ico"></span>
						    </a>
						    <a class="nextImg" href="javascript:;"
							@click='nextImg'
							@mouseover='mouseoverNext'
							@mouseout='mouseoutNext'>
						        <span class="ico1"></span>
						        <span class="ico"></span>
						    </a>
							<div class="line"></div>

						    <ul class="picList">
								<li :class="classes[i]" v-for="item,i in banner"><a :href="item.url"><img :src="item.pic" alt=""/></a></li>
						    </ul>
							<div class="dotWrap">
								<span v-for='item,i in banner' class="dot" :class="{active: i === mark}" @click="bannerTog(i)"></span>
							</div>
						</div>
						<lineBar :name='names[0]'></lineBar>
						<ul id="personalizeList"  class="clearfix">
							<li v-for='item in personalized'>
								<div class="imgWrap">
									<span></span>
									<img :src="item.picUrl" alt="">
									<i class="fa fa-youtube-play" aria-hidden="true"></i>
									<span>{{item.count}}</span>
								</div>
								<span>{{item.name}}</span>
							</li>
						</ul>
						<lineBar :name='names[1]'></lineBar>
						<ul id="privatecontent"  class="clearfix">
							<li v-for="item in privatecontent">
								<img :src="item.sPicUrl" alt="">
								<span>{{item.copywriter}}</span>
							</li>
						</ul>
						<lineBar :name='names[2]'></lineBar>
						<ul id="newsong" class="clearfix">
							<li v-for='item in newsong'>
								<img :src="item.blurPicUrl" alt="">
								<span class='name'>{{item.name}}</span>
								<div>
									<i class='fa fa-youtube-play' v-show='item.type === 3'></i>
									<span>{{item.singer}}</span>
								</div>
							</li>
						</ul>
						<lineBar :name='names[3]'></lineBar>
						<ul id='mvs' class="clearfix" >
							<li v-for="item in mvs">
								<img :src="item.picUrl" alt="">
								<div class="mask">
									<i class="fa fa-video-camera"></i>
									<span>{{item.playCount}}</span>
								</div>
								<div class="namesinger">
									<span>{{item.name}}</span>
									<span>{{item.singer}}</span>
								</div>
							</li>
						</ul>
						<lineBar :name='names[4]'></lineBar>
						<ul id="djs">
							<li v-for="item in djs">
								<img :src="item.picUrl" alt="">
								<div class="namesinger">
									<span>{{item.name}}</span>
									<span>{{item.singer}}</span>
								</div>
							</li>
						</ul>
					</div>
                </div>
				<div class="left"></div>
				<div class="right"></div>
			</div>
		</div>
	</div>
</template>

<script>
import http from '../utils/http'
import api from '../utils/api'
import {css,startMove} from 'common/js/startmove'
import LineBar from './lineBar'
import nums from 'common/js/num'
import singerName from 'common/js/singerName'

export default {
	data() {
		return {
			nav: [
				'个性推荐',
				'歌单',
				'主播电台',
				'排行榜',
				'歌手',
				'最新音乐'
			],
			banner: [],
			classes:[
				'pos_1',
				'pos_2',
				'pos_3',
				'pos_4',
				'pos_5',
				'pos_6'
			],
			mark: 0,
			act: 0,
			attrs:[],
			names:[
				'推荐歌单',
				'独家放送',
				'最新音乐',
				'推荐MV',
				'主播电台'
			],
			personalized: [],
			privatecontent: [],
			newsong:[],
			mvs:[],
			djs:[],
			disable: true,
			timer: 0
		}
	},
	created() {
		this.fetchData()
	},
	mounted() {
		let that = this
		this.$nextTick(function() {
			that.timer = setInterval(()=> {
				that.nextImg()
			},3000)
			$('#automatic').mouseover(function() {
				clearInterval(that.timer)
			})
			$('#automatic').mouseout(function() {
				clearInterval(that.timer)
				that.timer = setInterval(()=> {
					that.nextImg()
				},3000)
			})
		})
	},
	methods: {
		change(index) {
			this.act = index
		},
		bannerTog(index) {
			this.mark = index
		},
		mouseoverPrev() {
			let prevSpan = $('.prevImg span');
			startMove({
	            el: prevSpan[1],
	            target: {
	                left: 12
	            },
	            time: 300,
	            type: "easeBoth"
	        });
	        startMove({
	            el: prevSpan[0],
	            target: {
	                opacity:1,
	                left: 12
	            },
	            time: 300,
	            type: "easeBoth"
	        });
		},
		mouseoverNext() {
			let nextSpan = $('.nextImg span');
			startMove({
			   el: nextSpan[1],
			   target: {
				   right: 12
			   },
			   time: 300,
			   type: "easeBoth"
			});
			startMove({
			   el: nextSpan[0],
			   target: {
				   opacity:1,
				   right: 12
			   },
			   time: 300,
			   type: "easeBoth"
			});
		},
		mouseoutPrev() {
			let prevSpan = $('.prevImg span');
			startMove({
	            el: prevSpan[1],
	            target: {
	                left: 0
	            },
	            time: 300,
	            type: "easeBoth"
	        });
	        startMove({
	            el: prevSpan[0],
	            target: {
	                opacity:0,
	                left: 0
	            },
	            time: 300,
	            type: "easeBoth"
	        });
		},
		mouseoutNext() {
			let nextSpan = $('.nextImg span');
			startMove({
	            el: nextSpan[1],
	            target: {
	                right: 0
	            },
	            time: 300,
	            type: "easeBoth"
	        });
	        startMove({
	            el: nextSpan[0],
	            target: {
	                opacity:0,
	                right: 0
	            },
	            time: 300,
	            type: "easeBoth"
	        });
		},
		prevImg() {
			if(this.disable) {
				for(var i = 0; i <$('.picList>li').length; i++){
					this.attrs[i] = {};
					this.attrs[i].width = css($('.picList>li')[i],"width");
					this.attrs[i].left = css($('.picList>li')[i],"left");
					this.attrs[i].top = css($('.picList>li')[i],"top");
					this.attrs[i].opacity = css($('.picList>li')[i],"opacity");
					this.attrs[i].zIndex = css($('.picList>li')[i],"zIndex");
				}
				this.attrs.push(this.attrs.shift());
				this.setStyle( $('.picList>li'), this.attrs);
				this.mark--
				if(this.mark < 0 ) {
					this.mark = $('.picList>li').length-1
				}
				// 避免多次点击出现bug
				this.disable = false
				setTimeout(()=> {
					this.disable = true
				},1000)
			}
		},
		nextImg() {
			if(this.disable) {
				for(var i = 0; i < $('.picList>li').length; i++){
					this.attrs[i] = {};
					this.attrs[i].width = css($('.picList>li')[i],"width");
					this.attrs[i].left = css($('.picList>li')[i],"left");
					this.attrs[i].top = css($('.picList>li')[i],"top");
					this.attrs[i].opacity = css($('.picList>li')[i],"opacity");
					this.attrs[i].zIndex = css($('.picList>li')[i],"zIndex");
				}
				this.attrs.unshift(this.attrs.pop());
				this.setStyle( $('.picList>li'), this.attrs)

				this.mark++
				if(this.mark >= $('.picList>li').length) {
					this.mark = 0
				}
				this.disable = false
				setTimeout(()=> {
					this.disable = true
				},1000)
			}

		},
		setStyle(wrap,attrs){
			let line = document.querySelector('.line');
			css(line,"opacity",0);
			for(var i = 0; i <wrap.length; i++){
				css(wrap[i],"zIndex",attrs[i].zIndex);
				startMove({
					el: wrap[i],
					target: attrs[i],
					time: 500,
					type: "easeOut",
					callBack: function(){
						startMove({
							el:line,
							target:{opacity:1},
							time: 200,
							type: "easeOut"
						});
					}
				});
			}
		},
		fetchData: async function() {
			let params = {
				limit: 4
			}
			const res = await http.get(api.banner)
			const res2 = await http.get(api.personalized)
			const res3 = await http.get(api.personalized2,params)
			const res4 = await http.get(api.privatecontent)
			const res5 = await http.get(api.newsong)
			const res6 = await http.get(api.mv)
			const res7 = await http.get(api.djprogram)

			for(var i=0;i< res.data.banners.length;i++) {
				this.banner.push({pic:res.data.banners[i].pic,url:res.data.banners[i].url,id:res.data.banners[i].targetId})
			}
			for(var i=0;i< res2.data.result.length;i++) {
				this.personalized.push({name: res2.data.result[i].name,id: res2.data.result[i].id,picUrl:res2.data.result[i].picUrl,count:nums(res2.data.result[i].playCount)})
			}
			for(var i=0;i< res3.data.playlists.length;i++) {
				this.personalized.push({name: res3.data.playlists[i].name,id: res3.data.playlists[i].id,picUrl:res3.data.playlists[i].coverImgUrl,count:nums(res3.data.playlists[i].playCount)})
			}
			for(var i=0;i< res4.data.result.length;i++) {
				this.privatecontent.push({copywriter: res4.data.result[i].copywriter,id: res4.data.result[i].id,sPicUrl:res4.data.result[i].sPicUrl})
			}
			for(var i=0;i< res5.data.result.length;i++) {
				this.newsong.push({name: res5.data.result[i].name,id: res5.data.result[i].song.album.id,blurPicUrl:res5.data.result[i].song.album.blurPicUrl,singer: res5.data.result[i].song.album.artists[0].name,type:res5.data.result[i].song.album.status})
			}
			for(var i=0;i< res6.data.result.length;i++) {
				this.mvs.push({name: res6.data.result[i].name,id: res6.data.result[i].id,picUrl:res6.data.result[i].picUrl,playCount: res6.data.result[i].playCount,singer:singerName(res6.data.result[i].artists)})
			}
			for(var i=0;i< res7.data.result.length;i++) {
				this.djs.push({name: res7.data.result[i].name,id: res7.data.result[i].id,picUrl:res7.data.result[i].picUrl,singer:res7.data.result[i].program.radio.name})
			}
		}
	},
	components: {
		LineBar
	}
}
</script>

<style lang='css'>
.page_find {
	top: 0;
	width: 100%;
}
.main {
	float: left;
	width: 100%;
}
.center {
	margin: 0 80px;
}
.left {
	margin-left: -100%;
	float: left;
	width: 80px;
}
.right {
	margin-left: -80px;
	float: left;
	width: 80px;
}

.page_find .navbarwrap {
	width: 100%;
	height:40px;
	padding: 0 80px;
	box-sizing: border-box;
	border-bottom:1px solid #ccc;
}
.page_find .navbar {
	width: 700px;
	color: black;
	font:18px/30px '微软雅黑';
	margin: 20px auto;
}
.page_find .navbar span {
	float:left;
	padding: 0 20px;
	cursor: pointer;
}
.navbarwrap .active {
	color: #c62f2f;
}

#automatic {
    width: 100%;
    height: 300px;
    position: relative;
    margin: 40px auto 0;
    overflow: hidden;
}

#automatic img {
	width:100%;
}

#automatic .prevImg {
    width: 120px;
    height: 72px;
    position: absolute;
    top: 80px;
    left: 72px;
    z-index: 4;
}

#automatic .prevImg .ico {
    width: 76px;
    height: 112px;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../common/images/img/prev.png);
}

#automatic .prevImg .ico1 {
    width: 76px;
    height: 112px;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../common/images/img/prev_1.png);
    z-index: 2;
    filter: alpha(opacity=0);
    opacity: 0;
}

#automatic .nextImg {
    width: 120px;
    height: 72px;
    position: absolute;
    top: 80px;
    right: 72px;
    z-index: 4;
}

#automatic .nextImg .ico {
    width: 76px;
    height: 112px;
    position: absolute;
    top: 0;
    right: 0;
    background: url(../common/images/img/next.png) no-repeat;
}

#automatic .next .ico1 {
    width: 76px;
    height: 112px;
    position: absolute;
    top: 0;
    right: 0px;
    background: url(../common/images/img/next_1.png) no-repeat;
    z-index: 2;
    filter: alpha(opacity=0);
    opacity: 0;
}

#automatic ul {
    width: 100%;
    height: 260px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

#automatic li {
    position: absolute;
}

#automatic .line {
    border: 4px solid #fff;
    width: 672px;
    height: 260px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -340px;
    z-index: 3;
}

#automatic .pos_1 {
    top: -106px;
    left: 150px;
    z-index: 2;
    filter: alpha(opacity=60);
    opacity: 0.6;
	width:270px;
}

#automatic .pos_2 {
    top: 43px;
    left: 150px;
    z-index: 3;
    filter: alpha(opacity=80);
    opacity: 0.8;
	width:500px;
}

#automatic .pos_3 {
    top: 0;
    left: 430px;
    z-index: 4;
	width:680px;
}

#automatic .pos_4 {
    top: 43px;
    right: 150px;
    z-index: 3;
    filter: alpha(opacity=80);
    opacity: 0.8;
	width:500px;
}

#automatic .pos_5 {
    top: -106px;
    right: 150px;
    z-index: 2;
    filter: alpha(opacity=60);
    opacity: 0.6;
	width:270px;
}

#automatic .pos_6 {
    top: -106px;
    right: 0;
    z-index: 1;
    filter: alpha(opacity=0);
    opacity: 0;
	width:270px;
}

#automatic .dotWrap {
	position: absolute;
	bottom:0;
	left:650px;
}

#automatic .dot {
	float:left;
	width:30px;
	height:2px;
	margin: 0 5px;
	background: #ccc;
}

#automatic .active {
	background: red;
}

#personalizeList {
	margin: 20px 0 0 70px;
}

#personalizeList li {
	float:left;
	margin:10px 40px;
	width:200px;
	height:260px;
}

#personalizeList .imgWrap {
	position:relative;
	width:200px;
	height:200px;
}

#personalizeList .imgWrap img {
	width:200px;
	height:200px;
}

#personalizeList .imgWrap .fa {
	position: absolute;
	top:5px;
	left: 110px;
	color: #fff;
}

#personalizeList .imgWrap span {
	width:100%;
	height:26px;
	margin:0;
	position:absolute;
}

#personalizeList .imgWrap span:nth-of-type(2) {
	top:0;
	left:60px;
	color:#fff;
	font:14px/26px '微软雅黑';
}

#personalizeList .imgWrap span:nth-of-type(1) {
	top:0;
	left:0;
	background:rgba(0,0,0,0.2);
}

#personalizeList span {
	float:left;
	width:200px;
	margin-top: 20px;
	text-align:center;
	font:16px/20px '微软雅黑';
}

#privatecontent {
	margin:20px 0 50px;
}

#privatecontent li {
	float:left;
	margin-left:40px;
}

#privatecontent li img {
	width:450px;
}

#privatecontent li span {
	float:left;
	font:18px/30px '微软雅黑';
	margin-top:10px;
}

#newsong {
	margin:50px 0 0 200px;
}

#newsong li {
	width:600px;
	float:left;
	margin-bottom:30px;
}

#newsong li img {
	float:left;
	width:150px;
}

#newsong li .name {
	float: left;
	width: 400px;
	margin: 20px 0 0 40px;
	font: 20px/40px '微软雅黑';
}

#newsong li div {
	float: left;
	width: 400px;
	margin: 20px 0 0 40px;
	font: 20px/40px '微软雅黑';
}

#newsong li div span {
	color:#ccc;
	float:left;
}

#newsong li .fa {
	color: red;
	font-size:20px;
	float:left;
	margin: 10px 10px 0 0;
}

#mvs {}

#mvs li {
	margin: 20px 40px 0 40px;
	width:300px;
	float:left;
	position: relative;
}

#mvs li .mask {
	width:100%;
	height:20px;
	background: rgba(0,0,0,.3);
	position:absolute;
	top:0;
	left:0;
	color:white;
}

#mvs li .mask .fa {
	position:absolute;
	right:60px;
	top:2px;
}

#mvs li .mask span {
	position:absolute;
	right:10px;
}

#mvs li img {
	width:300px;
}

#mvs li .namesinger span {
	display: block;
	width:300px;
	margin-top:10px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

#djs {}

#djs li {
	width:770px;
	float:left;
	margin-top:20px;
}

#djs li img {
	float:left;
	width:200px;
	height:200px;
}

#djs li div {
	float:left;
	margin: 20px 0 0 10px;
}

#djs li div span {
	display: block;
	font:20px/40px '微软雅黑';
}

#djs li div span:nth-of-type(2) {
	color:rgb(163, 161, 159);
}

</style>
