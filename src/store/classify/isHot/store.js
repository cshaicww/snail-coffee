import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'

export const isHotModules = {
    namespaced: true,
    state,
    mutations,
    getters
}