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
									<span v-for="item in nav">{{item}}</span>
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
								<span v-for='item,i in banner' class="dot" :class="{active: i === mark}"></span>
							</div>
						</div>
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
			attrs:[]
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
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
		},
		nextImg() {
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
			const res = await http.get(api.banner)
			for(var i=0;i<res.data.banners.length;i++) {
				this.banner.push({pic:res.data.banners[i].pic,url:res.data.banners[i].url,id:res.data.banners[i].targetId})
			}
		}
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
	border-bottom:2px solid #ccc;
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
</style>
