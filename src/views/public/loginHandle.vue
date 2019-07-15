<template>
    <div></div>
</template>
<script>
    export default {
        data() {
            return {}
        }, created() {
            //清除缓存
            localStorage.clear();
            let pMerchantno = this.$route.params.sendUrl.substring(this.$route.params.sendUrl.lastIndexOf("/")+1,this.$route.params.sendUrl.length);
            localStorage.setItem("pMerchantno",pMerchantno);
            let toUrl = "http://mall.zybkeji.com/#/getCode/"+encodeURIComponent(this.$route.params.sendUrl);
            //请求微信登录
            location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e0fde7596b26d58&redirect_uri=' + encodeURIComponent(toUrl) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
        }, beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false;
            });
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next();
        }
    }
</script>
