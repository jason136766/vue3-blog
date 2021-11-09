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
      <el-divider content-position="center" class="tag-header">标签</el-divider>


      <el-row :gutter="15">
        <el-col
            :span="8"
            v-for="item in tags"
            class="tags"
            @click="currentTag(item.id)"
        >
          <div class="tag" :class="{selected : index == item.id}">
            {{ item.tag_name }}
            <span>{{ item.counter }}</span>
          </div>
        </el-col>
      </el-row>

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
      size: 25,
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
  margin: 1.1em 1.5em 0 0;
}

.el-button--mini {
  min-height: 15px;
  padding: 7px 9px;
}

.el-divider--horizontal {
  margin: 5px 0 10px 0;
}

.selected {
  color: #409EFF !important;
  background-color: #ecf5ff;
  border: 1px solid #b3d8ff;
  box-shadow: none;

  span {
    background-color: #409EFF !important;
  }
}

.tag-header {
  margin-bottom: 8px;
}

.tags {
  margin-top: 15px;

  .tag {
    &:hover {
      cursor: pointer;
    }

    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 13px;
    color: #606266;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;

    span {
      color: #FFFFFF;
      background-color: #b6b7b9;
      display: inline-block;
      height: 11px;
      line-height: 11px;
      padding: 2px 3px;
      border-radius: 2px;
    }
  }
}

</style>