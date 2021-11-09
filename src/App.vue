<template>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss">
body {
  background-color: #eff2f5;
}

* {
  margin: 0;
  padding: 0;
}

.el-container, .el-menu {
  padding: 0 8em !important;
}

.el-main {
  --el-main-padding: 25px 20px !important;
}

.el-aside {
  padding: 25px 8px;
  --el-aside-width: 270px !important;
}
</style>
