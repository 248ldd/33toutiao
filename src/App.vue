<template>
  <div>
    <router-view></router-view>
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
export default {
  methods: {}
}
</script>

<style scoped lang="less">
.box {
  width: 2rem;
  height: 2rem;
  background-color: gold;
}
</style>
