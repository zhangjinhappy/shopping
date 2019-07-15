<template>
    <div class="mine">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <div class="center">
            <div class="center-header">
                <h2 class="center-h2" @click="myorder">我的订单</h2>
                <p class="center-p" @click="myorder">全部订单
                    <yd-navbar-next-icon color="#999999"></yd-navbar-next-icon>
                </p>
            </div>
        </div>
        <!-- 四宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9 order">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="toMyOrder(1)">
                <div>
                    <img class="pic1" src="../assets/img/m.png" alt="加载中">
                    <yd-badge style="position: absolute;margin-left: -5px;" scale="0.9" bgcolor="rgb(239, 118, 118)" color="#FFFFFF" v-if="mineData.oWaitPay!=0">{{mineData.oWaitPay>=99?"99+":mineData.oWaitPay}}</yd-badge>
                    <div class="mui-media-body" style="font-size: 12px;color: #666666;">待支付</div>
                </div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="toMyOrder(2)">
                <div>
                    <img class="pic1" src="../assets/img/m1.png" alt="加载中">
                    <yd-badge style="position: absolute;margin-left: -5px;" scale="0.9" bgcolor="rgb(239, 118, 118)" color="#FFFFFF"v-if="mineData.oWaitSend!=0">{{mineData.oWaitSend>=99?"99+":mineData.oWaitSend}}</yd-badge>
                    <div class="mui-media-body" style="font-size: 12px;color: #666666;">待发货</div>
                </div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="toMyOrder(3)">
                <div href="#">
                    <img class="pic1" src="../assets/img/m2.png" alt="加载中">
                    <yd-badge style="position: absolute;margin-left: -5px;" scale="0.9" bgcolor="rgb(239, 118, 118)" color="#FFFFFF" v-if="mineData.oWaitReceive!=0">{{mineData.oWaitReceive>=99?"99+":mineData.oWaitReceive}}</yd-badge>
                    <div class="mui-media-body" style="font-size: 12px;color: #666666;">待收货</div>
                </div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="toMyOrder(5)">
                <div href="#">
                    <img class="pic1" src="../assets/img/m3.png" alt="加载中">
                    <yd-badge style="position: absolute;margin-left: -5px;" scale="0.9" bgcolor="rgb(239, 118, 118)" color="#FFFFFF" v-if="mineData.oWaitComment!=0">{{mineData.oWaitComment>=99?"99+":mineData.oWaitComment}}</yd-badge>
                    <div class="mui-media-body" style="font-size: 12px;color: #666666;">待评价</div>
                </div>
            </li>
        </ul>
        <div class="center">
            <div class="center-header bor" @click="detailed" v-if="mineData.oIsShow==1">
                <div class="center-h1">我的积分: <span style="color: green;font-size: 15px;">{{mineData.oPointbalance}} </span> <span style="color: red;margin-left: 10px;"> (冻结积分:{{mineData.oFrozenPoint}})</span></div>
                <yd-navbar-next-icon></yd-navbar-next-icon>
            </div>
            <div class="center-header bor" @click="add">
                <div class="center-h1">地址管理</div>
                <yd-navbar-next-icon></yd-navbar-next-icon>
            </div>
            <div class="center-header bor" @click="call">
                <div class="center-h1">客服中心</div>
                <yd-navbar-next-icon></yd-navbar-next-icon>
            </div>
        </div>
    </div>
</template>
<script>
    import navbar from '../components/nav.vue'

    export default {
        data() {
            return {
                title: "我的",
                mineData:{}
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                //vm.$parent.$data.showfooter=false
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            // this.$parent.$data.showfooter=true
            this.$parent.$data.showmenu = true
            next()
        },
        created() {
            //加载我的数据
            this.loadingMine();
        },
        methods: {
            loadingMine() {
                let param = {
                    "TransType": "CXZHYE",
                };
                this.$axios.post("/send/getData", param).then((res) => {
                    if (res != null) {
                        if (res.state == "00") {
                            this.mineData=res;
                        }
                    }
                });
            },
            toMyOrder(state) {
                this.$router.push({name: "myorder", params: {state}});
            },
            PendingPay() {

            },
            myorder() {
                this.$router.push({name: 'myorder'});
            },
            detailed() {
                this.$router.push({name: 'integral'});
            },
            add() {
                this.$router.push({name: 'addressmanage'});
            }
            ,
            call() {
                window.location.href = "tel:" + localStorage.getItem("servicePhone");
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .mine .order {
        background-color: #FFFFFF !important;
        margin: 2px 0;
    }

    .center {
        background-color: #ffffff;
        padding: 0 6%;
    }

    .mine {
        padding-top: 50px;
    }

    .center-header {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .center-h2 {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        font-weight: 500;
    }

    .center-p {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
    }

    .mui-grid-view.mui-grid-9 {
        background-color: rgba(0, 0, 0, 0);
        border: 0px solid #eee;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0px solid #eee;
    }

    .mui-col-xs-4 {
        width: 25%;
    }

    .pic1 {
        width: 32px;
        height: 32px;
    }

    .bor {
        border-bottom: 1px solid #cccccc
    }

    .center-h1 {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #333333;
        font-weight: 500;
    }
</style>

