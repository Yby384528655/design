<template>
    <div class="header">
        <div class="logo">
            <img src='../../../static/img/logo.png'>
        </div>
        <div class="cocial-link" >
            <a :href='html_cloudurl+"/system/index"'>外贸管理B2B</a><a href="http://b2c.joinf.com/erp#/erp/dashboard">跨境电商B2C</a><a href="https://sns.jonf.com">社交营销SNS</a><a href="https://b2bcn.joinf.com">B2B平台</a><a href="/">全球搜索</a>
        </div>
        <div class='userCommand'>
            <el-popover
              ref="Userpopover"
              placement="bottom"
              width="350"
              v-model='UserpopoverSys'
              trigger="click">
              <div class='userpopovercont'>
                  <p class='userpopoverTitle'>消息通知</p>
                  <div class='userpopovermess'>
                    <ul v-if='userpopoverMessage.length!=0'>
                        <li v-for='(message,index) in userpopoverMessage' :class='message.hasRead==false?"popmsgisread":""' @click='popmsgtoread(index)'>
                            <div class="popover-left" :title='message.hasRead==false?"点击消息设置为已读":""'>
                                <i class="popover-ico"></i>
                            </div>
                            <div class="popover-body"  :title='message.hasRead==false?"点击消息设置为已读":""'>
                                <h6 class="popovertitle" :class='message.hasRead==false?"msgisread":""'>系统通知</h6>
                                <div class="popovercont" v-html='message.content'></div>
                            </div>
                            <div class="popovertime" data-time="1495702200000">{{new Date(message.sendTime).getMonth()+1}}/{{new Date(message.sendTime).getDate()}}</div>
                            
                        </li>
                    </ul>
                    <p class='nouserpopovermess' v-else>暂无消息</p>
                  </div>
                  <div class='userpopoverbtn'>
                    <el-button size="mini" type="text" v-if='popmsglistnum==0' class='msgisallread' @click='msgisallread'>全部忽略</el-button>
                    <el-button size="mini" type="text" v-else @click="popoverMessageused">全部忽略</el-button>
                    <el-button type="text" size="mini" @click="UserpopoverSys = false">关闭</el-button>
                  </div>
              </div>
            </el-popover>
            <span class='userCommangMessage'><i v-popover:Userpopover><span v-if='popmsglistnum!=0'>{{popmsglistnum}}</span></i></span>
            <el-dropdown trigger="click" @command='usercommond'>
              <span class="el-dropdown-link">
                <i></i>
              </span>
              <el-dropdown-menu slot="dropdown" class='header_menu'>
                <el-dropdown-item command='system' ><span></span>系统设置</el-dropdown-item>
                <el-dropdown-item command='usercenter'><span></span>用户中心</el-dropdown-item>
                <el-dropdown-item command='suggest'><span></span>意见反馈</el-dropdown-item>
                <el-dropdown-item command='help'><span></span>帮助中心</el-dropdown-item>
                <!-- <el-dropdown-item command='changepwds'><p>修改密码</p></el-dropdown-item> -->
                <el-dropdown-item command='loginout'><p>退出登录</p></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="user-info" >
            <div class='userInfotitle'>
                <img class="user-logo" :src="portrait" @error='(e)=>{e.target.src="https://fttx-tms-staticresource.oss-cn-hangzhou.aliyuncs.com/test/tms/img/default-head.jpg"}'>
                <el-popover ref="managelist" placement="bottom" width="136" min-width='100' v-model='managelistSys' trigger="click" popper-class='managelistcontent'>
                    <div class='managelistcont' v-loading="managelistload"  element-loading-text="拼命加载中">
                        <ul>
                            <li v-for='(name,index) in userlist'>
                                <span @click='changeuser(index)'>{{name.chineseName}}({{ name.userName }})</span>
                            </li>
                        </ul>
                    </div>
                </el-popover>
                <span  class="el-dropdown-link">{{name}}</span>
                <span class='elopac'>{{companyName==''||companyName=='名称未定义'?'暂无公司':companyName}}</span>
                <el-dropdown style='display:none;'>
                  <span class="el-dropdown-link"></span>
                  <el-dropdown-menu slot="dropdown">
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class='userCommand'>
            <div class='userValidity'>
                <a class='futongyun' :href='FutongyunUrl' target='_black'><img src='../../../static/img/userfutongyun.png'></a>
            </div>
        </div>
<!--         <div class='changepwdbg' v-if='changepwd'></div>
        <div class='changepwd' v-if='changepwd'>
            <span class='goclose' @click='closechangepwd'><i class='el-icon-close'></i></span>
            <p class='pwdtitle'>修改密码</p>
            <el-form ref="form" :model="form" :rules="rules2" label-width="110px">
                <el-form-item label="原密码:" prop="oldpwd">
                    <el-input type='password' v-model="form.oldpwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="newpwd">
                    <el-input type='password' v-model="form.newpwd" @></el-input>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="checkPwd">
                    <el-input type='password' v-model="form.checkPwd"></el-input>
                </el-form-item>
                <el-form-item style='text-align:right'>
                    <el-button type="primary" @click="goChangePassword('form')">确认</el-button>
                    <el-button @click="closechangepwd">取消</el-button>
                </el-form-item>
            </el-form>
        </div> -->
    </div>
</template>
<script>
    import searchApi from '../common/api/searchApi'
    export default {
        data() {
            // var validateOldPass = (rule, value, callback) => {      //密码验证
            //     if (value === '') {
            //         callback(new Error('请输入原密码'));
            //     }else if(value.length<6||value.length>50){
            //         callback(new Error('密码长度不正确，6-50字符之间'));
            //     }else{
            //         callback();
            //     }
            // };
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     }else if(value.length<6||value.length>50){
            //         callback(new Error('密码长度不正确，6-50字符之间'));
            //     } else {
            //         if (this.form.checkPwd !== '') {
            //             this.$refs.form.validateField('checkPwd');
            //         }
            //         callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.form.newpwd) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                // rules2: {           //密码验证
                //     newpwd: [
                //     { validator: validatePass, trigger: 'blur' }
                //     ],
                //     checkPwd: [
                //     { validator: validatePass2, trigger: 'blur' }
                //     ],
                //     oldpwd: [
                //     { validator: validateOldPass, trigger: 'blur' }
                //     ]
                // },
                // form:{
                //     oldpwd:'',
                //     newpwd:'',
                //     checkPwd:''
                // },
                // changepwd:false,            //修改密码
                name: 'We',
                UserpopoverSys:false,
                userpopoverMessage:[],
                popmsglistnum:0,
                portrait:'',
                managelistSys:false,
                managelistload:false,
                userlist:[],
                companyName:' ',
                FutongyunUrl:'',
            }
        },
        methods:{
            msgisallread(){
                return;
            },
            // goChangePassword(val){          //修改密码
            //     this.$refs[val].validate((valid) => {
            //     if (valid) {
            //         searchApi.changePassword({oldPassword:this.form.oldpwd,newPassword:this.form.newpwd}).then((data)=>{
            //             let datalist=data.data;
            //             if(datalist.code==0){
            //                 this.Ischangepwd(data);
            //             }else{
            //                 this.$message({message:datalist.msg,type:'error'});
            //             }
            //         })
            //     } else {
            //         return;
            //     }
            //     });
            // },
            // Ischangepwd(response){              //修改密码
            //     this.changepwd=false;
            //     this.$alert('密码修改成功！', '提示', {
            //       confirmButtonText: '确定',
            //       callback: action => {
            //       }
            //     });
            // },
            // closechangepwd(){           //修改密码关闭
            //     this.changepwd=false;
            //     this.form.newpwd='';
            //     this.form.oldpwd='';
            //     this.form.checkPwd='';
            // },
            usercommond(command) {
                if(command=='loginout'){
                    // this.ajax(this.html_url+'/common/logout','get',{},this.Isusercommond);
                    searchApi.loginout();
                }else if(command=='system'){
                    window.location.href=this.html_cloudurl+'/corporation/manage_user_company'
                }else if(command=='usercenter'){
                    window.location.href=this.html_cloudurl+'/userCenter/accountInfo'
                // }else if(command=='changepwds'){
                //     this.changepwd=true;
                }else if(command=='suggest'){
                    var window1=window.open('about:blank',);
                    let timeout=setTimeout(()=>{
                        window1.location.href=this.html_cloudurl+'/suggestion/suggestion';
                    },100);
                }else if(command=='help'){
                    var window1=window.open('about:blank',);
                    let timeout=setTimeout(()=>{
                        window1.location.href=this.html_cloudurl+'/help/main';
                    },100);
                }
            },
        }
    }
</script>
<style >
    .el-dropdown-menu{z-index:20000!important;max-height: 550px;overflow: auto;}
    .header_menu{width:212px;font-size:14px;background:#fff url('../../../static/img/tms_center_back.png') no-repeat;left:auto!important;right:10px;padding:0;}
    .header_menu li{width:106px;text-align:center;float:left;padding:0;}
    .header_menu li span{width: 28px;height: 27px;background: url('../../../static/img/tms_common_system.png') no-repeat 0 -258px;display: inline-block;margin: 22px 34px 10px;}
    .header_menu li:nth-child(1) span{background-position: 0 -88px;}
    .header_menu li:nth-child(3) span{background-position: 0 -135px;}
    .header_menu li:nth-child(4) span{background-position: 0 -203px;}
    .header_menu li:nth-child(5){border-top: 1px solid #e9f3f8;background: #f7fcff;width:100%;}
    .header_menu li:last-child{border-top: 1px solid #e9f3f8;background: #f7fcff;}
    .header_menu li p{height:17px;line-height: 17px;display:inline-block;width:100%;box-sizing:border-box;}
    .header_menu li:last-child p{border-left:1px solid #e9f3f8;}
    .header_menu li:hover{opacity: .8;}
    .userpopovermess ul li .popover-body .popovercont a{
        color:#23527c;
        cursor:pointer;
    }
    .userpopovermess ul li .popover-body .popovercont>a:hover{
        color:#777;
    }
    .managelistcontent{min-width: 100px;max-height: 500px;overflow: auto;}
</style>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 46px;
        font-size: 22px;
        line-height: 46px;
        color: #fff;
        background: #008cee;
    }
    .header .logo{
        float: left;
        width: 35px;
        height: 35px;
        text-align: center;
        margin: 5px 10px;
        line-height: 46px;
    }
    .header .logo img{
        width:100%;
    }
    .header .cocial-link{ height: 26px; float: left;margin-top:10px;line-height: 26px;font-size: 0;}
    .header .cocial-link>a{
        display: inline-block;
        height:23px;
        padding: 0px 10px; 
        color:#ffffff; 
        font-size: 14px; 
        line-height: 23px;
        width: auto;
        border: 1px solid #fff;
    }
    .header .cocial-link>a:first-child{
        border-top-left-radius: 6px; border-bottom-left-radius: 6px;
    }
    .header .cocial-link>a:last-child{
        background: rgb(255, 255, 255);
        color: rgb(0, 140, 238);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .userCommand{float:right;position: relative;margin-left: 10px;}
    .userCommand .el-dropdown{
        width:41px;display:inline-block;height:46px;
    }
    .userCommand .el-dropdown-link{
        display:inline-block;width:20px;height:18px;
        background: url('../../../static/img/headmenu.png');
        margin:13px 11px;
        cursor:pointer;
    }
    .userCommand .userValidity{height:46px;line-height: 46px;float:left;}
    .userCommand .userValidity span{margin:0;font-size: 14px;}
    .userCommand .userValidity .el-button{border:0;margin: 0 20px 0 10px;padding:0;position:relative;top:5px;}
    .userValidity a{display:inline-block;position:relative;top:5px;}
    .userCommand .userValidity .el-button>span>span{display:inline-block;width:98px;height:25px;background: url('../../../static/img/tms_common_system.png');float:left;margin-left: 0;
    }
    .userCommand .userValidity_red{color:#f00;display:inline-block;min-width: 100px;}
    .userCommand .loginout{display:inline-block;cursor: pointer;height: 46px;line-height: 46px;padding:0 10px;font-size:14px;margin:0 10px 0 0;}

    .userpopovercont{padding:0;width:372px;margin-left: -11px;}
    .userpopoverTitle{
        font-size: 14px;
        padding-left: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
    .userpopovermess{max-height:400px;overflow: auto;width:100%;border-bottom: 1px solid #eee;}
    .userpopovermess ul li{
        line-height: 18px;
        position: relative;
        padding: 10px 20px;
    }
    .userpopovermess ul li.popmsgisread{
        cursor: pointer;
    }
    .userpopovermess ul li .popover-left{
        padding-right: 10px;
        float:left;
    }
    .userpopovermess ul li .popover-ico{
        background: url(../../../static/img/tms_common_ico.png) -80px -540px no-repeat;
        display: inline-block;
        position: relative;
        background-position: -105px -858px;
        height: 45px;
        width: 45px;
    }
    .userpopovermess ul li .popover-body{}
    .userpopovermess ul li .popovertitle{
        font-weight: 500;
        color: #777;
        font-size: 14px;
    }
    .userpopovermess ul li .msgisread{
        font-weight: bold;
        color:#000;
    }
    .userpopovermess ul li .popover-body .popovercont{
        white-space: normal;
        max-height: 54px;
        max-width: 360px;
        word-break: break-all;
        overflow: hidden;
        color: #777;
    }
    .userpopovermess ul li .popovertime{
        position: absolute;right:20px;
        top:10px;
    }
    .userpopovermess p{
        height:98px;line-height: 98px;text-align: center;font-size: 14px;font-weight: bold;
    }
    .userpopoverbtn{
        width:100%;
        margin-bottom: -11px;
    }
    .userpopoverbtn button{
        width:183px;
        border-left: 1px solid #eee;
        margin:0;
        padding:0;
        height:50px;
        font-size: 14px;
    }
    .userpopoverbtn button:first-child{
        border-left: 0;
    }
    .userpopoverbtn .msgisallread{
        color:#777;
        cursor: text;
    }
    .userpopoverbtn .el-button+.el-button{
        margin:0;
    }
    .userCommangMessage{
        display:inline-block;
        width: 40px;
        height: 44px;
        position:relative;
    }
    .userCommangMessage i{
        display:inline-block;
        width: 20px;
        height: 18px;
        margin: 13px 10px;
        cursor: pointer;
        background: url('../../../static/img/userpopovericon.png') no-repeat;
    }
    .userCommangMessage span{
        position: absolute;
        display: block;
        width:16px;
        height:16px;
        background: #f00;
        border-radius: 50%;
        right:5px;
        top:5px;
        font-size: 12px;
        text-align: center;
        font-style: normal;
    }

    .el-dropdown-menu__item{text-align: center;}
    .el-dropdown-menu__item span{display:block;}
    .el-dropdown-menu__item:hover{background: #fff;color:#000;opacity: .8;}

    .user-info {float: right;font-size: 16px;color: #fff;line-height: 46px;margin-left: 20px;}
    .user-info .userInfotitle{line-height: 19px;
        position: relative;display: inline-block;padding-left: 40px;color: #fff;vertical-align: middle;}
    .user-info .user-logo{
        position: absolute;left:0;top:0px;width:32px;height:32px;border-radius: 50%;}
    .user-info .userInfotitle .elopac{opacity: .6;font-size: 14px;overflow: hidden;max-width: 70px;white-space: nowrap;text-overflow:ellipsis;}
    .user-info .userInfotitle .el-dropdown-link{font-size: 14px;color:#fff;}
    .user-info .userInfotitle .el-dropdown{cursor: pointer;}
    .user-info .userInfotitle span{display:block;line-height: 16px;font-size: 14px;height:16px;}
    .user-info .userInfotitle span:nth-child(2){display: none;}
    .changepwdbg{
        position: fixed;
        width: 100%;
        height:100%;
        background: #000;
        z-index: 1000;
        top:46px;
        left:0;
        opacity: 0.3;
    }
    .changepwd{
        width:400px;
        height:343px;
        position: fixed;
        z-index: 1001;
        left:50%;
        top:50%;
        margin-top: -170px;
        margin-left: -200px;
        background: #fff;
        text-align: center;
        border-radius: 4px;
        color:#000;
    }
    .changepwd .goclose{
        display:inline-block;
        float:right;
        width:56px;
        height:56px;
        cursor: pointer;
        position: absolute;
        right:0;
        text-align: center;
        line-height: 56px;
        font-size: 12px;
    }
    .changepwd p{margin:0 auto;text-align: left;}
    .changepwd .pwdtitle{padding: 20px;line-height: 16px;font-size: 16px;}
    .changepwd form{
        padding:26px;
    }
</style>