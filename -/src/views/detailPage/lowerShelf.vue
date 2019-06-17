<template>
    <div class="content">
        <navbar :title="title" :url="'home'"></navbar>
        <div class="center">
            <div class="line">
                <img src="../../assets/img/noshop.png" alt="" width="120"/>
                <div class="top">
                  <h1 class="word">商品已被下架</h1>
                  <h1 class="word">无法查看</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import navbar from '../../components/nav.vue'
    export default {
        name: "lowerShelf",
        data() {
            return {
                title: "商品详情"
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
        components: {
            navbar,
        }
    }
</script>


<style scoped>
    .center {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #F5F5F5;
    }
    .line {
        position: absolute;
        width: 80%;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .word {
        font-family: PingFangSC-Regular;
        margin-top: 10px;
        font-size: 30px;
        color: #999999;
    }
    .top{
        padding-top: 10px;
        text-align: center;
    }
</style>