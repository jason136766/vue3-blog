<template>
  <el-menu
      :style="{ boxShadow: `var(--el-box-shadow-light)`,'border-top':'2px solid #409EFF'}"
      mode="horizontal"
      active-text-color="#409EFF"
      :default-active="`${isActive}`"
  >
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

    <el-menu-item class="search">
      <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          size="medium"
          resize="horizontal"
          v-model="search"
          @change="select"
      />
    </el-menu-item>

    <el-menu-item v-if="isLogin" class="action" @click="createArticle">写文章</el-menu-item>

    <el-menu-item v-else class="action" @click="display=true">登录</el-menu-item>

  </el-menu>

  <!-- 登录 -->
  <el-dialog
      v-model="display"
      title="Login"
      :before-close="close"
      width="410px"
      center
  >
    <el-form ref="form" class="login" :rules="rules" :model="ruleForm">
      <el-form-item prop="username">
        <el-input type="text" placeholder="username" v-model.trim="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="password" v-model.trim="ruleForm.password"
                  @keyup.enter="onSubmit"></el-input>
      </el-form-item>

      <el-form-item class="login-submit">
        <el-button type="primary" @click="login" class="submit">Submit</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref, toRaw} from "vue";
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
    let isLogin = ref(false)
    let isActive = ref<string | null>(localStorage.getItem('category_id') ?? '/')
    let search = ref('')
    let form = ref<any>(null)
    let ruleForm = reactive({
      username: '',
      password: '',
    })

    let rules = reactive({
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 5,
          message: '请输入至少 5 位字符',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '请输入至少 6 位字符',
          trigger: 'blur'
        }
      ],
    })

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

      localStorage.removeItem('tag_id')

      router.push('/')
      emit('setCategory', id)
    }

    let close = () => display.value = false

    let login = () => {
      form.value.validate().then(() => {
        axios.post('login', toRaw(ruleForm)).then(res => {
          if (res.status == 200) {
            ElMessage.success('登录成功')
            storage.setExpire('token', res.data.access_token, res.data.expires_in)
            isLogin.value = true
            display.value = false
          }
        })
      }).catch(() => {
        console.log('校验失败');
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
      isLogin,
      isActive,
      search,
      form,
      rules,
      ruleForm,
      currentCategory,
      close,
      login,
      createArticle,
      checkLogin,
      select
    }
  },
})

</script>

<style scoped lang="scss">
.el-menu--horizontal > .el-menu-item, .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}

.el-menu-item {
  font-size: 15px;
}

.action, .search {
  margin-left: auto;
}

.search {
  width: 280px !important;

  &:hover {
    background: none !important;
  }

  margin-left: 0;

  ::v-deep .el-input__inner {
    border-radius: 20px;
  }
}

::v-deep .el-menu-item i {
  font-weight: bold;
}

.login {
  padding: 0 1.5em;

  .el-form-item {
    margin-bottom: 2.5em;
  }

  .login-submit {
    margin-bottom: 1em;
  }

  ::v-deep .submit {
    width: 100% !important;
  }

}

</style>