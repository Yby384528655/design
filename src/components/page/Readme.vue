<template>
    <div class='Home width1280'>
        <div class="HomePage">
            <h3>设置搜索条件</h3>
            <div class='searchBox'>
                <p>搜索关键词：<span>关键词输入框</span></p>
                <el-input v-model='searchWorld'></el-input>
            </div>
            <div class='searchBox'>
                <p>搜索国家：
                    <span>点击“请选择搜索国家”下拉选择搜索的国家，国家一次最多限制选择8个，选择的国家显示在后面灰色的框内</span>
                </p>
                <div class='countryBox'>
                    <div class='countryListBox'>
                        <span @click.stop='showContryList'>请选择搜索国家</span>
                        <div class='zhouList' v-if='countryStatu'>
                            <p v-for='list in AllCountryList'>{{list.name}}</p>
                        </div>
                        <div class='countryList' v-if='countryStatu'>
                            <p v-for='list in AllCountryList'>{{list.name}}</p>
                        </div>
                    </div>
                    <div class='countryCheckedList'>
                        <p v-for='list in countryCheckedList'>
                            {{list.name}}<span>X</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class='searchBox'>
                <p>搜索行业：
                    <span>点击“请选择搜索行业”下拉选择搜索的行业，行业只能选择1个，选择的行业显示在后面灰色的框内</span>
                </p>
                <el-select v-model="industry" placeholder="请选择搜索行业">
                    <el-option v-for="item in industryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class='searchCheckBox'>
                <p>是否有网址：<span><el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio></span></p>
            </div>

        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import searchApi from '../common/api/searchApi'
    export default {
        data: function(){
            return {
                searchWorld:'',
                radio:'1',
                industryList:[],
                industry:'',
                AllCountryList:[],
                countryList:[],
                countryCheckedList:[],
                countryStatu:false,
            }
        },
        methods:{
            showContryList(){
                this.countryStatu=true;
            },
            closeBox(){
                this.countryStatu=false;
            },
        },
        mounted(){
            // searchApi.Search({param: "test"})
            document.body.addEventListener('click',this.closeBox);
        },
        destoryed() {
            document.body.removeEventListener('click', this.closeBox)
        }
    }
</script>

<style scoped>
    .HomePage h3{text-align: center;}
    .searchBox p {font-size: 14px;}
    .searchBox p span{color:#ff0000;}
</style>