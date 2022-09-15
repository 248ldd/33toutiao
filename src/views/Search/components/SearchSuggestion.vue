<template>
  <div>
    <van-cell
      v-for="(item, index) in highLeigthSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1.输入了第一个字符：决定渲染SearchSuggestion

//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
//  - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
//  - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'loadsh'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  // watch方法后面给个字符串 那么他就会执行类似的内容
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        // console.log(data)

        // filter(Boolean) 可以把数组里面的假值全部过滤掉
        this.suggestions = data.data.options.filter(Boolean)
        // this.suggestions = data.data.options.filter((item) => Boolean(item))
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },
  computed: {
    highLeigthSuggestions() {
      // 动态正则 第一个参数是输入的关键字，第二个是匹配得到的所有关键字无论大小写
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          // match匹配到的关键字 把这个关键字改成需要的样式
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
