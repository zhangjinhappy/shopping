<template>
    <div class="comment">
        <!-- 头部 -->
        <navbar :title="title"></navbar>
        <!-- 内容 -->
        <div v-for="(item,i) in shopList" :key="item.id" style="width: 96%;margin: auto;border-radius: 12px;">
        <div class="comment-header">
            <div class="comment-header-div-img">
                <img :src="item.image">
            </div>
            <div class="comment-r">
                <div class="content">
                   {{item.name|word}}
                </div>
                <div class="number">
                    <span>时间：{{addtime|timeChange}}</span>
                    <span>数量:x{{item.count}}</span>
                </div>
            </div>
        </div>
        <div class="comment-body">
            <div class="text">
                <textarea v-model="item.content" maxlength="100"  placeholder="请输入评论内容"></textarea>
            </div>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">描述相符:</span>
                    <yd-rate slot="right" active-color="rgb(255, 166, 29)" v-model="item.score" ></yd-rate>
                </yd-cell-item>
 <!--               <yd-cell-item>
                    <span slot="left">物流态度:</span>
                    <yd-rate slot="right" active-color="rgb(255, 166, 29)" v-model="item.score1"></yd-rate>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">服务态度:</span>
                    <yd-rate slot="right" active-color="rgb(255, 166, 29)" v-model="item.score2"></yd-rate>
                </yd-cell-item>-->
            </yd-cell-group>
        </div>
        </div>
        <div class="btn" @click="comment">提交</div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        data() {
            return {
                title: "评价",
                score:1,
                score1:1,
                score2:1,
                commentrenList:{},//订单页面带过来的json对象
                id:this.$route.params.id,
                shopList:[],
                addtime:"",
                meaaage:[{id:0,content:"你的宝贝好牛逼我好喜欢呀！！！！",time:"2015-06-04"}]
            }
        },
        created(){
            this.commentrenList = JSON.parse(sessionStorage.getItem("commentrenList"));
            if(JSON.parse(sessionStorage.getItem("commentrenList"))!=null){
                this.addtime=this.commentrenList.addtime;
                this.shopList=this.commentrenList.goodsDetail;
                for (let i = 0; i < this.shopList.length; i++) {
                    this.shopList[i].content="";
                    this.shopList[i].score=1;
                }

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
            comment(){
                let contentsList=[];
                for (let i = 0; i < this.shopList.length; i++) {
                    contentsList.push({"content":this.shopList[i].content,"id":this.shopList[i].id,"score":this.shopList[i].score});
                }
                let param={
                    "TransType":"PJDD",
                    "pOrderID":this.commentrenList.id,
                    "pContents":contentsList
                };
                this.$axios.post("/send/getData",param).then((result)=>{
                    if(result!=null){
                        this.$dialog.toast({
                            mes: result.message,
                            timeout: 1500
                        });
                    }
                });
            },
        //    submitMssage(){
        //      var msg={ content:this.content,time:new Date()};
        //      this.meaaage.push(msg);
        //      this.content=""
        //    }  
        },
        components: {
            navbar
        },
        filters:{
            word(val){
                if(val.length>18){
                 val=val.substring(0,20)+'...'
                }
              return val
            },
            timeChange(time){
                    var d = new Date(time); 
                    var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    return datetime
                  }
        }
    }
</script>
<style scoped>
    .comment{
     padding-bottom: 20px;
     padding-top: 50px;
    }
    .comment-header {
        margin-top: 5px;
        padding: 10px 10px 0 10px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #fff
    }
    .comment-r {
        width: 100%;
        font-size: 12px;
        padding: 5px 20px;
    }
    .number {
        width: 100%;
        font-size: 12px;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .number span{
        margin-left: 20px;
    }
    textarea {
        background: #EDEDED;
    }
    textarea::placeholder{
       font-size: 14px;
        color: #CCCCCC;
    }
    .pi {
        font-size: 16px;
        height: 20px;
        color: #333333;
    }
    .comment-body {
        width: 100%;
        padding: 15px 10px;
        background-color: #fff;
    }
    .btn{
        height: 40px;
        width: 80%;
        margin: 15px auto;
        text-align: center;
        line-height: 40px;
        background-color: #ff4c00;
        border-radius: 6px;
        font-size: 16px;
        bottom: 1px;
        color: #fff;
    }
    .content{
        width: 100%;
        font-size: 15px;
        color: #ff4c00;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .comment-header-div-img{
        display: inline-block;
        width: 40px;
        height: 40px;
    }
    .comment-header-div-img img{
        width: 40px;
        height: 40px;
    }
    textarea{
        height: 100px;
        background-color: #FFFFFF;
    }
</style>

