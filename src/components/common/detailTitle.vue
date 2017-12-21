<template>
	<div class='taskDetailTitle'>
		<div class='width1280'>
			<a href='javascript:history.back(-1)'><i class='el-icon-arrow-left'></i> 返回</a>|
			<span>{{titleName}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:['titleName']
	}
</script>
<style>
	.taskDetailTitle{width: 100%;height:58px;border-bottom:1px solid #efeff0;line-height: 58px;box-sizing:border-box;margin-bottom: 20px;color: #333;}
	.taskDetailTitle a{display: inline-block;height:58px;padding:0 20px;line-height: 58px;color: #626262;}
	.taskDetailTitle span{display: inline-block;height:58px;padding:0 20px;line-height: 58px;}
</style>