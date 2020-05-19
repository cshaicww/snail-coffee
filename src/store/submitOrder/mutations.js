export const mutations={
    
    changeData(state,data){
        state[data.key] = data.value
    },

    //置空数据
    emptyData(state){
        state.defaultAddress = {};
        state.AddressData = [];
        state.orederData = [];
        state.orederDesc.count = 0
        state.orederDesc.total = 0
        state.isHasAddress = false
    }
}