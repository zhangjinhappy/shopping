<template>
    <div class="comment">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 内容 -->
        <div class="comment-header">
            <div class="comment-top">
                {{getState(orderDetail.orderstate)}}
            </div>
            <div class="comment-footer">
                感谢您对{{orderDetail.agentname}}的信任
            </div>
        </div>
       <!-- <div class="comment-body">
            <div class="body-top">
                <div class="top-r" style="flex:8">
                    {在广东省广州市白云区外围股市进行发出扫描，将发往：广东省广州市白云区嘉禾街道YH城1栋403楼}
                </div>
                <div class="top-l" style="flex:1">
                    <yd-navbar-next-icon style="float: right; color:#ccc"></yd-navbar-next-icon>
                </div>
            </div>
            <div class="body-time">
                2018-04-10 11:07:34
            </div>
        </div> -->
        <div class="comment-body">
            <div class="header-top">
                收货人：{{custAddress.Name}}
            </div>
            <div class="header-top">
                收货人手机：{{custAddress.phonenumber}}
            </div>
            <div class="adress-foot">
                {{custAddress.provcityarea+" "+custAddress.detailaddress}}
            </div>
        </div>
        <br>
        <div class="shop-header" v-for="item in goodsDetail">
            <div style="width: 80px; height: 80px">
                <img :src="item.image" style="border-radius: 6px;width: 80px; height: 80px">
            </div>
            <div class="header-r">
                <p class="q">{{item.formname}}</p>
                <p class="f">{{item.name}}</p>
                <p class="s">¥ {{item.price}}</p>
                <p class="f">{{item.expressname}}</p>
            </div>
        </div>

        <div class="sp-header">
            <div class="shop-price">
                <p>商品总价</p>
                <p>￥{{orderDetail.sumprice}}</p>
            </div>
            <div class="shop-price">
                <p>运费</p>
                <p>￥{{orderDetail.freight}}</p>
            </div>
            <div class="shop-price">
                <h2 style="font-size: 14px;color: #333333;">订单总价</h2>
                <span style="font-size: 14px;color: #E5532A">￥{{(orderDetail.sumprice+orderDetail.freight).toFixed(2)}}</span>
            </div>
        </div>
        <br>
        <div class="shop-p" style="height:48px;padding:0 25px;" @click="call">
            <h2 class="person">联系客服</h2>
            <yd-navbar-next-icon></yd-navbar-next-icon>
        </div>
        <br>
        <div class="sp-header">
            <div class="shop-price">
                <p>订单编号：{{orderDetail.orderno}}</p>
            </div>
            <div class="shop-price">
                <p>
                    订单时间：{{orderDetail.addtime}}
                </p>
            </div>
            <div class="shop-price">
                <p>支付方式：{{orderDetail.paytype}}</p>
            </div>
        </div>
        <br>
        <!--<div class="footer">comment-footer
            <div class="del-btn">删除订单</div>
            <div class="d-btn">确认订单</div>
        </div>-->
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        data() {
            return {
                title: "订单详情",
                custAddress: [],//地址详情
                goodsDetail: [],//商品详情
                orderDetail: []//订单详情
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false;
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next()
        },
        created() {
            this.loadData(this.$route.params.id);
        },
        methods: {
            //订单状态
            getState(state) {
                switch (state) {
                    //1待支付，2待发货，3待收货，5待评价，6已完成；
                    case 1:
                        return "待支付";
                    case 2:
                        return "待发货";
                    case 3:
                        return "待收货";
                    case 5:
                        return "待评价";
                    case 6:
                        return "已完成";
                }
            },
            loadData(id) {
                let param = {
                    "TransType": "DDXQ",
                    "pOrderID": id
                };
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                        if (result.state == "00") {
                            this.custAddress = result.custAddress[0];
                            this.goodsDetail = result.goodsDetail;
                            this.orderDetail = result.orderDetail[0];
                            // location.reload();
                        }else{
                            this.$dialog.toast({
                                mes: result.message,
                                timeout: 1500
                            });
                        }
                    }
                });
            },
            call() {
                window.location.href="tel:"+localStorage.getItem("servicePhone");
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .comment-header {
        width: 100%;
        background-color: #FFFFFF;
        height: 120px;
        position: relative;
    }
    .comment{
        padding-top: 50px;
    }
    .comment-top {
        width: 100%;
        padding-left: 15px;
        height: 87px;
        font-size: 24px;
        line-height: 87px;
        color: #FFFFFF;
        background-color: #5396FF;
    }

    .comment-footer {
        width: 90%;
        height: 46px;
        padding-left: 10px;
        font-size: 16px;
        background-color: #FFFFFF;
        color: #333333;
        line-height: 46px;
        box-shadow: 0 2px 4px 0 rgba(63, 100, 5, 0.20);
        border-radius: 2px;
        position: absolute;
        left: 3%;
        bottom: 13px;
    }

    .comment-body {
        padding: 18px 25px 5px;
        background-color: #ffffff;
        border-bottom: 1px solid #ccc;
    }

    .body-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .top-r {
        font-size: 14px;
        height: 60px;
        color: #F5A623;
        letter-spacing: 0;
    }

    .body-time {
        font-size: 12px;
        color: #999999;
    }

    .header-top {
        font-size: 14px;
        color: #666666;
    }

    .adress-foot {
        font-size: 14px;
        color: #666666;
    }

    .shop-header {
        background-color: #FFFFFF;
        padding: 10px 0 10px 29px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #cccccc
    }

    .header-r {
        padding-left: 20px;
    }

    .q {
        font-size: 12px;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .s {
        color: #E5532A;
    }

    .f {
        font-size: 10px;
        color: #999999;
    }

    .shop-price,
    .shop-p {
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .shop-price > p {
        font-size: 12px;
        color: #999999;
    }

    .sp-header {
        width: 100%;
        background-color: #ffffff;
        padding: 10px 29px
    }

    .person {
        font-size: 14px;
        color: #666666;
    }

    .footer {
        background-color: #FFFFFF;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .del-btn, .p-btn, .d-btn {
        width: 64px;
        height: 30px;
        color: #999999;
        text-align: center;
        line-height: 30px;
        border-radius: 30px;
        margin-right: 10px;
        border: 1px solid #ccc;
    }
</style>

