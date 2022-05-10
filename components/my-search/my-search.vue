<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchHandler">
    <!-- 使用 view 组件模拟 input 输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      //背景颜色
      bgcolor: {
        type: String,
        default: '#c00000'
      },
      // 圆角
      radius: {
        type: Number,
        default: 15 //px
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchHandler () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    // background-color: #c00000;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  
  .my-search-box {
   background-color: #fff;
   height: 36px;
   width: 100%;
   // border-radius: 15px;
   display: flex;
   justify-content: center;
   align-items: center;
   
   .placeholder {
     font-size: 15px;
     margin-left: 5px;
   }
  }
</style>
