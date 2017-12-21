<template>
	<div class='taskDetail'>
		<DetailTitle :titleName='"任务详情"'></DetailTitle>
		<div class='taskDetailBox width1280'>
			<div class='taskDetailButton'>
				<el-button type='primary' icon='el-icon-download' @click.stop='getCheckedEmail'>获取邮箱</el-button>
				<el-button icon='el-icon-message' @click.stop='sendEmail'>邮件营销</el-button>
			</div>
			<el-table ref="multipleTable" :data="taskDetailList" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="标题" width="300">
					<template slot-scope="scope">
						<div class='wordName'>
					  		<p :title="scope.row.title">{{scope.row.title}}</p>
					  	</div>
				  	</template>
				</el-table-column>
				<el-table-column label="描述" width="300">
					<template slot-scope="scope">
						<div class='description'>
					  		<p :title='scope.row.description'>{{scope.row.description}}</p>
					  	</div>
				  	</template>
				</el-table-column>
				<el-table-column label="主页/链接">
					<template slot-scope="scope">
						<div>
					  		<a :href='scope.row.siteHome' target='_blank'>{{scope.row.siteHome}}</a>
					  	</div>
				  	</template>
				</el-table-column>
				<el-table-column label="邮箱数量">
					<template slot-scope="scope">
						<div class='mailCount'>
					  		<p :title='scope.row.mailCount'>{{ scope.row.mailCount }}</p>
							<el-button type='primary' icon='el-icon-download' v-if='!scope.row.obtained' @click.stop='getEmail(scope.row,scope.$index)'>获取邮箱</el-button>
							<span v-else><i class='el-icon-success'></i> 已获取</span>
					  	</div>
				  	</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next, jumper" :current-page='currentPage' :total="totalNum" @current-change='currentChange'></el-pagination>
		</div>
	</div>
</template>
<script>
    import searchApi from '../common/api/searchApi'
	import DetailTitle from '../common/detailTitle.vue'
	export default{
		components:{
			DetailTitle
		},
		data(){
			return{
				taskDetailList:[],
				id:'',
				currentPage:1,
				totalNum:0,
				multipleTable:[],
			}
		},
		methods:{
			sendEmail(){
				if(this.multipleTable.length==0){
					this.$message({message:"请选择公司",type:'info'});
					return;
				}
				let orgIdList=[];
				for(var i=0;i<this.multipleTable.length;i++){
					if(this.multipleTable[i].obtained&&this.multipleTable[i].mails!=null){
						// orgIdList.push(this.multipleTable[i].id);
						orgIdList.concat( this.multipleTable[i].mails );
					}
				}
			},
			getCheckedEmail(){
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
				searchApi.getEmail({"orgId":orgIdList}).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						for(var i=0;i<this.taskDetailList.length;i++){
							for(var j=0;j<orgIdList.length;j++){
								if(this.taskDetailList[i].id==orgIdList[j]){
									this.taskDetailList[i].obtained=true;
									this.taskDetailList[i].mailCount=datalist.data[j].mails.length;
								}
							}
						}
					}else{
						this.$message({message:datalist.msg,type:"error"});
					}
				},(error)=>{
					console.log(error);
				})
			},
			getEmail(val,index){
				searchApi.getEmail({orgId:[val.id]}).then((data)=>{
					let datalist=data.data;
					// this.taskDetailList[index].obtained=true;
					if(datalist.code==0){
						this.taskDetailList[index].obtained=true;
						this.taskDetailList[index].mailCount=datalist.data[0].mails.length;
					}else{
						this.$message({message:datalist.msg,type:"error"});
					}
				},(error)=>{
					console.log(error);
				})
			},
        	handleSelectionChange(val){
        		this.multipleTable=val;
        	},
        	currentChange(val){
        		this.currentPage=val;
        		this.getDetail();
        	},
        	getDetail(){
        		let parameters='id='+this.id+'&pageIndex='+this.currentPage+'&pageSize=10';
				searchApi.taskDetail(parameters).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						this.taskDetailList=datalist.data;
						this.totalNum=datalist.max;
					}else{
						this.$message({message:datalist.msg,type:"error"});
					}
				})
        	},
		},
		mounted(){
			let id=this.$route.query.id;
			if(id!=''&&id!=null){
				this.id=id;
				this.getDetail();
			}
		}
	}
</script>
<style>
.taskDetailButton{margin-bottom: 20px;}
.mailCount p{display: inline-block;line-height: 36px;width:50px;}
.mailCount >span{color:#009944;}
.description p{max-height: 54px;overflow: hidden;overflow: hidden; text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}
</style>
<style>
	.taskDetail .el-table{color: #000;border:1px solid #dcdcdc;}
	.taskDetail .el-table th{background: #fff;height: 54px;}
	.taskDetail .el-table th>.cell{background: #fff;color:#000;}
	.taskDetail .el-table .cell{line-height: 17px;color:#333;}
	.taskDetail .el-table td,.SearchList  .el-table th.is-leaf{height:54px;line-height: 54px;padding:0;}
</style>