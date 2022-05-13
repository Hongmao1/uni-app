import App from './App'
// #ifndef VUE3
import Vue from 'vue'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
// 导入vuex仓库
import store from './store/store'

uni.$http = $http
// 设置请求根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  if (options.url.indexOf('/my/') !== -1) {
    options.header = {
      Authorization: store.state.m_user.token
    }
  }
}
// 响应拦截器
$http.afterRequest = function () {
  // do something...
  uni.hideLoading()
}
// 封装一个消息框
uni.$showMsg = function(title='数据请求失败!',duration=1500) {
  return uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif