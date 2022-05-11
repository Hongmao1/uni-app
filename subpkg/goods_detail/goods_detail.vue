<template>
  <view v-if="goodsInfo.goods_name" class="goods-list-container">
    <!-- 滚动条区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" mode="" @click="showImg(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品的价格 -->
      <view class="price">
        ￥{{goodsInfo.goods_price}}
      </view>
      <!-- 商品的标题 -->
      <view class="goods-info-body">
        <view class="goods-name">
          {{goodsInfo.goods_name}}
        </view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">
        <text>快递：免运费</text>
      </view>
    </view>
    <!-- 图片介绍区域 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- goodsnav导航区域 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo: {},
        options: [{
          icon: 'shop',
          text: '店铺',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getDate(goods_id)
    },
    methods: {
      async getDate(id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
        if (res.meta.status !== 200) return uni.showMsg()
        // 对goods_introduce数据进行处理
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg')
        this.goodsInfo = res.message
      },
      showImg(i) {
        uni.previewImage({
          current: i,
          urls: this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        console.log(e)
        this.options[2].info++
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
      font-size: 12px;
      margin: 10px 0;
      color: gray;
    }
  }
  .goods_nav {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .goods-list-container {
    padding-bottom: 50px;
  }
</style>
