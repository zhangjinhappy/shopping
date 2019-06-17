<template>
    <div class="regisrer_content">
        <yd-navbar :title="chang">
            <router-link to="/home" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="center">
            <input type="tel" slot="right" required ref="input1" v-model="param.pPhoneNumber" maxlength="11" placeholder="请输入手机号" style="background-color:#EEEEEE">
            <div class="regisrer-login">
                <input type="text" class="regisrer-a" slot="right" ref="input2" v-model=" param.pCode" placeholder="请输入验证码" style="background-color:#EEEEEE">
                <!-- ↓↓关键代码是这里↓↓ -->
                <yd-sendcode class="a-a" slot="right" v-model="start1" @click.native="sendCode1" type="primary"></yd-sendcode>
                <!-- ↑↑关键代码是这里↑↑ -->
            </div>
            <input type="text" slot="right" ref="pwd" v-model="param.pName" minlength="6" maxlength="18" placeholder="请输入名称" style="background-color:#EEEEEE">
            <div class="box">
                <!-- <yd-checkbox v-model="dev" shape="circle">&nbsp;&nbsp;我同意《服务条款》</yd-checkbox> -->
                <div class="checkboc">
                    <i :class="{icon1:dev? true:false}" @click="icon">✔</i><span>&nbsp;&nbsp;我同意《服务条款》</span>
                </div>
                <div class="clcik"  @click="fun"> </div>
            </div>
            <yd-button size="large" type="disabled" disabled v-if="!dev">注册</yd-button>
            <yd-button size="large" bgcolor="#1D75D6" color="#fff" v-if="dev" type="primary" @click.native="userheader">注册</yd-button>
        </div>
    </div>
</template>
<script>
    import {
        R_parse_PhoneNumber
    } from '../../utils/Regular';
    export default {
        data() {
            return {
                dev: false,
                chang: "手机一键注册",
                start1: false,
                param: {
                    pPhoneNumber: "",
                    pCode: "",
                    pName: "",
                    pMerchantno: sessionStorage.getItem("pMerchantno"),
                    pOpenID: localStorage.getItem("openId")

        }
            }
        },
        created(){

        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next()
        },
        components: {},
        methods: {
            icon(){
                if(this.dev){
                    this.dev = false
                }else{
                    this.dev = true
                }
            },
            fun() {
                this.$router.push({
                    name: "server"
                })
            },
            async userheader() {
                if (!R_parse_PhoneNumber.test(this.param.pPhoneNumber)) { //验证注册手机号
                    this.$dialog.toast({
                        mes: "请输入正确的注册手机号码!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.param.pCode.length ==0) {
                    this.$dialog.toast({
                        mes: "验证码不正确!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.param.pName.length ==0) {
                    this.$dialog.toast({
                        mes: "请输入名称!",
                        timeout: 1500
                    });
                    return;
                }
                if (this.$refs.input1.value !== null) {
                    this.param.TransType="H5SHZC";
                    let result = await this.$axios.post("/wx/register", this.param);
                    if (result != null) {
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1000
                        });
                        if (result.state != "00") {
                        } else {
                            //存储登录标识
                            sessionStorage.setItem("loginState", "00");
                            //清除openId;
                            localStorage.removeItem("openId");
                            //保存用户Id
                            localStorage.setItem("oCustID", result.oCustID || "");
                            //保存代理商编号
                            localStorage.setItem("oMerchantno", result.oMerchantno || "");
                            //返回上个页面
                            this.$router.go(-1);
                        }
                    }
                }
            },
            async sendCode1() {
                if (!R_parse_PhoneNumber.test(this.param.pPhoneNumber)) {
                    this.$dialog.toast({
                        mes: "请输入正确的注册手机号码",
                        timeout: 1500
                    });
                    return;
                }
                this.$dialog.loading.open('发送中...');
                let res = await this.$axios.post('/send/login' ,{
                    "pPhoneNumber": this.param.pPhoneNumber,
                    "TransType": "FSYZM",
                    "pType": 1
                });
                if (res.state == "00") {
                    this.start1 = true;
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: res.msg,
                        icon: 'success',
                        timeout: 1500
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .yd-btn-primary:not(.yd-btn-loading) {
        background-color: rgb(29, 117, 214);
    }
    .center {
        margin-top: 15px;
        padding-left: 10px;
        padding-right: 10px
    }
    .regisrer_content {
        background-color: #fff;
    }
    .a-a {
        height: 37px;
        width: 25%;
        background-color: #716a6a;
        border: 1px solid
    }
    img {
        width: 100%;
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .login-img {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .regisrer-login {
        display: flex;
        justify-content: space-between
    }
    .regisrer-a {
        width: 65%;
    }
    .yd-checkbox {
        display: flex;
        padding-right: 10px;
        align-items: center;
    }
    .box {
        position: relative;
    }
    .clcik{
        position: absolute;
        height: 20px;
        width: 30%;
        top: 0;
        left:  11%;
    }
    input {
        margin-bottom: 10px;
        font-size: 12px;
    }
    .checkboc>i{
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 1px solid #cccccc;
        font-size: 18px;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        color: #fff;
    }
    .icon1{
        background-color: #1D75D6
    }
</style>


