<template>
  <div class="email">
    <van-nav-bar title="获取验证码" left-text="返回" left-arrow :fixed="true" @click-left="goBack" />

    <div class="cont">
      <van-form @submit="next">
        <van-field clearable v-model="userInfo.email" label="邮箱" placeholder="请输入您的邮箱" />
        <van-field
          maxlength="6"
          v-model="userInfo.venCode"
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
        >
          <template #button>
            <van-button
              :disabled="code.isEnd"
              size="small"
              type="info"
              @click.prevent="venEmail"
            >{{code.text}}</van-button>
          </template>
        </van-field>

        <div class="btn">
          <van-button
            native-type="submit"
            class="van-button"
            type="info"
            block
            :disabled="isPass"
          >下一步</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reg } from "../utils/reg";
import { utils } from "../utils/utils";

export default {
  name: "Email",

  data() {
    return {
      userInfo: {
        email: "",
        venCode: ""
      },

      code: {
        isEnd: false,
        text: "发送验证码"
      }
    };
  },

  computed: {
    isPass() {
      for (let key in this.userInfo) {
        if (this.userInfo[key] == "") {
          return true;
        }
      }

      return false;
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    //获取验证码
    venEmail() {
      if (reg.sub({ email: this.userInfo.email }, this)) {
        let time = 60;

        this.code.isEnd = true;

        this.code.text = "重新发送(" + time + ")";

        let setTime = setInterval(() => {
          if (time == 0) {
            clearInterval(setTime);
            setTime = null;
            this.code.isEnd = false;
            this.code.text = "发送验证码";
          } else {
            --time;
            this.code.text = "重新发送(" + time + ")";
          }
        }, 1000);

        //加载提示
        this.$toast.loading({
          forbidClick: true,
          duration: 0,
          message: "加载中..."
        });

        this.axios({
          method: "POST",
          url: "/emailValidCode",
          data: {
            appkey: this.appKey,
            email: this.userInfo.email
          },
          transformRequest: utils.transformRequest
        })
          .then(result => {
            this.$toast.clear();
            this.$toast("验证码已发送,请注意查看");
            
          })
          .catch(err => {
            this.$toast.clear();
            
          });
      }
    },

    //下一步
    next() {
      if (!reg.sub(this.userInfo, this)) {
        return;
      }

      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        method: "POST",
        url: "/checkValidCode",
        data: {
          appkey: this.appKey,
          validCode: this.userInfo.venCode
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();
          

          if (result.data.code == "K001") {
            this.$router.push({ name: "Validation" });
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.email {
  padding: 46px 20px 0;

  .cont {
    margin-top: 40px;
  }

  .btn {
    margin-top: 20px;

    .van-button {
      border-radius: 8px;
    }
  }
}
</style>