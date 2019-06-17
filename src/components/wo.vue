<template>
    <div class="bill-content">
        <div class="center">
     <yd-navbar :title="chang">
        <router-link to="/login1" slot="left">
            <yd-navbar-back-icon>其他登录</yd-navbar-back-icon>
        </router-link>
     </yd-navbar>



    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
       chang:"qq"
        }
    },
    created(){

    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
           vm.$parent.$data.showfooter=false
           vm.$parent.$data.showmenu=false
        })
    },
    beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true
            this.$parent.$data.showmenu=true
           next()
    },
    methods:{

    },
    components:{

    }

    
}
</script>
<style scoped>
.bill-content{
 background-color: #fff
}
.center{
      padding-top: 10px;
  padding-left: 8px;
  padding-right: 8px
}
 .yd-navbar {
    border-bottom: 1px solid #ccc
}
</style>

