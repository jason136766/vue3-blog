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
      <div>2</div>
      <div>2</div>
      <div>2</div>
    </el-card>
  </el-space>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Aside",
  setup() {
    return {
      size: 'large'
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
</style>