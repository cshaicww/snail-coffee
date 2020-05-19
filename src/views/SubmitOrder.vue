<template>
  <div class="submitorder">
    <!-- /导航栏 -->
    <van-nav-bar title="提交订单" left-text="返回" left-arrow :fixed="true" @click-left="back" />

    <div class="content-box">
      <div class="address">
        <van-cell is-link center class="van-cell-aa" @click="choose">
          <template #title v-show="isHasAddress">
            <div class="clearfix">
              <span class="name fl">{{defaultAddress.name}}</span>
              <span class="tel fl">{{defaultAddress.tel}}</span>
              <span class="tag fl">
                <van-tag v-show="defaultAddress.isDefault" type="primary">默认</van-tag>
              </span>
            </div>
            <div v-show="!isHasAddress">您还没有收获地址,请先添加收货地址</div>
          </template>
          <template #label v-show="isHasAddress">
            <span class="potations">{{defaultAddress.address}}</span>
          </template>
        </van-cell>

        <van-action-sheet v-model="show" title="选择收货地址" :round="false">
          <div class="address-box">
            <van-address-list
              v-model="chosenAddressId"
              :list="AddressData"
              default-tag-text="默认"
              @add="onAdd"
              @edit="onEdit"
              @select="addressSele"
            />
          </div>
        </van-action-sheet>
      </div>

      <div class="goods-cont">
        <div class="goods">
          <div class="item clearfix" v-for="(item,index) in orederData" :key="index">
            <div class="goods-img fl">
              <img class="auto-img" :src="item.small_img" alt />
            </div>
            <div class="goods-details fl">
              <div class="gs-mon clearfix">
                <span class="gs-name fl">{{item.name}}</span>
                <span class="gs-pri fr">{{item.price}}</span>
              </div>
              <div class="gs-spe clearfix">
                <div class="spec fl">{{item.rule}}</div>
                <div class="gs-count fr">x{{item.count}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pri-total">
          <div>
            <span class="text">共{{orederDesc.count}}件商品</span>
            <span class="text">合计</span>
            <span class="total">{{orederDesc.total}}</span>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar
      :price="orederDesc.total * 100"
      button-type="info"
      button-text="提交订单"
      @submit="commitOrder"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { utils } from "../utils/utils";

export default {
  name: "SubmitOrder",

  data() {
    return {
      show: false,
      chosenAddressId: "0"
    };
  },

  created() {
    this.$toast.loading({
      forbidClick: true,
      duration: 0,
      message: "加载中..."
    });

    //初始化
    this.$store.commit("SubmitOrderModules/emptyData");

    let sids = this.$route.query.sids.split("-");

    this.$store.commit("SubmitOrderModules/changeData", {
      key: "sids",
      value: sids
    });

    //初始化地址数据
    this.addressData();

    //查询要结算的商品
    this.findBuyProduct(sids);
  },

  computed: {
    ...mapState("SubmitOrderModules", [
      "AddressData",
      "defaultAddress",
      "orederData",
      "orederDesc",
      "isHasAddress",
      "sids"
    ])
  },

  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);

      this.$store.commit("changeData", {
        key: "pag",
        value: 2
      });
    },

    //选择地址
    choose() {
      if (this.isHasAddress) {
        this.show = true;
      } else {
        this.show = false;
        this.onAdd();
      }
    },

    //新增地址
    onAdd() {
      this.$router.push({ name: "NewAddress", query: { isAdd: 1 } });
    },

    //编制地址
    onEdit(item) {
      this.$router.push({
        name: "NewAddress",
        query: { isAdd: 0, aid: item.aid }
      });
    },

    //初始化地址数据
    addressData() {
      let tokenString = localStorage.getItem("_t");

      this.axios({
        method: "GET",
        url: "/findAddress",
        params: {
          appkey: this.appKey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();

          if (result.data.code == 20000) {
            if (result.data.result.length == 0) {
              this.$store.commit("SubmitOrderModules/changeData", {
                key: "isHasAddress",
                value: false
              });

              return;
            }

            this.$store.commit("SubmitOrderModules/changeData", {
              key: "isHasAddress",
              value: true
            });

            let list = [];

            result.data.result.forEach((v, i) => {
              let o = {
                id: i + "",
                aid: v.aid,
                name: v.name,
                tel: v.tel,
                address: v.province + v.city + v.county + v.addressDetail,
                isDefault: Boolean(v.isDefault)
              };

              this.$store.commit("SubmitOrderModules/changeData", {
                key: "AddressData",
                value: list
              });

              if (o.isDefault) {
                list.unshift(o);
                this.chosenAddressId = o.id;
                this.$store.commit("SubmitOrderModules/changeData", {
                  key: "defaultAddress",
                  value: o
                });
              } else {
                list.push(o);
                this.$store.commit("SubmitOrderModules/changeData", {
                  key: "defaultAddress",
                  value: this.AddressData[0]
                });
                this.chosenAddressId = "0";
              }
            });
          }
        })
        .catch(err => {
          this.$toast.clear();
        });
    },

    //根据sid查询需要购买的商品
    findBuyProduct(sids) {
      let tokenString = localStorage.getItem("_t");

      this.axios({
        type: "GET",
        url: "/commitShopcart",
        params: {
          appkey: this.appKey,
          tokenString,
          sids: JSON.stringify(sids)
        }
      })
        .then(result => {
          if (result.data.code == 50000) {
            this.orederDesc.total = 0;
            this.orederDesc.count = 0;

            result.data.result.forEach(v => {
              this.orederDesc.total += parseInt(v.price) * v.count;
              this.orederDesc.count += v.count;
            });

            this.$store.commit("SubmitOrderModules/changeData", {
              key: "orederData",
              value: result.data.result
            });
          }
        })
        .catch(err => {});
    },

    //选择地址
    addressSele(item) {
      {
        //
        //

        this.$store.commit("SubmitOrderModules/changeData", {
          key: "defaultAddress",
          value: item
        });

        this.show = false;
      }
    },

    //提交订单
    commitOrder() {
      if (!this.isHasAddress) {
        this.$toast("您还没有收货地址");
        return;
      }

      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      let tokenString = localStorage.getItem("_t");

      let sids = this.sids.concat();

      this.axios({
        method: "POST",
        url: "/pay",
        data: {
          appkey: this.appKey,
          tokenString,
          sids: JSON.stringify(sids),
          phone: this.defaultAddress.tel,
          receiver: this.defaultAddress.name,
          address: this.defaultAddress.address
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();

          this.$router.push({ name: "MyOrder" });

          this.$store.commit("changeData", {
            key: "pag",
            value: 1
          });
        })
        .catch(err => {
          this.$toast.clear();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.submitorder {
  height: 100%;
  background: #f5f5f5;

  /deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #1989fa;
    border-color: #1989fa;
  }

  /deep/ .van-button--danger {
    background-color: #1989fa;
    border-color: #1989fa;
  }

  /deep/ .van-tag--danger {
    background-color: #1989fa;
    border-radius: 0%;
  }

  .content-box {
    padding: 55.6px 10px 60.03px;

    .address {
      .van-cell-aa {
        box-shadow: 0px 0px 6px 0px #cccbcb;

        > div {
          > span {
            float: left;
          }
        }
        .name {
          margin-right: 6px;
        }
        .tel {
          margin-right: 6px;
        }
        .tag {
          margin-top: -1.8px;
        }
      }
    }

    .goods-cont {
      margin-top: 10px;
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
      > div {
        border-top: 1px solid #d5d5d5;
        width: calc(~"100% - 20px");
        padding: 5px 0px;
        margin: 0 auto;
        text-align: right;
        font-size: 20px;
        font-weight: 700;
        height: 26px;
        line-height: 26px;

        .text {
          font-size: 14px;
          font-weight: 400;
        }

        .total::before {
          content: " ￥";
          font-size: 12px;
        }
      }
    }
  }

  .van-submit-bar__price {
    color: #165dad;
  }
}
</style>