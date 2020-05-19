export const mutations = {

    changeData(state,data){
        state[data.key] = data.value
    },

    //置空
    emptyGoodsData(state){
        state.goodsData = []
    }

}