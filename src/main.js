import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store.js'

import App from './app.vue'
import Chats from './chats.vue'
import Chat from './chat.vue'
import Tags from './tags.vue'

Vue.use(VueRouter)

// TODO component for selected chat
// TODO click on tag will result in search by that tag

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/chats', name: 'CHATS', component: Chats },
    { path: '/tags', name: 'TAGS', component: Tags },
    { path: '/:chatid', name: 'CHAT', component: Chat },
    { path: '/*', redirect: '/chats' }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
