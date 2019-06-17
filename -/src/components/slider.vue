<template>
  <div class="slider">
    <yd-slider autoplay="3000">
      <yd-slider-item v-for="(banner,i) in bannerlist" :key="i">
        <div @click="toPage(banner.jumpurl)">
          <img :src="banner.image">
        </div>
      </yd-slider-item>
    </yd-slider>
  </div>
</template>
<script>
  export default {
    name: 'slider',
    props: {
      bannerlist: Array
    },
    data(){
      return{

      }
    },methods:{
      toPage(jumpurl){
        if(jumpurl!=null && jumpurl!=undefined && jumpurl!=""){
          location.href=jumpurl;
        }
      }
    }
  }
</script>

<style scoped>
  .yd-slider-item img{
    width: 100%;
    height: 100%;
  }
  .slider {
    width: 92%;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 3px 4px 10px 2px #BBBBBB;
  }
  .yd-slider{
    border-radius: 10px;
  }
  .yd-slider-item img{
    border-radius: 10px;
  }
   img {
    height: 180px;
  }
</style>
