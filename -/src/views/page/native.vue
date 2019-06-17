<template>
    <div class="pic">
        <!-- 头部 -->
        <navbar :title="title" ></navbar>
        <!-- 产品部分 -->
         <div class="none-img"  v-if="this.list.length===0 && !isNullShow">
             <img src="../../assets/img/ding.png">
         </div>
        <div class="center">
            <!-- 第一个产品 -->
            <div class="native-header" v-for="(item,i) in list" :key="i" @click="toPage(item.id)">
                <div class="img">
                    <img v-lazy="item.image" alt="234" width="100" height="100" style="border-radius: 6px;">
                </div>
                <div class="native-r">
                    <div class="native-h">
                        <p style="color:#333333">{{item.name}}</p>
                        <p style="color:#333333">{{item.remark}}</p>
                    </div>
                    <br>
                    <div class="native-m">
                        <span class="number">￥{{item.showprice}}</span>
                        <i class="word">{{item.ordercount}}人付款</i>
                    </div>
                </div>
            </div>
             <!-- 到底触发事件 -->
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="show" infinite-scroll-distance="10"></div>
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        data() {
            return {
                 id: this.$route.params.id,
                 title: "商品分类",
                 list:[],
                 isNullShow:true,
                 show:false,
                 page:0,
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
        created(){
        },
        methods:{
            toPage(id){
                this.$router.push({
                    name: 'reservepage',
                    params: {
                        id
                    }
                });
            },
           getGoodsList(flag){
                let param = {
                    "TransType": "SPLB",
                    "pMerchantno":sessionStorage.getItem("pMerchantno"),
                    "pType":this.id,
                    "pageIndex":this.page,
                }
               this.$axios.post("/send/getData", param).then((res) => {
                   this.isNullShow=false;
                   this.$dialog.loading.close();/* 移除loading */
                   if(flag){
                        if(res!=null){
                            if(res.state=="00"){
                                this.list = this.list.concat(res.dataList);
                                if(res.dataList.length == 0){
                                    this.show = true;
                                }else{
                                    this.show = false;
                                }
                            }
                        }
                    }else{
                        // 第一次加载数据
                        this.list = res.dataList;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.show = false;
                    }
                })
            },
            loadMore() {
                this.$dialog.loading.open('加载数据中,请稍等');
                this.isNullShow=true;
                // 多次加载数据
                setTimeout(() => {
                    this.page ++;
                    this.getGoodsList(true);
                }, 500);
            }

        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
   .pic{
       padding-top: 50px;
    }
    .native-header {
        width: 100%;
        padding: 8px 0;
        display: flex;
        justify-content: space-around;
        width: 98%;
        margin: 0 1%;
        margin: 5px 0;
        background-color: #FFFFFF;
    }
    .native-r {
        width: 60%;
    }
    .native-m {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .native-h {
        text-overflow: ellipsis;
        width: 100%;
        height: 50px;
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #333333;
        overflow: hidden;
        padding: 5px 0;
        margin-bottom: 10px;
    }
    .number {
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #FD5C63;
    }
    .img {
        width: 27%;
    }
    fieldset, img{
        width: 100%;
        overflow: hidden;
    }
    .word {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
    }
</style>

