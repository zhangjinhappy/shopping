<template>
    <div class="pic">
        <!-- 头部 -->
        <navbar :title="title" :url="'home'"></navbar>
        <!-- 内容 -->
        <div class="center">
            <m-Slider :bannerlist="bannerLists"></m-Slider>
            <!-- <img class="page" :src="goodsDetail.image" alt="商品图片详情">  -->
            <div class="btn" v-if="goodsDetail.signtips">
                {{goodsDetail.signtips}}
            </div>
        </div>
        <div class="shop-title">{{goodsDetail.name}}</div>
        <div class="shop-body">
            <div class="body-r">
                <h1 :style="{'font-size':'15px','font-weight':'600','color':'#FD5C63','margin':'5px'}">
                    {{goodsDetail.showprice}} <span class="xbq">{{goodsDetail.remark}}</span>
                </h1>
                <span :style="{'font-size':'12px','margin':'6px'}">价格:<del>{{goodsDetail.oldprice}}</del></span>
            </div>
            <div class="body-l" @click="appShare" v-if="isWx">
                <yd-icon name="share1" size="20px"></yd-icon>
                <div :style="{'font-size':'12px',}">分享</div>
            </div>
        </div>
        <div class="shop-body">
            <span style="color:#333333;font-size:12px;margin-left: 6px;padding: 0px 15px 6px 0;">邮费：<i
                    style="color:#F5A623;font-size:12px">{{goodsDetail.freight===0?"免邮费":"￥"+goodsDetail.freight}}</i></span>
            <div class="line-r" style="font-size:12px">
                月销量{{goodsDetail.ordercount}}
            </div>
            <span style="color:#333333;font-size:12px">{{goodsDetail.provincecity}}</span>
        </div>
        <div class="shop-body" v-if="goodsDetail.shareprofit!=0" style="margin: 5px 0;display: block;">
            <div style="margin: 1px 0 10px 0;font-size:12px">推广 <span class="fw xbq">分享可赚取{{goodsDetail.shareprofit}}</span>
            </div>
<!--            <div style="margin: 10px 0 5px 0;font-size:12px">服务 <span class="fw">无忧退货 7天无理由 公益宝贝</span></div>-->
        </div>

        <div class="shop-body" style="height:48px;" v-if="goodsDetail.senddate!=''">
            <h2 class="person">发货时间</h2>
            <h1 class="number" style="font-size:12px">{{goodsDetail.senddate}}</h1>
        </div>

        <div class="shop-body" style="height:48px;margin: 5px 0;" @click="shopcomment(goodsDetail.commentcount,id)">
            <h2 class="person">宝贝评论（{{goodsDetail.commentcount}}）</h2>
            <yd-navbar-next-icon></yd-navbar-next-icon>
        </div>
        <div class="shop-body" style="height:48px;">
            <h2 class="person">商品详情</h2>
            <span></span>
        </div>
        <!--商品品 图片详情 -->
        <div class="page" v-for="img in goodsImage">
            <img  v-lazy="img.imageurl" alt="商品详情图">
        </div>
        <div class="words_explain">
            <div class="words_explain_total">价格说明</div>
            <div>
                <div class="words_explain_first"><i>&nbsp;</i> 划线说明</div>
                <div class="words_explain_second"><p class="marker"></p>
                    商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等。<span>并非原价</span>,仅供参考
                </div>
            </div>
            <div>
                <div class="words_explain_first"><i>&nbsp;</i> 未划线说明</div>
                <div class="words_explain_second"><p class="marker"></p> 商品的<span>实时标价</span>,不因表述的差异改变性质。具体成交价格根据商品参加活动,或会员使用优惠券、积分等发生変化,最终以订单结算页价格为准
                </div>
                <div class="words_explain_second"><p class="marker"></p>
                    商家详情页(含主图)以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格,具体请以结算页面的标价、优惠条件或活动规则为准。
                </div>
                <div class="words_explain_second"><p class="marker"></p>
                    此说明仅当出现价格比较时有效,具体请参见《价格发布规范》。若商家单独对划线价格进行说明的,以商家的表述为准。
                </div>
            </div>
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
        <yd-popup v-model="show2" position="bottom" height="60%" style="overflow-Y: auto;">
            <div class="pop-center">
                <div class="pop-header">
                    <div style="height: 90px;width: 90px;">
                        <img :src="goodsFormsImg" width="90" height="90" style="border-radius: 6px">
                    </div>
                    <div class="pop-r" style="width:100%;padding-left:14px">
                        <p style="font-size: 14px;color:red; font-weight:400">价格:￥ {{countMoney}}</p>
                        <span style="color: gray;">库存: {{goodsFormsStorageGoods}}</span>
                        <div>
                            <p class="display-h">{{goodsDetail.formname}} {{goodsFormsName}}</p>
                            <p class="display-h">{{goodsDetail.secondclassname}} {{secondClassName}}</p>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <!-- 一级规格 -->
                <div v-if="goodsForms.length!=0">
                    <p style="color: #333333;font-size:13px;margin-top:10px;">【{{goodsDetail.formname}}】</p>
                    <ul>
                        <li :class="{cricle:true,a:goodsFormsId==item.id}"
                            style="float: left; margin: 5px;padding: 2px 12px;"
                            v-for="item in goodsForms" :key="item.id"
                            @click="goodsFormsClick(item)">
                            {{item.name}} <span v-if="item.pointmaxmoney!=0">( 用积分可抵:￥{{item.pointmaxmoney}} )</span>
                        </li>
                    </ul>
                    <div style="clear: left"></div>
                </div>
                <!-- 二级分类 -->
                <div v-if="secondClass.length!=0">
                    <p style="color: #333333;font-size:14px;margin-top:10px">【{{goodsDetail.secondclassname}}】</p>
                    <ul>
                        <li :class="{cricle:true,a:secondClassId== key}"
                            style="float: left;width: auto;margin: 5px;padding: 2px 12px;"
                            v-for="(item,key) in secondClass"
                            @click="optionClick(item,key)">{{item}}
                        </li>
                    </ul>
                    <div style="clear: left"></div>
                </div>
                <div class="pop-title">
                    <div style="margin-top: 5px;">
                        <p style="float: left">购买数量</p>
                        <yd-spinner style="float: right;" :max="goodsFormsStorageGoods" unit="1"
                                    v-model="countNumber"></yd-spinner>
                    </div>
                    <div style="clear: both;height: 1px;background-color: #e3e6e8;"></div>
                    <div style="margin-bottom: 5px;" v-if="pointmaxmoney!=0">
                        <p style="float: left;">积分抵扣</p><span style="color: red;">:￥{{countPointrate*pointmaxmoney}} (消耗积分{{countPointrate*pointrate}})</span>
                        <yd-spinner style="float: right;" :max="countNumber" unit="1" min="0"
                                    v-model="countPointrate"></yd-spinner>
                    </div>
                </div>

                <div class="pop-footer">
                    <div class="btn9" @click="addCar()">
                        确定
                    </div>
                </div>
                <br>
            </div>
        </yd-popup>
        <!-- 立即购买按钮 -->
        <!-- 提示框 -->
        <div class="message" v-if="showword">
            加入购物车成功
        </div>
        <!-- 按钮 -->
        <div class="btn1">
            <div class="btn1-l" @click="toCar()">
                <yd-icon name="shopcart-outline" size="24px"></yd-icon>
                <span class="mui-badge mui-badge-danger span">{{goodsCount}}</span>
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
    import mSlider from '../../components/slider.vue'
    //导入微信js sdk
    import wx from 'weixin-js-sdk';
    export default {
        data() {
            return {
                isWx: false,//默认不显示
                title: "商品详情页",
                id: this.$route.params.id,
                show1: false,
                showword: false,
                flag: false,
                show2: false,
                isCar: 0,//0购物车 1 直接购买
                goodsDetail: [],//商品详情
                bannerLists: [],//商品轮播图
                goodsForms: [],//商品规格集合
                goodsImages: [],//商品图片详情
                secondClass: [],//商品二级分类
                goodsFormsImg: "",//商品规格集合图片
                goodsFormsName: "",//商品规格集合名称
                goodsImage: [],//商品图片集合
                goodsFormsStorageGoods: 0,//库存
                countNumber: 1,//数量
                goodsCount: parseInt(localStorage.getItem("goodsCount")) || 0,//购物车数量
                unitPrice: 0,//单价
                goodsFormsId: -1,//
                secondClassId: 0,//二级分类 默认选第一个
                secondClassName: "",//二级分类名称 默认选第一个
                pointmaxmoney: 0,//抵扣金额
                countPointrate: 0,//抵扣积分数量
                pointrate: 0
            }
        },
        created() {
            // this.wxshare();//微信分享权限验证
            //获取推荐人商户号
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) != 'micromessenger') {
                //不是微信浏览器就显示分享
                this.isWx = true;
            }
            //加载商品详情
            this.loadShop();
        },
        watch: {
            show2: (v) => {
                if (v) {
                    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';
                } else {
                    let body = document.body;
                    body.style.position = '';
                    let top = body.style.top;
                    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
                    body.style.top = '';
                }
            },
            countNumber: function (n) {
                if (n <= this.countPointrate) {
                    this.countPointrate = n;
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false
            });
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next();
        },
        methods: {
            appShare() {
                try {
                    //判断是否是微信浏览器 微信浏览器用自己的登录方式
                    var ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        //this.wxshar_ready();
                    } else {
                        let url = "http://mall.zybkeji.com/#/home/reservepage/" + this.$route.params.id + "/" + localStorage.getItem("oMerchantno");
                        try {
                            JSHook.showMessage("http://mall.zybkeji.com/#/loginHandle/"+encodeURIComponent(url));
                        } catch (e) {}
                        try {
                            window.webkit.messageHandlers.showMessage.postMessage(["http://mall.zybkeji.com/#/loginHandle/"+encodeURIComponent(url)])
                        } catch (e) {}
                    }
                } catch (e) {
                    alert(e)
                }
            },
            loadShop() {
                let param = {
                    "TransType": "SPXQ",
                    "pGoodsID": this.id,
                };
                //请求登录
                this.$axios.post("/send/getData", param).then((result) => {
                    if (result != null) {
                        if (result.state != "00") {
                            this.$dialog.toast({
                                mes: result.message,
                                timeout: 1500
                            });
                            //判断是否是微信浏览器
                            var ua = window.navigator.userAgent.toLowerCase();
                            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                                //等微信授权完成之后再跳转
                                if (window.location.search.indexOf('code') > 0) {
                                    this.$router.push({
                                        name: "lowerShelf"
                                    });
                                }
                            } else {
                                //直接跳转商品下架页面
                                this.$router.push({
                                    name: "lowerShelf"
                                });
                            }
                        } else {
                            if (result.goodsDetail.length > 0) {
                                this.goodsDetail = result.goodsDetail[0] || {};
                                this.secondClass = result.goodsDetail[0].secondclass == "" ? "" : result.goodsDetail[0].secondclass.split("|");
                                if (this.secondClass.length > 0) {
                                    this.secondClassName = this.secondClass[0];
                                }
                                this.bannerLists.push({"image": result.goodsDetail[0].image.split("|")});
                            }
                            this.goodsImages = result.goodsImage;
                            if (result.goodsForm.length > 0) {
                                this.goodsForms = result.goodsForm;
                                this.goodsFormsId = result.goodsForm[0].id || -1;
                                this.unitPrice = result.goodsForm[0].price || 0;
                                this.goodsFormsImg = result.goodsForm[0].image;
                                this.pointmaxmoney = result.goodsForm[0].pointmaxmoney;
                                this.pointrate = result.goodsForm[0].pointrate;
                                this.goodsFormsName = result.goodsForm[0].name;
                                this.goodsFormsStorageGoods = result.goodsForm[0].storagegoods > 1 ? result.goodsForm[0].storagegoods - 1 : result.goodsForm[0].storagegoods;
                            }
                            this.goodsImage = result.goodsImage;
                        }
                    }
                });
            },
            //添加到购物车/直接购买
            addCar() {
                //如果是在微信浏览器
                let ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    //判断用户是否登录
                    if (localStorage.getItem("oCustID") !="-1" && localStorage.getItem("oCustID")!="0" && localStorage.getItem("oCustID")!=null) {
                        //已经登录
                    } else if (localStorage.getItem("oCustID")=="0") {
                        //未注册 跳转到注册页面
                        this.$router.push({name: "phoneregister"});
                        return;
                    }
                } else {
                    if (localStorage.getItem("oCustID")=="-1" || localStorage.getItem("oCustID")==null) {
                        //未登录
                        try {
                            JSHook2.LoginMessage("");

                        } catch (e) {
                        }
                        try {
                            window.webkit.messageHandlers.LoginMessage.postMessage(["good"])
                        } catch (e) {
                        }
                        return;
                    }
                }
                if (this.isCar == 0) {
                    //更新购物车数量
                    localStorage.setItem("goodsCount", this.goodsCount);
                    let param = {
                        "TransType": "TJGWC",
                        "pGoodsFormID": this.goodsFormsId,
                        "pSecondclass": this.secondClass[this.secondClassId],
                        "pCount": this.countNumber,
                        "pPointcount": this.countPointrate
                    };
                    this.$axios.post("/send/getData", param).then((result) => {
                        if (result != null) {
                            if (result.state == "00") {
                                this.show2 = false;
                                this.goodsCount += this.countNumber;
                            }
                            this.showword = true;
                            var _this = this;
                            setTimeout(function () {
                                _this.showword = false;
                            }, 1500);
                            this.$dialog.toast({
                                mes: result.message,
                                timeout: 500
                            });
                        }
                    });
                } else {
                    //直接购买 跳转到购买页面
                    //[{"isshow":1,"image":"//gamepic.heitao.com/dal/website/7.0/1/p/img/0012.png","price":9.8,"freight":12,"count":4,"formname":"艾伦","name":"土家野生板栗土家野生板栗土家野土家野生…","id":2}]
                    let json = {};
                    json.image = this.goodsFormsImg;
                    json.price = this.unitPrice;
                    json.freight = this.goodsDetail.freight;
                    json.count = this.countNumber;
                    json.formname = this.goodsFormsName;
                    json.name = this.goodsDetail.name;
                    json.pointcount = this.countPointrate;
                    json.goodsFormsId = this.goodsFormsId;
                    json.pointmaxmoney = this.pointmaxmoney;
                    json.pPointcount = this.countPointrate;
                    json.secondclass = this.secondClass[this.secondClassId];
                    json.id = this.id;
                    let tempList = [];
                    tempList.push(json);
                    localStorage.setItem("lCarList", JSON.stringify(tempList));
                    localStorage.setItem("xdType", "zjxd");
                    this.$router.push({name: "submitorder", params: {"backUrl": "reservepage"}});
                }
            },
            //跳转到购物车页面
            toCar() {
                this.$router.push({name: "car"})
            },
            goodsFormsClick(item) {
                this.pointmaxmoney = item.pointmaxmoney;
                this.pointrate = item.pointrate;
                this.goodsFormsImg = item.image;
                this.countNumber = 1;
                this.goodsFormsId = item.id;
                this.unitPrice = item.price;
                this.goodsFormsImg = item.image;
                this.goodsFormsName = item.name;
                this.goodsFormsStorageGoods = item.storagegoods;
            },
            optionClick(item, key) {
                this.secondClassName = item;
                this.secondClassId = key;
                //this.secondClass[this.secondClassId];
            },
            add() {
                this.goodsFormsStorageGoods >= 1 ? this.goodsFormsStorageGoods-- && this.countNumber++ : "";
            },
            reduce() {
                this.countNumber > 1 ? this.countNumber-- && this.goodsFormsStorageGoods++ : "";
            },
            goodscar() {
                this.isCar = 0;
                this.show2 = true
            },
            payshop() {
                this.isCar = 1;
                this.show2 = true
            },
            shopcomment(count,id) {
                if(count<=0){
                    return;
                }else{
                    this.$router.push({
                        name: "comment",
                        params: {
                            id
                        }
                    });
                }
            },
            async wxshare() {
                let params = {
                    url: location.href.split('#')[0]
                };
                //获取config接口参数(接口地址要换)
                let res = await this.$axios.get("/wx/getJsapiticketConfig", params);
                if (res.code == 0) {
                    let data = res.data;
                    //通过config接口注入权限验证配置
                    wx.config({
                        // debug :true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx7851029a77b2f1ed', // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.noncestr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'onMenuShareAppMessage', 'onMenuShareTimeline',
                            'onMenuShareQQ', 'onMenuShareQZone', 'updateAppMessageShareData'
                        ]
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }
            },
            //通过ready接口处理成功验证
            wxshar_ready() {
                let link = window.location.href;
                wx.ready(function () {
                    //分享给朋友
                    wx.updateAppMessageShareData({
                        title: "商品分享", // 分享标题
                        desc: "你值得拥有", // 分享描述
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: window.location.href.split('#')[0] + '/lib/public/images/jixianglogo.png', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function (res) {
                            // 用户确认分享后执行的回调函数
                            alert("请点击右上角进行分享");
                        },
                        cancel: function (res) {
                            // 用户取消分享后执行的回调函数
                            alert("你取消了分享");
                        }
                    });
                });
            }
        },
        // beforeCreate() {
        //     document.querySelector('body').setAttribute('style', 'overflow:hidden')
        // },
        beforeDestroy() {
            document.querySelector('body').removeAttribute('style');
            document.body.removeEventListener('touchmove', function (event) {
                event.preventDefault()
            }, false)
        },
        mounted() {

        },
        components: {
            navbar,
            mSlider
        },
        computed: {
            countMoney() {
                return (this.countNumber * this.unitPrice).toFixed(2);
            }
        }
    }
</script>
<style scoped>
    * {
        touch-action: pan-y;
    }

    .fw {
        margin-left: 10px;
        color: #656565;
    }

    .xbq {
        font-size: 12px;
        background-color: antiquewhite;
        padding: 2px 6px;
        border-radius: 10px;
        font-weight: 100;
        color: #fd5c63;
    }

    .pop-footer {
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
        background-color: #F8F8F8;
        border: 1px solid #ecdede;
        border-radius: 5px;
        font-size: 12px;
    }

    .a {
        background-color: #faebd7;
        color: #FF7A00;
    }

    .pop-title {
        margin: 10px 0;
        font-weight: 500;
        font-size: 14px;
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
        padding-top: 52px;
    }

    .page {
        width: 100%;
    }
    .page img{
        width: 100%;
        display: block;
    }
    .center {
        position: relative;
        background-color: #fff;
        overflow: hidden;
    }

    .btn {
        width: 270px;
        height: 32px;
        z-index: 999;
        border-radius: 20px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 32px;
        background: linear-gradient(-180deg, #FF8CCE 0%, #F10054 100%);
        position: absolute;
        left: 50%;
        bottom: 18%;
        transform: translate(-50%, -50%)
    }

    .shop-title {
        padding: 5px 15px;
        background-color: #FFFFFF;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 600;
    }

    .shop-body {
        background-color: #FFFFFF;
        padding: 5px 15px;
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
        font-weight: 500;
        color: #FD5C63
    }

    .person {
        font-family: PingFangSC-Regular;
        font-size: 14px;
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
        position: relative;
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

    .span {
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .message {
        width: 40%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }

    .pop-center {
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    .ceng {
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0
    }

    .words_explain {
        padding: .2rem;
        background-color: #FFFFFF;
    }

    .words_explain_total {
        font-size: 16px;
        font-weight: 800;
        color: #000000;
    }

    .words_explain_first {
        font-size: 15px;
        font-weight: 600;
        color: #000000;
        margin: 5px 0 0 5px;
    }

    .words_explain_second {
        margin: 5px 0 10px 5px;
        color: darkgrey;
    }

    .words_explain_total > i, .words_explain_first > i {
        background-color: #f90303;
    }

    .marker {
        width: 4px;
        height: 4px;
        border-radius: 100px;
        background-color: red;
        color: red;
        display: inline-block;
        margin: 0 5px;
    }

    .words_explain span {
        color: #000000;
    }

    .display-h {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 12px;
        color: #000000;
    }

    /* .line {
            width: 58%;
            position: absolute;
            top: 50%;
            left: 50%;
            background-color: #fff;
            transform: translate(-50%, -50%);
        } */
</style>

