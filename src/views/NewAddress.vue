<template>
  <div class="newaddress">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="isAdd ? '新增地址' : '编辑地址'"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="goBack"
    />

    <div class="box">
      <van-address-edit
        :area-list="addressList"
        :address-info="addressInfo"
        :show-set-default="isDefault"
        :show-delete="isDelete"
        detail-rows="2"
        detail-maxlength="100"
        @save="saveAddress"
        @delete="removeAddress"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { utils } from "../utils/utils";

export default {
  name: "NewAddress",

  data() {
    return {
      addressInfo: {
        aid: "",
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        isDefault: false
      }
    };
  },

  created() {
    //截取当前操作状态
    let query = this.$route.query;

    if (query.isAdd == 0) {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      let tokenString = localStorage.getItem('_t');

      this.axios({
        method: "GET",
        url: "/findAddressByAid",
        params: {
          appkey: this.appKey,
          tokenString,
          aid: query.aid
        }
      })
        .then(result => {
          
          this.$toast.clear();

          let data = result.data.result[0];
          data.isDefault = Boolean(data.isDefault);

          for (let key in this.addressInfo) {
            this.addressInfo[key] = data[key];
          }

          let addressData = Object.assign({}, this.addressInfo);

          this.$store.commit("NewAddressModules/changeData", {
            key: "temporaryAddressData",
            value: addressData
          });
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    }

    this.$store.commit("NewAddressModules/changeData", {
      key: "isAdd",
      value: query.isAdd
    });

    this.$store.commit("NewAddressModules/changeData", {
      key: "aid",
      value: query.aid
    });

    this.$store.commit("NewAddressModules/changeData", {
      key: "isDelete",
      value: !query.isAdd
    });
  },

  computed: {
    ...mapState("NewAddressModules", [
      "isDefault",
      "isDelete",
      "addressList",
      "isAdd",
      "aid",
      "temporaryAddressData"
    ])
  },

  methods: {
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },

    //判断是否修改a
    isModify(o1, o2) {
      for (let key in o2) {
        if (o2[key] != o1[key]) {
          return false;
        }
      }

      return true;
    },

    //保存地址
    saveAddress(content) {
      // 
      // 

      delete content.country;
      //拷贝对象
      let data = Object.assign({}, content);

      let url = "";

      if (this.isAdd == 1) {
        delete data.aid;

        url = "/addAddress";
      } else {
        //判断当前地址数据和编辑钱的地址数据是否一样
        //一样则不请求
        if (this.isModify(content, this.temporaryAddressData)) {
          
          return this.goBack();
        } else {
          url = "/editAddress";
        }
      }

      //获取token字段
      let tokenString = localStorage.getItem('_t');

      data.tokenString = tokenString;
      data.appkey = this.appKey;

      //将isDefault转为number
      data.isDefault = Number(data.isDefault);

      this.axios({
        method: "POST",
        url,
        data,
        transformRequest: utils.transformRequest
      })
        .then(result => {
          
          this.goBack();
        })
        .catch(err => {
          
        });
    },

    //删除地址
    removeAddress(content) {

      let tokenString = localStorage.getItem('_t');

      this.axios({
        method: "POST",
        url: "/deleteAddress",
        data: {
          appkey: this.appKey,
          tokenString,
          aid: this.aid
        },

        transformRequest: utils.transformRequest
      })
        .then(result => {
          

          this.goBack();
        })
        .catch(err => {
          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.newaddress {
  height: 100%;
  overflow-y: auto;
  background: #f5f5f5;

  /deep/ .van-button--danger {
    background-color: #1989fa;
    border-color: #1989fa;
  }

  /deep/ .van-radio__icon--checked {
    display: none;
  }

  .box {
    margin-top: 45.6px;
  }
}
</style>