import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
var router = new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/home'
    },
        {
            path: '/home',
            name: 'home',
            component(resolve){
                require(['./views/home.vue'],resolve)
            }
        },
        {
            path: '/home/:appData',
            name: 'home',
            component(resolve){
                require(['./views/home.vue'],resolve)
            }
        },
        {
            path: '/home/q/:pMerchantno',
            name: 'home',
            component(resolve){
                require(['./views/home.vue'],resolve)
            }
        },
        {
            path: '/loginHandle/:sendUrl',
            name: 'loginHandle',
            component(resolve){
                require(['./views/public/loginHandle.vue'],resolve)
            }
        },
        {
            path: '/loginHandle/:sendUrl/:pMerchantno',
            name: 'loginHandle',
            component(resolve){
                require(['./views/public/loginHandle.vue'],resolve)
            }
        },
        {
            path: '/getCode/:sendUrl',
            name: 'getCode',
            component(resolve){
                require(['./views/public/getCode.vue'],resolve)
            }
        },
        {

            path: '/home/buyingpage/:id',
            name: 'buyingpage',
            component(resolve){
                require(['./views/detailPage/buyingpage.vue'],resolve)
            }
        },
        {
            path: '/home/reservepage/:id',
            name: 'reservepage',
            component(resolve){
                require(['./views/detailPage/reservepage.vue'],resolve)
            }
        },
        {
            path: '/home/reservepage/:id/:pMerchantno',
            name: 'reservepage',
            component(resolve){
                require(['./views/detailPage/reservepage.vue'],resolve)
            }
        },
        {
            path: '/home/commonpage/:id',
            name: 'commonpage',
            component(resolve){
                require(['./views/detailPage/commonpage.vue'],resolve)
            }
        },
        {
            path: '/home/comment/:id',
            name: 'comment',
            component(resolve){
                require(['./views/detailPage/comment.vue'],resolve)
            }
        },
        {
            path: '/submitorder',
            name: 'submitorder',
            component(resolve){
                require(['./views/detailPage/submitorder.vue'],resolve)
            }
        },
        {
            path: '/car',
            name: 'car',
            component(resolve){
                require(['./views/car.vue'],resolve)
            }
        },
        {
            path: '/commentren',
            name: 'commentren',
            component(resolve){
                require(['./views/order/commentren.vue'],resolve)
            }
        },
        {
            path: '/successDetails/:id',
            name: 'successDetails',
            component(resolve){
                require(['./views/order/successDetails.vue'],resolve)
            }
        },
        {
            path: '/orderDetails',
            name: 'orderDetails',
            component(resolve){
                require(['./views/order/orderDetails.vue'],resolve)
            }
        },
        {
            path: '/address',
            name: 'address',
            component(resolve){
                require(['./views/page/address.vue'],resolve)
            }
        },
        {
            path: '/addressEdit',
            name: 'addressEdit',
            component(resolve){
                require(['./views/page/addressEdit.vue'],resolve)
            }
        },
        {
            path: '/addressmanage',
            name: 'addressmanage',
            component(resolve){
                require(['./views/page/addressmanage.vue'],resolve)
            }
        },
        {
            path: '/mine',
            name: 'mine',
            component(resolve){
                require(['./views/mine.vue'],resolve)
            }
        },
        {
            path: '/mine/integral',
            name: 'integral',
            component(resolve){
                require(['./views/mine/integral.vue'],resolve)
            }
        },
        //积分明细
        {
            path: '/home/native/:id',
            name: 'native',
            component(resolve){
                require(['./views/page/native.vue'],resolve)
            }
        },
        {
            path: '/myorder',
            name: 'myorder',
            component(resolve){
                require(['./views/page/myorder.vue'],resolve)
            }
        },
        {
            path: '/login',
            name: 'login',
            component(resolve){
                require(['./views/public/login.vue'],resolve)
            }
        },
        //密码登录页面
        {
            path: '/server',
            name: 'server',
            component(resolve){
                require(['./views/public/server.vue'],resolve)
            }

        },
        //合同规则
        {
            path: '/wpsw',
            name: 'wpsw',
            component(resolve){
                require(['./views/public/wpsw.vue'],resolve)
            }
        },
        //找回密码
        {
            path: '/wpsw1',
            name: 'wpsw1',
            component(resolve){
                require(['./views/public/wpsw1.vue'],resolve)
            }
        },
        //找回密码
        {
            path: '/wpsw2',
            name: 'wpsw2',
            component(resolve){
                require(['./views/public/wpsw2.vue'],resolve)
            }
        },
        //手机号注册
        {
            path: '/phoneregister',
            name: 'phoneregister',
            component(resolve){
                require(['./views/public/phoneregister.vue'],resolve)
            }
        },
        {
            path: '/error',
            name: 'error',
            component(resolve){
                require(['./views/order/error.vue'],resolve)
            }

        },
        {
            path: '/loginError',
            name: 'loginError',
            component(resolve){
                require(['./views/order/loginError.vue'],resolve)
            }

        },
        {
            path: '/lowerShelf',
            name: 'lowerShelf',
            component(resolve){
                require(['./views/detailPage/lowerShelf.vue'],resolve)
            }
        }],
    linkActiveClass: "mui-active",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});
router.beforeEach((to, from, next) => {
    let ua = window.navigator.userAgent.toLowerCase();
    if (to.path === "/mine" || to.path === "/car") {
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            if (localStorage.getItem("oCustID")=="0") {
                //未注册 跳转到注册页面
                window.location.href = "#/phoneregister";
            } else if (localStorage.getItem("oCustID") !="-1" && localStorage.getItem("oCustID")!="0" && localStorage.getItem("oCustID")!=null) {
                next();
            } else if (localStorage.getItem("oCustID")=="-1" || localStorage.getItem("oCustID")==null) {
                alert("登录失败");
            }
        } else {
            if (localStorage.getItem("oCustID")=="-1" || localStorage.getItem("oCustID")==null) {
                //未登录
                try {
                    JSHook.LoginMessage("what?");
                } catch (e) {}
                try {
                    window.webkit.messageHandlers.LoginMessage.postMessage(["good"])
                } catch (e) {}
            } else if (localStorage.getItem("oCustID") !="-1" && localStorage.getItem("oCustID")!="0" && localStorage.getItem("oCustID")!=null) {
                next();
            }
        }
    } else {
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
