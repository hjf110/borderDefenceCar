import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import NProgress from 'nprogress'; //网页上方进度条

import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import 'nprogress/nprogress.css'; //网页上方进度条css
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

//vant 组件
import Vant from 'vant';
import 'vant/lib/index.css';


Vue.config.productionTip = false;






Vue.use(ElementUI); //导入elementUi
Vue.use(Vant); //导入vant


// 简单配置
// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });



//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // NProgress.done(true);
    console.log('进入了------------', to.meta.title);
    document.title = `${to.meta.title}`;
    next();
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login'&&to.path !== '/404'&&to.path !== '/403') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }

    // NProgress开始进度条
    NProgress.start();
});
// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    console.log('路由载入成功!!');
    console.log(transition);
    document.title = `${transition.meta.title}`;
    // NProgress结束进度条
    //不加这个进度条会不知道什么原因的卡主
    Vue.nextTick(() => {
        NProgress.done();
    });
    // setTimeout(() => {
    //     // console.log(transition)
    // }, 100);
});
new Vue({
    router,
    // i18n,
    render: h => h(App)
}).$mount('#app');
