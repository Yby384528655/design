<template>
	<div class='newTask mWidth664'>
		<div class='homepage'>
			<h3>新增搜索任务</h3>
			<div class='taskBox'>
				<el-row :gutter='20'>
					<el-col :span='21'>
           				<el-input v-model='searchWorld' @keyup.enter.native="searchClick" :maxlength="255">
                            <el-button type="primary" slot="append" icon="el-icon-search" @click="searchClick" >搜索</el-button>
                        </el-input>
					</el-col>
					<el-col :span='3'>
						<el-button type='primary' icon="el-icon-close" @click="searchClear" ></el-button>
					</el-col>
				</el-row>
			</div>
			<div class='language'>
				<p>选择目标语言（可多选）：</p>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for='(list,key) in language' :label="list" :key='key'>{{list.name}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
	</div>
</template>
<script>
    import searchApi from '../common/api/searchApi'
	export default{
		data(){
			return{
				searchWorld:'',
				language:[],
				checkList:[],
        		checkAll: false,
        		isIndeterminate: true
			}
		},
		methods:{
		    handleCheckAllChange(val) {
		        this.checkList = val ? this.language : [];
		        this.isIndeterminate = false;
		    },
		    handleCheckedCitiesChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.language.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.language.length;
		    },
			getLanguage(){
				searchApi.getLanguage().then((data)=>{
					let datalist=data.data;
					this.language=datalist.list;
				})
			},
			searchClear(){
				this.searchWorld='';
				 this.$router.push({path:'/taskList'});
			},
			searchClick(){
                let searchWorld=this.searchWorld.replace(/(^\s*)|(\s*$)/g, "");
                if(searchWorld==''||searchWorld.length==0){
                    this.$message({message:"请输入搜索关键词!",type:'info'});
                    return;
                }
                let languages='';
                for(var i=0;i<this.checkList.length;i++){
                	if(languages==''){
                		languages+=this.checkList[i].enName;
                	}else{
                		languages+=','+this.checkList[i].enName;
                	}
                }
                this.$router.push({path:'/taskList',query:{taskword:searchWorld,languages:languages}});
			}
		},
		mounted(){
			this.getLanguage();
		}
	}
</script>
<style scoped>
	.newTask{width:52%;margin:0 auto;padding-top: 10%;}
    .newTask h3{text-align: center;font-size: 16px;font-weight: normal;line-height: 36px;margin-bottom: 24px;}
	.taskBox .el-input-group__append .el-button{
		color: #fff;
	    background-color: #008cee;
	    border-color: #008cee;
	    position: relative;
	    height:36px;
	}
	.language{margin-top: 20px;}
	.language p{line-height: 30px;}
	.language .el-checkbox{line-height: 30px;width:16%;padding-right: 10px;box-sizing:border-box;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.language .el-checkbox+.el-checkbox{margin: 0;}
</style>