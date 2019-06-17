<template>
    <div class="pic">
        <!-- 头部 -->
        <navbar :title="title" :url="'mine'"></navbar>
        <!-- 内容 -->
        <yd-tab active-color="#000" height="60px" color="#999" :callback="fn">


            <!-- 全部的订单页面 -->
            <yd-tab-panel label="全部" :active="orderState===-1" tabkey="0">
                        <div class="order-content" v-for="(item,i) in shopList0" :key="i" @click="detailSucess(item.id)">
                            <div class="order-header">
                                <div class="b_logo_div"><div class="b_logo_img"></div></div>
                                <div class="order-time">{{item.addtime}}</div>
                                <div :class="['order-store', item.orderstate===0?'':'active']">
                                    {{getState(item.orderstate)}}
                                </div>
                            </div>
                            <div class="shop-header" v-for="j in item.goodsDetail" :key="j.id">
                                <div style="width:80px;height:80px">
                                    <img style="border-radius: 6px;" v-lazy="j.image" alt="" width="80" height="80" />
                                </div>
                                <div class="header-r">
                                    <div>
                                        <span style="width: 75%;float: left" class="q">{{j.name}}</span>
                                        <p style="width: 25%;float: right;text-align: right">¥ {{j.price}}</p>
                                        <p style="width: 25%;float: right;text-align: right">x{{j.count}}</p>
                                    </div>
                                    <div style="clear: both"></div>
                                    <p class="f">【{{j.formname}}】</p>
                                    <span class="order_xbq">七天退换</span>
                                    <span class="order_xbq">破损包换</span>
                                </div>
                            </div>
                            <div class="pass-pic">
                                <p>
                                    共{{item.goodscount}}件商品 <span class="color">合计:￥{{item.sumprice}}</span>（含运费￥{{item.freight}})
                                </p>
                            </div>
                            <div class="footer">
                                <img src="../../assets/img/weixin122.png" style="margin-right: 10px;"  width="24" height="24" v-show="item.orderstate==1 && payType==='wx'"  @click.stop="selectPayType('wx')">
                                <img src="../../assets/img/zhifubao.png" style="margin-right: 10px;"   width="24" height="24" v-show="item.orderstate==1 && payType==='zfb'" @click.stop="selectPayType('zfb')">
                                <div class="del-btn order-btn" v-if="item.orderstate===1 || item.orderstate===4 || item.orderstate===5 || item.orderstate===6" @click.stop="delOrder(item.id,i)">删除订单</div>
                                <div class="p-btn order-btn" v-if="item.orderstate==5" @click.stop="commentOrder(item)">前去评论</div>
                                <div class="d-btn order-btn" v-if="item.orderstate==1" @click.stop="pay(item.id)">重新支付</div>
                            </div>
                        </div>
                <!-- 没有时显示 -->
                <div class="none" v-if="this.shopList0.length===0 && !isNullShow">
                    <img src="../../assets/img/ding.png">
                </div>
            </yd-tab-panel>


            <!-- 已经完成的在下面写 -->
            <yd-tab-panel label="待支付" :active="orderState===1" tabkey="1" >
                 <div class="order-content" v-for="(item,i) in shopList1" :key="i" @click="detailSucess(item.id)">
                            <div class="order-header">
                                <div class="b_logo_div"><div class="b_logo_img"></div></div>
                                <div class="order-time">{{item.addtime}}</div>
                                <div :class="['order-store', item.orderstate===0?'':'active']">
                                    {{getState(item.orderstate)}}
                                </div>
                            </div>
                            <div class="shop-header" v-for="j in item.goodsDetail" :key="j.id">
                                <div style="width:80px;height:80px">
                                   <img style="border-radius: 6px;" v-lazy="j.image" alt="11" width="80" height="80" />
                                </div>
                                <div class="header-r">
                                    <div>
                                        <span style="width: 75%;float: left" class="q">{{j.name}}</span>
                                        <p style="width: 25%;float: right;text-align: right">¥ {{j.price}}</p>
                                        <p style="width: 25%;float: right;text-align: right">x{{j.count}}</p>
                                    </div>
                                    <div style="clear: both"></div>
                                    <p class="f">【{{j.formname}}】</p>
                                    <span class="order_xbq">七天退换</span>
                                    <span class="order_xbq">破损包换</span>
                                </div>
                            </div>
                            <div class="pass-pic">
                                <p>
                                    共{{item.goodscount}}件商品 <span class="color">合计:￥{{item.sumprice}}</span>（含运费￥{{item.freight}})
                                </p>
                            </div>
                            <div class="footer">
                                <img src="../../assets/img/weixin122.png" style="margin-right: 10px;"  width="24" height="24" v-show="item.orderstate==1 && payType==='wx'"  @click.stop="selectPayType('wx')">
                                <img src="../../assets/img/zhifubao.png" style="margin-right: 10px;"   width="24" height="24" v-show="item.orderstate==1 && payType==='zfb'" @click.stop="selectPayType(zfb)">
                                <div class="del-btn order-btn" @click.stop="delOrder(item.id,i)">删除订单</div>
                                <div class="d-btn order-btn" v-if="item.orderstate==1" @click.stop="pay(item.id)">重新支付</div>
                            </div>
                        </div>
                <!-- 没有时显示 -->
                <div class="none" v-if="this.shopList1.length===0 && !isNullShow" >
                    <img src="../../assets/img/ding.png">
                </div>
            </yd-tab-panel>



             <yd-tab-panel label="待发货" :active="orderState===2" tabkey="2">
                  <div class="order-content" v-for="(item,i) in shopList2" :key="i" @click="detailSucess(item.id)">
                            <div class="order-header">
                                <div class="b_logo_div"><div class="b_logo_img"></div></div>
                                <div class="order-time">{{item.addtime}}</div>
                                <div :class="['order-store', item.orderstate===0?'':'active']">
                                    {{getState(item.orderstate)}}
                                </div>
                            </div>
                            <div class="shop-header" v-for="j in item.goodsDetail" :key="j.id">
                                <div style="width:80px;height:80px">
                                  <img style="border-radius: 6px;" v-lazy="j.image" alt="" width="80" height="80" />
                                </div>
                                <div class="header-r">
                                    <div>
                                        <span style="width: 75%;float: left" class="q">{{j.name}}</span>
                                        <p style="width: 25%;float: right;text-align: right">¥ {{j.price}}</p>
                                        <p style="width: 25%;float: right;text-align: right">x{{j.count}}</p>
                                    </div>
                                    <div style="clear: both"></div>
                                    <p class="f">【{{j.formname}}】</p>
                                    <span class="order_xbq">七天退换</span>
                                    <span class="order_xbq">破损包换</span>
                                </div>
                            </div>
                            <div class="pass-pic">
                                <p>
                                    共{{item.goodscount}}件商品 <span class="color">合计:￥{{item.sumprice}}</span>（含运费￥{{item.freight}})
                                </p>
                            </div>
                            <div class="footer">
                            </div>
                        </div>
                 <!-- 没有时显示 -->
                 <div class="none" v-if="this.shopList2.length===0 && !isNullShow">
                     <img src="../../assets/img/ding.png">
                 </div>
            </yd-tab-panel>



             <yd-tab-panel label="待收货" :active="orderState===3" tabkey="3">
                  <div class="order-content" v-for="(item,i) in shopList3" :key="i" @click="detailSucess(item.id)">
                            <div class="order-header">
                                <div class="b_logo_div"><div class="b_logo_img"></div></div>
                                <div class="order-time">{{item.addtime}}</div>
                                <div :class="['order-store', item.orderstate===0?'':'active']">
                                    {{getState(item.orderstate)}}
                                </div>
                            </div>
                            <div class="shop-header" v-for="j in item.goodsDetail" :key="j.id">
                                <div style="width:80px;height:80px">
                                   <img style="border-radius: 6px;" v-lazy="j.image" alt="" width="80" height="80" />
                                </div>
                                <div class="header-r">
                                    <div>
                                        <span style="width: 75%;float: left" class="q">{{j.name}}</span>
                                        <p style="width: 25%;float: right;text-align: right">¥ {{j.price}}</p>
                                        <p style="width: 25%;float: right;text-align: right">x{{j.count}}</p>
                                    </div>
                                    <div style="clear: both"></div>
                                    <p class="f">【{{j.formname}}】</p>
                                    <span class="order_xbq">七天退换</span>
                                    <span class="order_xbq">破损包换</span>
                                </div>
                            </div>
                            <div class="pass-pic">
                                <p>
                                    共{{item.goodscount}}件商品 <span class="color">合计:￥{{item.sumprice}}</span>（含运费￥{{item.freight}})
                                </p>
                            </div>
                            <div class="footer">
                                <div class="d-btn order-btn" v-if="item.orderstate==3" @click.stop="shop(item.id)">确认收货</div>
                            </div>
                        </div>
                 <div class="none" v-if="this.shopList3.length===0 && !isNullShow">
                     <img src="../../assets/img/ding.png">
                 </div>
            </yd-tab-panel>



             <yd-tab-panel label="待评价" :active="orderState===5" tabkey="4">
                  <div class="order-content" v-for="(item,i) in shopList4" :key="i" @click="detailSucess(item.id)">
                            <div class="order-header">
                                <div class="b_logo_div"><div class="b_logo_img"></div></div>
                                <div class="order-time">{{item.addtime}}</div>
                                <div :class="['order-store', item.orderstate===0?'':'active']">
                                    {{getState(item.orderstate)}}
                                </div>
                            </div>
                            <div class="shop-header" v-for="j in item.goodsDetail" :key="j.id">
                                <div style="width:80px;height:80px">
                                   <img style="border-radius: 6px;" v-lazy="j.image" alt="" width="80" height="80" />
                                </div>
                                <div class="header-r">
                                    <div>
                                        <span style="width: 75%;float: left" class="q">{{j.name}}</span>
                                        <p style="width: 25%;float: right;text-align: right">¥ {{j.price}}</p>
                                        <p style="width: 25%;float: right;text-align: right">x{{j.count}}</p>
                                    </div>
                                    <div style="clear: both"></div>
                                    <p class="f">【{{j.formname}}】</p>
                                    <span class="order_xbq">七天退换</span>
                                    <span class="order_xbq">破损包换</span>
                                </div>
                            </div>
                            <div class="pass-pic">
                                <p>
                                    共{{item.goodscount}}件商品 <span class="color">合计:￥{{item.sumprice}}</span>（含运费￥{{item.freight}})
                                </p>
                            </div>
                            <div class="footer">
                                <div class="del-btn order-btn" @click.stop="delOrder(item.id,i)">删除订单</div>
                                <div class="p-btn order-btn" v-if="item.orderstate==5" @click.stop="commentOrder(item)">前去评论</div>
                            </div>
                        </div>
                         <div class="none" v-if="this.shopList4.length===0 && !isNullShow">
                             <img src="../../assets/img/ding.png">
                         </div>
            </yd-tab-panel>


            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
        </yd-tab>
        <!-- 弹框的弹出 -->
        <div class="ceng" v-if="show1">
            <div class="line">
                <div class="line-header">
                    确认收货
                </div>
                <p style="text-align:center">
                    确认收货后订单将完成
                </p>
                <div class="btn">
                    <div class="btn-l" @click="show1=false">取消</div>
                    <div class="btn-r" @click="confirmGoods">确认</div>
                </div>
            </div>
        </div>
        <!-- 删除的弹框 -->
        <div class="ceng" v-if="show2">
            <div class="line">
                <div class="line-header">
                    确认删除订单？
                </div>
                <p style="text-align:center">
                    订单删除后将无法恢复
                </p>
                <div class="btn">
                    <div class="btn-l" @click="show2=false">取消</div>
                    <div class="btn-r" @click="delectOrder()">确认</div>
                </div>
            </div>
        </div>
        <!-- 支付弹框 -->
        <div class="ceng" v-if="showPayType">
            <div class="line_1">
                <div class="line-header_1">
                    <h1 class="line-title_1">选择付款方式</h1>
                    <img class="imgti" src="../../assets/img/X.png" alt="" @click="showPayType=false">
                </div>
                <div class="line-header_1" style=" justify-content:space-between;"  @click="change('zfb')">
                    <img src="../../assets/img/zhifubao.png" alt="" width="24" height="24">
                    <div class="img-r_1">
                        <h1 class="pay">支付宝支付</h1>
                        <h2 :class="{c:true, d:payType=='zfb'}">✔</h2>
                    </div>
                </div>
                <div class="line-header_1" style="justify-content:space-between;" @click="change('wx')">
                    <img src="../../assets/img/weixin122.png" alt="" width="24" height="24">
                    <div class="img-r_1">
                        <h1 class="pay">微信支付</h1>
                        <h2 :class="{c:true, d:payType=='wx'}">✔</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    import {
        setTimeout
    } from 'timers';
    export default {
        data() {
            return {
                //订单状态：1待支付，2待发货，3待收货，5待评价，6已完成；
                payType:"zfb",
                title: "我的订单",
                showPayType:false,
                show1: false,
                busy: false,
                show2: false,
                showId:0,
                orderId: 0,
                delId:-1,
                orderState:0,
                isNullShow:true,//先加载数据再判断是否有数据
                param:{},//请求发送的参数
                pageIndex0: 0,
                pageIndex1: 0,
                pageIndex2: 0,
                pageIndex3: 0,
                pageIndex4: 0,
                shopList0: [],
                shopList1: [],
                shopList2: [],
                shopList3: [],
                shopList4: []
            }
        },
        created() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.payType="wx";
            }
            this.orderState=this.$route.params.state;
            this.param.pOrderstate=this.orderState || -1;//全部
            this.$dialog.loading.open('加载数据中,请稍等');
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
            next();
        },
        methods: {
            //重新支付
            pay(id){
                this.$dialog.loading.open('正在调起支付,请稍等');
                //判断是否是微信浏览器
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    //this.$dialog.loading.open('正在调起公众号支付,请稍等');
                    //公众号支付
                    let param={
                        "payType":"jsapi",
                        "pOrderID":id
                    };
                    this.publicCodePay(param);
                    this.$dialog.loading.close();/* 移除loading */
                }else {
                    //判断支付方式
                    if(this.payType==="zfb"){
                        //支付宝
                        let param={
                            "payType":"zfb",
                            "pOrderID":id
                        };
                        this.$axios.post("/pay/newOrder",param).then((result) => {
                            //移除loading
                            this.$dialog.loading.close();
                            document.write(result)
                        });
                    }else if(this.payType==="wx"){
                        //微信H5支付
                        //this.$dialog.loading.open('正在调起H5支付,请稍等');
                        let param={
                            "payType":"h5",
                            "pOrderID":id
                        };
                        this.$axios.post("/pay/newOrder", param).then((result) => {
                            //移除loading
                            this.$dialog.loading.close();
                            if (result != null && result.state == "00") {
                                location.href = result.payUrl+"&redirect_url="+encodeURIComponent("http://mall.zybkeji.com/#/myorder");
                            } else {
                                this.$dialog.toast({
                                    mes: result.message,
                                    timeout: 1500
                                });
                            }
                        });
                    }
                }
            },
            //公众号支付方法
            async publicCodePay(params) {
                //
                let data = await this.$axios.post("/pay/newOrder", params);
                if (data.state != "00") {
                    this.$dialog.toast({
                        mes: data.msg,
                        timeout: 1500
                    });
                    //移除loading
                    this.$dialog.loading.close();
                    return;
                }else{
                    //移除loading
                    this.$dialog.loading.close();
                }
                let onBridgeReady = () => {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": data.appid, //公众号名称，由商户传入
                            "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr": data.nonceStr, //随机串
                            "package": data.packageValue,
                            "signType": "MD5", //微信签名方式：
                            "paySign": data.paySign //微信签名
                        }, (res) => {
                            //支付成功
                            if (res.err_msg == "get_brand_wcpay_request:ok"){
                                /*this.$dialog.toast({
                                    mes: "支付成功!",
                                    icon: 'success',
                                    timeout: 1500
                                });*/
                                //延迟跳转页面
                                    window.location.href = "/#/myorder";
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        });
                };
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }

            },
            shop(id){
             this.show1=true;
             this.showId = id
            },
            //确认收货
            confirmGoods(){
                let param={
                    "TransType":"QRQS",
                    "pOrderID":this.showId
                };
                this.$axios.post("/send/getData",param).then((result)=>{
                    if(result!=null){
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1500
                        });
                        if(result.state=="00"){
                            location.reload();
                        }
                    }
                });
            },
            //订单状态
            getState(state){
                switch (state) {
                    //1待支付，2待发货，3待收货，5待评价，6已完成；
                    case 1:return "待支付";
                    case 2:return "待发货";
                    case 3:return "待收货";
                    case 5:return "待评价";
                    case 6:return "已完成";
                }
            },
            fn(a,b){
                this.busy = false;//开始分页
                this.isNullShow=true;
                switch (b) {
                    case 0:this.param.pOrderstate=-1;
                        if(this.shopList0.length<=0){
                            this.pageIndex0=0;
                            this.$dialog.loading.open('加载数据中,请稍等');
                            this.loadMore();
                        }
                        break;//全部
                    case 1:this.param.pOrderstate=1;
                        if(this.shopList1.length<=0){
                            this.pageIndex0=1;
                            this.$dialog.loading.open('加载数据中,请稍等');
                            this.loadMore();
                        }
                        break;//已经完成
                    case 2:this.param.pOrderstate=2;
                        if(this.shopList2.length<=0){
                            this.pageIndex0=2;
                            this.$dialog.loading.open('加载数据中,请稍等');
                            this.loadMore();
                        }
                        break;//待发货
                    case 3:this.param.pOrderstate=3;
                        if(this.shopList3.length<=0){
                            this.pageIndex0=3;
                            this.$dialog.loading.open('加载数据中,请稍等');
                            this.loadMore();
                        }
                        break;//待收货
                    case 4:this.param.pOrderstate=5;
                        if(this.shopList4.length<=0){
                            this.pageIndex4=0;
                            this.$dialog.loading.open('加载数据中,请稍等');
                            this.loadMore();
                        }
                        break;//待评论
                }
            },
            //删除订单
            delectOrder(){
                let param={
                    "TransType":"SCDD",
                    "pOrderID":this.orderId
                };
                this.$axios.post("/send/getData",param).then((result)=>{
                    this.show2 = false;
                    if(result!=null){
                        if(result.state=="00"){
                            //做静态删除
                            switch (this.param.pOrderstate) {
                                case -1:this.shopList0 .splice(this.delId,1);break;
                                case 1:this.shopList1 .splice(this.delId,1);break;
                                case 2:this.shopList2 .splice(this.delId,1);break;
                                case 3:this.shopList3 .splice(this.delId,1);break;
                                case 5:this.shopList4 .splice(this.delId,1);break;
                            }
                        }
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1500
                        });
                    }
                });
            },
            delOrder(id,delId) {
                this.show2 = true;
                this.orderId = id;
                this.delId=delId;
            },
            detailSucess(id) {
                this.$router.push({
                    name: "successDetails",
                    params: {
                        id
                    }
                })
            },
            success() {
                this.$router.push({
                    name: "orderDetails"
                })
            },
            otherOrder() {
                alert('再来一旦')
            },
            //评论
            commentOrder(list) {
                sessionStorage.setItem("commentrenList", JSON.stringify(list));
                //this.$store.commit("commentrenList", list);
                this.$router.push({name: "commentren"})
            },
            getGoodsList(flag){
                this.param.TransType="DDLB";
                switch (this.param.pOrderstate) {
                    case -1:this.param.pageIndex=this.pageIndex0;break;
                    case 1:this.param.pageIndex=this.pageIndex1;break;
                    case 2:this.param.pageIndex=this.pageIndex2;break;
                    case 3:this.param.pageIndex=this.pageIndex3;break;
                    case 5:this.param.pageIndex=this.pageIndex4;break;
                }
               this.$axios.post("/send/getData", this.param).then((result) => {
                   this.$dialog.loading.close();/* 移除loading */
                   this.isNullShow=false;
                   // 多次加载数据
                   switch (this.param.pOrderstate) {
                       case -1:this.shopList0 = this.shopList0.concat(result.dataList);break;
                       case 1:this.shopList1 = this.shopList1.concat(result.dataList);break;
                       case 2:this.shopList2 = this.shopList2.concat(result.dataList);break;
                       case 3:this.shopList3 = this.shopList3.concat(result.dataList);break;
                       case 5:this.shopList4 = this.shopList4.concat(result.dataList);break;
                   }
                   if(flag){
                       if(result.dataList.length == 0){
                            this.busy = true;//停止分页
                            this.$dialog.toast({
                                mes: "没有更多了",
                                timeout: 500
                            });
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
               })
            },
            selectPayType(){
                //如果是微信浏览器就只显示微信
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.showPayType=false;
                }else{
                    this.showPayType=true;
                }
            } ,
            change(i) {
                this.showPayType=false;
                this.payType = i;
            },
            loadMore() {
                this.$dialog.loading.open('加载数据中,请稍等');
                setTimeout(() => {
                    switch (this.param.pOrderstate) {
                        case -1:this.pageIndex0++;break;
                        case 1:this.pageIndex1++;break;
                        case 2:this.pageIndex2++;break;
                        case 3:this.pageIndex3++;break;
                        case 5:this.pageIndex4++;break;
                    }
                    this.getGoodsList(true);
                }, 1000);
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    * { touch-action: pan-y; }

    .header-r .s,.pass-pic p{
        font-size: 12px;
    }
    .pass-pic p span{
        font-size: 12px;
        margin: 0 3px;
    }
    .pic{
        padding-top: 50px;
    }
    .f{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
        width: 58%;
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
        margin-top: 10px;
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
        border-right: 1px solid #cccccc;
    }
    .order-content {
        padding: 10px 10px;
        margin: 12px 4px;
        background-color: #ffffff;
        border-radius: 12px;

    }
    .order-header {
        font-size: 12px;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .shop-header {
        padding-top: 10px;
        display: flex;
        align-items: center;
    }
    .header-r {
        padding-left: 10px;
    }
    .q {
        font-size: 12px;
        color: #000000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-weight: 100;
        overflow: hidden;
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
    .pass-pic {
        width: 100%;
        margin: .20rem 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .color {
        font-size: 14px;
        color: #151515;
    }
    .footer {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }


    .active {
        font-size: 12px;
        color: #E5532A;
    }
    .btn-d {
        width: 100%;
        background-color: #E5532A;
    }
    .ceng {
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
    }

    .line_1 {
        width: 100%;
        height: 50%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fff;
    }

    .line-header_1 {
        height: 50px;
        padding: 3px 14px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #cccccc
    }

    .line-title_1{
        flex: 5;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        height: 40px;
        text-align: center;
        line-height: 40px
    }

    .img-r_1 {
        width: 30%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .c {
        color: #fff;
    }

    .d {
        color: #E9872C;
        font-size: 24px;
    }
    .order-time{
        position: absolute;
        margin-left: 25px;
    }

    .del-btn,
    .p-btn,
    .d-btn {
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        border-radius: 30px;
        margin-right: 10px;
        color: #666666;
        border: 1px solid rgb(153, 153, 153);
    }
    .d-btn,.p-btn{
        background-color: #ffffff;
        color: #FF7A00;
        border: 1px solid #FF5000;
    }

    .order-btn{
        padding: 0px .28rem;
    }


    .b_logo_div{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        overflow: hidden;
        -webkit-flex: 0 0 auto;
        width: 15px;
        height: 15px;
    }
    .b_logo_img{
        width: 100%;
        height: 100%;
        background-image: url(//gw.alicdn.com/tfs/TB1LmH7SXXXXXXYXFXXXXXXXXXX-63-63.png_200x200q85s150.jpg_.webp);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    }
    .order_xbq{
        font-size: 12px;
        color: #ff5000;
        width: auto;
        background-color: #fff1eb;
        border-radius: 6px;
        padding: 0 2px;
        margin: 0 5px;
    }
    .pay{
        font-size: 12px;
    }
</style>

