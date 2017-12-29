<template>
	<div class='SearchList'>
        <titleTab :TabStatus='1'></titleTab>
		<div class='SearchListBox width1280'>
			<div class='SearchListButton'>
				<el-button type='primary' icon='el-icon-download' @click.stop='getCheckedEmail'>获取邮箱</el-button>
				<el-button icon='el-icon-message' @click.stop='sendEmail'>邮件营销</el-button>
				<router-link to='/Home' class='fr'><el-button type='primary' icon='el-icon-plus'>新增搜索</el-button></router-link>
			</div>
			<el-table ref="multipleTable" :data="searchLists" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @row-click='rowClick'>
				<el-table-column type="selection" width="55"></el-table-column>
<!-- 				<el-table-column label="公司名称" width="200">
					<template slot-scope="scope">
						<div class='companyName'>
					  		<p :title='scope.row.name'>{{ scope.row.name }}</p>
					  		<img src='../../../static/img/iscustomer.png' v-if='scope.row.customerId'>
					  	</div>
				  	</template>
				</el-table-column> -->
				<el-table-column label="主页" width="300">
					<template slot-scope="scope">
						<div class='website'>
							<p :title='scope.row.webSite'>{{ scope.row.webSite }}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="country" label="国家"></el-table-column>
<!-- 				<el-table-column prop="city" label="城市"></el-table-column>
				<el-table-column prop="industrys" label="行业"></el-table-column>
				<el-table-column label="主页" width="200">
					<template slot-scope="scope">
						<div class='website'>
							<p :title='scope.row.webSite'>{{ scope.row.webSite }}</p>
						</div>
					</template>
				</el-table-column> -->
				<el-table-column prop="mailCount" label="邮箱数量"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class='operator'>
							<el-button type='primary' icon='el-icon-download' v-if='!scope.row.obtained' @click.stop='getEmail(scope.row,scope.$index)'>获取邮箱</el-button>
							<span v-else><i class='el-icon-success'></i> 已获取</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next, jumper" :current-page='currentPage' :total="totalNum" @current-change='currentChange'></el-pagination>
		</div>
		<div class='SourchNone' v-if='SourchNone' @click.stop='SourchNone=false'>
			<div class='SourchNoneBox' @click.stop='returnSourNone'>
				<div class='SourchNoneBoxTitle'>
					<p>尊敬的用户：</p>
					<span><i class='el-icon-close' @click.stop='SourchNone=false'></i></span>
				</div>
				<div class='SourchNoneBoxBody'>
					<p>通过搜索设置，平台内暂未搜到合适的信息</p>
					<p>若需搜索，可添加搜索任务</p>
					<router-link to='/task'><el-button type='primary' icon='el-icon-plus'>搜索任务</el-button></router-link>
					<p><span>搜索需时间，有结果会邮件通知您</span></p>
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
				searchLists:[],
				multipleTable:[],
				currentPage:1,
				totalNum:0,
				SourchNone:false,
				keywords:'',
				// industrys:'',
				countrys:'',
				// haveWebSite:'',
			}
		},
		watch:{
			$route(){
		        let keywords=this.$route.query.keywords;
		        if(keywords!=''&&keywords!=null&&keywords!=undefined){
		        	this.keywords=keywords;
		        }else{
		        	this.keywords='';
		        }
		        // let industrys=this.$route.query.industrys;
		        // if(industrys!=''&&industrys!=null&&industrys!=undefined){
		        // 	this.industrys=industrys;
		        // }else{
		        // 	this.industrys='';
		        // }
		        let countrys=this.$route.query.countrys;
		        if(countrys!=''&&countrys!=null&&countrys!=undefined){
		        	this.countrys=countrys;
		        }else{
		        	this.countrys='';
		        }
		        // let haveWebSite=this.$route.query.haveWebSite;
		        // if(haveWebSite!=''&&haveWebSite!=null&&haveWebSite!=undefined){
		        // 	this.haveWebSite=haveWebSite;
		        // }else{
		        // 	this.haveWebSite='';
		        // }
		        let currentPage=this.$route.query.currentPage;
		        if(currentPage!=""&&currentPage!=null&&currentPage!=undefined){
	        		this.currentPage=parseInt(currentPage);
		        }else{
	        		this.currentPage=1;
		        }
				this.getdata();
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
						for(var i=0;i<this.searchLists.length;i++){
							for(var j=0;j<orgIdList.length;j++){
								if(this.searchLists[i].id==orgIdList[j]){
									this.searchLists[i].obtained=true;
									this.searchLists[i].mailCount=datalist.data[j].mails.length;
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
				console.log(val,index);
				searchApi.getEmail({"orgId":[val.id]}).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						this.searchLists[index].obtained=true;
						this.searchLists[index].mailCount=datalist.data[0].mails.length;
					}else{
						this.$message({message:datalist.msg,type:"error"});
					}
					// console.log(datalist);
				},(error)=>{
					console.log(error);
				})
			},
			rowClick(val, event, column){
				if(column.type=='selection'){
					return;
				}
				this.$router.push({path:"/detail",query:{id:val.id}})
			},
			returnSourNone(){
				return;
			},
			handleSelectionChange(val){
				this.multipleTable=val;
			},
			currentChange(val){
				// industrys:this.industrys,,haveWebSite:this.haveWebSite
				this.$router.push({path:'/searchList',query:{keywords:this.keywords,countrys:this.countrys,currentPage:val}})
				console.log(val);
			},
			getdata(){
				// +'&industrys='+this.industrys+'&haveWebSite='+this.haveWebSite
				let parameters='keywords='+this.keywords+'&countrys='+this.countrys+'&pageIndex='+this.currentPage+'&pageSize=10';
				searchApi.SearchList(parameters).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						this.searchLists=datalist.data;
						this.totalNum=datalist.max;
					}else{
						this.$message({message:datalist.msg,type:"error"});
					}
				})
			},
		},
		mounted(){
			let hasNotSerach=this.$route.query;
			if(hasNotSerach.keywords!=''&&hasNotSerach.keywords!=null&&hasNotSerach.keywords!=undefined){
		        let keywords=this.$route.query.keywords;
		        if(keywords!=''&&keywords!=null&&keywords!=undefined){
		        	this.keywords=keywords;
		        }else{
		        	this.keywords='';
		        }
		        // let industrys=this.$route.query.industrys;
		        // if(industrys!=''&&industrys!=null&&industrys!=undefined){
		        // 	this.industrys=industrys;
		        // }else{
		        // 	this.industrys='';
		        // }
		        let countrys=this.$route.query.countrys;
		        if(countrys!=''&&countrys!=null&&countrys!=undefined){
		        	this.countrys=countrys;
		        }else{
		        	this.countrys='';
		        }
		        // let haveWebSite=this.$route.query.haveWebSite;
		        // if(haveWebSite!=''&&haveWebSite!=null&&haveWebSite!=undefined){
		        // 	this.haveWebSite=haveWebSite;
		        // }else{
		        // 	this.haveWebSite='';
		        // }
				this.getdata();
			}
		}
	}
</script>
<style scoped>
	.SearchListButton{margin-bottom: 20px;color:#333;}
	.companyName{position: relative;padding-left: 40px;}
	.companyName img{position: absolute;left: 0;top:0;}
	.companyName p{width:124px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-weight: bold;}
	.website p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width:164px;color:#008cee;}
	.operator>span{display: inline-block;color:#009944;}
	.SourchNone{position: fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.3);z-index:10;}
	.SourchNoneBox{position: relative;z-index: 11;background: #fff;width:600px;height:350px;margin:auto;top:50%;margin-top: -175px;}
	.SourchNoneBoxTitle{width:600px;background:url('../../../static/img/SearchNone.jpg') no-repeat;background-size: 100%;height:120px;color:#fff;}
	.SourchNoneBoxTitle p{display: inline-block;padding-left: 25px;padding-top: 25px;}
	.SourchNoneBoxTitle span{float: right;font-size: 24px;margin-right: 20px;margin-top: 20px;cursor: pointer;}
	.SourchNoneBoxBody {padding-top: 30px;text-align: center;}
	.SourchNoneBoxBody p{height: 20px;line-height: 20px;}
	.SourchNoneBoxBody p span{color: #959595;}
	.SourchNoneBoxBody .el-button{margin-top: 20px;margin-bottom: 20px;}
</style>
<style>
	.SearchList .el-table__body-wrapper{cursor: pointer;}
	.SearchList .el-table{color: #000;border:1px solid #dcdcdc;}
	.SearchList .el-table th{background: #fff;height: 54px;}
	.SearchList .el-table th>.cell{background: #fff;color:#000;}
	.SearchList .el-table .cell{height:54px;line-height: 54px;color:#333;}
	.SearchList .el-table td,.SearchList  .el-table th.is-leaf{height:54px;line-height: 54px;padding:0;}
	.SearchList .el-table thead tr th:nth-child(2) .cell{padding-left: 60px;font-weight: bold;}
</style>
