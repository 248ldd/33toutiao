<template>
  <div>
    <ArticleItem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
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
      articles: {}
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
    }
  }
}
</script>

<style></style>
