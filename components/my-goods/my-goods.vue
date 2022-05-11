<template>
  <view class="goods-item">
    <view class="goods-left-box">
      <image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-img"></image>
    </view>
    <view class="goods-right-box">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="price">
          ￥{{goods.goods_price | tofixed}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;

    .goods-left-box {
      margin-right: 10px;

      .goods-img {
        height: 100px;
        width: 100px;
        display: block;
      }
    }

    .goods-right-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px
      }

      .price {
        color: #c00000;
        font-size: 16px;
      }
    }

  }
</style>
