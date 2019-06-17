<template>
    <div id="app">
        <!-- 头部部分 -->
        <yd-navbar :title="title" v-if="showmenu" fixed>
            <a slot="left" v-if="showicon" ref="menu" @click="goBack">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
        </yd-navbar>
        <router-view/>
        <!-- 尾部 -->
        <nav class="mui-bar mui-bar-tab" v-if="showfooter">
            <router-link class="mui-tab-item-ball " to="/home">
                <span class="mui-icon"><yd-icon name="home" slot="icon" size="0.44rem"></yd-icon></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-ball" to="/car">
                <span class="mui-icon b">
                <yd-badge slot="badge" type="danger" class="c" v-if="carCount!=0">{{carCount}}</yd-badge>
                <yd-icon name="shopcart" slot="icon" size="0.44rem"></yd-icon>
                
              </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-ball" to="/mine">
                <span class="mui-icon"> <i class="iconfont">&#xe625;</i></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                carCount:localStorage.getItem("goodsCount") || 0,
                title: "首页",
                showicon: false,
                showmenu: true,
                showfooter: true,
                flag: false
            }
        },

        methods: {
            goBack() {
                this.$router.go(-1)
            },
        }, created() {
            if(localStorage.getItem("firstLoad")=="00"){
                localStorage.clear();
            }
            localStorage.setItem("firstLoad","0");
            //alert(location.href);
            //判断是否是微信浏览器
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //查询是否登录
                if (sessionStorage.getItem("loginState")=="00") {
                    //已经登录
                } else if(sessionStorage.getItem("loginState")=="01"){
                    //没有注册
                }else{
                    //判断有没有微信的code
                    if (sessionStorage.getItem("wxCode") == null || sessionStorage.getItem("wxCode") == "") {
                        if (window.location.search.indexOf('code') < 0) {
                            var newUrl="";
                            // 去除微信默认参数
                            if (/from=[^&$?]{1,}(&|$)/.test(location.search) || /isappinstalled=[^&$?]{1,}(&|$)/.test(location.search)) {
                                var newSearch = location.search.replace(/from=[^&$?]{1,}(&|$)/, '').replace(/isappinstalled=[^&$?]{1,}(&|$)/, '').replace(/&$|\?$/, '');
                                 newUrl = location.origin + location.pathname + newSearch + location.hash;
                            }else{
                                 newUrl=location.href;
                            }
                            location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e0fde7596b26d58&redirect_uri=' + encodeURIComponent(newUrl) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
                        } else {
                            var searchURL = window.location.search;
                            searchURL = searchURL.substring(1, searchURL.length);
                            var code = searchURL.split("&")[0].split("=")[1];
                            //去尝试给用户自动登录
                            let param = {
                                "code": code,//微信code
                                "oMerchantno": sessionStorage.getItem("pMerchantno")
                            };
                            axios.post("/wx/login", param).then((result) => {
                                if (result != null) {
                                    //保存code
                                    sessionStorage.setItem("wxCode", code);
                                    /*this.$dialog.toast({
                                        mes: result.message,
                                        timeout: 1500
                                    });*/
                                    if (result.state == "00") {
                                        //登录成功 存储登录标识
                                        sessionStorage.setItem("loginState", "00");
                                        localStorage.setItem("oCustID", result.oCustID);
                                        localStorage.setItem("oMerchantno", result.oMerchantno);
                                        //alert("登录成功")
                                    } else if (result.state == "01") {
                                        //没有注册
                                        sessionStorage.setItem("loginState", "01");
                                        localStorage.setItem("openId", result.openId || "");
                                        alert("去注册 不然只能看 不能买")
                                        location.href="#/phoneregister";
                                    }
                                }
                            });
                        }
                    }
                }

            }
        }, mounted() {
        }

    }
</script>

<style scoped>
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }

    .yd-tabbar {
        height: 60px;
    }

    .mui-bar {
        background-color: #EEEEEE;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }
    .b{
        position: relative;
    }
    .c{
        position: absolute;
        top: 0;
        left: 60%;
    }
    .mui-bar-tab .mui-tab-item-ball {
        color: #999999;
    }

    .mui-active {
        color: #000 !important;
    }

    .mui-bar-tab .mui-tab-item-ball {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .mui-bar-tab .mui-tab-item-ball .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-ball .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
