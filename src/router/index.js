import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        // 首页
        {
            path: '/',
            redirect: '/apply'
        },
        {
            path: '/apply',
            component: () => import('@/view/carForm/index.vue'),
            meta: { title: '用车申请' }
        },
        {
            path: '/404',
            component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
            meta: { title: '404' }
        },
        {
            path: '/403',
            component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
            meta: { title: '403' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})