<template>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo" :show-init-tip="false">
        <div class="home">
            <!-- 轮播图 -->
            <div class="back">
                <slider :bannerlist="bannerlist"></slider>
            </div>
            <div class="center">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-for="(goodsType,i) in goodsTypes"
                        :key="i">
                        <div @click="toNative(goodsType.id)">
                            <img class="pic" v-lazy="goodsType.image" alt="加载中">
                            <div class="mui-media-body" style="font-size: 12px;color: #333333;">{{goodsType.name}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="title" v-show="lay_loading && goodsList2.length!=0">
                <i></i>&nbsp; 新品预售
            </div>
            <!-- //切换表头 -->
            <div class="mui-slider" v-if="goodsList2.length!=0">
                <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                    <div class="mui-scroll">
                        <a class="mui-control-item" href="#" v-for="(item,k) in goodsList2Time" :key="k"
                           @click="chang(item.addtime)">
                            <div class="date" :class="{active:num==item.addtime}">
                                <div class="date-header">{{item.addtime}}</div>
                                <div class="date-footer">预售中</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="center">
                <ul class="content">
                    <li v-for="(i,index) in goodsList2" :key="index" @click="reserveshop(i.id)" v-show="i.addtime == num">
                        <a class="big">
                            <div class="yd-list-img">
                                <img class="img" v-lazy="i.image">
                            </div>
                            <img class="pos" src="../assets/img/shou.png">
                            <div class="good-footer">
                                <div class="footer-content">
                                    {{i.name}}
                                </div>
                                <div class="footer-pic">
                                    <div class="demo-list-price">{{i.showprice}}</div>
                                    <span>{{i.ordercount}}人付款</span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="title" v-show="lay_loading && goodsList3.length!=0">
                <i></i>&nbsp; 限时特卖
            </div>
            <!-- //切换表头 -->
            <div class="mui-slider" v-if="goodsList3.length!=0">
                <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                    <div class="mui-scroll">
                        <div class="mui-control-item" v-for="item,key in goodsList3Time" :key="key"
                             @click="changbottom(item.addtime)">
                            <div class="date" :class="{active:num1==item.addtime}">
                                <div class="date-header">{{item.addtime}}</div>
                                <div class="date-footer">限时中</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 内容区域 -->
            <div class="center">
                <ul class="content">
                    <li v-for="(i,index) in goodsList3 " :key="index" @click="buyingshop(i.id)" v-show="i.addtime == num1">
                        <a class="big">
                            <div class="yd-list-img">
                                <img class="img" v-lazy="i.image">
                            </div>
                            <img class="pos" src="../assets/img/qiang.png">
                            <div class="good-footer">
                                <div class="footer-content">
                                    {{i.name}}
                                </div>
                                <div class="footer-pic">
                                    <div class="demo-list-price">{{i.showprice}}</div>
                                    <span>{{i.ordercount}}人付款</span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="title" v-show="lay_loading && recommendGoods.length!=0">
                <i></i>&nbsp; 精品推荐
            </div>
            <!--精品推荐-->
            <div class="center">
                <ul class="content">
                    <li v-for="(recommendGood, key) in recommendGoods"  :key="key" @click="goshop(recommendGood.id)">
                        <a class="big">
                            <div class="yd-list-img">
                                <img class="img" v-lazy="recommendGood.image"/>
                            </div>
                            <div class="good-footer">
                                <div class="footer-content">
                                    {{recommendGood.name}}
                                </div>
                                <div class="footer-pic">
                                    <div class="demo-list-price">{{recommendGood.showprice}}</div>
                                    <span>{{recommendGood.ordercount}}人付款</span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- <yd-list theme="3">
                <yd-list-item v-for="(recommendGood, key) in recommendGoods" :key="key" type="link"
                              :href="{name: 'reservepage',params: {id:recommendGood.id}}"><img slot="img"
                                                                                               v-lazy="recommendGood.image">
                    <div class="content-title" slot="title">{{recommendGood.name|capitalize}}</div>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price"><em>¥</em>{{recommendGood.showprice}}</span>
                        </div>
                        <span style="font-size:12px">{{recommendGood.ordercount}}人付款</span>
                    </yd-list-other>
                </yd-list-item>
            </yd-list> -->
            <!-- 购物车 -->
            <!-- <div class="car" @click="goodscar">
              <yd-badge slot="badge" type="danger" class="postion">{{goodsCount}}</yd-badge>
              <img width="70" height="70" src="../assets/img/car.png">
            </div> -->
        </div>
    </yd-pullrefresh>
</template>
<script>
    import slider from '@/components/slider.vue'
    import mui from '../assets/js/mui.js'

    export default {
        name: 'home',
        data() {
            return {
                lay_loading: false,
                goodsList2: [],
                goodsList2Time: [],
                goodsList3Time: [],
                goodsList3: [],
                num: "",
                num1: "",
                goodsCount: 0, //购物车数量
                bannerlist: [], //轮播图
                goodsTypes: [], //商品分类
                recommendGoods: [] //推荐商品
            }
        },
        created(){
            //获取推荐人商户号 APP分享进来首页
            if (this.$route.params.pMerchantno) {
                this.loadIndex();
            }
            //存储APP传过来的信息的信息
            if (this.$route.query.appData == null) {
                if(localStorage.getItem("appData")){
                    localStorage.setItem("appData", localStorage.getItem("appData"));
                }
            } else {
                localStorage.clear();
                localStorage.setItem("appData", this.$route.query.appData || null);
            }
            //判断是否是微信浏览器 微信浏览器用自己的登录方式
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //微信里直接获取首页数据
                this.loadIndex();
            } else if (localStorage.getItem("oCustID") !="-1" && localStorage.getItem("oCustID")!="0" && localStorage.getItem("oCustID")!=null) {
                //登录成功
                this.loadIndex();
            }else{
                //用app传来的参数登录
                if (localStorage.getItem("appData")) {
                    let appData = JSON.parse(localStorage.getItem("appData"));
                    //判断是否有推荐人商户号
                    if(appData.pMerchantno){
                        //APP没有登录
                        //localStorage.setItem("loginState","02");
                        localStorage.setItem("pMerchantno", appData.pMerchantno || null);
                        //获取首页数据
                        this.loadIndex();
                    }else{
                        //APP已经登录成功
                        let param = {
                            "TransType": "SHDL",
                            "pRequestInfo": appData.pRequestInfo,//appData.pName,
                            "pAgentNumber": appData.pAgentNumber,//appData.pPhoneNumber,//15856861283
                        };
                        //请求登录
                        this.$axios.post("/send/login", param).then((result) => {
                            if (result != null) {
                                localStorage.setItem("oCustID","-1");
                                if (result.state != "00") {
                                    localStorage.setItem("oCustID","-1");
                                    this.$dialog.toast({
                                        mes: result.message,
                                        timeout: 1000
                                    });
                                } else {
                                    //登录成功
                                    //获取首页数据
                                    this.loadIndex();
                                    //用户编号
                                    localStorage.setItem("oMerchantno", result.oMerchantno || "");
                                    //把custId存到header中
                                    localStorage.setItem("oCustID", result.oCustID || "-1");
                                    //this.$store.commit(OCUSTID,result.oCustID);
                                }
                            }
                        });
                    }
                }
            }
        },
        methods: {
            //加载首页数据
            loadIndex() {
                //判断缓存中是否有数据
                let indexData = JSON.parse(localStorage.getItem("indexData"));
                if (indexData != null) {
                    localStorage.setItem("servicePhone", indexData.servicePhone || null);
                    localStorage.setItem("goodsCount", indexData.goodsCount || null);
                    this.goodsCount = indexData.goodsCount;
                    this.goodsTypes = indexData.goodsType;
                    this.recommendGoods = indexData.recommendGoods;
                    this.bannerlist = indexData.bannerlist;
                    this.goodsList2 = indexData.goodsList2;
                    this.goodsList3 = indexData.goodsList3;
                    if (indexData.goodsList2.length > 0)
                        this.goodsList2Time = this.unique(indexData.goodsList2);
                    if (indexData.goodsList3.length > 0)
                        this.goodsList3Time = this.unique(indexData.goodsList3);
                    this.num = indexData.goodsList2.length > 0 ? indexData.goodsList2[0].addtime : "";
                    this.num1 = indexData.goodsList3.length > 0 ? indexData.goodsList3[0].addtime : "";
                    this.lay_loading = true;
                } else {
                    //调接口加载首页数据
                    //this.loadIndex();
                    let param = {
                        "TransType": "SYSJ",
                        "pMerchantno": localStorage.getItem("pMerchantno")
                    };
                    this.$axios.post("/send/getData", param).then((result) => {
                        if (result != null) {
                            if (result.state != "00") {
                                this.$dialog.toast({
                                    mes: result.message,
                                    timeout: 1500
                                });
                            } else {
                                //缓存数据
                                localStorage.setItem("indexData", JSON.stringify(result) || null);
                                //更新购物车数量
                                //设置客服电话
                                localStorage.setItem("servicePhone", result.servicePhone);
                                localStorage.setItem("goodsCount", result.goodsCount);
                                this.goodsCount = result.goodsCount;
                                this.goodsTypes = result.goodsType;
                                this.recommendGoods = result.recommendGoods;
                                this.bannerlist = result.bannerlist;
                                this.goodsList2 = result.goodsList2;
                                this.goodsList3 = result.goodsList3;
                                if (result.goodsList2.length > 0)
                                    this.goodsList2Time = this.unique(result.goodsList2);
                                if (result.goodsList3.length > 0)
                                    this.goodsList3Time = this.unique(result.goodsList3);
                                this.num = result.goodsList2.length > 0 ? result.goodsList2[0].addtime : "";
                                this.num1 = result.goodsList3.length > 0 ? result.goodsList3[0].addtime : "";
                                this.lay_loading = true;
                            }
                        }
                    });
                }
            },
            unique(arr) {
                var res = [arr[0]];
                for (var i = 1; i < arr.length; i++) {
                    var repeat = false;
                    for (var j = 0; j < res.length; j++) {
                        if (arr[i].addtime === res[j].addtime) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        res.push(arr[i]);
                    }
                }
                return res;
            },
            // goodscar() {
            //   this.$router.push({
            //     name: 'car'
            //   })
            // },
            chang(id) {
                this.num = id;
            },
            changbottom(id) {
                this.num1 = id;
            },
            buyingshop(id) {
                this.$router.push({
                    name: 'reservepage',
                    params: {
                        id
                    }
                })
            },
            reserveshop(id) {
                this.$router.push({name: 'reservepage', params: {id}})
            },
            goshop(id) {
                this.$router.push({name: 'reservepage', params: {id}})
            },
            toNative(id) {
                this.$router.push({
                    name: 'native',
                    params: {
                        id
                    }
                });
            },
            //下拉刷新 重新加载数据
            loadList() {
                setTimeout(()=> {
                    //清空数据
                    localStorage.removeItem("indexData");
                    this.loadIndex();
                    this.$dialog.toast({
                        mes: '内容更新完成'
                    });
                    this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
                },1000);
            }
        },
        components: {
            slider
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
            });
        },
        filters: {
            capitalize(value) {
                if (value != undefined && value.length > 20) {
                    value = value.substring(0, 20) + "....";
                }
                return value
            }
        }
    }
</script>
<style scoped>
    * {
        touch-action: pan-y;
    }

    .date-header {
        height: 20px;
    }

    .date-footer {
        height: 30px;
    }

    .mui-control-item {
        font-size: 12px;
    }

    .pos {
        width: 70px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .home {
        background-color: #fff;
        padding-bottom: 60px;
        padding-top: 50px;
    }

    .center {
        /* margin-top: 10px; */
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 {
        background-color: rgba(0, 0, 0, 0);
        border: 0px solid #eee;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0px solid #eee;
    }

    .pic {
        width: 40px;
        /* height: 40px;*/
    }

    .mui-col-xs-4 {
        width: 20%;
    }

    .title {
        width: 100%;
        line-height: 40px;
        height: 40px;
        padding-left: 20px;
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        color: #333333;
    }

    .title > i {
        width: 5px;
        height: 20px;
        background-color: #000;
    }

    .demo-list-price {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FD5C63;
    }

    .car {
        position: fixed;
        z-index: 999;
        bottom: 80px;
        right: 0px;
        z-index: 1;
    }

    /* * {
      touch-action: pan-y;
    } */
    .mui-slider {
        background-color: #ffffff;
    }

    .content {
        width: 100%;
        padding: 0 10px;
        overflow: hidden;
    }

    .content-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 12px;
        color: #333333;
    }

    .content > li {
        width: 48%;
        margin: 10px 1%;
        float: left;
        border: 1px solid #e4dcdc;
    }

    .img {
        width: 100%;
    }

    .big {
        display: block;
        margin: 0 auto;
        width: 100%;
        position: relative;
    }

    .pos {
        position: absolute;
        right: 0;
        top: 0;
    }

    .good-footer {
        width: 100%;
        height: 90px;
        padding: 5px 5px;
        background-color: #fff;
        /*position: absolute;*/
        bottom: 0px;
        display: flex;
        flex-direction: column;
    }

    .footer-content {
        overflow: hidden;
        font-size: 12px;
        font-weight: 600;
    }

    .footer-pic span {
        font-size: 12px;
        color: #999;
    }

    .border-title {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .date {
        font-family: PingFangSC-Regular;
        color: #666666;
    }

    .date-footer {
        text-align: center
    }
    .yd-list{
        padding: 0 10px;
    }
    .active {
        color: #000000;
        border-bottom: 2px solid #000000;
    }

    .yd-list-mes {
        box-shadow: 1px 1px 1px 1px #cccccc;
    }

    .a {
        box-shadow: 5px 5px 5px 5px #cccccc;
    }

    .postion {
        padding: 0px;
        position: absolute;
        left: 56%;
        bottom: 61%;
        text-align: -webkit-center;
        height: 20px;
        width: 20px;
        line-height: 20px;
        font-size: 12px;
    }

    .back {
        width: 94%;
        padding-top: 10px;
        margin: 0px auto;
    }

    .mui-segmented-control.mui-scroll-wrapper {
        height: 56px;
    }
    .yd-list-theme3 .yd-list-item{
        padding: 10px 1%;
    }

    /***********改***********/
    .mui-grid-view.mui-grid-9 .mui-table-view-cell > a:not(.mui-btn) {
        padding: 0;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        padding: 10px 10px;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        margin-top: 0px;
    }

    .mui-segmented-control .mui-control-item {
        line-height: 25px;
    }
</style>
