import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.use(ElementUI);

var defines={}

if(process.env.NODE_ENV=='production'){
	defines.html_url='http://qqy.joinf.com'
}
if(process.env.NODE_ENV=='ceshiTest'||process.env.NODE_ENV=='development'){
	defines.html_url='https://b2bsearch.joinf.com:8080'
}
// if(process.env.NODE_ENV=='development'){
// 	defines.html_url='http://qqycn.joinf.com:8080'
// }

Object.keys(defines).forEach((key)=>{
    Vue.prototype[key] = defines[key];
})

import * as custom from './components/common/filters/utils'
// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');