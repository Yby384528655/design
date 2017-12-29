 import Vue from 'vue'
 import Http from './http'
 export default{
     /**
     * 获取国家
     */
     getCountry(params){
          return Http.get('../../../../static/country.json');
     },
     /**
     * 获取行业
     */
     getIndustry(params){
          return Http.get('../../../../static/industry.json');
     },
     /**
     * 获取语言
     */
     getLanguage(params){
          return Http.get('../../../../static/language.json');
     },
 	/**
     * 条件搜索
     */
 	SearchList(params){
 		return Http.get(Vue.prototype.html_url+'/org/search?'+params);
 	},
 	/**
     * 公司详情
     */
 	getDetail(params){
 		return Http.get(Vue.prototype.html_url+'/org/detail?id='+params.id);
 	},
 	/**
     * 获取邮箱
     */
 	getEmail(params){
 		return Http.post(Vue.prototype.html_url+'/org/obtainMail',params);
 	},
     /**
     * 任务搜索
     */
     taskList(params){
          return Http.get(Vue.prototype.html_url+'/task/search?'+params);
     },
     /**
     * 获取任务详情
     */
     taskDetail(params){
          return Http.get(Vue.prototype.html_url+'/task/detail?'+params);
     },
     /**
     * 删除任务
     */
     deleteTask(params){
          return Http.post(Vue.prototype.html_url+'/task/delete',params);
     },
     /**
     * 清空任务
     */
     deleteAllTask(params){
          return Http.get(Vue.prototype.html_url+'/task/deleteAll');
     },
     /**
     * 修改密码
     */
     // changePassword(params){
     //      return Http.post(Vue.prototype.html_url+'/supplier/saas/changePasswordJson',params);
     // },
     /**
     * 退出登陆
     */
     loginout(params){
          return Http.post(Vue.prototype.html_url+'/common/logout');
     },
     /**
     * edm邮件发送
     */
     edmEmail(params){
          return Http.post(Vue.prototype.EDM_url+'/email/createEmailRecipients',params);
     },



 }