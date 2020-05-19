<template>
  <div class="shopcart">
    <van-nav-bar title="购物车" :right-text="isEditor ? '完成': '管理'" @click-right="operation" />

    <div v-if="allShopcartData.length > 0">
      <div class="tabber-items">
        <van-list v-model="loading" :finished="isFinished" :finished-text="len" @load="onLoad">
          <div class="item clearfix" v-for="(item,index) in shopcartData" :key="index">
            <div class="check fl">
              <van-checkbox
                checked-color="#0082cf"
                class="van-checkbox"
                v-model="item.isChecked"
                @change="simpleSelect(item)"
              ></van-checkbox>
            </div>
            <div class="l-img fl" @click="goPage(item.pid)">
              <img :src="item.small_img" alt class="auto-img" />
            </div>
            <div class="r-cont fl">
              <div class="title">
                <div class="tag">
                  {{item.name}}
                  <span>{{item.rule}}</span>
                </div>
                <div class="en">{{item.enname}}</div>
              </div>
              <div class="spec clearfix">
                <div class="l-money fl">{{item.price}}</div>
                <div class="sum fr clearfix">
                  <div class="jian sum-btn fl">
                    <van-icon class-prefix="icon" name="delete01" @click="decrease(item)" />
                  </div>
                  <div class="inp fl">
                    <input type="text" disabled v-model="item.count" />
                  </div>
                  <div class="add sum-btn fl">
                    <van-icon class-prefix="icon" name="new01" @click="increase(item)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>

      <!-- 提交订单情况 -->
      <van-submit-bar
        v-show="!isEditor"
        button-text="去结算"
        class="van-submit-bar"
        :price="total"
        :safe-area-inset-bottom="true"
        @submit="goSubmitOrder"
        button-type="info"
      >
        <van-checkbox checked-color="#0082cf" v-model="isAllSelect" @click="allSelect">全选</van-checkbox>
      </van-submit-bar>

      <!-- 编辑情况 -->
      <van-submit-bar
        v-show="isEditor"
        button-text="删除"
        class="van-submit-bar ss"
        :safe-area-inset-bottom="true"
        @submit="removeMoreShopcart"
        button-type="info"
      >
        <van-checkbox checked-color="#0082cf" v-model="isAllSelect" @click="allSelect">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <div class="bg" v-else>
      <van-empty class="custom-image">
        <template #image>
          <img src="../../assets/shopcart.png" alt />
        </template>
        <template #description>
          <div v-if="isLogin">您的购物车为空 , 快去逛逛吧!</div>
          <div v-else class="lg">
            请先
            <span @click="goLogin">登录</span> , 即可查看购物车
          </div>
        </template>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { utils } from "../../utils/utils";

export default {
  name: "Shopcart",

  data() {
    return {
      loading: false,
      isAllSelect: false
    };
  },

  created() {
    //重置数据
    this.$store.commit("ShopcartModules/emptyData");

    //获取购物车所有商品
    this.getAllShopcartProduct();
  },

  computed: {
    ...mapState("ShopcartModules", [
      "shopcartData",
      "isFinished",
      "count",
      "allShopcartData",
      "isEditor",
      "total"
    ]),

    len() {
      return this.allShopcartData.length >= 5 ? "没有更多商品了" : "";
    },

    //查看是否登录
    isLogin(){
        return this.$store.state.isLogin;
    }
  },

  methods: {
    //跳转详情页
    goPage(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },

    //切换操作类型 管理编辑
    operation() {
      this.$store.commit("ShopcartModules/changeData", {
        key: "isEditor",
        value: !this.isEditor
      });
    },

    //商品数据懒加载
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        if (this.shopcartData.length >= this.allShopcartData.length) {
          this.$store.commit("ShopcartModules/changeData", {
            key: "isFinished",
            value: true
          });

          return;
        }

        this.$store.commit("ShopcartModules/loadShopcartData");
        this.isAllSelect = false;
      }, 1000);
    },

    //获取购物车所有商品
    getAllShopcartProduct() {
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      //获取token字符串
      let tokenString = localStorage.getItem("_t");

      this.axios({
        method: "GET",
        url: "/findAllShopcart",
        params: {
          appkey: this.appKey,
          tokenString
        }
      })
        .then(result => {
          this.$toast.clear();

           this.$store.commit('changeData', {key: 'isLogin', value: result.data.code != 700});

          if (result.data.code == 700) {
            return;
          }

          if (result.data.code == 5000) {
            //添加判断勾选的属性
            result.data.result.forEach(v => {
              v.isChecked = false;
            });

            this.$store.commit("ShopcartModules/changeData", {
              key: "allShopcartData",
              value: result.data.result
            });
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //修改购物车商品数量
    modifyShopcartCount(sid, count) {
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "处理中..."
      });

      //获取token字符串
      let tokenString = localStorage.getItem("_t");

      this.axios({
        method: "POST",
        url: "/modifyShopcartCount",
        data: {
          appkey: this.appKey,
          tokenString,
          sid,
          count
        },
        transformRequest: utils.transformRequest
      })
        .then(result => {
          this.$toast.clear();
          this.sum();
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //增加商品数量
    increase(item) {
      ++item.count;

      this.modifyShopcartCount(item.sid, item.count);
    },

    //减少商品数量
    decrease(item) {
      if (item.count == 1) {
        return;
      }

      --item.count;

      this.modifyShopcartCount(item.sid, item.count);
    },

    //全选
    allSelect() {
      this.shopcartData.forEach(v => {
        v.isChecked = !this.isAllSelect;
      });
    },

    //单选
    simpleSelect(item) {
      this.sum();

      if (!item.isChecked) {
        this.isAllSelect = false;
        return;
      }

      for (let i = 0; i < this.shopcartData.length; i++) {
        if (!this.shopcartData[i].isChecked) {
          this.isAllSelect = false;

          return;
        }
      }

      this.isAllSelect = true;
    },

    //删除商品 假删除
    removeShopcart(sids) {
      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "处理中..."
      });

      //获取token字符串
      let tokenString = localStorage.getItem("_t");

      return this.axios({
        method: "POST",
        url: "/deleteShopcart",
        data: {
          appkey: this.appKey,
          tokenString,
          sids
        },

        transformRequest: utils.transformRequest
      });
    },

    //删除多个商品
    removeMoreShopcart() {
      let sids = [];
      this.shopcartData.forEach(v => {
        if (v.isChecked) {
          sids.push(v.sid);
        }
      });

      if (sids.length == 0) {
        this.$toast({
          message: "您还没有选择商品"
        });

        return;
      }

      this.removeShopcart(JSON.stringify(sids))
        .then(result => {
          this.$store.commit("ShopcartModules/removeShopcartData", sids);
          if (this.isAllSelect) {
            this.isAllSelect = false;
            this.onLoad();
          }
          this.sum();
          this.$toast.clear();
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },

    //计算总和
    sum() {
      let total = 0;

      this.shopcartData.forEach(v => {
        if (v.isChecked) {
          total += v.price * v.count * 100;
        }
      });

      this.$store.commit("ShopcartModules/changeData", {
        key: "total",
        value: total
      });
    },

    //提交订单
    goSubmitOrder() {
      
      let isYes = false;

      for (let i = 0; i < this.shopcartData.length; i++) {
        if (this.shopcartData[i].isChecked) {
          isYes = true
          break
        }

        isYes = false;
      }

      if(isYes){

        let sids = [];
        this.shopcartData.forEach(v => {
          if (v.isChecked) {
            sids.push(v.sid);
          }
        });
  
        this.$router.push({
          name: "SubmitOrder",
          query: { sids: sids.join("-") }
        });
      }else{
        this.$toast('您还没有选择商品')
      }

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
.shopcart {
  height: 100%;
  background: #f0f0f0;

  .bg {
    padding-top: 112.05px;

    .lg{
        >span{
          color: #1989fa;
          text-decoration: underline;
        }
      }
  }

  .tabber-items {
    height: calc(100% - 105.63px);
    overflow-y: auto;
    padding: 8px;

    .item {
      border-radius: 5px;
      background: #f8f8f8;
      padding: 10px 10px;
      height: 80px;
      margin-bottom: 6px;

      .check {
        width: 20px;
        height: 100%;
        margin-right: 10px;
        position: relative;

        .van-checkbox {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .l-img {
        height: 80px;
        width: 80px;
      }

      .r-cont {
        height: 100%;
        position: relative;
        margin-left: 6px;
        width: calc(100% - 116px);

        .title {
          .tag {
            font-size: 16px;
            margin-bottom: 4px;
            font-weight: 700;

            > span {
              margin-left: 10px;
              font-size: 12px;
              font-weight: 400;
            }
          }
          .en {
            color: #757474;
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
                background: #f8f8f8;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  .van-submit-bar {
    margin-bottom: 50.03px;
    background: #fbfbfb;

    &.ss {
      .van-checkbox {
        margin-right: auto;
      }
    }
  }

  /deep/ .custom-image .van-empty__image {
    width: 182px;
    height: 160px;
  }
}
</style>