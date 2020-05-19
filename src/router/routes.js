export default [
  //首页
  {
    path: '/index',
    name: 'Index',
    component: r => require(['../views/Index.vue'], r),

    //二级路由
    children: [

      //我的订单
      {
        path: '/myorder',
        name: 'MyOrder',
        component: r => require(['../views/secondRoutes/MyOrder.vue'], r)
      },

      //菜单
      {
        path: 'classify',
        name: 'Classify',
        component: r => require(['../views/secondRoutes/Classify.vue'], r),


        //三级路由
        children: [
          //浓缩咖啡
          {
            path: 'coffee',
            name: 'coffee',
            component: r => require(['../views/thirdRoutes/latte.vue'], r),
          },

          //瑞纳冰
          {
            path: 'rena_ice',
            name: 'rena_ice',
            component: r => require(['../views/thirdRoutes/latte.vue'], r),
          },

          // 最新推荐
          {
            path: 'isHot',
            name: 'isHot',
            component: r => require(['../views/thirdRoutes/isHot.vue'], r),
          },

          // 拿铁
          {
            path: 'latte',
            name: 'latte',
            component: r => require(['../views/thirdRoutes/latte.vue'], r),
          },
        ]
      },

      //购物车
      {
        path: 'shopcart',
        name: 'Shopcart',
        component: r => require(['../views/secondRoutes/Shopcart.vue'], r),
      },

      //我的
      {
        path: 'my',
        name: 'My',
        component: r => require(['../views/secondRoutes/My.vue'], r),
      },
    ]
  },


  //登录
  {
    path: '/login',
    name: 'Login',
    component: r => require(['../views/Login.vue'], r)
  },



  //我的地址
  {
    path: '/myaddress',
    name: 'MyAddress',
    component: r => require(['../views/MyAddress.vue'], r)
  },

  //我的收藏
  {
    path: '/mylike',
    name: 'MyLike',
    component: r => require(['../views/MyLike.vue'], r)
  },

  //新增/编辑地址
  {
    path: '/newaddress',
    name: 'NewAddress',
    component: r => require(['../views/NewAddress.vue'], r)
  },

  //提交订单
  {
    path: '/submitorder',
    name: 'SubmitOrder',
    component: r => require(['../views/SubmitOrder.vue'], r)
  },

  //商品详情页
  {
    path: '/detail/:pid',
    name: 'Detail',
    component: r => require(['../views/Detail.vue'], r)
  },

  //注册
  {
    path: '/register',
    name: 'Register',
    component: r => require(['../views/Register.vue'], r)
  },

  //个人信息
  {
    path: '/personal',
    name: 'Personal',
    component: r => require(['../views/Personal.vue'], r)
  },

  //修改密码
  {
    path: '/modifyPassword',
    name: 'ModifyPassword',
    component: r => require(['../views/ModifyPassword.vue'], r)
  },

  //修改电话号码
  {
    path: '/modifyPhone',
    name: 'ModifyPhone',
    component: r => require(['../views/ModifyPhone.vue'], r)
  },

  //修改用户名
  {
    path: '/modifyName',
    name: 'ModifyName',
    component: r => require(['../views/ModifyName.vue'], r)
  },

  //获取邮箱验证码
  {
    path: '/email',
    name: 'Email',
    component: r => require(['../views/Email.vue'], r)
  },
  //修改用户名
  {
    path: '/validation',
    name: 'Validation',
    component: r => require(['../views/Validation.vue'], r)
  },

  //重定向
  {
    path: '*',
    redirect: { name: 'isHot' }
  }
]