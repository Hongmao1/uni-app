export default {
  namespaced: true,
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),

  mutations: {
    updataAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 数据持久化存储
    saveAddressToStorage(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters: {
    addstr (state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
