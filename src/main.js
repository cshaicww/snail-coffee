import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

//阿里云图标
import "./assets/css/iconfont.css";

import 'vant/lib/icon/local.css';

import VueCookies from 'vue-cookies'


import {
    Icon,
    Button,
    Form,
    Field,
    Divider,
    Toast,
    NavBar,
    Tabbar,
    TabbarItem,
    Sidebar,
    SidebarItem,
    Swipe, 
    SwipeItem,
    Image,
    Stepper,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    SubmitBar,
    Checkbox,
    CheckboxGroup,
    List,
    Cell,
    CellGroup,
    Tag,
    AddressEdit,
    AddressList,
    ActionSheet,
    Tab,
    Tabs,
    Uploader,
    Dialog,
    Empty,
  } from 'vant';

Vue
  .use(Icon)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Divider)
  .use(Toast)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Image)
  .use(Stepper)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(SubmitBar)
  .use(List)
  .use(VueAxios,axios)
  .use(Checkbox,CheckboxGroup)
  .use(Cell)
  .use(CellGroup)
  .use(Tag)
  .use(AddressEdit)
  .use(AddressList)
  .use(VueCookies)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(Uploader)
  .use(Dialog)
  .use(Empty)

  
Vue.config.productionTip = false

// appkey
Vue.prototype.appKey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

//配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
