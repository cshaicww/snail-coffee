<template>
  <div class="mylike">
    <!-- 导航栏 -->
    <van-nav-bar title="我的收藏" left-text="返回" left-arrow :fixed="true" @click-left="goBack" />

    <div v-if="MyLikeData.length > 0" class="like-box clearfix">
      <div
        class="item"
        :class="[index % 2 == 0 ? 'a' : 'b']"
        v-for="(item,index) in MyLikeData"
        :key="index"
        @click="goPage(item.pid)"
      >
        <div class="img">
          <img :src="item.smallImg" alt class="auto-img" />
        </div>
        <div class="like-details">
          <div class="like-name">{{item.name}}</div>
          <div class="de-bot clearfix">
            <div class="like-pirce fl">{{item.price}}</div>
            <div class="removelike fr">
              <van-icon
                class-prefix="icon"
                name="xin1"
                class="van-icon"
                color="#e4393c"
                @click.stop="removelike(item.pid,index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg">
      <van-empty class="custom-image">
        <template #image>
          <img src="../assets/mylike.png" alt />
        </template>
        <template #description>
          <div v-if="isLogin">您的还没有收藏商品 , 快去逛逛吧!</div>
          <div v-else class="lg">
            请先
            <span @click="goLogin">登录</span> , 即可查看相关收藏
          </div>
        </template>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { utils } from "../utils/utils";

import { mapState } from "vuex";

export default {
  name: "MyLike",

  created() {
    //加载提示
    this.$toast.loading({
      forbidClick: true,
      duration: 0,
      message: "处理中..."
    });

    this.getMyLikeData();
  },

  computed: {
    ...mapState("MyLikeModules", ["MyLikeData"]),

    //查看是否登录
    isLogin() {
      return this.$store.state.isLogin;
    }
  },

  methods: {
    //获取收藏商品数据
    getMyLikeData() {
      let tokenString = localStorage.getItem("_t");

      //初始化数据
      this.axios({
        method: "GET",
        url: "/findAllLike",
        params: {
          appkey: this.appKey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();

          if (result.data.code == 2000) {
            this.$store.commit("MyLikeModules/changeData", {
              key: "MyLikeData",
              value: result.data.result
            });
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    goPage(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },

    //删除收藏商品数据
    removelike(pid, index) {
      let tokenString = localStorage.getItem("_t");

      this.$toast({
        message: "取消收藏成功"
      });

      this.axios({
        method: "POST",
        url: "/notlike",
        data: {
          appkey: this.appKey,
          tokenString,
          pid
        },

        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$store.commit("MyLikeModules/removeMylikeData", index);
        })
        .catch(err => {
          
        });
    },

    //返回上一级
    goBack() {
      this.$router.go(-1);
    },

    //登录
    goLogin() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="less" scoped>
.mylike {
  height: 100%;
  overflow-y: auto;
  background: #f0f0f0;

  .bg {
    padding-top: 158.05px;

    .lg {
      > span {
        color: #1989fa;
        text-decoration: underline;
      }
    }
  }

  .like-box {
    margin-top: 46.01px;
    padding: 10px 5px 0px;

    .item {
      border-radius: 5px;
      width: calc(~"100% / 2 - 5px");
      background: #ffffff;
      margin-bottom: 10px;
      padding: 10px 0px;
      float: left;

      &.a {
        margin-right: 5px;
      }

      &.b {
        margin-left: 5px;
      }

      .img {
        margin: 0 auto;
        width: 160px;
        height: 160px;
      }

      .like-details {
        width: 160px;
        margin: 5px auto;

        .like-name {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .de-bot {
          .like-pirce {
            font-size: 14px;
            color: #0082cf;
            height: 20px;
            line-height: 20px;

            &::before {
              font-size: 12px;
              content: "￥";
            }
          }
        }
      }
    }
  }

  /deep/ .custom-image .van-empty__image {
    width: 170px;
    height: 160px;
  }
}
</style>