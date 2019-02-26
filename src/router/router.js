// 引入vue
import Vue from 'vue'
// 1.引入路由
import VueRouter from 'vue-router'
// 引入子组件
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles.vue'
import Rights from '../components/rights/Rights.vue'
// 使用use安装一下路由
Vue.use(VueRouter)

// 实例化路由

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})
// 导航守卫
// to:访问那个页面
// from:从哪页面过来的
// next():下一步
router.beforeEach((to, from, next) => {
  // console.log('to', to.path)
  if (to.path === '/login') {
    next()
  } else {
    // 判断是否登录过
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

// 导出路由,与vue关联起来
export default router
