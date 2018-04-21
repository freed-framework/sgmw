import { getBookPage } from '../../api'

const ActionType = {
  FETCH_BOOK: 'FETCH_BOOK',
  CLEAR_BOOK_LIST: 'CLEAR_BOOK_LIST',
}

export interface BookList {
  id: number,
  title: string,
  price: number,
  inventory: number
}

export interface State {
  name?: string,
  list?: BookList[]
}

// initial state
const state = {
  name: '',
  list: []
}

const actions = {
  async getData({ commit }) {
    const result = await getBookPage()
    const payload: any = { ...result }

    commit(ActionType.FETCH_BOOK, payload)
  },

  clearList({ commit }) {
    commit(ActionType.CLEAR_BOOK_LIST)
  }
}

const mutations = {
  [ActionType.FETCH_BOOK](state: State, payload: any) {
    state.name = payload.name
    state.list = payload.list
  },

  [ActionType.CLEAR_BOOK_LIST](state: State) {
    state.list = []
  }
}

const getters = {
  getList(state) {
    const { list = [] } = state
    return list.filter(item => !item.disabled)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
