import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 封装本地存储
export default new Vuex.Store({
  state: {
    tokenObj:
      JSON.parse(window.localStorage.getItem('HEIMATOUTIAO_TOKEN')) || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex
      state.tokenObj = token
      // 将token存到本地存储中
      window.localStorage.setItem('HEIMATOUTIAO_TOKEN', JSON.stringify(token))
    }
  }
})
