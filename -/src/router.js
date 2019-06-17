import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import car from './views/car.vue'
const address = () => import('./views/page/address.vue')
import mine from './views/mine.vue'

const native = () => import('./views/page/native.vue')
const myorder = () => import('./views/page/myorder.vue')
const buyingpage = () => import('./views/detailPage/buyingpage.vue')
const reservepage = () => import('./views/detailPage/reservepage.vue')
const commonpage = () => import('./views/detailPage/commonpage.vue')
const addressmanage = () => import('./views/page/addressmanage.vue')
const comment = () => import('./views/detailPage/comment.vue')
const submitorder = () => import('./views/detailPage/submitorder.vue')
const commentren = () => import('./views/order/commentren.vue')
const orderDetails = () => import('./views/order/orderDetails.vue')
const successDetails = () => import('./views/order/successDetails.vue')
const addressEdit = () => import('./views/page/addressEdit.vue')
const lowerShelf = () =>import('.//views/detailPage/lowerShelf.vue')
//异常问题
const error = () => import('./views/order/error.vue')
import loginError from './views/order/loginError.vue'


// 登录注册
import login from './views/public/login.vue'
import server from './views/public/server.vue'
import phoneregister from './views/public/phoneregister.vue'
import wpsw from './views/public/wpsw.vue'
import wpsw1 from './views/public/wpsw1.vue'
import wpsw2 from './views/public/wpsw2.vue'

Vue.use(Router)

var router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', name: 'home', component: home, meta: {isLogin: true}},
        {path: '/home/:appData/', name: 'home', component: home},
        {path: '/home/buyingpage/:id', name: 'buyingpage', component: buyingpage, meta: {isLogin: true}},
        {path: '/home/reservepage/:id', name: 'reservepage', component: reservepage, meta: {isLogin: true}},
        {path: '/home/reservepage/:id/:pMerchantno',name: 'reservepage',component: reservepage,meta: {isLogin: true}},
        {path: '/home/commonpage/:id', name: 'commonpage', component: commonpage, meta: {isLogin: true}},
        {path: '/home/comment/:id', name: 'comment', component: comment, meta: {isLogin: true}},
        {path: '/submitorder', name: 'submitorder', component: submitorder, meta: {isLogin: true}},
        {path: '/car', name: 'car', component: car, meta: {isLogin: false}},
        {path: '/commentren', name: 'commentren', component: commentren, meta: {isLogin: false}},
        {path: '/successDetails/:id', name: 'successDetails', component: successDetails, meta: {isLogin: false}},
        {path: '/orderDetails', name: 'orderDetails', component: orderDetails, meta: {isLogin: false}},
        {path: '/address', name: 'address', component: address, meta: {isLogin: false}},
        {path: '/addressEdit', name: 'addressEdit', component: addressEdit, meta: {isLogin: false}},
        {path: '/addressmanage', name: 'addressmanage', component: addressmanage, meta: {isLogin: false}},
        {path: '/mine', name: 'mine', component: mine, meta: {isLogin: false}},
        {path: '/home/native/:id', name: 'native', component: native, meta: {isLogin: false}},
        {path: '/myorder', name: 'myorder', component: myorder,},
        {path: '/login', component: login, name: 'login'},//密码登录页面
        {path: '/server', component: server, name: 'server'},//合同规则
        {path: '/wpsw', component: wpsw, name: 'wpsw'},//找回密码
        {path: '/wpsw1', component: wpsw1, name: 'wpsw1'},//找回密码
        {path: '/wpsw2', component: wpsw2, name: 'wpsw2'},//修改密码
        {path: '/phoneregister', component: phoneregister, name: 'phoneregister'},//手机一建注册
        {path: '/error', component: error, name: 'error'},
        {path: '/loginError', component: loginError, name: 'loginError'},
        {path: '/lowerShelf', component: lowerShelf, name: 'lowerShelf'}

    ],
    linkActiveClass: "mui-active",
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
          } else {
            return { x: 0, y: 0 }
          }
      }
});
router.beforeEach((to, from, next) => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        if (to.path === "/mine" || to.path === "/car") {
         if(sessionStorage.getItem("loginState")=="01"){
                //未注册 跳转到注册页面
                window.location.href = "#/phoneregister";
            }else if (sessionStorage.getItem("loginState")=="00") {

         }else{
             alert("登录程序发生异常");
         }
        }
        next();
    }else{
        next();
    }
    // if (to.meta.isLogin) {
    //     next({
    //         path: '/login',
    //         query: {redirect: to.fullPath}
    //     });
    // } else {
    //     next();
    // }
});
export default router
