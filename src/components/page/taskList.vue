<template>
	<div class='taskList'>
        <titleTab :TabStatus='2'></titleTab>
        <div class='taskListBox width1280'>
			<div class='taskListButton'>
				<router-link to='/task' class='fr'><el-button type='primary' icon='el-icon-plus'>搜索任务</el-button></router-link>
				<el-button class='fr' icon='el-icon-clear' @click='ClearList'>清空</el-button>
				<el-button class='fr' icon='el-icon-delete' @click='deleteList'>删除</el-button>
				<span>平台搜索：平台数据庞大，客户数据精准；     搜索任务：平台搜索不到，添加搜索任务，全球网罗外贸数据</span>
			</div>
			<el-table ref="multipleTable" :data="taskLists" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @row-click='rowClick'>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="关键词" width="200">
					<template slot-scope="scope">
						<div class='wordName'>
					  		<p :title='scope.row.keywords'>{{ scope.row.keywords }}</p>
					  	</div>
				  	</template>
				</el-table-column>
				<el-table-column prop="time" label="搜索时间">
					<template slot-scope="scope">
						<div>
					  		<p :title='scope.row.time|date'>{{ scope.row.time|date }}</p>
					  	</div>
				  	</template>
				</el-table-column>
				<el-table-column prop="status" label="搜索状态"></el-table-column>
				<el-table-column prop="completedTime" label="完成时间">
					<template slot-scope="scope">
						<div>
					  		<p :title='scope.row.completedTime|date'>{{ scope.row.completedTime|date }}</p>
					  	</div>
				  	</template>
				</el-table-column>
				<el-table-column prop="siteHomeCount" label="主页数量"></el-table-column>
				<el-table-column prop="mailCount" label="邮箱数量"></el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next, jumper" :current-page='currentPage' :total="totalNum" @current-change='currentChange'></el-pagination>

        </div>
	</div>
</template>
<script>
    import searchApi from '../common/api/searchApi'
    import titleTab from '../common/searchTitleTab.vue'
	export default{
        components:{
            titleTab
        },
        data(){
        	return{
        		taskLists:[],
        		multipleTable:[],
        		currentPage:1,
        		totalNum:0,
        		taskword:'',
        		languages:'',
        	}
        },
        watch:{
			$route(){
		        let currentPage=this.$route.query.currentPage;
		        if(currentPage!=""&&currentPage!=null&&currentPage!=undefined){
	        		this.currentPage=parseInt(currentPage);
		        }else{
	        		this.currentPage=1;
		        }
		        let taskword=this.$route.query.taskword;
		        if(taskword!=""&&taskword!=null&&taskword!=undefined){
	        		this.taskword=taskword;
		        }else{
	        		this.taskword='';
		        }
		        let languages=this.$route.query.languages;
		        if(languages!=""&&languages!=null&&languages!=undefined){
	        		this.languages=languages;
		        }else{
	        		this.languages='';
		        }
				this.getdata();
			}
		},
        methods:{
        	ClearList(){
        		this.$confirm('确定清空所有的搜索任务，此操作不可逆!', '清空确认', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          
		        }).catch(() => {
		          this.$message({type: 'info',message: '已取消清空'});          
		        });
        	},
        	deleteList(){
				if(this.multipleTable.length==0){
					this.$message({message:"请选择公司",type:'info'});
					return;
				}
				let orgIdList=[];
				for(var i=0;i<this.multipleTable.length;i++){
					if(!this.multipleTable[i].obtained){
						orgIdList.push(this.multipleTable[i].id);
					}
				}
				this.$confirm('确定删除已选择的搜索任务，此操作不可逆!', '删除确认', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          searchApi.deleteTask({id:orgIdList}).then((data)=>{
		          	let datalist=data.data;
		          	if(datalist.code==0){
			          	this.$message({type: 'success',message: '删除成功' }); 
				        this.getdata();
		          	}else{
			          	this.$message({ type: 'error',message: datalist.msg }); 
		          	}
		          },(error)=>{
		          	this.$message({type: 'error',message: error});   
		          })
		        }).catch(() => {
		          this.$message({type: 'info',message: '已取消删除'});          
		        });

        	},
        	rowClick(val, event, column){
				if(column.type=='selection'){
					return;
				}
				this.$router.push({path:"/taskDetail",query:{id:val.id}})
        	},
        	handleSelectionChange(val){
        		this.multipleTable=val;
        	},
			currentChange(val){
				this.$router.push({path:'/taskList',query:{currentPage:val,keywords:this.taskword,languages:this.languages}})
			},
			getdata(){
				let params='pageIndex='+this.currentPage+'&pageSize=10&keywords='+this.taskword+'&languages='+this.languages;
				searchApi.taskList(params).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						this.taskLists=datalist.data;
						this.totalNum=datalist.max;
					}else{
						this.$message({message:datalist.msg,type:"error"});
					}
				})
			},
        },
        mounted(){
	        let currentPage=this.$route.query.currentPage;
	        if(currentPage!=""&&currentPage!=null&&currentPage!=undefined){
        		this.currentPage=parseInt(currentPage);
	        }else{
        		this.currentPage=1;
	        }
	        let taskword=this.$route.query.taskword;
	        if(taskword!=""&&taskword!=null&&taskword!=undefined){
        		this.taskword=taskword;
	        }else{
        		this.taskword='';
	        }
	        let languages=this.$route.query.languages;
	        if(languages!=""&&languages!=null&&languages!=undefined){
        		this.languages=languages;
	        }else{
        		this.languages='';
	        }
			this.getdata();
        }
    }
</script>
<style>
.taskListButton {margin-bottom: 20px;}
.taskListButton .el-button{margin-left: 20px;}
.taskListButton>span{color:#666;line-height: 36px;}
</style>
<style>
	.taskList .el-table__body-wrapper{cursor: pointer;}
	.taskList .el-table{color: #000;border:1px solid #dcdcdc;}
	.taskList .el-table th{background: #fff;height: 54px;}
	.taskList .el-table th>.cell{background: #fff;color:#000;}
	.taskList .el-table .cell{height:54px;line-height: 54px;color:#333;}
	.taskList .el-table td,.SearchList  .el-table th.is-leaf{height:54px;line-height: 54px;padding:0;}
</style>
