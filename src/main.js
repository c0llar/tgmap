import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import Chats from './chats.vue'
import Tags from './tags.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/chats', name: 'CHATS', component: Chats },
    { path: '/search', name: 'SEARCH', component: Chats },
    { path: '/tags', name: 'TAGS', component: Tags },
    { path: '/*', redirect: '/chats' }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
