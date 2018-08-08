// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import components from './components'
import Mock from './mock'
Mock.start();
import store from './store/index'

// Vue.prototype.$axios = Axios

Vue.use(ElementUI);
Vue.use(components);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path === '/login') {
    sessionStorage.removeItem('username');
  }
  let user = JSON.parse(sessionStorage.getItem('username'));
  if(!user && to.path !== '/login') {
    next({ path: '/login' });
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
