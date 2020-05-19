<template>
  <div class="index">
    <div class="second">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" active-color="#000000" @change="changAct">
      <van-tabbar-item v-for="(item,index) in tabber" :key="index" :to="{name:item.name}">
        <van-icon
          class-prefix="icon"
          slot="icon"
          slot-scope="props"
          :name="props.active ? item.icon.icon_active : item.icon.icon_normal"
        ></van-icon>
        <span>{{item.title}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "../assets/css/iconfont.css";
import { mapState } from 'vuex';

export default {
  name: "Index",

  data() {
    return {
      active: 0
    };
  },

  created(){
    this.active = this.pag

  },


  computed: {
    ...mapState(['pag']),
    tabber() {
      return this.$store.state.IndexModules.tabber;
    }
  },

  methods:{
    changAct(active){
       this.$store.commit('changeData',{
        key:'pag',
        value: active
      })

    }
  }

  
};
</script>

<style lang="less" scoped>
  .index{
    height: 100%;

    .second{
      height: calc(100% - 50px);
    }
  }
</style>