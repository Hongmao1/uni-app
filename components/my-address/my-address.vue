<template>
  <view>
    <!-- 默认没有资料区域 -->
    <view class="address-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="chose-address" @click="choseAddress">请选择收获地址+</button>
    </view>
    <!-- 资料区域 -->
    <view class="address-info-box" v-else @click="choseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'

  export default {
    name: "my-address",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updataAddress']),
      async choseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          this.updataAddress(succ)
        }
        // 判断是否授权
        if (err && errMsg === 'chooseAddress:fail auth deny' || 'chooseAddress:fail authorize no response') {
          通过调用方法,
          让用户重新授权
          this.reAuth()
        }
      },
      async reAuth() {
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: '确认授权',
          cancelText: '取消'
        })
        if (err2) return
        if (confirmResult.cancel) return uni.$showMsg('你取消了地址授权')
        if (confirmResult.confirm) return uni.openSetting({
          success: (settingResult) => {
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权!')
          }
        })
      }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    }
  }
</script>

<style lang="scss">
  .address-box {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .address-border {
    width: 100%;
    height: 5px;
    display: block;
  }

  .address-info-box {
    padding: 0 5px;
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-self: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }
</style>
