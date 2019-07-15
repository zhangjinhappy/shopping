<template>
    <div class="pic">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 产品部分 -->
        <div class="integral-top">
            <div class="pic-left">
                剩余积分:<span style="font-weight:700;font-size:18px;">{{oPointbalance}}</span>
            </div>
            <div class="pic-left">
                冻结积分:<span style="font-weight:700;font-size:18px;">{{oFrozenPoint}}</span>
            </div>
        </div>
        <!-- 头部 -->
        <div class="integral-header">
            <div :class="{r:true, active:type==1}" @click="cz">
                <img src="../../assets/img/xiao.png" alt="123" width="20" height="20"> <span class="sroce">积分充值</span>
            </div>
            |
            <div :class="{l:true, active:type==2}" @click="xf">
                <img src="../../assets/img/chong.png" alt="234" width="20" height="20"> <span class="sroce">积分消费</span>
            </div>
        </div>
        <!-- 内容部分 积分消费 -->
        <div>
            <div class="center" v-if="type==1">
                <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
                    <li class="mui-table-view-cell" v-for="item in list1">
                        <div class="mui-table">
                            <div class="mui-table-cell">
                                <div class="center-left">
                                    <img src="../../assets/img/xiaofei.png" width="20" height="20"> <span
                                        class="sroce">{{item.type}}</span>
                                </div>
                                <span style="font-size: 15px;color: #FF5709;">+ {{item.point}}</span>
                            </div>
                            <div class="mui-table-cell">
                                <span style="font-size: 13px;color: #666666;">{{item.addtime}}</span>
                                <h1 class="zi">余额:&nbsp;{{item.pointbalance}}</h1>
                            </div>
                        </div>
                    </li>
                </ul>
                <img style="width: 100%;" src="../../assets/img/notData.png" v-if="list1.length===0 && isNull">
            </div>
            <!--内容部分 积分充值-->
            <div class="center" v-if="type==2">
                <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
                    <li class="mui-table-view-cell" v-for="item in list2">
                        <div class="mui-table">
                            <div class="mui-table-cell">
                                <div class="center-left">
                                    <img src="../../assets/img/xiaofei.png" width="20" height="20"> <span
                                        class="sroce">{{item.type}}</span>
                                </div>
                                <span style="font-size: 15px;color: #00D330;">{{item.point}}</span>
                            </div>
                            <div class="mui-table-cell">
                                <span style="font-size: 13px;color: #666666;">{{item.addtime}}</span>
                                <h1 class="zi">余额:&nbsp;{{item.pointbalance}}</h1>
                            </div>
                        </div>
                    </li>
                </ul>
                <img style="width: 100%;" src="../../assets/img/notData.png" v-if="list2.length===0 && isNull">
            </div>
<!--            <div style="text-align: center;" v-show="loading"><img src="../../assets/img/jd-loading.gif"></div>-->
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="show"></div>
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'

    export default {
        data() {
            return {
                title: '积分明细',
                isNull:false,
                show: false,
                loading:false,
                page1: 1,
                page2: 1,
                type: 1,
                oPointbalance:0,
                oFrozenPoint:0,
                list1: [],
                list2: []
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
        methods: {
            getGoodsList(show) {
                let param = {
                    "TransType": "CXZHMX",
                    "pageIndex": this.type==1?this.page1:this.page2,
                    "pType": this.type
                };
                this.$axios.post("/send/getData", param).then(res => {
                    this.$dialog.loading.close();/* 移除loading */
                    this.loading=false;
                    if (show) {
                        if(res!=null){
                            if(res.state=="00"){
                                this.oPointbalance=res.oPointbalance;
                                this.oFrozenPoint=res.oFrozenPoint;
                                // 多次加载数据
                                if(this.type==1){
                                    //充值
                                    this.page1++;
                                    this.list1 = this.list1.concat(res.dataList);
                                    if(this.list1.length<=0){
                                        this.isNull=true;
                                    }
                                }else if(this.type==2){
                                    //消费
                                    this.page2++;
                                    this.list2 = this.list2.concat(res.dataList);
                                    if(this.list2.length<=0){
                                        this.isNull=true;
                                    }
                                }
                                if (res.dataList.length == 0) {
                                    this.show = true;
                                } else {
                                    this.show = false;
                                }
                            }
                        }
                    } else {
                        // 第一次加载数据
                        this.list1 = res.dataList;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.show = false;
                    }
                });
            },
            cz(){
                this.type=1;
                this.loadMore();
            },
            xf(){
                this.type=2;
                this.loadMore();
            },
            loadMore: function () {
                this.$dialog.loading.open('加载数据中,请稍等');
                // 多次加载数据
                this.loading=true;
                setTimeout( ()=> {
                    this.getGoodsList(true);
                },500)
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .pic {
        padding-top: 50px;
    }

    .integral-top {
        width: 100%;
        height: 88px;
        background: url(../../assets/img/beijing.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /* text-align: center; */
        /* line-height: 88px; */
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #ffffff;
        font-family: PingFangSC-Semibold;
        font-size: 15px
    }

    .integral-header {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #ffffff;
        color: #cccccc;
    }

    .l,
    .r {
        width: 40%;
        height: 40px;
        /* border: 1px solid #999; */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sroce {
        font-size: 15px;
        color: #333333;
        margin-left: 10px;
    }

    .active {
        height: 40px;
        border-bottom: 1px solid #2A81E8
    }

    .center {
        margin-top: 10px;
        /* background-color: #ff00f0 */
    }

    .center-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .zi {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
    }

    .mui-table-cell {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>

