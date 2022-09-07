<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>{{ bigNum }}</h1>
    <button @click="SER_COUNT(10)">点击</button>
  </div>
</template>

<script>
// 1.下载vant组件库  yarn add vant@latest-v2 -S
// 2.rem适配
//    - yarn add amfe-flexible
//    - 自动识别css中的px 并转换成rem
// 3.post-css css的预处理器
//    -下载 yarn add postcss-pxtorem
//    -要使用先根目录下下载 .postcssrc.js

// mapState --> 将vuex里面state映射到computed
// 使用
//   - 引入 mapState：函数返回一个对象
//   - 参数：[' 映射到属性 ']
// mapGetters --> 将vuex里面getters映射到computed
// mapMutations --> 将vuex里面getters映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   // App里面的第二个参数会被vuex里的mutations 第二个参数接收
    //   this.$store.commit('SER_COUNT', 8)
    // }
    ...mapMutations(['SER_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped lang="less">
.box {
  width: 2rem;
  height: 2rem;
  background-color: gold;
}
</style>
