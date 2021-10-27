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

    <el-menu-item v-if="isLogin" class="action" @click="createArticle">写文章</el-menu-item>

    <el-menu-item v-else class="action" @click="display=true">登录</el-menu-item>

  </el-menu>

  <!-- 登录 -->
  <el-dialog
      v-model="display"
      title="登录"
      :before-close="close"
      width="410px"
      center
  >
    <el-form ref="form" class="login">
      <div>
        <el-input type="text" placeholder="username" v-model="username"></el-input>
      </div>
      <div>
        <el-input type="password" placeholder="password" v-model="password"></el-input>
      </div>

      <div>
        <el-button type="primary" @click="onSubmit" class="submit">Login</el-button>
      </div>
    </el-form>

  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeMount,
  ref,
  computed,
  getCurrentInstance,
  ComponentInternalInstance
} from "vue";
import {useStore} from "vuex";
import helpers from "../utils/helpers";
import {useRouter} from "vue-router";
import axios from "../utils/axios";
import storage from "../utils/storage";
import {is} from "../../../vue-vben-admin/src/utils/is";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "TheHeader",
  setup() {
    let store = useStore()
    let router = useRouter()
    let categories = computed(() => store.getters.getCategories)
    let display = ref(false)
    let username = ref('')
    let password = ref('')
    let isLogin = ref(false)

    onBeforeMount(() => {
      checkLogin()
    })

    let currentCategory = (item: object = {}) => {
      router.push('/')
      store.commit('setCategory_id', item)
    }

    let close = () => display.value = false

    let onSubmit = () => {
      axios.post('login', {username: username.value, password: password.value}).then(res => {
        if (res.status == 200) {
          ElMessage.success('登录成功')
          storage.setExpire('token', res.data.access_token, res.data.expires_in)
          isLogin.value = true
          display.value = false
        }
      })
    }

    let createArticle = () => {
      router.push('/articles/create')
    }

    let checkLogin = () => {
      if (storage.getExpire('token')) {
        return isLogin.value = true
      }
      return isLogin.value = false
    }

    return {
      categories,
      display,
      username,
      password,
      isLogin,
      currentCategory,
      close,
      onSubmit,
      createArticle,
      checkLogin
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


.login {
  padding: 0 1.5em;

  div {
    margin-bottom: 1.2em;
  }

  ::v-deep .submit {
    width: 100% !important;
  }

}

</style>