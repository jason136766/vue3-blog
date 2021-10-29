<template>
  <el-menu
      :style="{ boxShadow: `var(--el-box-shadow-light)`}"
      mode="horizontal"
      active-text-color="#409EFF"
      :default-active="`${isActive}`"
  >
    <el-menu-item>Kevin Blog</el-menu-item>
    <el-menu-item index="/" @click="currentCategory('')">Home</el-menu-item>
    <el-menu-item
        :index="`${item.id}`"
        v-for="item in categories"
        :key="item.id"
        @click="currentCategory(item.id)"
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
          v-model="search"
          :clearable="true"
          @change="select"
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
        <el-input type="text" placeholder="username" v-model.trim="username"></el-input>
      </div>
      <div>
        <el-input type="password" placeholder="password" v-model.trim="password"
                  @keyup.enter="onSubmit"></el-input>
      </div>

      <div>
        <el-button type="primary" @click="onSubmit" class="submit">Login</el-button>
      </div>
    </el-form>

  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import axios from "../utils/axios";
import storage from "../utils/storage";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "TheHeader",
  emits: ['setCategory', 'sendSearch'],
  setup(props, {emit}) {
    let store = useStore()
    let router = useRouter()
    let categories = store.getters.getCategories
    let display = ref(false)
    let username = ref('')
    let password = ref('')
    let isLogin = ref(false)
    let isActive = ref<string | null>(localStorage.getItem('category_id') ?? '/')
    let search = ref('')

    onBeforeMount(() => {
      checkLogin()
    })

    let currentCategory = (id: string) => {

      if (id) {
        localStorage.setItem('category_id', id)
        isActive.value = id
      } else {
        localStorage.removeItem('category_id')
      }

      router.push('/')
      emit('setCategory', id)
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

    let select = (val: string) => {
      if (val) {
        localStorage.setItem('search', val)
      } else {
        localStorage.removeItem('search')
      }

      isActive.value = '/'
      localStorage.removeItem('page')
      emit('sendSearch', val)
    }

    return {
      categories,
      display,
      username,
      password,
      isLogin,
      isActive,
      search,
      currentCategory,
      close,
      onSubmit,
      createArticle,
      checkLogin,
      select
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