export const state ={

    //所有订单数据
    allOrderData: [],

    //部分订单数据
    OrderData: [],

    //触底加载完成
    isFinished: false,

    //开始
    start: 0,
    
    //数量
    count: 3,

    //切换数据
    tabData:[
        {title: '全部订单',status:'0'},
        {title: '待收货',status:'1'},
        {title: '已收货',status:'2'},
    ]

}