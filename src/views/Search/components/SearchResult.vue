<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了哦～"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      perpage: 10,
      results: [],
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        // 1.发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perpage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 2.保存数据
        // console.log(data.data.results)
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // 3.关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  // overflow: auto/overlay用法基本一致
  overflow: overlay;
}
</style>
