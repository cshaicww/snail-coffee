<template>
  <div class="modifyname">
    <van-nav-bar title="修改昵称" left-text="返回" left-arrow @click-left="goBack()" />

    <h3>用户名:</h3>

    <div class="cont">
      <div class="inp">
        <input type="text" v-model="MyMsg.nickName" autocomplete="off" />
      </div>
      <p>必须是字母或数字或汉字组合，限长4-12个字符</p>
      <button @click="changeUserInfo">确认</button>
    </div>
  </div>
</template>

<script>
import { utils } from "../utils/utils";
import { reg } from "../utils/reg";
import { mapState } from "vuex";

export default {
  name: "ModifyName",

  data() {
    return {
      MyMsg: {
        nickName: ""
      },

      isPass: true
    };
  },

  created() {
    

    this.getUseInfo();
  },

  methods: {
    //goBack
    goBack() {
      this.$router.go(-1);
    },

    //获取用户信息
    getUseInfo() {
      let tokenString = localStorage.getItem('_t');

      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appKey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();
          

          this.MyMsg["nickName"] = result.data.result[0].nickName;
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //修改昵称
    changeUserInfo() {

      if (!reg.sub(this.MyMsg, this)) {
        

        this.isPass = false;

        return;
      }

      let tokenString = localStorage.getItem('_t');

      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "处理中..."
      });

      this.axios({
        method: "POST",
        url: "/updateNickName",
        data: {
          appkey: this.appKey,
          tokenString,
          nickName: this.MyMsg.nickName
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();
          

          this.goBack()
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.modifyname {
  padding: 0px 10px;
  .cont {
    .inp {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #ddd;

      > input {
        border: 0;
        width: 100%;
        padding: 0;
      }
    }

    > button {
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: 0;
      outline: none;
      font-size: 16px;
      color: white;
      background: #1989fa;
      border-radius: 5px;
    }
  }
}
</style>