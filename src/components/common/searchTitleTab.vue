<template>
	<div class='SearchListTitle'>
		<div class='width1280'>
			<router-link to='/searchList' :class='TabStatus==1?"active":""'>平台搜索</router-link>
			<router-link to='/taskList' :class='TabStatus==2?"active":""'>搜索任务</router-link>
		</div>
	</div>
</template>
<script>
	export default{
		props:["TabStatus"],
	}
</script>
<style>
	.SearchListTitle{width: 100%;height:58px;border-bottom:1px solid #efeff0;margin-bottom: 20px;}
	.SearchListTitle a{display: inline-block;height:42px;padding:0 30px;line-height: 42px;position: relative;top:16px;color: #626262;}
	.SearchListTitle .active{display: inline-block;height:43px;padding:0 30px;line-height: 43px;position: relative;top:14px;border-left:1px solid #dcdcdc;border-right:1px solid #dcdcdc;border-top:2px solid #008cee;background: #fff;color:#000;}
</style>