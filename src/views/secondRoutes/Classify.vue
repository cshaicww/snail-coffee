<template>
  <div class="classify">
    <div class="l-menu">
      <van-sidebar v-model="activeKey" class="van-sidebar" @change="goodsData">
        <van-sidebar-item
          :title="item.typeDesc"
          name
          :to="{name: item.type}"
          v-for="(item,index) in type"
          :key="index"
        />
      </van-sidebar>
    </div>
    <div class="r-items">
      <!-- 三级插座 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'

export default {
  name: "Classify",

  created() {
    this.activeKey = this.typeNum

    this.$store.commit("ClassifyModules/emptyGoodsData");

    this.typeData();

  },

  data() {
    return {
      activeKey: 0
    };
  },

  computed: {
    type() {
      return this.$store.state.ClassifyModules.typeData;
    },

    ...mapState(['typeNum'])

   
  },

  methods: {

    //请求商品类型数据
    typeData() {

        this.axios({
          method: "GET",
          url: "/type",

          params: {
            appkey: this.appKey
          }
        })
          .then(result => {

          

            let types = result.data.result;

            types.unshift({
              type: "isHot",
              typeDesc: "最新推荐"
            });

            if (result.data.code == 400) {

              this.$store.commit("ClassifyModules/changeData", {
                key: "typeData",
                value: types
              });

              this.goodsData(this.type[0]);
            }
          })
          .catch(() => {
            
          });


    },

    //请求商品数据
    goodsData() {

      

       this.$store.commit('changeData',{
        key: 'typeNum',
        value: this.activeKey
      })


      //加载提示
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: "加载中..."
      });

      let params = {
        appkey: this.appKey
      };

      this.type.forEach((v, i) => {
        if (this.activeKey == i) {
          if (v.type == "isHot") {
            (params.key = "isHot"), (params.value = 1);
          } else {
            (params.key = "type"), (params.value = v.type);
          }
        }
      });

      this.axios({
        method: "GET",
        url: "/typeProducts",
        params
      })
        .then(result => {

          //关闭加载提示
          this.$toast.clear();

          if (result.data.code == 500) {

            this.$store.commit("ClassifyModules/changeData", {
              key: "goodsData",
              value: result.data.result
            });
          }
        })
        .catch(err => {
          //关闭加载提示
          this.$toast.clear();
          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.classify {
  height: 100%;
  position: relative;
  background: #f0f0f0;

  .l-menu {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100px;
    background: #fafafa;

    .van-sidebar {
      width: 100%;
    }
  }

  .r-items {
    height: 100%;
    width: calc(100% - 100px);
    margin-left: auto;
  }
}
</style>