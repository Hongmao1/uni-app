<template>
  <view class="userinfo-container">
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">
        {{userinfo.nickName}}
      </view>
    </view>
    <view class="panel-list">
      <!-- 第一个面版 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面版 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" mode=""></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" mode=""></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" mode=""></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" mode=""></image>
            <text>待付款</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-title-item">
          <text class="tip-text">收货地址</text>
          <uni-icons type="arrowright" size="18"></uni-icons>
        </view>
        <view class="panel-title-item">
          <text class="tip-text">联系客服</text>
          <uni-icons type="arrowright" size="18"></uni-icons>
        </view>
        <view class="panel-title-item" @click="logout">
          <text class="tip-text">退出登录</text>
          <uni-icons type="arrowright" size="18"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,mapMutations
  } from 'vuex'

  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['userinfo'])
    },
    methods: {
      ...mapMutations('m_user',['updataAddress','updataUserInfo','updataToken']),
      async logout() {
        const [err,succ] = await uni.showModal({
           title:'提示',
           content:'确认退出登录吗？'
         })
        if (succ && succ.confirm) {
          // 清空用户的数据
          this.updataAddress({})
          this.updataToken('')
          this.updataUserInfo({})
        }
      }
    }
  }
</script>

<style lang="scss">
  .userinfo-container {
    height: 100%;
    background-color: #f4f4f4;

    .top-box {
      height: 400rpx;
      background-color: #c00000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .avatar {
        height: 90px;
        width: 90px;
        border-radius: 45px;
        border: 2px solid #fff;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        margin-top: 10px;
        font-weight: bold;
        color: #fff;
      }
    }

    .panel-list {
      padding: 0 10px;
      position: relative;
      top: -10px;

      .panel {
        background-color: white;
        border-radius: 3px;
        margin-bottom: 8px;

        .panel-title {
          padding-left: 10px;
          line-height: 45px;
          font-size: 15px;
          border-bottom: 1px solid #f4f4f4;
        }

        .panel-body {
          display: flex;
          justify-content: space-around;

          .panel-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            font-size: 13px;
            padding: 10px 0;

            >image {
              height: 35px;
              width: 35px;
            }
          }
        }
      }
    }
  }

  .panel-title-item {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    line-height: 45px;

    .tip-text {
      font-size: 15px;
    }
  }
</style>
