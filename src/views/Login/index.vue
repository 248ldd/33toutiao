<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登陆" class="nav-bar" />
    <!-- 登陆 -->
    <!-- van-field:输入框，text，password，文本域... -->
    <!-- v-model：用户输入的值 -->
    <!-- name：表示表单项 -->
    <!-- rules：是一个数组 -->
    <!-- rules:{required:是否必须按，message:错误的信息,pattern:正则，trigger:规则的触发时机onChange(内容发生变化)，onBlur(失去焦点)} -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机格式错误'
          }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /[0-9]{6}/,
            message: '验证码格式错误'
          }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span> </template
      ></van-field>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style scoped lang="less">
// scoped 样式只作用于当前组件
// vue-cil 提供了语法 :deep()
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>
