<template>
    <div class="pic">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 内容 -->
        <div class="center">
            <img class="page" src="../../assets/img/banner.png" alt="">
            <div class="btn">
                限时特卖 距离结束 24：17：21
            </div>
        </div>
        <div class="shop-title">
            蜗牛面膜蜗牛面膜蜗牛面膜蜗牛面膜蜗蜗牛面膜蜗牛面膜蜗牛面膜蜗牛面膜蜗
        </div>
        <div class="shop-body" style="padding-top:20px">
            <div class="body-r">
                <h1 :style="{'font-size':'15px','font-weight':'600','color':'#FD5C63','margin':'5px'}">￥123</h1>
                <span :style="{'font-size':'12px','margin':'6px'}">价格:<del>￥166</del></span>
            </div>
            <div class="body-l" @click="show1=true">
                <yd-icon name="share1" size="20px"></yd-icon>
                <div :style="{'font-size':'12px',}">分享</div>
            </div>
        </div>
        <div class="shop-body" style="padding-top:20px">
            <span style="color:#333333">分享能赚取：<i style="color:#F5A623">￥15</i></span>
            <div class="line-r" style="width: 40%">
                月销量1082
            </div>
        </div>
        <br>
        <div class="shop-body" style="height:48px;border-bottom:1px solid #ccc">
            <h2 class="person">发货时间</h2>
            <h1 class="number">48小时内</h1>
        </div>
        <div class="shop-body" style="height:48px" @click="shopcomment">
            <h2 class="person">评论（1）</h2>
            <yd-navbar-next-icon></yd-navbar-next-icon>
        </div>
        <div class="shop-body" style="height:48px;margin-top:10px">
            <h2 class="person">商品详情</h2>
            <span></span>
        </div>
        <!--商品品 图片详情 -->
        <div class="center">
            <img class="page" src="../../assets/img/banner.png" alt="">
        </div>
        <!-- 分享的弹框 -->
        <yd-popup v-model="show1" position="bottom" height="20%">
            <div class="weixin">
                <div class="wei">
                    <img class="i" src="../../assets/img/weixin.png" alt="">
                    <div class="word">微信好友</div>
                </div>
                <div class="qq">
                    <img class="i" src="../../assets/img/qq.png" alt="">
                    <div class="word">朋友圈</div>
                </div>
            </div>
            <div class="btn8" @click="show1=false">
                取消
            </div>
        </yd-popup>
        <!-- 加入购物车 -->
        <yd-popup v-model="show2" position="bottom" height="60%">
            <div class="pop-center">
                <div class="pop-header">
                    <img src="../../assets/img/shop1.png" alt="11" width="80" height="80">
                    <div class="pop-r" style="width:100%;padding-left:16px">
                        <div class="r">
                            <span class="add">+</span>
                            <span class="text">10</span>
                            <span class="reduce">-</span>
                        </div>
                        <h1 style="font-size: 16px;color:#F5A623; font-weight:400">￥295</h1>
                    </div>
                </div>
                <br>
                <div class="pop-title">
                    蜗牛面膜蜗牛面膜蜗牛面膜蜗牛面膜蜗
                </div>
                <br>
                <p style="color: #333333;font-size:14px">规格</p>
                <br>
                <span class="cricle">500g/袋</span>
                <span class="cricle">500g/袋</span>
                <p style="color: #333333;font-size:14px;margin-top:20px">口味</p>
                <br>
                <span class="cricle">绿茶</span>
                <br>
                <div class="pop-footer">
                    <div class="btn9">
                        加入购物车
                    </div>
                </div>
            </div>
        </yd-popup>
        <!-- 立即购买按钮 -->
        <yd-popup v-model="show3" position="bottom" height="60%">
            <div class="pop-center">
                <div class="pop-header">
                    <img src="../../assets/img/shop1.png" alt="11" width="80" height="80">
                    <div class="pop-r" style="width:100%;padding-left:16px">
                        <div class="r">
                            <span class="add">+</span>
                            <span class="text">10</span>
                            <span class="reduce">-</span>
                        </div>
                        <h1 style="font-size: 16px;color:#F5A623; font-weight:400">￥295</h1>
                    </div>
                </div>
                <br>
                <div class="pop-title">
                    蜗牛面膜蜗牛面膜蜗牛面膜蜗牛面膜蜗
                </div>
                <br>
                <p style="color: #333333;font-size:14px">规格</p>
                <br>
                <span class="cricle">500g/袋</span>
                <span class="cricle">500g/袋</span>
                <p style="color: #333333;font-size:14px;margin-top:20px">口味</p>
                <br>
                <span class="cricle">绿茶</span>
                <br>
                <div class="pop-footer">
                    <div class="btn9">
                        立即购买
                    </div>
                </div>
            </div>
        </yd-popup>
        <!-- 按钮 -->
        <div class="btn1">
            <div class="btn1-l">
                <yd-icon name="shopcart-outline" size="24px"></yd-icon>
            </div>
            <div class="btn1-c" @click="goodscar">
                加入购物车
            </div>
            <div class="btn1-r" @click="payshop">
                立即购买
            </div>
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        data() {
            return {
                title: "商品详情页",
                show1: false,
                show2: false,
                show3: false,
            }
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
            goodscar() {
                this.show2=true
            },
            payshop() {
                this.show3= true
            },
            shopcomment(){
                this.$router.push({name:"comment"})
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .pop-footer{
        padding-top: 30px;
    }
    .btn9 {
        width: 100%;
        height: 40px;
        font-size: 16px;
        color: #FFFFFF;
        background-image: linear-gradient(-135deg, #FAD961 0%, #F76B1C 100%);
        border-radius: 100px;
        text-align: center;
        line-height: 40px
    }
    .cricle {
        padding: 6px 15px;
        margin-left: 10px;
        background-color: #FFD161;
        color: #FFFFFF;
        border-radius: 15px
    }
    .pop-title {
        font-weight: 500;
        font-size: 18px;
        color: #333333;
    }
    .pop-center {
        padding: 20px;
    }
    .pop-header {
        display: flex;
        align-content: center;
    }
    .pic {
        padding-bottom: 60px;
        padding-top: 50px;
    }
    .page {
        width: 100%;
        height: 220px;
    }
    .center {
        position: relative;
    }
    .btn {
        width: 270px;
        height: 32px;
        border-radius: 20px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 32px;
        background: linear-gradient(-180deg, #FF8CCE 0%, #F10054 100%);
        position: absolute;
        left: 50%;
        bottom: 10%;
        transform: translate(-50%, -50%)
    }
    .shop-title {
        padding: 5px 15px;
        background-color: #FFFFFF;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0
    }
    .shop-body {
        background-color: #FFFFFF;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #999999
    }
    .i {
        width: 48px;
        height: 48px;
    }
    .number {
        font-size: 15px;
        font-weight: 500;
        color: #FD5C63
    }
    .person {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        font-weight: 500;
        color: #333333;
    }
    .btn1 {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 60px;
        background-color: #FFFFFF;
        display: flex;
    }
    .btn1-l {
        width: 20%;
        height: 60px;
        text-align: center;
        line-height: 60px;
    }
    .btn1-c,
    .btn1-r {
        width: 40%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #FFFFFF;
    }
    .btn1-c {
        background-color: #666666;
    }
    .btn1-r {
        background-color: #E5532A
    }
    .weixin {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .word {
        padding-top: 1px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
    }
    .btn8 {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 48px;
        border-top: 1px solid #cccccc;
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
    .pop-r {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>

