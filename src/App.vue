<template>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TheHeader from './components/TheHeader.vue'
import Aside from './components/Aside.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    Aside
  },
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
  padding: 0 5em;
}

.el-main {
  --el-main-padding: 25px 20px
}

.el-aside {
  padding: 25px 8px;
}
</style>
