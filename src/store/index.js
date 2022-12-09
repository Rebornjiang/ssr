import Vue from 'vue'
import Vuex from 'vuex'
import { getArticles } from '@/api/test'
Vue.use(Vuex)


function createStore() {
  const store = new Vuex.Store({
    state: () => ({
      posts: []
    }),
    mutations: {
      setPost(state, payload) {
        state.posts = payload
      }
    },
    actions: {
      async getArticles({ commit }) {
        const res = await getArticles()
        commit('setPost', res.data.slice(0, 10) || [])
      }
    }
  })
  return store
}


export default createStore