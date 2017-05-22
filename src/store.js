import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  chats: [],
  tags: []
}

const mutations = {
  updateChats (state, chats) {
    state.chats = chats
  },
  updateTags (state, tags) {
    tags = tags.sort((t1, t2) => t1.count - t2.count < 0 ? 1 : -1)
    state.tags = tags
  }
}

const actions = {
  updateChats ({ commit }) {
    fetch('/api/chats')
      .then(data => data.json())
      .then(chats => commit('updateChats', chats))
  },
  updateTags ({ commit }) {
    fetch('/api/tags')
      .then(data => data.json())
      .then(tags => commit('updateTags', tags))
  }
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
