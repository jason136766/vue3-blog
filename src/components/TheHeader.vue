<template>
  <el-menu
      :style="{ boxShadow: `var(--el-box-shadow-light)` }"
      mode="horizontal"
      active-text-color="#ffd04b"
  >
    <el-menu-item>Kevin Blog</el-menu-item>
    <el-menu-item index="/" @click="currentCategory">Home</el-menu-item>
    <el-menu-item
        :index="item.category_name"
        v-for="item in categories"
        :key="item.id"
        @click="currentCategory(item)"
    >
      {{ item.category_name }}
    </el-menu-item>

    <el-menu-item index="about">About</el-menu-item>

    <el-menu-item class="search" width="200px">
      <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          size="medium"
          resize="horizontal"
      />
    </el-menu-item>
    <el-menu-item class="action" @click="login">Login</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import {defineComponent, reactive, onBeforeMount} from "vue";
import {useStore} from "vuex";
import helpers from "../utils/helpers";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "TheHeader",
  setup() {
    let store = useStore()
    let router = useRouter()
    let categories = reactive({})

    onBeforeMount(() => {
      helpers.getCategories(categories)
    })

    let currentCategory = (item: object = {}) => {
      router.push('/')
      store.commit('setCategory_id', item)
    }

    let login = () => {
      router.push('login')
    }

    return {
      categories,
      currentCategory,
      login
    }
  },
})

</script>

<style scoped lang="scss">
.action, .search {
  margin-left: auto;
}

.search {
  &:hover {
    background: none !important;
  }

  margin-left: 2em;

  ::v-deep .el-input__inner {
    border-radius: 20px;
  }
}

::v-deep .el-menu-item i {
  font-weight: bold;
}


</style>