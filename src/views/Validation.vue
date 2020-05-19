<template>
  <div class="validation">
    <van-nav-bar title="找回密码" left-text="返回" left-arrow :fixed="true" @click-left="goBack" />

    <div class="cont">
      <van-form @submit="commit">
        <van-field
          v-model="userInfo.phone"
          autocomplete="off"
          clearable
          label="手机号"
          placeholder="请输入您注册时用的手机号"
        />
        <van-field
          v-model="userInfo.password"
          autocomplete="off"
          clearable
          label="新密码"
          placeholder="请输入您的新密码"
        />
        <div class="btn">
          <van-button
            native-type="submit"
            class="van-button"
            type="info"
            block
            :disabled="isPass"
          >确定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { reg } from "../utils/reg";
import { utils } from "../utils/utils";

export default {
  name: "Validation",

  data() {
    return {
      userInfo: {
        phone: "",
        password: ""
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

    commit() {
      if (reg.sub(this.userInfo, this)) {
        //加载提示
        this.$toast.loading({
          forbidClick: true,
          duration: 0,
          message: "加载中..."
        });

        this.axios({
          method: "POST",
          url: "/retrievePassword",
          data: {
            appkey: this.appKey,
            phone: this.userInfo.phone,
            password: this.userInfo.password
          },
          transformRequest: utils.transformRequest
        })
          .then(result => {
            
            this.$toast.clear();

            if (result.data.code == "L001") {
              this.$router.push({ name: 'Login' });
              this.$toast('找回密码成功')
            } else {
              this.$toast(result.data.msg);
            }
          })
          .catch(err => {
            this.$toast.clear();
            
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.validation {
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