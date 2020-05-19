<template>
  <div class="register">
    <van-nav-bar class="van-nav-bar" title="注册账号" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div class="register-box">
        <div class="logo-box">
          <div class="logo">
            <img src="../assets/coffer.png" alt class="auto-img" />
          </div>
        </div>
        <van-form @submit="regSub">
          <div class="user">
            <van-field
              v-model="useInfo.phone"
              name="账户"
              label="账户"
              placeholder="手机号"
              autocomplete="off"
              right-icon="warning-o"
              @click-right-icon="pIc"
              clearable
            />
          </div>
          <div class="said">
            <van-field
              v-model="useInfo.nickName"
              name="昵称"
              label="昵称"
              placeholder="昵称"
              autocomplete="off"
              right-icon="warning-o"
              clearable
              @click-right-icon="saIc"
            />
          </div>
          <div class="password">
            <van-field
              v-model="useInfo.password"
              clearable
              type="text"
              name="密码"
              label="密码"
              placeholder="密码"
              right-icon="warning-o"
              @click-right-icon="rightIc"
              autocomplete="off"
            />
          </div>
          <!-- <div class="ven-code">
            <van-field
              v-model="useInfo.venCode"
              clearable
              center
              label="验证码"
              placeholder="短信/邮箱验证码"
              autocomplete="off"
            >
              <template #button>
                <van-button size="small" type="primary">发送验证码</van-button>
              </template>
            </van-field>
          </div>-->
          <div class="sub-btn">
            <van-button :disabled="isPass" round block type="info" native-type="submit">注册</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reg } from "../utils/reg";

import { utils } from "../utils/utils";

export default {
  name: "Register",

  created(){
    this.$store.commit('RegisterModules/emptyData')
  },

  computed: {
    useInfo() {
      return this.$store.state.RegisterModules.useInfo;
    },

    isPass(){
      for(let key in this.useInfo){

        if(this.useInfo[key] == ''){

          return true
        }
      }

      return false
    }
  },

  methods: {
    regSub() {
      if (reg.sub(this.useInfo, this)) {
        //加载提示
        this.$toast.loading({
          //是否禁止背景点击
          forbidClick: true,

          //禁止自动关闭
          duration: 0,

          message: "注册中..."
        });

        //发起ajax请求
        this.axios({
          method: "POST",
          url: "/register",

          //请求体参数
          data: {
            appkey: this.appKey,
            nickName: this.useInfo.nickName,
            phone: this.useInfo.phone,
            password: this.useInfo.password
          },

          //序列化请求体参数
          transformRequest: utils.transformRequest
        })
          .then(result => {
            //关闭加载提示
            this.$toast.clear();

            //如果注册成功
            if (result.data.code == 100) {
              //跳转登录组件
              this.$router.push({ name: "Login" });

              this.useInfo.nickName = "";
              this.useInfo.phone = "";
              this.useInfo.password = "";
            } else {
              this.$toast({
                message: result.data.msg
              });
            }
          })
          .catch(() => {
            
            this.$toast.clear();
          });
      }
    },

    rightIc() {
      this.$toast(
        "必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间"
      );
    },

    pIc() {
      this.$toast(
        "11位数手机号"
      );
    },

    saIc() {
      this.$toast("必须包含字母和数字和汉字组合，长度在4-12之间");
    },
    onClickLeft() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  background: url(../assets/zucebg.jpg) no-repeat;
  background-size: cover;
  height: 100%;
  position: relative;

  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    h1 {
      font-size: 32px;
      padding: 0px 30px;
      margin-bottom: 40px;
      color: #81776e;
    }

    .register-box {
      .logo-box {
        margin-bottom: 20px;
        .logo {
          height: 128px;
          width: 128px;
          margin: 0 auto;
        }
      }

      .user {
        margin-bottom: 30px;
        padding: 0px 30px;

        .van-cell {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }

      .said {
        margin-bottom: 30px;
        padding: 0px 30px;

        .van-cell {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }

      .password {
        margin-bottom: 30px;
        padding: 0px 30px;

        .van-cell {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }

      .ven-code {
        padding: 0px 30px;

        .van-cell {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }

      .sub-btn {
        margin-top: 30px;
        padding: 0 30px;
      }
    }
  }
}
</style>