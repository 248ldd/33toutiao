<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->

    <component
      :keywords="keywords"
      :is="componentsName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// class和style属性的特殊
//  - vue自动帮你把class和style合并到组件的根节点上
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
import SearchSuggestion from './components/SearchSuggestion'

// mapMutations是映射到methods里面 mapState是映射到computed里面
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywoeds关键字存起来
      // 1.用户手动敲回车   2.点击了搜索建议
      // 存储搜索历史

      // 去重：1.获取需要去重的数组 2.放入new Set(arr)里面 3. ...展开里面的所有内容
      const distinctHistories = [...new Set([keywords, ...this.histories])]

      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  },
  computed: {
    ...mapState(['histories']),
    componentsName() {
      // 搜索建议：搜索框有值，并且不渲染搜索结果

      // 搜索历史：搜索框值为空
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // 搜索结果：触发搜索时，显示搜索结果
      //   - 给一个变量 刚开始为false 触发事件的时候为true 显示结果框
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 当搜索历史 跟 搜索结果 都不渲染的时候就渲染 搜索建议
      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
