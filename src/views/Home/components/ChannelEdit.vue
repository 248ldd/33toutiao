<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        round
        size="mini"
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我的具体 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :class="{ active: item.name === '推荐' }"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <!-- 具体推荐 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
// 推荐频道是所以的频道减去我的频道
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannel: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsAPI()
        // console.log(data)
        this.allChannel = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    handleChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log(name)
      } else {
        // 1.关闭弹窗
        // 2.切换频道

        // 父组件给一个@方法把这个方法传给子组件 子组件利用$emit触发这个事件 然后传给父组件一个点击到索引值
        // 子组件触发了事件之后 把弹出层改为false去除 里面的active等于子组件点击到的索引值
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      // 推荐频道 = 所以频道 - 我的频道
      // filter返回值：数组
      return this.allChannel.filter((allChannelItem) => {
        // 如果我的频道里面的每一项跟所以频道里的每一项 有不一样的 那么就渲染到推荐频道里面
        return !this.myChannels.find(
          (myChannelItem) => myChannelItem.id === allChannelItem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 90px;
}
:deep(.btn) {
  width: 90px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
