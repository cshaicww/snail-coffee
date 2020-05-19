import Vue from 'vue'
import Vuex from 'vuex'

//导入注册组件模块
import { RegisterModules } from './register/register_store'
//导入登录组件模块
import { LoginModules } from './login/login_store'
//导入主页
import { IndexModules } from './index/index_store'
//导入分类
import { ClassifyModules } from './classify/store'
//导入商品详情
import { DetailModules } from './detail/store'
//导入购物车
import { ShopcartModules } from './shopcart/store'
//导入我的
import { MyModules } from './my/store'
//导入我的收藏
import { MyLikeModules } from './myLike/store'
//导入新增地址
import { NewAddressModules } from './newAddress/store'
//导入我的地址
import { MyAddressModules } from './myAddress/store'
//导入提交订单
import {SubmitOrderModules} from './submitOrder/store'
//导入我的订单
import {MyOrderModules} from './myOrder/store'
//导入个人信息
import {PersonalModules} from './personal/store'
//导入修改名称
import {ModifyNameModules} from './modifyName/store'





Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuIsLoaded: false,
    typeNum: 0,

    //记录是否登录
    isLogin: false,

    pag: 0,

  },
  mutations: {
    changeData(state,data){
      state[data.key] =data.value
    }
  },
  actions: {
  },
  modules: {
    RegisterModules,
    LoginModules,
    IndexModules,
    ClassifyModules,
    DetailModules,
    ShopcartModules,
    MyModules,
    MyLikeModules,
    NewAddressModules,
    MyAddressModules,
    SubmitOrderModules,
    MyOrderModules,
    PersonalModules,
    ModifyNameModules
  }
})
