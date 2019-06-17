<template>
    <div class="comment">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 内容 -->
        <div class="comment-header">
            <div class="comment-top">
               交易成功
            </div>
            <div class="comment-footer">
                感谢您对恩商汇的信任
            </div>
        </div>
        <div class="comment-body">
            <div class="body-top">
                <div class="top-r" style="flex:8">
                  快件已签收成功
                </div>
                <div class="top-l" style="flex:1">
                    <yd-navbar-next-icon style="float: right; color:#ccc"></yd-navbar-next-icon>
                </div>
            </div>
            <div class="body-time">
                2018-04-10 11:07:34
            </div>
        </div>
        <div class="comment-body">
            <div class="header-top">
                收货人：XXX
            </div>
            <div class="adress-foot">
                收货地址：广东省 广州市 白云区 嘉禾街道YH城1栋403楼
            </div>
        </div>
        <br>
        <div class="shop-header">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557982221984&di=37ff555dc08363c58696190f37e1dfc5&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fhb%2FMTQ1OTgwMTY1MDcxNy00MTkxODU3OTI%3D.jpg" alt="" width="80" height="80">
            <div class="header-r">
                <p class="q">俏美洗衣片</p>
                <p class="s">¥ 199</p>
                <p class="f">快递包邮</p>
            </div>
        </div>
        <div class="shop-header">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557982221984&di=37ff555dc08363c58696190f37e1dfc5&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fhb%2FMTQ1OTgwMTY1MDcxNy00MTkxODU3OTI%3D.jpg" alt="" width="80" height="80">
            <div class="header-r">
                <p class="q">俏美洗衣片</p>
                <p class="s">¥ 199</p>
                <p class="f">快递包邮</p>
            </div>
        </div>
        <div class="sp-header">
            <div class="shop-price">
                <p>商品总价</p>
                <p>￥199.00</p>
            </div>
            <div class="shop-price">
                <p>运费</p>
                <p>￥12.00</p>
            </div>
            <div class="shop-price">
                <h2 style="font-size: 14px;color: #333333;">订单总价</h2>
                <span style="font-size: 14px;color: #E5532A">￥221.00</span>
            </div>
        </div>
        <br>
        <div class="shop-p" style="height:48px;padding:0 25px;" @click="shopcomment">
            <h2 class="person">联系客服</h2>
            <yd-navbar-next-icon></yd-navbar-next-icon>
        </div>
        <br>
        <div class="sp-header">
            <div class="shop-price">
                <p>订单编号：XXXXXXXXXXXXXXXXX</p>
            </div>
            <div class="shop-price">
                <p>
                    订单时间：2018-03-20 16:55:21
                </p>
            </div>
            <div class="shop-price">
                <p>支付方式：微信支付</p>
            </div>
        </div>
        <br>
        <div class="footer">
             <div class="del-btn">删除订单</div>
             <div class="p-btn">评论</div>
             <div class="d-btn">再来一单</div>
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        data() {
            return {
                title: "订单详情",
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
            shopcomment(){
                alert("恭喜中奖了")
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
        bottom: 0;
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
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        color: #333333;
    }
    .s {
        font-size: 16px;
        color: #E5532A;
    }
    .f {
        font-size: 10px;
        height: 30px;
        line-height: 30px;
        color: #999999;
    }
    .shop-price,
    .shop-p {
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .shop-price>p {
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
    .footer{
        background-color: #FFFFFF;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .del-btn,.p-btn,.d-btn{
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

