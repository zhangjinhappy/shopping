<template>
    <div id="app">
        <!-- 头部部分 -->
        <yd-navbar :title="title" v-if="showmenu" fixed>
            <a slot="left" v-if="showicon" ref="menu" @click="goBack">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </a>
        </yd-navbar>
        <router-view/>
        <!-- 尾部 -->
        <nav class="mui-bar mui-bar-tab" v-if="showfooter">
            <router-link class="mui-tab-item-ball " to="/home">
                <span class="mui-icon"><yd-icon name="home" slot="icon" size="0.44rem"></yd-icon></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-ball" to="/car">
                <span class="mui-icon b">
<!--                <yd-badge slot="badge" type="danger" class="c" v-if="carCount!=0">{{carCount}}</yd-badge>-->
                <yd-icon name="shopcart" slot="icon" size="0.44rem"></yd-icon>
              </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-ball" to="/mine">
                <span class="mui-icon"> <i class="iconfont">&#xe625;</i></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                carCount:localStorage.getItem("goodsCount") || 0,
                title: "首页",
                showicon: false,
                showmenu: true,
                showfooter: true,
                flag: false
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        }, beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false;
            });
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next();
        }, created() {

        }, mounted() {
        }

    }
</script>
<style scoped>
    .yd-navbar {
        border-bottom: 1px solid #ccc
    }
    .yd-tabbar {
        height: 60px;
    }
    .mui-bar {
        background-color: #EEEEEE;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }
    .b{
        position: relative;
    }
    .c{
        position: absolute;
        top: 0;
        left: 60%;
    }
    .mui-bar-tab .mui-tab-item-ball {
        color: #999999;
    }
    .mui-active {
        color: #000 !important;
    }
    .mui-bar-tab .mui-tab-item-ball {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    .mui-bar-tab .mui-tab-item-ball .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-ball .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
