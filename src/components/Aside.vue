<template>
  <el-space direction="vertical"
            style="width:100%"
            :size="size" :fill="true"
  >
    <el-card class="box-card profile">
      <div>
        <el-avatar :size="60" src="/avatar.jpeg"></el-avatar>
      </div>
      <div>write code and love life</div>
    </el-card>

    <el-card class="box-card">
      <el-badge :value="item.counter" class="item" type="primary" v-for="item in tags">
        <el-button size="mini">{{ item.tag_name }}</el-button>
      </el-badge>

    </el-card>
  </el-space>
</template>

<script>
import {defineComponent} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "Aside",
  setup() {
    let store = useStore()
    let tags = store.getters.getTags
    return {
      size: 'large',
      tags
    }
  },

})
</script>

<style scoped lang="scss">
.profile {
  padding: 5px 0;

  div {
    text-align: center;
  }

  :nth-child(2) {
    margin-top: 1em;
  }

}

.item {
  margin: 1em 0.9em 0 0;
}

.el-button--mini {
  min-height: 15px;
  padding: 7px 10px;
}
</style>