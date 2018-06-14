<template>
    <div class="linewrap">
        <div class="line">
            <span>{{name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'name'
    ]
}
</script>

<style>
.linewrap {
	width: 100%;
	height:40px;
	box-sizing: border-box;
	border-bottom:1px solid #ccc;
    margin-top:30px;
}
.linewrap .line {
	width: 700px;
	font:20px/30px '微软雅黑';
}
.linewrap .line span {
	float:left;
}
</style>
