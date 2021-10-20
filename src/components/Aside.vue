<template>
  <el-space direction="vertical"
            style="width:100%"
            :size="size" :fill="true"
  >
    <el-card class="box-card">
      <div>1</div>
      <div>1</div>
      <div>1</div>
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

<style scoped>

</style>