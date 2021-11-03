<template>
  <el-space direction="vertical" :size="size" :fill="true" class="aside">
    <el-card class="box-card profile">
      <div>
        <el-avatar :size="80" src="/avatar.jpeg"></el-avatar>
      </div>
      <div class="motto">
        <div class="name">Steven</div>
        <div>write code and love life</div>
      </div>

    </el-card>
    <el-card class="box-card">
      <el-divider content-position="center">标签</el-divider>
      <el-badge :value="item.counter" class="item" type="info" v-for="item in tags" :max="99">
        <el-button plain size="mini" @click="currentTag(item.id)" :autofocus="index == item.id ? true : false">
          {{ item.tag_name }}
        </el-button>
      </el-badge>
    </el-card>
  </el-space>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Aside",
  emits: ['setTag'],
  setup(props, {emit}) {
    let store = useStore()
    let router = useRouter()
    let tags = store.getters.getTags
    let index = ref<any>(null)

    onBeforeMount(() => {
      index.value = localStorage.getItem('tag_id')
    })

    let currentTag = (id: string) => {
      if (id) {
        localStorage.setItem('tag_id', id)
        index.value = id
      }

      router.push('/')
      emit('setTag', id)
    }
    return {
      size: 'large',
      tags,
      index,
      currentTag
    }
  },

})
</script>

<style scoped lang="scss">
.aside {
  font: 400 16px/1.42 -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  width: 100%;
}

.motto {
  .name {
    margin: 1em 0;
  }

  font-weight: 300;
}

.profile {
  padding: 5px 0;

  div {
    text-align: center;
  }

}

.item {
  margin: 1.1em 0.98em 0 0;
}

.el-button--mini {
  min-height: 15px;
  padding: 7px 9px;
}

.el-divider--horizontal {
  margin: 5px 0 10px 0;
}
</style>