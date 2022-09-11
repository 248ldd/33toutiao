<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登陆状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button round size="mini" class="emit-btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="vanGrid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登陆状态的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileImg" />
        <span class="text">登陆 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学🪣" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" @click="logoutBtn">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileImg from '@/assets/images/mobile.png'

import { getUserInfoAPI } from '@/api'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  data() {
    return {
      mobileImg,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async logoutBtn() {
      await this.$dialog.confirm({
        title: '头条',
        message: '是否确认退出改账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        // 如果用户没有登陆就不执行下面的代码 如果登陆就执行
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        // console.log(data)
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登陆')
        } else {
          throw error
        }
      }
    }
  }
  // $store.commit('SET_TOKEN', {})
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f3f5f7;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
// 必须要有background-position 才可以合起来写 background-size
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .emit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.vanGrid) {
    color: #fff;
    .van-grid-item__content {
      background-color: inherit;
      font-size: 30px;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
