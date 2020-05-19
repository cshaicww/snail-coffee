export const mutations ={

    //置空数据
    emptyData(state){
        state.isFinished = false;
        state.isEditor = false;
        state.shopcartData = [];
        state.allShopcartData = [];
        state.start = 0;
        state.total = 0;
        state.count = 10;

    },

    changeData(state,data){
        state[data.key] = data.value
    },

    loadShopcartData(state){
        state.shopcartData.push(...state.allShopcartData.slice(state.start, state.count + state.start))

        state.start = state.count
    },

    //删除shopcartData数组的元素
    removeShopcartData(state,data){
        for(let i =state.shopcartData.length - 1;i >= 0  ;i--){
            if(data.indexOf(state.shopcartData[i].sid)>-1){
                state.shopcartData.splice(i,1)
            }
        }
    }

}