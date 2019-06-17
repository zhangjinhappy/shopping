<template>
  <div class="shou-content">
    <div class="center">
      <div class="shou_body">
        <input type="text" slot="right" ref="input1" required v-model="phonenumber" placeholder="请输入手机号码" style="background-color:#eeeeee">
        <!-- 获取验证码 -->
        <div class="regisrer-login">
          <input type="text" class="regisrer-a" slot="right" ref="input2" v-model="code" placeholder="请输入验证码" style="background-color:#EEEEEE">
          <!-- ↓↓关键代码是这里↓↓ -->
          <yd-sendcode class="a-a" slot="right" v-model="start1" @click.native="sendCode1" type="primary"></yd-sendcode>
          <!-- ↑↑关键代码是这里↑↑ -->
        </div>
        <yd-button size="large" type="primary" @click.native="userlogin" bgcolor="#1D75D6" color="#fff">下一步</yd-button>
      </div>
    </div>
    <!-- 手机号 -->
  </div>
</template>
<script>
  import {
    get
  } from "../../api/index.js"
  export default {
    data() {
      return {
        phonenumber: "",
        code: "",
        start1: false,
        flag: true,
        chang: "找回密码"
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$parent.$data.showfooter = false;
        vm.$parent.$data.showmenu = false
      })
    },
    beforeRouteLeave(to, from, next) {
      this.$parent.$data.showfooter = true;
      this.$parent.$data.showmenu = true;
      next()
    },
    methods: {
      //下一步的操作
      userlogin() {
        if (this.$refs.input1.value && this.$refs.input2.value) {
          var par = {
            phonenumber: this.phonenumber,
            code: this.code
          };
          this.$store.commit("addcar", par);
          this.$router.push({
            name: "wpsw1"
          })
        } else {
          this.$dialog.toast({
            mes: '请填写手机号与验证码',
            icon: 'error',
            timeout: 1500
          });
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      async sendCode1() {
        // 验证码的操作
        var re = /^1[3456789]\d{9}$/;
        if (re.test(this.phonenumber)) {
          this.$dialog.loading.open('发送中...');
          let data = await get('/pwd/getCode/' + this.phonenumber);
          setTimeout(() => {
            this.start1 = true;
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1500
            });
          }, 1000);
        } else {
            this.$dialog.toast({
                mes: '请输入正确的手机号',
                icon: 'success',
                timeout: 1500
            });
        }
      }
    }
  }
</script>
<style scoped>
  .shou-content {
    background-color: #fff;
    height: 720px;
  }
  .center {
    padding-left: 10px;
    padding-right: 10px
  }
  .shou_body {
    padding-top: 80px;
  }
  .yd-navbar {
    border-bottom: 1px solid
  }
  .yd-btn-block {
    margin-top: 0rem;
  }
  .regisrer-a {
    width: 65%;
  }
  input{
    margin-bottom: 10px;
  }
  .a-a {
    height: 37px;
    width: 25%;
    background-color: #fff;
    color: black;
    border: 1px solid
  }
  .regisrer-login {
    display: flex;
    justify-content: space-between
  }
</style>


