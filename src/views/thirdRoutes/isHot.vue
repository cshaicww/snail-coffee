<template>
  <div class="isHot">
    <div class="newbaer">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgData" :key="index">
          <img :src="item.bannerImg" alt class="auto-img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="tabber-items">
      <div
        class="item clearfix"
        v-for="(item,index) in goodsData"
        :key="index"
        @click="goDetail(item.pid)"
      >
        <div class="l-img fl">
          <img :src="item.smallImg" alt class="auto-img" />
        </div>
        <div class="r-cont fl">
          <div class="title">
            <div class="tag">{{item.name}}</div>
            <div class="en">{{item.enname}}</div>
          </div>
          <div class="spec clearfix">
            <div class="l-money fl">{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "isHot",

  created() {
    this.$store.commit("ClassifyModules/emptyGoodsData");

    //加载提示
    this.$toast.loading({
      forbidClick: true,
      duration: 0,
      message: "加载中..."
    });
    //重置

    //初始化页面数据
    //获取banner图
    this.getBanner();
  },

  computed: {
    imgData() {
      return this.$store.state.ClassifyModules.isHotModules.imgData;
    },

    goodsData() {
      return this.$store.getters["ClassifyModules/isHotModules/goodsData"];
    }
  },

  methods: {
    goDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });

      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });
    },

    getBanner() {
      this.axios({
        method: "GET",

        url: "/banner",

        params: {
          appkey: this.appKey
        }
      })
        .then(result => {
          if (result.data.code == 300) {
            //把数据缓存到本地
            localStorage.setItem(
              "BannerImgData",
              JSON.stringify(result.data.result)
            );

            this.$store.commit("ClassifyModules/isHotModules/changeImgData", {
              key: "imgData",
              value: result.data.result
            });
          }
        })
        .catch(() => {
          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.isHot {
  height: 100%;
  overflow-y: auto;
  .newbaer {
    width: calc(100% - 10px);
    margin-left: 5px;
    margin-top: 5px;
  }

  .tabber-items {
    margin-top: 6px;
    padding: 5px;

    .item {
      border-radius: 5px;
      background: #f8f8f8;
      padding: 10px 10px;
      height: 80px;
      margin-bottom: 6px;

      .l-img {
        height: 80px;
        width: 80px;
      }

      .r-cont {
        height: 100%;
        position: relative;
        margin-left: 6px;
        width: calc(100% - 92px);

        .title {
          .tag {
            font-size: 16px;
            margin-bottom: 4px;
            font-weight: 700;
          }
          .en {
            color: #a99a9a;
          }
        }
        .spec {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          line-height: 26px;

          .l-money {
            color: #e4393c;
            font-size: 14px;

            &::before {
              content: "￥";
              font-size: 12px;
            }
          }

          .r-spec {
            width: 60px;
            text-align: center;
            background: #0082cf;
            color: white;
            border-radius: 13px;
          }
        }
      }
    }
  }
}
</style>