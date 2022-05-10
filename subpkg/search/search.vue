<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :cancelButton="none" :radius="100"></uni-search-bar>
    </view>
    <!-- 建议区域 -->
    <view class="sugg-list" v-if="kw.length !== 0">
      <view class="sugg-item" v-for="(item,i) in searchReslut" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="histroy-box" v-else>
      <!-- 标题区域 -->
      <view class="histroy-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17"  @click="clean"></uni-icons>
      </view>
      <view class="histroy-list">
        <uni-tag :text="item" v-for="(item,i) in historyes" :key="i" @click="gotoGoodslist(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        kw: '',
        timer: null,
        searchReslut: [],
        history: ['a', 'app', 'dis']
      };
    },
    onLoad () {
      this.history = JSON.parse(uni.getStorageSync('kw') || '[]') 
    },
    methods: {
      async getSearchList() {
        if (this.kw.length === 0) {
          this.searchReslut = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchReslut = res.message
        this.saveSearchHistory()
      },
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e.value
          this.getSearchList()
        }, 500)
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory () {
        // this.history.push(this.kw)
        const set = new Set(this.history)
        set.delete(this.kw)
        set.add(this.kw)
        this.history = Array.from(set)
        // 持久化存储
        uni.setStorageSync('kw',JSON.stringify(this.history))
      },
      // 清空历史记录
      clean() {
        this.history = []
        uni.setStorageSync('kw','[]')
      },
      gotoGoodslist(kw) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      historyes () {
        return [...this.history].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      padding: 13px 0;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
  
  .histroy-box {
    padding: 0 5px;

    .histroy-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .histroy-list {
      display: flex;
      flex-wrap: wrap;
    }
    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
</style>
