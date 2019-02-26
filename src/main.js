// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from './router/router'
// 处理axios一些问题
import axios from 'axios'
// 第一个解决每个 js 文件里面都要引入 axios
Vue.prototype.$axios = axios
// 第二个 解决每次使用接口的时候,都引入很长的根路径(基路径)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 第三个问题 每次携带 token, 都要我们手动去写
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// 安装element-ui
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
