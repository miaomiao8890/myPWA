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
  fetchHomeInitData ({ commit }) {
    commit(types.HOME_DATA_REQUESTING)
    return fetch('http://123.57.21.57:8011/vuedemo/story.json')
        .then(res => res.json())
        .then(data => {
          commit(types.FETCH_HOME_INIT_DATA_SUCCESS, data.data)
        })
  },
}

// mutations
const mutations = {
  [types.HOME_DATA_REQUESTING] (state) {
    state.isHomeDataRequesting = true
  },
  [types.FETCH_HOME_INIT_DATA_SUCCESS] (state, data) {
    console.log(data)
    state.homeList = data
    state.isHomeDataRequesting = false
    state.getIsHomeInitDataLoaded = true
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}