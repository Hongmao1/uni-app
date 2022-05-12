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
    <view class="btn-settle">
      结算{{checkCount}}
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  
  export default {
    name: "my-settle",
    computed: {
      ...mapGetters('m_cart',['checkCount','total','isfull','amonut'])
    },
    data() {
      return {
        test:false
      };
    },
    methods: {
      ...mapMutations('m_cart',['updateAllGoodsState']),
      isfullClick () {
        this.updateAllGoodsState(!this.isfull)
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
