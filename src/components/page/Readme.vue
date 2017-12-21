<template>
    <div class='Home'>
        <div class="HomePage">
            <h3>设置搜索条件</h3>
            <div class='searchBox mWidth664 demo-input-suffix'>
                <el-input v-model='searchWord' placeholder='搜索关键词' :maxlength="255">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div class='searchBox mWidth664'>
                <div class='countryBox'>
                    <div class='countryListBox' @click.stop='showContryList'>
                        <span>请选择搜索国家</span>
                        <div class='zhouList' v-if='countryStatu'>
                            <p v-for='list in AllContinentList' @click.stop='ContinentListStatus(list.id)' :class='list.id==ContinentStatus?"ischecked":""'>{{list.name}}</p>
                        </div>
                        <div class='countryList' v-if='countryStatu'>
                            <p v-for='(list,index) in AllCountryList' v-if='ContinentStatus!==""&&list.parentId==ContinentStatus' @click.stop='chooseCountry(index)' :class='list.type?"ischecked":""'>{{list.name}}</p>
                        </div>
                    </div>
                    <div class='countryCheckedList' v-if='CountryListStatus()'>
                        <div v-for='(list,index) in AllCountryList' v-if='list.type' class='countryCheckedListCont'>
                            <p>{{list.name}}
                                <span @click.stop='chooseCountry(index)'><i class='el-icon-close'></i></span>
                            </p>
                            <span>;</span>
                        </div>
                    </div>
                    <div class='countryCheckedList'  v-else>
                        <span>荷兰；巴拿马；斐济；巴布亚新几内亚；阿尔及利亚</span>
                    </div>
                </div>
            </div>
<!--             <div class='searchBox mWidth664'>
                <div class='industryBox'>
                    <div class='industryListBox' @click.stop='showIndustryList'>
                        <span>请选择搜索行业</span>
                        <div class='industryList' v-if='industryStatu'>
                            <p v-for='list in industryList' @click.stop='industryListListStatus(list)' :class='list.id==industryStatus?"ischecked":""'>{{list.name}}</p>
                        </div>
                        <div class='industryListchild' v-if='industryStatu'>
                            <p v-for='(list,index) in industryListChild' v-if='industryStatus!==""&&list.parentId==industryStatus' @click.stop='chooseIndustry(list)' :class='list.name==industryListStatus?"ischecked":""'>{{list.name}}</p>
                        </div>
                    </div>
                    <div class='industryCheckedList' v-if='industryListStatus!=""'>
                        <p>{{industryListStatus}}</p>
                    </div>
                    <div class='industryCheckedList'  v-else>
                        <span>电子   LED   智能硬件</span>
                    </div>
                </div>
            </div>
            <div class='searchCheckBox mWidth664'>
                <p class=' mWidth664'>是否有网址：<span><el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio></span></p>
            </div> -->
            <div class='searchButton mWidth664'>
                <el-button @click.stop='goSearchList'>取消</el-button>
                <el-button type='primary' @click.stop='Search'>搜索</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import searchApi from '../common/api/searchApi'
    export default {
        data: function(){
            return {
                searchWord:'',
                radio:'1',
                industryList:[],
                industry:'',
                AllContinentList:[],
                AllCountryList:[],
                CheckedCountryListLength:0,
                countryList:[],
                countryCheckedList:[],
                countryStatu:false,
                ContinentStatus:'1',
                industryListStatus:'',
                industryStatu:false,
                industryStatus:'1',
                industryListChild:[],
            }
        },
        methods:{
            getCountry(){
                searchApi.getCountry().then((data)=>{
                    let datalist=data.data;
                    this.AllContinentList=datalist.ContinentList
                    this.AllCountryList=datalist.list;
                })
            },
            // getIndustry(){
            //     searchApi.getIndustry().then((data)=>{
            //         let datalist=data.data;
            //         this.industryList=datalist.industry;
            //         this.industryListChild=datalist.list;
            //     })
            // },
            goSearchList(){
                this.$router.push({path:'/searchList'});
            },
            Search(){
                let searchWord=this.searchWord.replace(/(^\s*)|(\s*$)/g, "");
                if(searchWord==''||searchWord.length==0){
                    this.$message({message:"请输入搜索关键词!",type:'info'});
                    return;
                }
                let searchCountry=''
                for(var i=0;i<this.AllCountryList.length;i++){
                    if(this.AllCountryList[i].type==true){
                        searchCountry+=this.AllCountryList[i].enName;
                    }
                }
                // let searchIndustry=this.industryListStatus;
                // let haveWebSite=true;
                // if(this.radio!='1'){
                //     haveWebSite=false;
                // }
                // this.$router.push({path:"/searchList",query:{keywords:searchWord,industrys:searchIndustry,countrys:searchCountry,haveWebSite:haveWebSite}})
                this.$router.push({path:"/searchList",query:{keywords:searchWord,countrys:searchCountry}})
            },
            CountryListStatus(){            //国家是否有已经选择的
                let status=false;
                for(var i=0;i<this.AllCountryList.length;i++){
                    if(this.AllCountryList[i].type==true){
                        status=true;
                    }
                }
                return status;
            },
            chooseCountry(val){            //国家选择
                let isStatus=this.AllCountryList[val].type;
                if(isStatus){
                    this.$set(this.AllCountryList[val],'type',false);
                    this.CheckedCountryListLength-=1;
                }else{
                    if(this.CheckedCountryListLength<1){
                        this.$set(this.AllCountryList[val],'type',true);
                        this.CheckedCountryListLength+=1;
                        this.countryStatu=false;
                    }else{
                        this.$message({message:"您已经选择了1个!",type:'info'});
                    }
                }
                
            },
            ContinentListStatus(val){      //洲选择
                this.ContinentStatus=val;
            },
            // industryListListStatus(val){        //选择行业
            //     // this.industryListStatus=val;
            //     this.industryStatus=val.id;
            //     // this.industryStatu=false;
            // },
            // chooseIndustry(val){
            //     this.industryListStatus=val.name;
            //     this.industryStatu=false;
            // },
            // showIndustryList(){                 //显示行业
            //     this.industryStatu=true;
            //     this.countryStatu=false;
            // },
            showContryList(){
                this.countryStatu=true;
                // this.industryStatu=false;
            },
            closeBox(){
                this.countryStatu=false;
                // this.industryStatu=false;
            },
        },
        mounted(){
            document.body.addEventListener('click',this.closeBox);
            // this.getIndustry();
            this.getCountry();
        },
        destoryed() {
            document.body.removeEventListener('click', this.closeBox)
        }
    }
</script>
<style scoped>
    .HomePage .ischecked{background: #008cee;color: #fff;}
    .HomePage{padding-top:10%;}
    .HomePage h3{text-align: center;font-size: 16px;font-weight: normal;line-height: 36px;margin-bottom: 24px;}
    .searchBox, .searchCheckBox , .searchButton{width:52%;margin: 0 auto 14px;line-height: 36px;}
    .searchBox{border:1px solid #dcdcdc;border-radius:4px;background: #fff;}
    .searchBox:hover{border-color:#008cee;}
    .searchBox p {font-size: 14px;line-height: 36px;}
    .searchBox p span{color:#ff0000;}
    .searchBox .el-select{border-right:1px solid #dcdcdc;}
    .countryListBox{position: relative;width:173px;float:left;cursor: pointer;}
    .countryListBox span{border-right:1px solid #dcdcdc;display: inline-block;height:36px;padding-left: 10px;width: 173px;box-sizing:border-box;position: relative;border-bottom: 1px solid #dcdcdc;color:#1b1b1b;}
    .countryListBox span:before{content:'';
        border-top: solid 6px #1b1b1b;
        border-left: solid 4px transparent;
        border-right: solid 4px transparent;
        position: absolute;right:10px;top:16px;
    }
    .countryCheckedList {padding:0 10px 0 183px;}
    .countryCheckedList p{display: inline-block;height:24px;line-height: 24px;padding:0 1px;}
    .countryCheckedList p span{display:none;margin-left: 10px;width: 24px;height:24px;text-align: center;cursor: pointer;color:#000;border-left: 1px solid #f8f8f8;}
    .countryCheckedList p:hover{background: #d9eafe;border-radius: 4px;}
    .countryCheckedList p:hover span{display: inline-block;}
    .countryCheckedList > span{color:#959595;}
    .countryCheckedList .countryCheckedListCont{display: inline-block;}
    .countryCheckedList .countryCheckedListCont:last-child >span{display: none;}
    .zhouList{position: absolute;top:36px;left:0;background: #fff;z-index: 10;width:173px;box-sizing:border-box;border:1px solid #dcdcdc;}
    .zhouList p{padding-left:10px;color:#1b1b1b;border-top:1px solid #dcdcdc;}
    .zhouList p:first-child{border-top: 0}
    .countryList{position: absolute;top:0;left:173px;background: #fff;z-index: 10;width:173px;box-sizing:border-box;border:1px solid #dcdcdc;max-height: 360px;overflow: auto;}
    .countryList p{padding-left:10px;color:#1b1b1b;border-top:1px solid #dcdcdc;}
    .countryList p:first-child{border-top: 0}
    .searchCheckBox .el-radio{display: inline-block;width: auto;min-width: auto;margin-left: 20px;margin-right: 10px;}
    .searchButton{text-align: center;}
    .searchButton .el-button{padding:10px 30px;}

    .industryListBox{position: relative;width:173px;float:left;cursor: pointer;}
    .industryListBox span{border-right:1px solid #dcdcdc;display: inline-block;height:36px;padding-left: 10px;width: 173px;box-sizing:border-box;position: relative;}
    .industryListBox span:before{content:'';
        border-top: solid 6px #000;
        border-left: solid 4px transparent;
        border-right: solid 4px transparent;
        position: absolute;right:10px;top:16px;
    }
    .industryList{position: absolute;top:36px;left:0;background: #fff;z-index: 10;width:173px;box-sizing:border-box;border:1px solid #dcdcdc;max-height: 360px;overflow: auto;}
    .industryList p{padding-left:10px;}
    .industryListchild{position: absolute;top:36px;left:173px;background: #fff;z-index: 10;width:173px;box-sizing:border-box;border:1px solid #dcdcdc;max-height: 360px;overflow: auto;}
    .industryListchild p{padding-left:10px;}


    .industryCheckedList {padding:0 10px 0 183px;}
    .industryCheckedList > span{color:#959595;}
</style>
<style>
    .searchBox .el-input__inner{border:0;height:34px;line-height: 34px;}
    .searchBox.demo-input-suffix .el-input__inner{padding-left: 40px;}
    .searchBox.demo-input-suffix .el-input__icon{right:auto;left:0;}
</style>