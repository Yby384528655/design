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
        <div class='messBoxBg' v-if='messBoxCont' @click.stop='messBoxCont=false'>
        	<div class='messBox' @click.stop='returnFalse'>
        		<div class='messBoxtitle'>
        			<p>{{isDelete==1?"删除确认":"清空确认"}}<span @click.stop='messBoxCont=false'><i class='el-icon-close'></i></span></p>
        		</div>
        		<div class='messBoxCont'>
        			<p><span><i class='el-icon-warning'></i></span>{{isDelete==1?"确定删除已选择的搜索任务，此操作不可逆!":"确定清空所有的搜索任务，此操作不可逆!"}}</p>
        		</div>
        		<div class='messBoxBtn'>
        			<el-button @click.stop='messBoxCont=false'>取消</el-button>
        			<el-button type='primary' icon='el-icon-delete' v-if='isDelete==1' @click.stop='deleteDetail'>删除</el-button>
        			<el-button type='primary' icon='el-icon-clear' v-else @click.stop='ClearDetail'>清空</el-button>
        		</div>
        	</div>
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
        		keywords:'',
        		languages:'',
        		messBoxCont:false,
        		isDelete:1,
        		orgIdList:[],
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
		        let keywords=this.$route.query.keywords;
		        if(keywords!=""&&keywords!=null&&keywords!=undefined){
	        		this.keywords=keywords;
		        }else{
	        		this.keywords='';
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
        	returnFalse(){
        		return;
        	},
        	ClearList(){
        		this.messBoxCont=true;
        		this.isDelete=2;
        	},
        	ClearDetail(){
    			this.messBoxCont=false;
    			searchApi.deleteAllTask().then((data)=>{
    				let datalist=data.data;
		          	if(datalist.code==0){
			          	this.$message({type: 'success',message: '删除成功' }); 
	        			this.messBoxCont=false;
	        			this.currentChange(1);
		          	}else{
			          	this.$message({ type: 'error',message: datalist.msg }); 
		          	}
    			})
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
				this.orgIdList=orgIdList;
        		this.messBoxCont=true;
        		this.isDelete=1;
        	},
        	deleteDetail(){
	          searchApi.deleteTask({id:this.orgIdList}).then((data)=>{
	          	let datalist=data.data;
	          	if(datalist.code==0){
		          	this.$message({type: 'success',message: '删除成功' }); 
        			this.messBoxCont=false;
			        this.getdata();
	          	}else{
		          	this.$message({ type: 'error',message: datalist.msg }); 
	          	}
	          },(error)=>{
	          	this.$message({type: 'error',message: error});   
	          })
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
				this.$router.push({path:'/taskList',query:{currentPage:val,keywords:this.keywords,languages:this.languages}})
			},
			getdata(){
				let params='pageIndex='+this.currentPage+'&pageSize=10&keywords='+this.keywords+'&languages='+this.languages;
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
	        let keywords=this.$route.query.keywords;
	        if(keywords!=""&&keywords!=null&&keywords!=undefined){
        		this.keywords=keywords;
	        }else{
        		this.keywords='';
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
	.messBoxBg{position: fixed;left:0;top:0;background: rgba(0,0,0,.3);width: 100%;height: 100%;z-index: 10;}
	.messBox{width: 42%;position: absolute;left:29%;background: #fff;height:232px;top:50%;margin-top: -116px;}
	.messBoxtitle{height:48px;background: -prefix-linear-gradient(left, #0a86ff, #4bc3ff);background: linear-gradient(to right, #0a86ff, #4bc3ff); }
	.messBoxtitle p{padding-left:20px; color:#fff;line-height: 48px;font-size: 16px;}
	.messBoxtitle p span{display: inline-block;width: 48px;height: 48px;float: right;text-align: center;cursor: pointer;}
	.messBoxCont{text-align: center;padding-top: 40px;}
	.messBoxCont p{line-height: 20px;font-size: 16px;}
	.messBoxCont p span{padding-right: 20px;font-size: 20px;color:#ff4545;}
	.messBoxBtn{position: absolute;bottom:20px;text-align: right;padding-right: 20px;box-sizing:border-box;width:100%;}
</style>
<style>
	.taskList .el-table__body-wrapper{cursor: pointer;}
	.taskList .el-table{color: #000;border:1px solid #dcdcdc;}
	.taskList .el-table th{background: #fff;height: 54px;}
	.taskList .el-table th>.cell{background: #fff;color:#000;}
	.taskList .el-table .cell{height:54px;line-height: 54px;color:#333;}
	.taskList .el-table td,.SearchList  .el-table th.is-leaf{height:54px;line-height: 54px;padding:0;}
</style>
