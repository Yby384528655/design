<template>
	<div class='detail'>
		<DetailTitle :titleName='"公司详情"'></DetailTitle>
		<div class='DetailCont width1280'>
			<div class='DetailContTitle'>
				<h3 :title='company.name'>{{company.name}}</h3>
				<a :href='company.siteHome' target="_blank">{{company.siteHome}}</a>
				<div class='fr'>
					类似公司：{{company.similarOrgCount}}<span>|</span>总海关数据：{{company.allCustomsDataCount}}
				</div>
			</div>
			<div class='DetailMainCont detailBorBox'>
				<h4>公司基本信息</h4>
				<div>
					<p>国家：<span :title='company.country'>{{company.country}}</span></p>
					<p>行业：<span :title='company.industry'>{{company.industry}}</span></p>
					<p>公司规模：<span :title='company.companySize'>{{company.companySize}}</span></p>
					<p>年销售额：<span :title='company.annualSales'>{{company.annualSales}}</span></p>
					<p>海关数据：<span>{{company.customsDatas!=null?company.customsDatas.length:0}}</span></p>
					<p>电话：<span :title='company.tell'>{{company.tell}}</span></p>
					<p>传真：<span :title='company.fax'>{{company.fax}}</span></p>
					<p style='width:60%;'>公司地址：<span :title='company.address'>{{company.address}}</span></p>
				</div>
				<p>公司聚焦LED科技发展前沿，重视自主创新，研发生产基地超过23万㎡，拥有近500名多学科跨专业的综合研发团队，共申请国内外专利392项，已授权专利274项。公司研发生产众多拥有自主专利技术的LED产品：高分辨率高效节能运行可靠的LED显示屏、散热好光效高合理配光的LED工程照明系列、完全替代100W白炽灯规范要求的LED球泡灯（10W）及室内LED照明系列、船级社认证拥有自主专利的LED船用灯系列、高显指医用手术LED无影灯及3D医疗直播系统、超高密度小间距LED显示屏、户外无玻化小间距LED显示屏、专用工艺制造的陶瓷模块化LED路灯、融合智慧城市理念的LED智慧路灯等，以及上述产品相应的应用解决方案，多类产品份额占市场前列。</p>
			</div>
			<div class='DetailContTitle'>
				<h3>邮箱地址（共{{company.mails!=null?company.mails.length:0}}个）</h3>
				<el-button type='primary' icon='el-icon-download' @click.stop='getEmail'>获取邮箱</el-button>
				<el-button icon='el-icon-message' @click.stop='sendEmail'>邮件营销</el-button>
			</div>
			<div class='detailBorBox EmailList' v-if='company.mails!=null&&company.mails.length>0'>
				<el-row>
					<el-col :span='6' v-for='(list,key) in company.mails' :key='key'>
						<span :title='list'>{{list}}</span>
					</el-col>
				</el-row>
			</div>
			<div class='DetailContTitle'>
				<h3>海关数据（共{{company.customsDatas!=null?company.customsDatas.length:0}}个）</h3>
			</div>
			<div class='detailBorBox trade' v-for='list in company.customsDatas' v-if='company.customsDatas!=null'>
				<h4>贸易信息</h4>
				<el-row>
					<el-col :span='8'>
						<p>采购商：<span :title='list.purchasers'>{{list.purchasers}}</span></p>
					</el-col>
					<el-col :span='16'>
						<p>出货港：<span :title='list.shippingPort'>{{list.shippingPort}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='8'>
						<p>供应商：<span :title='list.supplier'>{{list.supplier}}</span></p>
					</el-col>
					<el-col :span='16'>
						<p>进口港：<span :title='list.portOfImport'>{{list.portOfImport}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='8'>
						<p>采购国：<span :title='list.purchasingCountry'>{{list.purchasingCountry}}</span></p>
					</el-col>
					<el-col :span='16'>
						<p>重量/单位：<span :title='list.weightUnit'>{{list.weightUnit}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='8'>
						<p>供应国：<span :title='list.supplyCountry'>{{list.supplyCountry}}</span></p>
					</el-col>
					<el-col :span='16'>
						<p>数量/单位：<span :title='list.numUnit'>{{list.numUnit}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='8'>
						<p>日期：<span>{{list.date|date}}</span></p>
					</el-col>
					<el-col :span='16'>
						<p>产品描述：<span :title='list.productDescription'>{{list.productDescription}}</span></p>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import DetailTitle from '../common/detailTitle.vue'
    import searchApi from '../common/api/searchApi'
	export default{
		components:{
			DetailTitle
		},
		data(){
			return{
				companyId:'',
				company:{},
			}
		},
		methods:{
			sendEmail(){
				if(this.company.obtained==false){
					this.$message({message:"请先获取邮箱!",type:'info'});
					return;
				}
				let orgIdList=[];
				for(var i=0;i<this.company.mails.length;i++){
					if(this.company.obtained){
						orgIdList.push(this.company.mails[i]);
					}
				}
				if(orgIdList.length==0){
					this.$message({message:"本公司暂无邮箱!",type:'info'});
					return;
				}
				console.log(orgIdList);
				searchApi.edmEmail({recipient:orgIdList}).then((data)=>{
					let datalist=data.data;
					if(datalist.success){
						window.open(datalist.data);
						// window.open('https://test.joinf.com:22222/write?dataId=20925dce-1028-4c03-ab3f-e630699e8711');
					}else{
						this.$message({message:datalist.message,type:'error'});
					}
				})
			},
			getEmail(){
				searchApi.getEmail({orgId:[this.companyId]}).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						this.company.obtained=true;
						this.company.mails=datalist.data[0].mails;
					}else{
						this.$message({message:datalist.msg,type:'error'});
					}
				},(error)=>{
					console.log(error);
				})
			},

			getdata(){				//获取数据
				searchApi.getDetail({id:this.companyId}).then((data)=>{
					let datalist=data.data;
					if(datalist.code==0){
						this.company=datalist.data;
					}else{
						this.$message({message:datalist.msg,type:'error'});
					}
				})
			},

		},
		mounted(){
			let id=this.$route.query.id;
			if(id!=''&&id!=null){
				this.companyId=id;
				this.getdata();
			}
		}
	}
</script>
<style>
.DetailContTitle{margin-bottom: 20px;line-height: 36px;height: 36px;}
.DetailContTitle h3{display: inline-block;margin-right: 20px;font-size: 16px;color: #333;}
.DetailContTitle div span{display: inline-block;padding:0 20px;}
.DetailContTitle div.fr{color:#666;}
.detailBorBox{border:1px solid #d6d6d6;background: #fff;padding:20px;margin-bottom: 20px;}
.detailBorBox h4{color:#333;}
.DetailMainCont >p{text-indent: 2rem;color:#666;clear: both;}
.DetailMainCont div{margin:10px 0;height:48px;}
.DetailMainCont div p{width: 20%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;float:left;color:#666;line-height: 24px;}
.DetailMainCont div p span{color: #333;}
.EmailList {padding-top:0;}
.EmailList .el-col{margin-top: 20px;}
.EmailList .el-col span{display: inline-block;padding:0 20px;height:34px;line-height: 34px;border: 1px solid #d6d6d6;background:#f1f2f5;border-radius: 4px;color:#666;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 100%;}
.trade p{color: #666;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;line-height: 28px;}
.trade p span{color: #333;}
</style>