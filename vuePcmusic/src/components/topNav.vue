<template>
    <!-- page_menu 页面顶部菜单 -->
	<div class="page_menu clearfix">
		<div class="menu_logo"><img src="../common/images/netease-logo.png" alt=""></div>
		<div class="menu_btngroups">
			<a href="javascript:void(0);" class="btn backward"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
			<a href="javascript:void(0);" class="btn forward"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
		</div>
		<div class="menu_search">
			<input type="text" placeholder="探索音乐、歌手、歌词、用户" autofocus="" id="inpSearch" class="search_inp" value="handclap"/>
			<span class="search_btn" id="top_searchBtn"><i class="fa fa-search" aria-hidden="true"></i></span>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
/* ------------------------page_menu------------------------------- */
.page_menu  {
	position:fixed;
	top:0;left:0;
	width:100%;
	height:60px;
	padding:0 15px;
	box-sizing:border-box;
	background-color:#c52f30;
	z-index:9;
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
</style>
