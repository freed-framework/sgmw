import { getHelloPage } from '../../api'

const ActionType = {
  FETCH_HELLO: 'FETCH',
}

export interface StateTypes {
  count: number,
  name?: string,
}

const state: StateTypes = {
  count: 0,
  name: null
}

const mutations = {
  increment(state) {
    state.count++
  },
  [ActionType.FETCH_HELLO](state: StateTypes, payload: any) {
    state.name = payload.name
  }
}

const actions = {
  increment(context) {
    // console.log('actions: increment')
    context.commit('increment')
  },
  async getData({ commit }) {
    // getTest()
    const result = await getHelloPage()
    commit(ActionType.FETCH_HELLO, { ...result })
  }
}

const getters = {
  name: (state: StateTypes) => state.name
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
