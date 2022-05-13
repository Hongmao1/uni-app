<template>
  <view class="settle-container">
    <!-- 全选 -->
    <label class="radio" @click="isfullClick">
      <radio color="#c00000" :checked="isfull" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{amonut}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle" @click="sttlement">
      结算{{checkCount}}
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: "my-settle",
    computed: {
      ...mapState('m_user', ['token']),
      ...mapGetters('m_cart', ['checkCount', 'total', 'isfull', 'amonut']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        second: 3,
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user',['updataredirectInfo']),
      isfullClick() {
        this.updateAllGoodsState(!this.isfull)
      },
      sttlement() {
        if (!this.checkCount) return uni.$showMsg('请勾选需要购买的商品！')
        if (!this.addstr) return uni.$showMsg('请填写收货的地址！')
        // if (!this.token) return uni.$showMsg('请先登录！')
        if (!this.token) return this.delayNavigate()
        // 验证通过后进入创建订单
        this.payOrder()
      },
      showtips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算' + n + '秒后会跳转到登录页面',
          mask: true,
          duration: 1500
        })
      },
      delayNavigate() {
        this.second = 3
        this.showtips(this.second)

        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updataredirectInfo({
                  openType: 'switchTab',
                  from: '/page/cart/cart'
                })
              }
            })
            return
          }

          this.showtips(this.second)
        }, 1000)
      },
      async payOrder() {
        // 创建订单
        const orderInfo = { 
          // 开发期间，注释掉真实的订单价格，
          // order_price: this.checkedGoodsAmount,
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_status).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }
        // 编辑请求数据
        const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        const orderNumber = res.message.order_number
        // 订单的预支付
        const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number: orderNumber})
        if (res2.meta.status !== 200) return uni.$showMsg('创建订单预支付失败！')
        const payInfo = res2.message.pay
        // 微信支付
        const [err,succ] = uni.requestPayment(payInfo)
        if (err) return uni.$showMsg('订单未支付！')
        // 再发起请求后端
        const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number: orderNumber})
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付')
        uni.showToast({
          title: '订单支付完成！',
          icon: 'success'
        })
      }
    }
  }
</script>

<style lang="scss">
  .settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .amount {
      color: #c00000;
      font-weight: bold;
    }

    .btn-settle {
      min-width: 100px;
      height: 50px;
      background-color: #c00000;
      color: #fff;
      text-align: center;
      line-height: 50px;
      padding: 0 10px;
    }
  }
</style>
