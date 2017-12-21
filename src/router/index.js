import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Home'
        },
        {
            path: '/Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/SearchList',
                    component: resolve => require(['../components/page/result.vue'], resolve)
                },
                {
                    path: '/task',
                    component: resolve => require(['../components/page/NewTask.vue'], resolve)
                },
                {
                    path: '/taskList',
                    component: resolve => require(['../components/page/taskList.vue'], resolve)
                },
                {
                    path: '/taskDetail',
                    component: resolve => require(['../components/page/taskDetail.vue'], resolve)
                },
                {
                    path: '/detail',
                    component: resolve => require(['../components/page/detail.vue'], resolve)
                },
            ]
        }
    ]
})
