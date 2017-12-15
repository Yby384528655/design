/**
 * http配置
 */
import axios from 'axios'
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
axios.defaults.headers.contentType = 'application/json, text/plain, */*';
// http请求拦截器
axios.interceptors.request.use((config) => {
	return config;
}, (error) => {
	return Promise.reject(error);
})
// http响应拦截器
axios.interceptors.response.use(data => {
	return data;
}, (error) => {
	return Promise.reject(error);
})
export default axios

