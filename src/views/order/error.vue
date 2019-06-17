<template>
    <div class="error">
        <div class="center">
            <div class="img">
                <img class="error-body" src="../../assets/img/error.jpg" alt="weds">
                <h1 class="word">对不起，系统异常，请稍后再试</h1>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
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
        methods: {},
        components: {}
    }
</script>
<style scoped>
    .error {
        width: 100%;
        height: 100%;
    }
    .center {
        position: fixed;
        width: 100%;
        background-color: #fff;
        top: 0;
        bottom: 0;
    }
    .img {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 216px;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column
    }
    .error-body {
        width: 100px;
    }
    .word {
        font-size: 14px;
        color: #ff0000
    }
</style>

