export const mutations = {

    changeData(state,data){
        state[data.key] = data.value
    },

    removeMylikeData(state,index){
        state.MyLikeData.splice(index,1)
    }

}