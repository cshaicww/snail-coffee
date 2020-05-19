<template>
  <div class="myaddress">
    <!-- 导航栏 -->
    <van-nav-bar title="我的收货地址" left-text="返回" left-arrow :fixed="true" @click-left="goBack" />

    <div class="address-box">
      <van-address-list
        v-model="chosenAddressId"
        :list="addressListData"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        :switchable="false"
      />
    </div>
    <div class="bg" v-show="addressListData.length==0">
      <van-empty class="custom-image" description="您还没有收货地址,快去填写吧!">
        <template #image>
          <img src="../assets/myaddress.png" alt />
        </template>
        <template #description>
          <div v-if="isLogin">您还没有收货地址 , 快去填写吧!</div>
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
  name: "MyAddress",

  data() {
    return {
      chosenAddressId: "0"
    };
  },

  created() {
    this.$toast.loading({
      forbidClick: true,
      duration: 0,
      message: "加载中..."
    });

    let tokenString = localStorage.getItem("_t");

    let index = null;

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

            if (o.isDefault) {
              list.unshift(o);
              this.chosenAddressId = o.id;
              index = o.id;
            } else {
              list.push(o);
            }
          });

          this.$store.commit("MyAddressModules/changeData", {
            key: "addressListData",
            value: list
          });
        }
      })
      .catch(err => {
        this.$toast.clear();
        
      });

    this.chosenAddressId = index;
  },

  computed: {
    ...mapState("MyAddressModules", ["addressListData"]),

     //查看是否登录
    isLogin() {
      return this.$store.state.isLogin;
    }
  },

  methods: {
    //返回上一级
    goBack() {
      this.$router.go(-1);

       
    },

    //新增地址
    onAdd() {

      if(!this.isLogin){
        this.$toast('请先登录')
        return
      }

      this.$router.push({ name: "NewAddress", query: { isAdd: 1 } });
    },

    //编制地址
    onEdit(item) {
      this.$router.push({
        name: "NewAddress",
        query: { isAdd: 0, aid: item.aid }
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
.myaddress {
  height: 100%;
  overflow-y: auto;
  background: #f5f5f5;

  .bg {

    /deep/ .custom-image .van-empty__image {
      width: 160px;
      height: 160px;
    }

     .lg {
      > span {
        color: #1989fa;
        text-decoration: underline;
      }
    }
  }

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
  }

  .address-box {
    margin-top: 46px;
  }

  .editor {
    width: 22px;
    height: 46.8px;
    position: relative;

    > div {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>