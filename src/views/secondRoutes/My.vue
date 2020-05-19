<template>
  <div class="my">
    <div class="header-box" :style="{backgroundImage: 'url('+ MyMsg.userBg+')'}">
      <div class="header clearfix">
        <div class="header-img fl" @click="goPersonal">
          <img
            :src="isLogin ? MyMsg.userImg : 'http://www.kangliuyong.com:10002/assets/default.png'"
            class="auto-img"
            alt
          />
        </div>
        <div v-if="isLogin" class="header-username fl">{{MyMsg.nickName}}</div>
        <div v-else class="header-lg fl" @click="goLogin">登录</div>
      </div>
      <div class="replace-bg">
        <span>更换背景</span>
        <van-uploader class="van-uploader" :after-read="upload" />
      </div>
    </div>
    <div class="my-function">
      <div
        class="item clearfix"
        v-for="(item,index) in cellData"
        :key="index"
        @click="goPage(item)"
      >
        <div class="icon fl">
          <div>
            <van-icon
              class-prefix="icon"
              :name="item.icon"
              class="van-icon"
              :color="item.icon_col"
            />
          </div>
        </div>
        <div class="fl address">{{item.tit}}</div>
        <div class="fr right">
          <div>
            <van-icon
              class-prefix="icon"
              name="icon-arrow-right"
              class="van-icon"
              color="rgb(208, 204, 204)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { utils } from "../../utils/utils";

export default {
  name: "My",

  created() {

    this.$store.commit('MyModules/emptyData')

    this.getUseInfo();
  },

  computed: {
    ...mapState("MyModules", ["cellData", "MyMsg"]),
    //查看是否登录
    isLogin() {
      return this.$store.state.isLogin;
    }
  },

  methods: {
    //跳转
    goPage(item) {
      this.$router.push({ name: item.name });
    },

    // //获取用户信息
    getUseInfo() {
      let tokenString = localStorage.getItem("_t");

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
          

          this.$store.commit("changeData", {
            key: "isLogin",
            value: result.data.code != 700
          });

          if (result.data.code == 700) {
            return;
          }

          this.$store.commit("MyModules/changeData", {
            key: "MyMsg",
            value: result.data.result[0]
          });
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //跳转到我的账号
    goPersonal() {
      if (!this.isLogin) {
        this.$toast("请先登录");
        return;
      }

      this.$router.push({ name: "Personal" });
    },

    //上传背景图
    upload(file) {
      

      if (!this.isLogin) {
        this.$toast("请先登录 , 即可设置背景");
        return;
      }

      //控制上传图片大小不能超过 300KB
      let imgSize = 300 * 1024;
      if (file.file.size > imgSize) {
        this.$toast("图片大小不能超过300KB");
        return;
      }

      //获取图片的类型
      let imgType = file.file.type.split("/")[1];

      //处理图片的base64
      let serverBase64Img = file.content.replace(
        /data:image\/[A-Za-z]+;base64/,
        ""
      );

      //将图片上传到服务器
      let tokenString = localStorage.getItem("_t");

      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        method: "POST",
        url: "/updateUserBg",
        data: {
          appkey: this.appKey,
          tokenString,
          imgType,
          serverBase64Img
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();
          
          this.MyMsg.userBg = result.data.userBg;
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //登录
    goLogin() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  height: 100%;
  background: #f7f7f7;

  .header-box {
    background: #b5b4b4;
    height: 80px;
    padding: 80px 0px;
    background-size: cover;
    position: relative;

    .header {
      padding: 0px 10px;
      .header-img {
        overflow: hidden;
        height: 80px;
        width: 80px;
        background: #f8f8ff;
        border-radius: 50%;
      }
      .header-username {
        color: #dddddd;
        margin-left: 20px;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        font-weight: 700;
      }
      .header-lg {
        color: #0082cf;
        margin-left: 20px;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        font-weight: 700;
      }
    }

    .replace-bg {
      position: absolute;
      right: 20px;
      top: 20px;
      color: #dddddd;
      overflow: hidden;

      .van-uploader {
        position: absolute;
        left: 0;
        top: 0;
        width: 48px;
        height: 16px;
        opacity: 0;
      }
    }
  }

  .my-function {
    background: #ffffff;

    .item {
      padding: 0px 10px;
      height: 50px;
      border-bottom: 1px solid #e9e9e9;

      .icon {
        height: 100%;
        width: 18.01px;
        margin-right: 10px;
        position: relative;

        > div {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .address {
        height: 100%;
        line-height: 50px;
        font-size: 16px;
      }

      .right {
        height: 100%;
        width: 18.01px;
        position: relative;

        > div {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>