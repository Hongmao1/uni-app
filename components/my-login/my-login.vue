<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {
    mapMutations,mapState
  } from 'vuex'

  export default {
    name: "my-login",
    computed: {
      ...mapState('m_user',['redirectInfo'])
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updataUserInfo','updateToken','updataredirectInfo']),
      getUserInfo(e) {
        // 判断是否获取用户信息成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        // console.log(e)
        this.updataUserInfo(e.detail.userinfo)
        // 获取登录成功后的 Token 字符串 
        this.getToken(e.detail)
      },
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备参数对象 
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 换取 token 
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        this.updateToken(loginResult.message.token)
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'swichTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updataredirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      transform: translateY(50%);
      border-radius: 100%;
    }

    .login-btn {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    .tips-text {
      color: gray;
      font-size: 12px;
    }
  }
</style>
