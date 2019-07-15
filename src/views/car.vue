<template>
    <div class="car">
        <!-- 头部 -->
        <yd-navbar :title="title" fixed>
            <a slot="left" @click="goBack">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
            <a slot="right">
                <span ref="b" @click="editList" class="edit">编辑</span>
            </a>
        </yd-navbar>
        <!-- {{$store.state.car.length}} -->
        <yd-checklist v-model="countIdList" :label="false" ref="checklistDemo" :callback="change">
            <img style="width: 100%;" src="../assets/img/notData.png" v-if="isNull">
            <!-- isshow==0(商品下架)  editType=='edit'(不处于编辑状态) -->
            <yd-checklist-item :val="car.id" :disabled="car.isshow==0 && editType!='edit'" v-for="(car,i) in carList" :key="car.id">
                <yd-flexbox style="padding: 5px 0;">
                    <div style="width:80px;height:80px"><img v-lazy="car.image" class="demo-checklist-img"></div>
                    <yd-flexbox-item align="top" class="car-contect">
                    <h1 class="word">{{car.name}}</h1>
                    <p class="car-top">{{car.formname}}</p>
                    <p style="color:rgb(229, 83, 42);font-family: PingFangSC-Regular;font-size: 12px;">
                        ￥{{(car.price*car.count).toFixed(2)+" (运费:"+car.freight.toFixed(2)+")"}}</p>
                    <div class="select" v-if="car.isshow!=0">
                        <yd-spinner unit="1" v-model="car.count" :val="i" :callback="selectCount"></yd-spinner>
                    </div>
                    <div v-if="car.isshow==0" style="color: red;">该商品已失效</div>
                </yd-flexbox-item>
                </yd-flexbox>
                <div style="margin-bottom: 5px;" v-if="car.isshow!=0 && car.pointrate!=0">
                    <p style="float: left;">积分抵扣</p><span style="color: red;">:￥{{car.pointcount*car.pointmaxmoney}} (消耗积分{{car.pointcount*car.pointrate}})</span>
                    <yd-spinner style="float: right;" :max="car.count"  unit="1" min="0" v-model="car.pointcount"></yd-spinner>
                </div>
            </yd-checklist-item>
        </yd-checklist>
        <!-- 按钮区域 -->
        <div class="btn">
            <div class="btn-l">
                <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll">全选</yd-checkbox>
            </div>
            <div class="btn-c" v-if="!showBtn">
                <div class="money">合计：<span style="color:#F00;font-family: PingFangSC-Regular;font-size: 14px;color: #FD5C63">￥{{totalPrice}}</span>
                </div>
                <div class="btn-r" @click="gopay()"> 结算</div>
            </div>
            <div class="btn-c" v-if="showBtn">
                <div class="del" @click="del">删除</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isNull:false,
                carList: [],
                isCheckAll: false,
                editType:'over',
                flag: false,
                title: "购物车",
                showBtn: false,
                showPay: false,
                countIdList: [],
            }
        },
        created() {
            //加载购物车列表
            this.loadCar();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                //vm.$parent.$data.showfooter=false
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            // this.$parent.$data.showfooter=true
            this.$parent.$data.showmenu = true;
            next();
        },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:#FFFFFF')
        },
        watch:{

        },
        computed: {
            totalPrice() {
                let total = 0;
                for (let key = 0; key < this.carList.length; key++) {
                    for (let i = 0; i < this.countIdList.length; i++) {
                        if (this.countIdList[i] == this.carList[key].id) {
                            total += (this.carList[key].price * this.carList[key].count)-(this.carList[key].pointcount*this.carList[key].pointmaxmoney);
                            total.toFixed(2);
                            break;
                        }
                    }
                }
                return total.toFixed(2);
            }
        },
        methods: {
            selectCount(v,n){
                if(n<=this.carList[v].pointcount){
                    this.carList[v].pointcount=n;
                }
            },
            loadCar() {
                let param = {
                    "TransType": "GWCLB",
                };
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                        if (result.state != "00") {
                            this.$dialog.toast({
                                mes: result.message,
                                timeout: 1500
                            });
                            this.isNull=true;
                        } else {
                            this.carList = result.dataList;
                            if(this.carList.length<=0){
                                this.isNull=true;
                            }
                            //  this.$store.commit("goodnumber", this.carList);
                            // var shopList=result.dataList;
                            // this.$store.commit("goodList",shopList)
                        }
                    }else{
                        this.isNull=true;
                    }
                });
            },
            del() {
                let ids = "";
                for (let j = 0; j < this.countIdList.length; j++) {
                    ids += this.countIdList[j] + (j >= this.countIdList.length - 1 ? "" : "|");
                }
                //删除购物车
                let param = {
                    "TransType": "SCGWC",
                    "pCarIDs": ids
                };
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1500
                        });
                        if (result.state == "00") {
                            for (let i = 0; i < this.carList.length; i++) {
                                if (this.countIdList.indexOf(this.carList[i].id) != -1) {
                                    this.carList.splice(i, 1);
                                    //数组重新循环一次
                                    i = -1;
                                }
                            }
                            //更新购物车数量
                            localStorage.setItem("goodsCount", result.goodsCount)
                        }
                    }
                });
            },
            goBack() {
                this.$router.go(-1);
            },
            gopay() {
                let tempList = [];
                for (let i = 0; i < this.carList.length; i++) {
                    if (this.countIdList.indexOf(this.carList[i].id) != -1) {
                        tempList.push(this.carList[i]);
                    }
                }
                if (tempList.length <= 0) {
                    this.$dialog.toast({
                        mes: "请选择商品",
                        timeout: 1500
                    });
                    return null;
                }
                localStorage.setItem("lCarList", JSON.stringify(tempList));
                localStorage.setItem("xdType", "gwcxd");
                this.$router.push({
                    name: "submitorder",
                });
            },
            plusShop(i) {
                this.carList[i].count == 1 ? "" : this.carList[i].count--
            },
            reduceShop(i) {
                this.carList[i].count++
                    this.flag = !this.flag
            },
            change(value, isCheckAll) {
                this.isCheckAll = isCheckAll;
            },
            checkAll() {
                this.isCheckAll = !this.isCheckAll;
                this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
            },
            editList() {
                if (this.showPay) {
                    this.showBtn = false;
                    this.showPay = false;
                    this.$refs.checklistDemo.$emit('ydui.checklist.checkall',false);
                    this.$refs.b.innerHTML = "编辑"
                    this. editType="over";
                } else {
                    this.showPay = true;
                    this.showBtn = true;
                    this.$refs.b.innerHTML = "完成";
                    this. editType="edit";
                }
            }
        },
        components: {}
    }
</script>

<style scoped>
    .yd-checklist {
        border-top: 1px solid rgb(228, 228, 228);
    }
    .yd-checklist-item {
        margin: 0 12px;
        border-bottom: 1px solid rgb(228, 228, 228);
        padding-bottom: 10px;
    }
    .car {
        padding-bottom: 100px;
        padding-top: 50px;
    }
    .car-top {
        /* height: 40px; */
        overflow: hidden;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #999999;
    }
    .car-contect {
        padding-left: 20px;
        margin: 5px 0;
    }
    .word {
        font-size: 12px;
        color: #000000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-family: PingFangSC-Regular;
        font-weight: 200;
        color: #333333;
        line-height: 17px;
    }
    .btn {
        z-index: 99;
        width: 100%;
        height: 44px;
        border-top: 1px solid #cccccc;
        display: flex;
        align-items: center;
        background-color: #fff;
        position: fixed;
        bottom: 50px;
    }
    .btn-l {
        flex: 1;
        padding: 0 10px;
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .btn-c {
        flex: 3;
        display: flex;
        align-items: center;
        justify-content: flex-end
    }
    .btn-r {
        margin-left: 10px;
        width: 30%;
        height: 44px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #fff;
        background: #E5532A;
        text-align: center;
        line-height: 44px;
    }
    .select {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .r {
        width: 40%;
        height: 20px;
        display: flex;
    }
    .add {
        display: block;
        text-align: center;
        font-size: 15px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50% 0 0 50%;
        border: 1px solid #cccccc
    }
    .text {
        display: block;
        width: 40px;
        height: 20px;
        text-align: center;
        border: 1px solid #cccccc
    }
    .reduce {
        display: block;
        font-size: 15px;
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 16px;
        border-radius: 0 50% 50% 0;
        border: 1px solid #cccccc
    }
    .del {
        width: 70px;
        height: 30px;
        color: #FD5C63;
        border: 1px solid #FD5C63;
        border-radius: 30px;
        margin-right: 20px;
        text-align: center;
        line-height: 30px;
    }
    .edit {
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #333333;
    }
    .demo-checklist-img{
        width: 80px;
        height: 80px;
        color:blue;
        border-radius: 6px;
    }

    /* .yd-checkbox-text{
         margin-left: 14px;
         padding-right: 10px;
         font-size: 18px
        } */
</style>


