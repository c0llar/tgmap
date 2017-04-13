import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store.js'

import App from './app.vue'
import Chats from './chats.vue'
import Tags from './tags.vue'

Vue.use(VueRouter)

// TODO component for selected chat
// TODO click on tag will result in search by that tag

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // path: /chats/(:chatid|:chatUsername)
    { path: '/chats', name: 'CHATS', component: Chats },
    { path: '/tags', name: 'TAGS', component: Tags },
    { path: '/*', redirect: '/chats' }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
