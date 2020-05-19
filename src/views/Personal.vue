<template>
  <div class="personal">
    <!-- 导航栏 -->
    <van-nav-bar title="我的账号" left-text="返回" left-arrow @click-left="goBack" />

    <van-cell-group>
      <van-cell title="头像" is-link center class="van-cell">
        <template #default>
          <div class="portrait">
            <img :src="MyMsg.userImg" class="auto-img" alt />
          </div>
          <van-uploader class="van-uploader" :after-read="upload" />
        </template>
      </van-cell>
      <van-cell title="用户名" :value="MyMsg.nickName" is-link :to="{name: 'ModifyName'}" />
      <van-cell title="帐号密码" value="修改" is-link :to="{name: 'ModifyPassword'}" />
      <van-cell title="手机号" value="136****6245" is-link @click="changePhone" />
    </van-cell-group>
    <div class="btn">
      <van-button class="van-button" type="danger" block @click="cancellation">注销当前帐号</van-button>
      <van-button type="info" block @click="exit">退出当前帐号</van-button>
    </div>
    <van-dialog
      v-model="isShow"
      confirmButtonText="退出"
      @confirm="que"
      message="退出登录后将无法查看订单, 重新登录后即可查看"
      show-cancel-button
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { utils } from "../utils/utils";
import { Dialog } from "vant";

export default {
  name: "Personal",

  data() {
    return {
      isShow: false
    };
  },

  computed: {
    ...mapState("PersonalModules", ["MyMsg"])
  },

  created() {
    this.getUseInfo();
  },

  methods: {
    goBack() {
      this.$router.go(-1);

      this.$store.commit("changeData", {
        key: "pag",
        value: 3
      });
    },

    //获取用户信息
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

          this.$store.commit("PersonalModules/changeData", {
            key: "MyMsg",
            value: result.data.result[0]
          });
        })
        .catch(err => {
          this.$toast.clear();
        });
    },

    //上传头像
    upload(file) {
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
        url: "/updateAvatar",
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

          this.MyMsg.userImg = result.data.userImg;
        })
        .catch(err => {
          this.$toast.clear();
        });
    },

    //退出帐号
    exit() {
      this.isShow = true;
    },

    //确定
    que() {
      let tokenString = localStorage.getItem("_t");
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });
      this.axios({
        method: "POST",
        url: "/logout",
        data: {
          appkey: this.appKey,
          tokenString
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();

          localStorage.removeItem("_t");

          this.$router.push({ name: "isHot" });

          this.$store.commit("changeData", { key: "isLogin", value: false });

          this.$store.commit("changeData", {
            key: "pag",
            value: 0
          });
        })
        .catch(err => {
          this.$toast.clear();
        });
    },

    //注销
    cancellation() {
      Dialog.confirm({
        message: "注销后,当前账户所有信息将不可恢复,请谨慎操作",
        confirmButtonText: "注销"
      })
        .then(result => {
          //执行注销
          let tokenString = localStorage.getItem("_t");

          //加载提示
          this.$toast.loading({
            forbidClick: true,
            duration: 0,
            message: "加载中..."
          });

          this.axios({
            method: "POST",
            url: "/destroyAccount",
            data: {
              appkey: this.appKey,
              tokenString
            },
            transformRequest: utils.transformRequest
          })
            .then(result => {
              this.$toast.clear();

              localStorage.removeItem("_t");

              this.$router.push({ name: "isHot" });

              this.$store.commit("changeData", {
                key: "isLogin",
                value: false
              });

              this.$store.commit("changeData", {
                key: "pag",
                value: 0
              });
            })
            .catch(err => {
              this.$toast.clear();
            });
        })
        .catch(err => {});
    },

    //修改手机号
    changePhone() {
      this.$toast("没有修改端口,凑合着看吧!");
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  height: 100%;
  position: relative;
  background: #f0f0f0;

  .portrait {
    overflow: hidden;
    float: right;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  /deep/ .van-cell .van-cell__title {
    width: 150px;
  }

  .van-cell {
    position: relative;
  }

  /deep/ .van-uploader {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    .van-button {
      margin-top: 10px;
    }
  }
}
</style>