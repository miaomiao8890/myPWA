import fetch from 'isomorphic-fetch'
import * as types from '../mutation-types'

// initial state
const state = {
  isHomeDataRequesting: false,
  isHomeInitDataLoaded: false,
  homeList: [],
}

// getters
const getters = {
  getHomeList: state => state.homeList,
  getIsHomeInitDataLoaded: state => state.isHomeInitDataLoaded,
  getIsHomeDataRequesting: state => state.isHomeDataRequesting
}

// actions
const actions = {
  fetchHomeInitData ({ commit }, opt) {
    return fetch('//www.chrislion.com/pwa/beauty/photos?n=0')
        .then(res => res.json())
        .then(data => {
          if (data.status_code == 200) {
            commit(types.FETCH_HOME_INIT_DATA_SUCCESS, data.result)
            if (opt.callback) {
              opt.callback()
            }
          }
        })
  },
  fetchHomeMoreData ({ commit }, opt) {
    commit(types.HOME_DATA_REQUESTING)
    return fetch('//www.chrislion.com/pwa/beauty/photos?n=' + opt.page)
        .then(res => res.json())
        .then(data => {
          if (data.status_code == 200) {
            commit(types.FETCH_HOME_MORE_DATA_SUCCESS, data.result)
            if (opt.callback) {
              opt.callback()
            }
          }
        })
  },
}

// mutations
const mutations = {
  [types.HOME_DATA_REQUESTING] (state) {
    state.isHomeDataRequesting = true
  },
  [types.FETCH_HOME_INIT_DATA_SUCCESS] (state, data) {
    state.homeList = data
    state.isHomeInitDataLoaded = true
  },
  [types.FETCH_HOME_MORE_DATA_SUCCESS] (state, data) {
    state.isHomeDataRequesting = false
    state.homeList = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}