 import Vue from 'vue'
 import Http from './http'
 export default{
 	/**
     * 搜索
     */
 	Search(params){
 		return Http.post(Vue.prototype.html_url+'/search/product',params);
 	}
 }