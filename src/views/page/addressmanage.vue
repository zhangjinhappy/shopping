<template>
    <div class="pic">
        <!-- 头部 -->
        <yd-navbar :title="title">
            <a slot="left" @click="goBack">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
            <a slot="right" @click="toaddress">
                <span class="r-nav">新增地址</span>
            </a>
        </yd-navbar>
        <!-- 内容 -->
        <div class="center" v-for="(item,i) in addressList" :key="item.id" @click="payaddress(i)">
            <div class="center-header">
                <div class="header-l">收货人:{{item.name}}</div>
                <div class="header-r">{{item.phonenumber}}</div>
            </div>
            <div class="center-h">
                <div class="header-l" style="font-size:12px">收货地址:{{item.provcityarea+" "+item.detailaddress}}</div>
            </div>
            <div class="center-header">
                <div class="header-l" @click.stop="optionClick(item.id)">
                    <i :class="{icom:true,active:item.id==addressId} ">✔</i>&nbsp; 默认地址
                </div>
                <div class="header-r">
                    <i class="a" @click.stop="edit(i)">编辑</i>
                    <i class="a" @click.stop="showdelect(item.id)">删除</i>
                </div>
            </div>
        </div>
        <div class="set_address" @click="setAddress()">设为默认地址</div>
        <!-- 删除弹框 -->
        <div class="ceng" v-if="show1">
            <div class="line">
                <div class="line-header">
                    确认删除
                </div>
                <div class="btn">
                    <div class="btn-l" @click="show1=false">取消</div>
                    <div class="btn-r" @click="delAddress()">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: "地址管理",
                show1: false,
                addressId: 0,
                delAddressId:-1,
                checkbox2: [],
                addressList: []
            }
        },
        created(){

            this.loadAddress();
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
        methods: {
            //加载用户地址
            loadAddress(){
                let param = {
                    "TransType": "SHDZLB",
                }
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                        if(result.state !="00"){
                            this.$dialog.toast({
                                mes: result.message,
                                timeout: 1500
                            });
                        }else{
                            this.addressList=result.dataList;
                            for (let i = 0; i < this.addressList.length; i++) {
                                if(this.addressList[i].isdefault==1){
                                    this.addressId=this.addressList[i].id;
                                }
                            }

                        }
                    }
                });
            },
            //设置为默认地址
            setAddress(){
                let param = {
                    "TransType": "SZMRDZ",
                    "pAddressID":this.addressId
                }
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                            this.$dialog.toast({
                                mes: result.message,
                                timeout: 1500
                            });
                    }
                });
            },
            //删除地址
            delAddress(){
                this.show1=false
                let param = {
                    "TransType": "SCSHDZ",
                    "pAddressID":this.delAddressId
                }
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1500
                        });
                        if(result.state=="00"){
                            for (let i = 0; i < this.addressList.length ; i++) {
                                if(this.delAddressId==this.addressList[i].id){
                                    this.addressList.splice(i,1);
                                }
                            }
                        }
                    }
                });
            },
            //用户选择地址
            payaddress(i){
                this.$store.commit("tAddress", this.addressList[i]);
                this.$router.push({ name: 'submitorder'});
            },
            goBack() {
                this.$router.go(-1);
            },
            showdelect(id) {
                this.delAddressId=id
                this.show1 = true;
            },
            toaddress() {
                this.$router.push({
                    name: "address"
                })
            },
            optionClick(id){
              this.addressId=id
            },
            edit(i){
             this.$store.commit("eAddress", this.addressList[i]);
             this.$router.push({ name: 'addressEdit'});
            }
        },
        components: {}
    }
</script>
<style scoped>
    .set_address{
        text-align: center;
        border: 1px solid #5396ff;
        width: 80%;
        margin: 5% auto;
        padding: 2.5% 0;
        background-color: #5396ff;
        color: #FFFFFF;
    }
    .center-header[data-v-06b63c1a],
    .center-h[data-v-06b63c1a]{
        height: auto;
    }
    .r-nav {
        color: #f00;
        font-size: 16px;
    }
    .center {
        margin-top: 10px;
        padding: 5px 20px;
        background-color: #fff;
    }
    .center-header,
    .center-h {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header-l,
    .header-r {
        font-size: 14px;
        color: #333333
    }
    .a {
        font-size: 14px;
        color: #666666;
        margin-right: 20px;
    }
    .ceng {
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
    }
    .line {
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #fff;
        transform: translate(-50%, -50%);
    }
    .line-header {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }
    .btn {
        width: 100%;
        height: 40px;
        display: flex;
        border-top: 1px solid #ccc;
    }
    .btn-l,
    .btn-r {
        width: 50%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #333333;
    }
    .btn-l {
        border-right: 1px solid #ccc
    }
    .icom {
        display: inline-block;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: 50%;
        color: #ffffff;
        border: 1px solid #cccccc;
    }
    .active {
        background-color: #5396FF;
    }
</style>

