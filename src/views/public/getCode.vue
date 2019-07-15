<template>
    
</template>

<script>
    export default {
        data() {
            return {}
        }, created() {
            //获取微信的code
            let code  = window.location.search.substring(1, window.location.search.length).split("&")[0].split("=")[1];
            //获取APP要分享的地址
            let toUrl=this.$route.params.sendUrl;
            //去尝试给用户自动登录
            let param = {
                "code": code,//微信code
                "oMerchantno": localStorage.getItem("pMerchantno")
            };
            this.$axios.post("/wx/login", param).then((result) => {
                if (result != null) {
                    //保存code
                    if (result.state == "00"){
                        //登录成功 存储登录标识
                        localStorage.setItem("oCustID", result.oCustID || "-1");
                        localStorage.setItem("oMerchantno", result.oMerchantno);
                    }else if (result.state == "01") {
                        //没有注册
                        localStorage.setItem("openId", result.openId || "");
                        localStorage.setItem("oCustID", "0");
                        alert("去注册 不然只能看 不能买");
                    }else{
                        //登录失败
                        localStorage.setItem("oCustID", "-1");
                    }
                }
                location.replace(toUrl);
            });
        },
     beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$parent.$data.showfooter = false;
            vm.$parent.$data.showmenu = false;
        });
    },
    beforeRouteLeave(to, from, next) {
        this.$parent.$data.showfooter = true;
        this.$parent.$data.showmenu = true;
        next()
    }
    }
</script>

<style scoped>

</style>
