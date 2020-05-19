<template>
  <div class="login">
    <div class="content">
      <div class="logo-box">
        <div class="logo">
          <img src="../assets/coffer.png" alt class="auto-img" />
        </div>
      </div>
      <div class="login-box">
        <van-form @submit="lgSub">
          <div class="user">
            <van-field
              v-model="userInfo.phone"
              name="帐号"
              label="帐号"
              placeholder="请输入您的手机号"
              clearable
              autocomplete="off"
            />
          </div>
          <div class="password">
            <van-field
              v-model="userInfo.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入您的登录密码"
              clearable
              autocomplete="off"
            />
          </div>
          <div class="operation clearfix">
            <span class="fl" @click="forgot">忘记密码?</span>
            <span class="fr" @click="rg">新用户注册</span>
          </div>
          <div class="sub-btn">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </div>
      <div class="other-login">
        <van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px' }">第三方软件登录</van-divider>

        <div class="login-type clearfix">
          <div @click="tiao">
            <img src="../assets/qq.png" alt class="auto-img" />
          </div>
          <div @click="tiao">
            <img src="../assets/wb.png" alt class="auto-img" />
          </div>
          <div @click="tiao">
            <img src="../assets/wx.png" alt class="auto-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reg } from "../utils/reg";
import { utils } from "../utils/utils";


export default {
  name: "Login",

  computed: {
    userInfo() {
      return this.$store.state.LoginModules.userInfo;
    }
  },

  created(){
    //清空内容
    this.$store.commit('LoginModules/emptyData')
  },

  methods: {
    lgSub() {

      if (reg.sub(this.userInfo, this)) {

        
        //加载提示
        this.$toast.loading({
          //是否禁止背景点击
          forbidClick: true,

          //禁止自动关闭
          duration: 0,

          message: "登录中..."
        });

        this.axios({
          method: "POST",
          url: "/login",

          data: {
            appkey: this.appKey,
            phone: this.userInfo.phone,
            password: this.userInfo.password
          },

          //序列换请求体参数
          transformRequest: utils.transformRequest
        }).then(result => {

          
          

          //关闭加载提示
          this.$toast.clear();

         //如果登录成功
          if (result.data.code == 200) {

            //token 的作用,在进入软件观看敏感信息的时候,是需要用token验证
            // let tokenData = result.data.token.split('.');

            
            //cookie 过期时间
            // let time =  30 * 24 * 60 * 60;

            //要把token放在cookie里面储存
            // tokenData.forEach((v,i) =>{
            //   //cookie过期时间要与后台的token过期时间一致
            //   this.$cookies.set('t' + i,v,time)

            // })

            //存储token字符串
            localStorage.setItem('_t',result.data.token)
 
            //跳转登录组件
            this.$router.push({name: 'isHot'});
            
            this.$store.commit('changeData',{
              key:'isLogin',
              value: true
            })

          } else {
            this.$toast(result.data.msg)
          }
          
        }).catch(() =>{
          
           this.$toast.clear();
        })
      }
    },

    //注册
    rg() {
      this.$router.push({ name: "Register" });
    },

    forgot() {
      this.$router.push({name:'Email'})
    },

    tiao(){
      this.$toast('敬请期待')
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url(../assets/cfbg1.jpg) no-repeat;
  background-size: cover;
  position: relative;

  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    .logo-box {
      margin-bottom: 20px;
      .logo {
        height: 128px;
        width: 128px;
        margin: 0 auto;
      }
    }

    .login-box {
      padding: 0px 30px;

      .user {
        margin-bottom: 24px;

        .van-cell {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }

      .password {
        margin-bottom: 10px;
        .van-cell {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }

      .operation {
        color: white;
      }
    }

    .other-login {
      margin-top: 50px;
      padding: 0px 30px;
    }

    .login-type {
      width: 136px;
      margin: 0 auto;

      > div {
        height: 32px;
        width: 32px;
        float: left;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .sub-btn {
      margin: 24px 0px;
    }
  }
}
</style>