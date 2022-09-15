<template>
  <div class="box">
    <!-- 搜索框🔍 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          icon="search"
          round
          size="small"
          @click="$router.push('/search')"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及文章列表 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 子组件触发了事件之后 把弹出层改为false去除 里面的active等于子组件点击到的索引值 -->
      <!-- $elent代表子组件传递过来的第一个参数 -->
      <channel-edit
        v-if="isShow"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channel="delChannel"
        :my-channels="channels"
        @add-channel="addChanel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 两套系统
//  - 用户登录
//    - 我的频道是用户自己频道信息 + 持久化到线上服务器
//  - 用户未登录
//    - 我的频道是默认的频道信息
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.initChannel()
  },
  // 1. ?? ==> 相当于 || 常用于语句
  // 2. ?. ==> 可选链接操作符, ?前面是undefined，那么不会往后取值
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    // create里面调用initChannel 来判断用户是否登录了
    initChannel() {
      if (this.isLogin) {
        // 1.如果你登录了
        //   - channels应该发送请求获取用户自己的频道
        // 2.如果未登录
        //   - 1。本地存储里有数据，channels用本地存储
        //   - 2.本地存储没有数据，发送请求，获取默认的频道数据
        this.getChannel()
      } else {
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    // 获取请求
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    // 删除列表
    async delChannel(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        // 1.请求发送
        // 利用await请求数据 把id传给url
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 把我的频道存在本地存储
          this.SET_MY_CHANNELS(newChannels)
        }
        // 2.删除对应的数据
        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除哦～')
        } else {
          throw error
        }
      }
    },
    // 添加列表
    async addChanel(channel) {
      try {
        // 1.先请求
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 把我的频道存在本地存储
          // 展开运算符 得到每一项 channel是把点击的那一项放到最后面
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        // 2.在添加
        this.channels.push(channel)
        this.$toast.success('添加频道成功哦～')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再添加哦～')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;

  .van-nav-bar__title {
    max-width: unset;
  }
  .van-button--default {
    width: 7.4rem;
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
