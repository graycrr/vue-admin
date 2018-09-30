import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Login from '@/pages/login/login'
const Login = () => import ('@/pages/login/login');
const Home = () => import ('@/pages/home/home');
const User = () => import ('@/pages/user/user');
const Chart = () => import ('@/pages/echart/echart');
const Test = () => import ('@/pages/test/test');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      name: '',
      component: Home,
      iconCls: 'fa fa-users',
      leaf: true,
      children: [
        { path: '/user', component: User, name: '用户管理' }
      ]
    },
    {
      path: '/',
      name: '图表管理',
      component: Home,
      iconCls: 'fa fa-users',
      children: [
        { path: '/echart', component: Chart, name: '图表管理' },
        { path: '/test', component: Test, name: '测试' }
      ]
    },
  ]
})
