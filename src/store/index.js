import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// import { getItem, setItem } from '@/utils/shorage'

// 封装本地存储 vuex-persistedstate
// 1.下载
//   - yarn add vuex-persistedstate@3.2.1
// 2.引入
//  - import createPersistedState from 'vuex-persistedstate'
// 3.调用
//  - plugins: [createPersistedState()],

// 配置项：
//  key:默认值是1vuex
//  storage：存储的方式，默认值是本地存储
//  reducer：指定持久化哪些数据，函数，return一个对象，对象就存储一个value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage: sessionStorage,
      // 传参的时候把tokenObj 结构出来
      reducer({ tokenObj }) {
        // console.log(tokenObj)
        return { tokenObj }
      }
    })
  ],
  // mapState --> 将vuex里面state映射到computed
  state: {
    tokenObj: {}
  },
  // mapGetters是将getters里面的内容映射到computed计算属性里面
  // mapMutations是将getters里面的内容映射到methods属性里面
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  }
})
