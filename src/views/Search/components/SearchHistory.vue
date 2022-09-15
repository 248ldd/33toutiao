<template>
  <div>
    <!-- 搜索历史标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else class="">
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span
          >&nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史内容 -->
    <!-- 点击搜索历史的时候 就是把点击的那个item传给搜索框 执行搜索框并执行 -->
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEdit"
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>
<!-- ~~~~(>_<)~~~~🧙🏻‍♂️🐾 🦩  -->
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  methods: {},
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
