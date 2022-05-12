export default {
  namespaced: true,
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      // 数据持久化存储
      this.commit('m_cart/saveToStorage')
    },
    // 数据存储函数
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新商品状态
    updataGoodsStatus(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_status = goods.goods_status
        // 数据持久化存储
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新商品数量
    updataGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        // 数据持久化存储
        this.commit('m_cart/saveToStorage')
      }
    },
    removeGoods(state, goods) {
       // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    updateAllGoodsState(state,newStatus) {
      state.cart.forEach(item => item.goods_status = newStatus )
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      return state.cart.reduce((t,item) => t += item.goods_count,0)
    },
    checkCount (state) {
      return state.cart.filter(x => x.goods_status).reduce((t,item) => t += item.goods_count,0)
    },
    isfull(state) {
      return state.cart.every(x => x.goods_status == true)
    },
    amonut(state) {
      return state.cart.filter(x => x.goods_status).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
    }
  }
}
