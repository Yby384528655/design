<template>
    <div class="header">
        <div class='headerFixed'>
            <div class='headerCont'>
                <div class="logo">
                    <img src='../../../static/img/logo.png'>
                    <p>全球搜索</p>
                </div>
            </div>
            <!-- <div class="user-info">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'We'
            }
        },
        // computed:{
        //     username(){
        //         let username = localStorage.getItem('ms_username');
        //         return username ? username : this.name;
        //     }
        // },
        // methods:{
        //     handleCommand(command) {
        //         if(command == 'loginout'){
        //             localStorage.removeItem('ms_username')
        //             this.$router.push('/login');
        //         }
        //     }
        // }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        line-height: 50px;
        color: #fff;
    }
    .headerFixed{
        position: fixed;
        top:0;
        left:0;
        height:50px;
        width:100%;
        background-color: #00d1b2;
    }
    .headerCont{
        width: 80%;
        min-width: 1280px;
        margin:0 auto;
    }
    .header .logo{
        line-height: 50px;
    }
    .header .logo img{
        float: left;
        margin-right: 20px;
        position: relative;
        top:9px;
    }
    /*.user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }*/
</style>
