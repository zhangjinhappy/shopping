<template>
    <div class="nav">
      <yd-navbar :title="title" fixed>
          <div slot="left" @click="goBack">
               <yd-navbar-back-icon></yd-navbar-back-icon>
          </div>
       </yd-navbar>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props:{
        title:String,
        url:String
    },
    methods:{
        goBack() {
            if(this.url===null || this.url===undefined){
                this.$router.go(-1)
            }else{
                if(this.url==="/home"){
                    location.href="/";
                }else{
                    this.$router.push({name:this.url})
                }
            }
      }
    },
    components:{

    }
}
</script>
<style scoped>
.yd-navbar{
    border-bottom: 1px solid #cccccc;
}
.yd-navbar-fixed{
    z-index: 999999;
}
</style>

