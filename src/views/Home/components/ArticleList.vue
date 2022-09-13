<template>
  <div class="article">
    <!-- 滚动条 -->
    <!-- @load：触底时触发load事件 -->
    <!-- offset：滚动条和底部距离多少的时候触发load事件，默认值是300px -->
    <!-- immediate-check：页面一打开是否执行load事件，默认值为true -->

    <!-- v-model="loading" -->
    <!-- loading为true时，load事件不会触发 -->
    <!-- loading为false时，load事件会触发 -->
    <!-- loading会在load事件执行时，被van-list组件自动设置为true，所以需要手动改为false -->

    <!-- finished:Boolen false:load事件会被触发 true:load事件不会被触发了 并且显示 finished-text的文本-->
    <!-- van-pull-refresh 组件标签是下拉刷新的 v-model为false的时候不会触发下滑 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        :finished="finished"
        finished-text="没有更多了呢～"
        :error.sync="error"
        error-text="请求失败了呢，点击重新加载哦～"
        offset="100"
        :immediate-check="false"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'

import ArticleItem from './Articleitem.vue'
export default {
  components: {
    ArticleItem
  },
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFristPageArticle()
  },
  methods: {
    async getFristPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        // console.log(this.articles)
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，上抛，400 上抛中文，507原封不动上抛
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 1.请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 2.渲染
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 3.更改时间戳
        this.preTimestamp = data.data.pre_timestamp
        // 4.更改loading
      } catch (error) {
        this.error = true
      } finally {
        // finally 不论获取成功或者失败 语句都会生效
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何让盒子拥有自己的滚动条
//  - 1.给盒子一个高度 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // 在less中 &代表后面元素的的父元素
  // &::after
  // &::-webkit-scrollbar: 滚动条
  // &::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparents;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hotpink;
    border-radius: 10px;
  }
}
</style>
