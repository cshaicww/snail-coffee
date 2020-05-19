<template>
  <div class="detail">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow :fixed="true" @click-left="back" />

    <div class="cont-box">
      <div class="img">
        <img :src="detailData.large_img" class="auto-img" alt />
      </div>
      <div class="cont">
        <!-- 标题 -->
        <div class="tag clearfix">
          <div class="title fl">{{detailData.name}}</div>
          <div class="like fr">
            <van-icon
              class-prefix="icon"
              name="xin1"
              class="van_icon"
              :class="{active: isLike}"
              @click="like"
            />
          </div>
        </div>

        <div class="details">
          <!-- 规格 -->
          <div class="specifications">
            <div class="item clearfix" v-for="(item,index) in rules" :key="index">
              <span class="first">{{item.title}}</span>
              <span
                :class="{active:value.isActive}"
                v-for="(value,i) in item.data"
                :key="i"
                @click="toggle(item,value)"
              >{{value.text}}</span>
            </div>
          </div>

          <div class="describe">
            <div>商品描述:</div>
            <p v-for="(item,index) in desc" :key="index">{{item}}</p>
          </div>
          <!-- 数量 -->
          <div class="total clearfix">
            <div class="price fl">{{detailData.price}}</div>
            <div class="sum fr clearfix">
              <div class="jian sum-btn fl">
                <van-icon class-prefix="icon" name="delete01" @click="jian" />
              </div>
              <div class="inp fl">
                <input type="text" v-model="count" disabled />
              </div>
              <div class="add sum-btn fl">
                <van-icon class-prefix="icon" name="new01" @click="add" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加入购物车 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="shopcartTotal == 0 ? '' : shopcartTotal >= 100 ? '99+' : shopcartTotal"
        @click="goShopcart"
      />
      <van-goods-action-button
        type="warning"
        color="rgb(69, 167, 224)"
        text="加入购物车"
        @click="addShopcar"
      />
      <van-goods-action-button type="danger" color="#0082cf" text="立即购买"
      @click="buy" />
    </van-goods-action>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { utils } from "../utils/utils";

export default {
  name: "Detail",

  created() {
    //置空
    this.$store.commit("DetailModules/emptyData");

    let pid = this.$route.params.pid;

    this.axios({
      method: "GET",
      url: "/productDetail",
      params: {
        appkey: this.appKey,
        pid
      }
    })
      .then(result => {
        //关闭加载提示
        this.$toast.clear();

        if (result.data.code == 600) {
          this.$store.commit(
            "DetailModules/changeDetailData",
            result.data.result[0]
          );

          //查看收藏商品
          this.findlike();

          //获取商品数量
          this.shopcartRows();
        }
      })
      .catch(err => {
        
        //关闭加载提示
        this.$toast.clear();
      });
  },

  computed: {
    ...mapState("DetailModules", [
      "detailData",
      "rules",
      "desc",
      "count",
      "isLike",
      "shopcartTotal"
    ]),
  },

  methods: {
    add() {
      let count = this.count + 1;

      this.$store.commit("DetailModules/changeData", {
        key: "count",
        value: count
      });
    },

    jian() {
      if (this.count == 1) {
        return;
      }

      let count = this.count - 1;

      this.$store.commit("DetailModules/changeData", {
        key: "count",
        value: count
      });
    },

    toggle(item, value) {
      if (value.isActive) {
        return;
      }

      for (let i = 0; i < item.data.length; i++) {
        if (item.data[i].isActive) {
          item.data[i].isActive = false;
          break;
        }
      }

      value.isActive = true;
    },

    findlike() {
      let toKenString = localStorage.getItem('_t');

      this.axios({
        method: "GET",
        url: "/findlike",
        params: {
          appkey: this.appKey,
          pid: this.detailData.pid,
          tokenString: toKenString
        }
      })
        .then(result => {
          if (result.data.code == 1000) {
            //修改isLike
            this.$store.commit("DetailModules/changeData", {
              key: "isLike",
              value: result.data.result.length > 0
            });
          }
        })
        .catch(err => {
          
        });
    },

    like() {
      let tokenString = localStorage.getItem('_t');

      let url = this.isLike ? "/notlike" : "/like";

      this.axios({
        method: "POSt",
        url,
        data: {
          appkey: this.appKey,
          pid: this.detailData.pid,
          tokenString
        },

        transformRequest: utils.transformRequest
      })
        .then(result => {
          //加载提示
          this.$toast({
            message: result.data.msg
          });

          if(result.data.code == 700){
            this.$toast('请先登录,即可收藏')
            return
          }

          this.$store.commit("DetailModules/changeData", {
            key: "isLike",
            value: !this.isLike
          });
        })
        .catch(err => {
          
        });
    },

    //加入购物车
    addShopcar(type) {
      if (type == "buy") {
        this.$toast.loading({
          forbidClick: true,
          duration: 0,
          message: "加载中..."
        });
      }

      let tokenString = localStorage.getItem('_t');

      //获取商品规格
      let ruleData = [];

      this.rules.forEach(v => {
        for (let i = 0; i < v.data.length; i++) {
          if (v.data[i].isActive) {
            ruleData.push(v.data[i].text);
            break;
          }
        }
      });

      this.axios({
        method: "POST",
        url: "/addShopcart",
        data: {
          appkey: this.appKey,
          count: this.count,
          pid: this.detailData.pid,
          rule: ruleData.join("/"),
          tokenString
        },

        transformRequest: utils.transformRequest
      })
        .then(result => {

          if(result.data.code == 700){
            this.$toast('请先登录')
            return
          }

          //加载提示
          if(type == 'buy'){
            this.$toast.clear()
          }else{
            this.$toast({
              message: result.data.msg
            });
          }

          if (result.data.code == 3000) {
            if (result.data.status == 1) {
              this.$store.commit("DetailModules/changeData", {
                key: "shopcartTotal",
                value: this.shopcartTotal + 1
              });

            }
            if(type == 'buy'){
              this.$router.push({name: 'SubmitOrder',query: {sids: result.data.sid}})
            }
          }
        })
        .catch(err => {
          
        });
    },

    //立即购买
    buy() {
      this.addShopcar('buy')
    },

    //获取购物车总商品数量
    shopcartRows() {
      let tokenString = localStorage.getItem('_t');

      this.axios({
        method: "GET",
        url: "/shopcartRows",
        params: {
          appkey: this.appKey,
          tokenString
        }
      })
        .then(result => {
          

          if (result.data.code == 8000) {
            this.$store.commit("DetailModules/changeData", {
              key: "shopcartTotal",
              value: result.data.result
            });
          }
        })
        .catch(err => {
          
        });
    },

    //返回
    back() {
      this.$router.go(-1);
    },

    goShopcart() {
      this.$router.push({ name: "Shopcart" });

      this.$store.commit('changeData',{
        key:'pag',
        value: 2
      })
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  height: 100%;
  background: #f0f0f0;
  position: relative;

  .cont-box {
    position: absolute;
    top: 46px;
    left: 0;
    height: calc(100% - 96.04px);
    overflow-y: auto;
    background: #f0f0f0;

    .cont {
      padding: 10px 10px 0px;

      .tag {
        font-size: 20px;
        padding: 5px 10px;

        .title {
          font-weight: 700;
          line-height: 30px;
        }

        .like {
          height: 30px;
          overflow: hidden;

          .van_icon {
            margin-top: 3px;
            font-size: 24px;

            &.active {
              color: #e4393c;
            }
          }
        }
      }

      .details {
        padding: 20px 10px 10px;

        .specifications {
          .item {
            margin-bottom: 20px;

            > span {
              float: left;
              height: 30px;
              line-height: 30px;
              margin-right: 20px;
            }

            > span.first {
              width: 32px;
              font-size: 16px;
            }

            > span:last-child {
              margin-right: 0;
            }

            > span:not(.first) {
              width: 80px;
              border: 1px solid #000000;
              box-sizing: border-box;
              text-align: center;
              border-radius: 4px;

              &.active {
                color: #0082cf;
                border-color: #0082cf;
                background: rgba(173, 218, 240, 0.5);
              }
            }
          }
        }

        .describe {
          border-bottom: 1px solid #d6cccc;

          > div {
            font-size: 14px;
          }

          p {
            color: #6e6e6e;
          }
        }

        .total {
          padding: 10px 0px;
          border-bottom: 1px solid #d6cccc;

          .price {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #e4393c;

            &::before {
              content: "￥";
            }
          }

          .sum {
            > .sum-btn {
              width: 24px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              color: white;
              background: #0082cf;
              border-radius: 50%;
            }

            > .inp {
              width: 24px;
              height: 24px;
              margin: 0px 8px;

              > input {
                display: block;
                width: 24px;
                height: 24px;
                border: 0;
                text-align: center;
                color: #0082cf;
                background: #f0f0f0;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>