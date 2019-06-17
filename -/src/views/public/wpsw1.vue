<template>
    <div class="login-content">
       <!-- 头部 -->
        <yd-navbar :title="chang"></yd-navbar>
        <div class="center">
           <div class="login_content">
          <input type="password" slot="right" placeholder="请输入新密码(6-18)" minlength="6" maxlength="18" v-model="input1"  ref="input1" style="background-color:#EEEEEE"> 
          <input type="password" slot="right" placeholder="请再输入新密码(6-18)" minlength="6" maxlength="18" v-model="param.password" ref="input2" style="background-color:#EEEEEE">
          <yd-button size="large" type="primary" @click.native="clickname" bgcolor="#1D75D6" color="#fff">完成</yd-button>
         </div>
        </div>
        <!-- 中间部分 -->
    </div>
</template>
<script>
  import {put} from "../../api/index.js"
  export default {
   data() {
     return {
       input1:"",
       chang: "找回密码",
       flag: true,
       param:{
            phonenumber:this.$store.state.par[0].phonenumber,
            code:this.$store.state.par[0].code,
            password:""
       }
     }
   },
   created(){
  
   },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
           vm.$parent.$data.showfooter=false;
           vm.$parent.$data.showmenu=false
        })
    },
    beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true;
            this.$parent.$data.showmenu=true;
           next()
    },
    components:{
     
    },
    methods: {
        goBack(){
          this.$router.go(-1)
        },
        async clickname(){
            if(this.$refs.input1.value &&this.$refs.input2.value){
               if(this.$refs.input1.value===this.$refs.input2.value){
                 let data = await put("/pwd", this.param).then(res=>{
                     this. phonenumber=this.code="";
                     this.$dialog.toast({
                        mes: "修改成功",
                        icon: 'success',
                        timeout: 1500
                    });
                     this.$router.push({
                         name:"login"
                     })
                   })
                }
            }else{
               this.$dialog.toast({
                        mes: '请输入密码',
                        icon: 'error',
                        timeout: 1500
                    });
            }
            //this.$router.push({name:"home"})
        }
 
    }
}
</script>
<style scoped>
.login-content{
  height: 720px;
  background-color: #fff;
}
.center{
   padding-left: 10px;  
  padding-right: 10px
}
.login_content{
  padding-top: 80px;
}
.yd-navbar{
  border-bottom: 1px solid
}
 .yd-btn-block{
    margin-top: 0rem;
  }

 
</style>


