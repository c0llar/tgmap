import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  chats: [],
  tags: [],
  graph: []
}

const mutations = {
  updateChats (state, chats) {
    state.chats = chats
  },
  updateTags (state, tags) {
    tags = tags.sort((t1, t2) => t1.count - t2.count < 0 ? 1 : -1)
    state.tags = tags
  },
  updateGraph (state, graph) {
    state.graph = graph
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
  },
  updateGraph ({ commit }) {
    fetch('/api/graph')
      .then(data => data.json())
      .then(graph => commit('updateGraph', graph))
  }
}

const getters = {
  test: state => state
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
