export const mutations = {

    changeData(state,data){
        state[data.key] = data.value
    },
    
    changeDetailData(state,data){

        //商品规格整理
        let titles= {
            tem: data.tem_desc,
            milk: data.milk_desc,
            sugar: data.sugar_desc,
            cream: data.cream_desc,
        }

        for(let key in titles){


            if(data[key] == ''){
                continue
            }

            let o = {
                title: titles[key],
                data: []
            }

            let aa = data[key].split('/');

            for(let i = 0 ;i<aa.length;i++){

                let o1 = {
                    text: aa[i],
                    isActive: i== 0,
                }

                o.data.push(o1)
            }
            
            state.rules.push(o)
        }

        
        state.desc = data.desc.split(/\n/);
        

        state.detailData = data
    },

    //每次进入新的商品详情页都要置空
    emptyData(state){
        state.detailData = {};
        state.rules = [];
        state.desc = [];
        state.count = 1;
        state.isLike = false;
        state.shopcartTotal = 0;
    }

}