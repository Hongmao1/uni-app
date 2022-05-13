export default {
  namespaced: true,
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo: null
  }),

  mutations: {
    updataAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    updataUserInfo(state, userinfo) {
      state.userinfo = userinfo
      // 数据持久化存储
      this.commit('m_user/saveUserInfoToStorage')
    },
    updataToken(state,token) {
      state.token = token
      // 数据持久化存储
      this.commit('m_user/saveTokenToStorage')
    },
    // 将 userinfo 持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    // 数据持久化存储
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 将 token 字符串持久化存储到本地 
    saveTokenToStorage(state) { uni.setStorageSync('token', state.token) },
    updataredirectInfo(state,info) {
      state.redirectInfo = info
    }
  },
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
