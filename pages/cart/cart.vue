<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 地址选中区域 -->
    <my-address></my-address>
    <!-- 购物车头部区域 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 渲染购物车商品 -->
    <uni-swipe-action>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="Removegoods(goods)">
          <my-goods :goods="goods" :showredio="true" @redio-change="redioChange" :shownum="true"
            @num-change="numChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算页脚 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" alt="" class="empty-img">
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
  import badgeMix from '../../mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#c00000'
            }
          }
        ]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updataGoodsStatus', 'updataGoodsCount','removeGoods']),
      redioChange(e) {
        this.updataGoodsStatus(e)
      },
      numChange(e) {
        this.updataGoodsCount(e)
        console.log(e);
      },
      Removegoods(goods) {
        this.removeGoods(goods)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    border-bottom: 1px solid #efefef;
    align-items: center;
    padding-left: 5px;

    .cart-title-text {
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img {
      height: 90px;
      width: 90px;
    }
    .tip-text {
      color: gray;
      font-size: 12px;
      margin-top: 15px;
    }
  }
</style>
