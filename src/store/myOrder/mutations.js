export const mutations ={
    changeData(state,data){
        state[data.key] = data.value
    },

    //清空数据
    emptyData(state){
        state.allOrderData = [];
        state.OrderData = [];
        state.isFinished = false;
        state.start = 0;
        state.count = 3;
    },

    //删除待收货订单
    removeData(state,index){
        state.OrderData.splice(index,1)
    },

    loadShopcartData(state){
        state.OrderData.push(...state.allOrderData.slice(state.start, state.count + state.start))

        state.start = state.count
        
    },
}