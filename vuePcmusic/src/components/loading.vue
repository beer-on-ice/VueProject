<template>
    <!-- loading -->
    <div class="g_loadingbox" id="loadingBox">
        <i class="fa fa-spinner fa-spin fa-fw"></i>
        <span class="loading_text"><!-- Loading... --></span>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.g_loadingbox{
	/*display:none;*/
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
