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
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            round
            block
            type="default"
            size="small"
            native-type="button"
            class="btn"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <!-- 刚开始显示验证码为true 点击验证码的时候为false 倒计时出现 倒计时结束之后为true 验证码出现 -->
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCodeAPI } from '@/api'
import { mobileRules, codeRules } from './rule'

// token 标识用户 相当于身份证
//   - 用处：标识用户是否登陆了
//  mapMutations是将 mutations里面的函数映射到methods事件函数里面
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      // message:提示的内容
      // forbidClick：是否可以点击
      // duration：展示的时间 0为一直显示
      // 如果一个页面有两个toast 那么只会展示一个

      try {
        const { data } = await login(this.mobile, this.code)
        // 将token存入vuex
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能找到
        // error：1.js抛到错， 2.axios封装的error对象
        this.loading()
        // axios封装的error对象
        //   -error.response.data 后端返回的数据
        //   -error.response.status 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
        }
      }
    },
    async sendCode() {
      // 验证用户是否输入了有效的手机号
      await this.$refs.form.validate('mobile')
      // 1.发送请求
      console.log('发送请求')
      // 显示倒计时组件
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
        // this.$toast.fail('发送验证码失败')
      }
    }
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
.btn {
  height: 0.62rem;
  background-color: #eee;
  color: #a58594;
}
</style>
