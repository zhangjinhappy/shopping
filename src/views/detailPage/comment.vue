<template>
    <div class="comment">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 内容 -->
        <div class="center" v-for="item in list">
            <div class="center-header">
                <img src="../../assets/img/commentLogo.png" width="23" height="23" style="border-radius:50%">
                <h1 class="people">{{item.name}} <span style="margin-left: 10px">{{item.addtime}}</span></h1>
            </div>
            <div class="center-content">{{item.content}}</div>
            <yd-cell-group>
                <yd-cell-item style="padding-left:0; ">
                    <yd-rate slot="left" size="18px" readonly="true" active-color="rgb(255, 166, 29)" v-model="item.score" ></yd-rate>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <!-- 到底触发事件 -->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="show" infinite-scroll-distance="10"></div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        data() {
            return {
                title: "商品评论",
                isNullShow:true,
                id: this.$route.params.id,
                show:false,
                page:0,
                list:[]
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
        created(){
        },
        methods: {
            getComment(flag){
                let param = {
                    "TransType": "SPPJLB",
                    "pGoodsID":this.id,
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
                });
            },
            loadMore() {
                this.$dialog.loading.open('加载数据中,请稍等');
                this.isNullShow=true;
                // 多次加载数据
                setTimeout(() => {
                    this.page ++;
                    this.getComment(true);
                }, 500);
            }
        },
        components: {
            navbar
        }
    }
</script>
<style scoped>
    .comment{
        padding-top: 50px;
    }
    .center {
        margin-top: 5px;
        padding: 10px;
        background-color: #fff;
    }
    .center-header {
        display: flex;
            align-items: center
    }
    .people {
        font-size: 12px;
        color: #333333;
        padding-left: 10px;
        font-weight: 500;
    }
    .center-content{
        font-size: 13px;
        color: #333333;
        margin-top: 8px;
    }
</style>

