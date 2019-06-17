<template>
    <div class="login-content">
       <!-- 头部 -->
        <yd-navbar :title="chang">
        </yd-navbar>
          <div class="center">
             <div class="login_content">
              <input type="password" slot="right" placeholder="请输入登录密码" v-model="param.pwd"  ref="input" maxlength="18" style="background-color:#EEEEEE">
              <input type="password" slot="right" placeholder="请输入新密码(6-18)" minlength="6" maxlength="18" v-model="param.newPwd"  ref="input1" style="background-color:#EEEEEE">
              <input type="password" slot="right" placeholder="请再输入新密码(6-18)" minlength="6" maxlength="18" v-model="param.onPwd" ref="input2" style="background-color:#EEEEEE">
              <yd-button size="large" type="primary" @click.native="clickname" bgcolor="#1D75D6" color="#fff">完成</yd-button>
         </div>
           </div>
    </div>
</template>
<script>
import {put} from "../../api/index.js"
export default {
   data() {
     return {
         param:{
             pwd:"",
             newPwd:"",
             onPwd:""
         },
       chang: "修改密码",
       flag: true,
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
            if(this.$refs.input.value&&this.$refs.input1.value &&this.$refs.input2.value){
                if(this.param.newPwd.length<6 || this.param.newPwd.length>18){
                    this.$dialog.toast({
                        mes: "密码由6到18位组合",
                        timeout: 1500
                    });
                    return;
                }
               if(this.$refs.input1.value===this.$refs.input2.value){
                 let data = await this.$axios.put("/customer/pwd", this.param);
                   console.log(data);
                   if(data.state=="00"){
                       this.$dialog.toast({
                           mes: "修改成功",
                           icon: 'success',
                           timeout: 1500
                       });
                       window.location.href = "/";
                   }else{
                       this.$dialog.toast({
                           mes: data.msg,
                           icon: 'success',
                           timeout: 1500
                       });
                   }
                }else{
                   this.$dialog.toast({
                       mes: '新密码不一样',
                       icon: 'error',
                       timeout: 1500
                   });
               }
            }else{
               this.$dialog.toast({
                        mes: '请输入密码',
                        icon: 'error',
                        timeout: 1500
                    });
            }
           
        }
 
    }
}
</script>
<style scoped>
.center{
  padding-left: 10px;  
  padding-right: 10px
}
.login-content{
  height: 610px;
  background-color: #fff;
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


