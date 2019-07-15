<template>
    <div class="pic">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 内容 -->
        <div class="center">
            <div class="center-content">
                <div class="a">
                    <span class="person">姓名:</span>
                    <input type="text" required class="input" v-model="params.pName" placeholder="请填写收货人的姓名">
                </div>
                <div class="a">
                    <span class="person">电话:</span>
                    <input type="tel" required class="input" v-model="params.pPhoneNumber" placeholder="请填写收货人的电话号码">
                </div>
                <div class="a">
                    <span class="person">选择地址:</span>
                    <div class="input two" @click="showCity =true">
                        <input type="text"  class="input"  readonly placeholder="请填写地址" v-model="model1" style="width:80%">
                        <yd-navbar-next-icon></yd-navbar-next-icon>
                    </div>
                </div>
                <yd-cityselect v-model="showCity" :callback="result1" :items="district" columns=3></yd-cityselect>
            </div>
            <yd-cell-group title="详细地址：">
                <yd-cell-item>
                    <yd-textarea slot="right" placeholder="如具体的街，门牌号，小区，楼栋号，单元号" maxlength="100" v-model="params.pDetailAddress"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <br>
            <div class="a">
                <span class="person">设置默认地址</span>
                <div class="input" style=" width:73px">
                    <yd-switch v-model="switch1"></yd-switch>
                </div>
            </div>
        </div>
        <div class="btn-botttom" @click="adress">
            确定
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    import District from '../../lib/data/province_city_area_id'
    import {
        R_parse_nameReg,
        R_parse_PhoneNumber
    } from '../../utils/Regular'
    import {
        isNull
    } from "../../utils/Is";
    export default {
        data() {
            return {
                title: "添加地址",
                model1: "",
                district: District,
                showCity: false,
                switch1: false,
                params: {
                    TransType: "TJSHDZ",
                    pAddressID: 0,
                    pName: "",
                    pPhoneNumber: "",
                    pAreaCode: '',
                    pCityCode:'',
                    pDetailAddress: "",
                    pIsDefault: 0
                }
            }
        },
        mounted(){
         document.body.removeEventListener('touchmove',function(event){event.preventDefault()},false)
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true
            this.$parent.$data.showmenu = true
            next()
        },
        watch: {
            showCity:(newVal,oldVal)=>{
               if(newVal == true){
                  document.body.removeEventListener('touchmove',function(event){event.preventDefault()},false) 
               }
            },
            switch1(val) {
                if (val) {
                    this.params.pIsDefault = 1;
                } else {
                    this.params.pIsDefault = 0;
                }
            }
        },
         methods: {
            result1(ret) {
                this.params.pAreaCode = ret.itemValue3;
                this.params.pCityCode = ret.itemValue2;
                this.model1 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            },
            adress() {
                if (!R_parse_nameReg.test(this.params.pName)) {
                    this.$dialog.toast({
                        mes: '姓名格式不对!',
                        timeout: 1500
                    });
                    return;
                }
                if (!R_parse_PhoneNumber.test(this.params.pPhoneNumber)) {
                    this.$dialog.toast({
                        mes: '手机号格式不对!',
                        timeout: 1500
                    });
                    return;
                }
                if (isNull(this.params.pCityCode)) {
                    this.$dialog.toast({
                        mes: '请选择城市!',
                        timeout: 1500
                    });
                    return;
                }
                if (isNull(this.params.pDetailAddress)) {
                    this.$dialog.toast({
                        mes: '请填写详细地址!',
                        timeout: 1500
                    });
                    return;
                }
                this.$axios.post("/send/getData", this.params).then((result) => {
                    if (result != null) {
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1500
                        });
                        if ("00" == result.state) {
                                this.$router.push({
                                    name: "addressmanage"
                                });
                        }
                    }
                });
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .pic{
        padding-top: 50px;
    }
    .chart {
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .two {
        display: flex;
        padding-right: 15px;
        align-items: center;
        justify-content: flex-end
    }
    input {
        width: 70%;
        font-size: 16px;
        color: #666666;
    }
    .a {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        background-color: #fff;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
    }
    .input {
        text-align: right;
        border: 0;
    }
    .person {
        width: 30%;
        padding-left: 16px;
        /* text-align: right; */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
    }
    input::-webkit-input-placeholder {
        font-size: 14px;
        color: #ccc
    }
    .yd-cell-title {
        background-color: #f00;
    }
    .yd-textarea>textarea {
        padding-left: 6px;
    }
    .btn-botttom {
        position: fixed;
        bottom: 0;
        height: 40px;
        width: 100%;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        z-index: 999;
        background-color: #21A3FE
    }
</style>

