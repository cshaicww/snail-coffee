<template>
  <div class="myorder">
    <div class="orderTag">
      <van-tabs v-model="active" sticky :swipeable="true" color="#1989fa" @change="toggleTab">
        <van-tab v-for="(item1,index) in tabData" :key="index" :title="item1.title">
          <div v-if="allOrderData.length > 0" class="goods-box">
            <van-list
              v-model="loading"
              :finished="isFinished"
              finished-text="我是有底线的"
              @load="onLoad"
            >
              <div class="goods-cont" v-for="(item,index) in OrderData" :key="index">
                <div class="order">
                  <div class="clearfix">
                    <span class="order-text fl">{{item.oid}}</span>
                    <span class="time fr">{{item.orderTime}}</span>
                  </div>
                </div>
                <div class="goods">
                  <div class="item clearfix" v-for="(v,i) in item.data" :key="i">
                    <div class="goods-img fl">
                      <img class="auto-img" :src="v.smallImg" alt />
                    </div>
                    <div class="goods-details fl">
                      <div class="gs-mon clearfix">
                        <span class="gs-name fl">{{v.name}}</span>
                        <span class="gs-pri fr">{{v.price}}</span>
                      </div>
                      <div class="gs-spe clearfix">
                        <div class="spec fl">{{v.rule}}</div>
                        <div class="gs-count fr">x{{v.count}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pri-total clearfix">
                  <button
                    class="fl"
                    v-show="item.status == 1"
                    @click="confirmReceive(item.oid,index)"
                  >确认收货</button>
                  <div class="fl icon" v-show="item.status != 1">
                    <div>
                      <van-icon name="delete" size="16px" @click="removeOrderData(item.oid,index)" />
                    </div>
                  </div>
                  <div>
                    <span
                      class="order-type"
                    >{{item.status == 1 && item.status !=0 ? "待收货 " :"已收货 " }}</span>
                    <span class="text">共{{item.count}}件商品</span>
                    <span class="text">合计</span>
                    <span class="total">{{item.total}}</span>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
          
          <div v-else class="bg">
            <van-empty class="custom-image" >
              <template #image>
                <img src="../../assets/order.png" alt />
              </template>
              <template #description>
                <div v-if="isLogin">您还没有相关订单</div>
                <div v-else class="lg">请先 <span @click="goLogin">登录</span> , 即可查看相关订单</div>
              </template>

            </van-empty>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { utils } from "../../utils/utils";
import { mapState } from "vuex";

export default {
  name: "MyOrder",

  data() {
    return {
      active: "0",
      loading: false
    };
  },

  created() {
    //置空数据
    this.$store.commit("MyOrderModules/emptyData");

    //全部订单
    this.getOrder(0);
  },

  computed: {
    ...mapState("MyOrderModules", [
      "allOrderData",
      "tabData",
      "isFinished",
      "OrderData"
    ]),

    //查看是否登录
    isLogin(){
        return this.$store.state.isLogin;
    }
  },

  methods: {
    //商品数据懒加载
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        if (
          this.OrderData.length >= this.allOrderData.length ||
          this.allOrderData.length == 0
        ) {
          this.$store.commit("MyOrderModules/changeData", {
            key: "isFinished",
            value: true
          });

          return;
        }

        this.$store.commit("MyOrderModules/loadShopcartData");
      }, 1000);
    },

    //获取订单数据
    getOrder(status) {
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      let tokenString = localStorage.getItem("_t");

      this.axios({
        method: "GET",
        url: "/findOrder",
        params: {
          appkey: this.appKey,
          tokenString,
          status
        }
      })
        .then(result => {
          this.$toast.clear();

          this.$store.commit('changeData', {key: 'isLogin', value: result.data.code != 700});

          if (result.data.code == 700) {
            return;
          }

          //找到所有订单
          let orderOid = [];

          result.data.result.forEach(v => {
            if (orderOid.indexOf(v.oid) === -1) {
              orderOid.push(v.oid);
            }
          });

          //订单数据
          let orderData = [];

          orderOid.forEach(v => {
            //当前订单数据
            let nowOrderData = {
              oid: v,
              count: 0,
              total: 0,
              //单签订单的所有的商品数据
              data: []
            };

            result.data.result.forEach(item => {
              if (item.oid == v) {
                nowOrderData.data.push(item);
                nowOrderData.count += item.count;
                nowOrderData.total += parseInt(item.price) * item.count;
              }
            });

            //订单时间
            nowOrderData.orderTime = utils.formatDate(
              new Date(nowOrderData.data[0].createdAt),
              "yyyy-MM-dd hh:mm:ss"
            );

            nowOrderData.status = nowOrderData.data[0].status;

            orderData.unshift(nowOrderData);
          });

          this.$store.commit("MyOrderModules/changeData", {
            key: "allOrderData",
            value: orderData
          });

          
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //确认收货
    confirmReceive(oid, index) {
      let tokenString = localStorage.getItem("_t");

      this.axios({
        method: "POST",
        url: "/receive",
        data: {
          appkey: this.appKey,
          tokenString,
          oid
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.allOrderData[index].status = 2;

          if (this.active == 1) {
            this.$store.commit("MyOrderModules/removeData", index);
          }
        })
        .catch(err => {
          
        });
    },

    //切换
    toggleTab(status) {
      

      this.$store.commit("MyOrderModules/emptyData");

      this.onLoad();

      this.getOrder(status);
    },

    //删除订单
    removeOrderData(oid, index) {
      let tokenString = localStorage.getItem("_t");

      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        method: "POST",
        url: "/removeOrder",
        params: {
          appkey: this.appKey,
          tokenString,
          oid
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();
          
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //登录
    goLogin(){
      this.$router.push({name: 'Login'})

      this.$store.commit('changeData',{
        key:'pag',
        value: 0
      })
    }
  }
};
</script>

<style lang="less" scoped>
.myorder {
  height: 100%;
  background: #f5f5f5;

  .orderTag {
    height: 100%;
    overflow-y: auto;

    .bg{
      padding-top: 114.05px;

      .lg{
        >span{
          color: #1989fa;
          text-decoration: underline;
        }
      }
    }
  }

  .goods-box {
    margin-top: 20px;
    padding: 0px 10px 20px;
    overflow: hidden;
  }
  .goods-cont {
    margin-bottom: 20px;
    background: #ffffff;

    .goods {
      padding: 10px 0px;

      .item {
        padding: 10px;

        .goods-img {
          width: 60px;
          height: 60px;
        }

        .goods-details {
          margin-left: 10px;
          height: 60px;
          width: calc(~"100% - 70px");
          position: relative;

          .gs-mon {
            height: 20px;
            line-height: 20px;

            .gs-name {
              font-weight: 700;
              font-size: 16px;
            }

            .gs-pri {
              font-size: 14px;

              &::before {
                content: "￥";
                font-size: 12px;
              }
            }
          }

          .gs-spe {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 20px;
            line-height: 20px;

            .spec {
              color: #bab8c4;
            }

            .gs-count {
              color: #bab8c4;
            }
          }
        }
      }
    }
  }

  .pri-total {
    > div:not(button) {
      border-top: 1px solid #d5d5d5;
      width: calc(~"100% - 20px");
      padding: 5px 0px;
      margin: 0 auto;
      text-align: right;
      font-size: 14px;
      height: 26px;
      line-height: 26px;

      .total {
        font-size: 20px;
        font-weight: 700;
      }

      .total::before {
        content: " ￥";
        font-size: 12px;
      }

      .order-type {
        color: #1989fa;
      }
    }
    .icon {
      margin-left: 10px;
      width: 18px;
      position: relative;

      > div {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    button {
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      border: 0;
      outline: none;
      color: white;
      margin-top: 8.5px;
      background: #1989fa;
      padding: 0 6px;
      margin-left: 10px;
    }
  }

  .order {
    > div {
      border-bottom: 1px solid #d5d5d5;
      width: calc(~"100% - 20px");
      padding: 5px 0px;
      margin: 0 auto;
      text-align: left;
      font-size: 14px;
      height: 26px;
      line-height: 26px;
    }
  }
}
</style>