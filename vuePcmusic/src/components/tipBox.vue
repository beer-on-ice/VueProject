<template>
    <div class="">
        <!-- backscreen -->
    	<div class="g_backscreen" id="backScreen"></div>
    	<!-- tips box -->
    	<div class="g_tipsbox" id="tipsBox">
    		<p class="tip tip_error show"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;&nbsp;<span class="tiptext">ERROR STRING</span></p>
    		<p class="tip tip_info"><i class="fa fa-info-circle" aria-hidden="true"></i>&nbsp;&nbsp;<span class="tiptext">INFO STRING</span></p>
    		<p class="tip tip_ok"><i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;&nbsp;<span class="tiptext">OK STRING</span></p>
    	</div>
        <!-- loading -->
        <div class="g_loadingbox" id="loadingBox">
            <i class="fa fa-spinner fa-spin fa-fw"></i>
            <span class="loading_text"><!-- Loading... --></span>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
/* ------------------------plugins------------------------------- */
/* plugins */
/* backscreen */
.g_backscreen{
	display:none;
	position:fixed;
	top:0;left:0;
	bottom:0;right:0;
	background-color:rgba(0,0,0,0.15);
	z-index:8;
}
/* tipsbox */
.g_tipsbox{
	display:none;
	position:fixed;
	top:50%;left:50%;
	padding:20px 30px;
	-webkit-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
	font-size:1.5rem;
	background-color:rgba(0,0,0,0.8);
	color:#f7f7f7;
	z-index:9;
	opacity:0;
	-webkit-animation:hideTipsBox 1s ease;
	animation:hideTipsBox 1s ease;
}
.g_tipsbox>.tip{
	display:none;
}
.g_tipsbox>.tip.show{
	display:block;
}
@-webkit-keyframes hideTipsBox{
	0%,80%{opacity:1;}
	100%{opacity:0;}
}
@keyframes hideTipsBox{
	0%,80%{opacity:1;}
	100%{opacity:0;}
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
}
.g_loadingbox{
	display:none;
	position:fixed;
	top:50%;left:50%;
	padding:10px;
	font-size:1.2rem;
	-webkit-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
	border-radius:8px;
	background-color:rgba(0,0,0,0.6);
	color:#f7f7f7;
}
</style>
