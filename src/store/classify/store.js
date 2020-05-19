import {state} from './state'
import {mutations} from './mutations'

import {isHotModules} from './isHot/store'

export const ClassifyModules = {
    namespaced: true,
    state,
    mutations,
    modules:{
        isHotModules
    }
}