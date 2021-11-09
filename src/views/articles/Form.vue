<template>
  <TheHeader/>

  <el-card class="create" :body-style="{padding:'2em 2em 0.2em 2em'}">
    <div class="title">新建博文</div>
    <el-form :rules="rules" :model="ruleForm" ref="form">
      <el-row :gutter="22">
        <el-col :span="14">
          <el-form-item prop="title">
            <el-input placeholder="标题" v-model="ruleForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="category_id">
            <el-select v-model="ruleForm.category_id" placeholder="未选择分类">
              <el-option
                  :label="item.category_name"
                  v-for="item in categories"
                  :value="item.id"
                  :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="tag">
            <el-select v-model="ruleForm.tag_id" placeholder="未选择标签">
              <el-option
                  :label="item.tag_name"
                  v-for="item in tags"
                  :value="item.id"
                  :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="content">
        <v-md-editor v-model="ruleForm.content" :include-level="[3,4]" height="600px"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onBeforeMount, onMounted, reactive, ref, toRaw} from "vue";
import {useStore} from "vuex";
import axios from "../../utils/axios";
import storage from "../../utils/storage"
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import helpers from "../../utils/helpers";

export default defineComponent({
  name: "Form",
  setup() {
    let store = useStore()
    let router = useRouter()
    let route = useRoute()
    let categories = store.state.categories
    let tags = store.getters.getTags
    let form = ref<any>(null)
    let article = <any>{}
    let ruleForm = reactive<any>({
      title: '',
      category_id: '',
      tag_id: '',
      content: ''
    })

    onBeforeMount(async () => {
      if (route.params.id) {
        await helpers.getArticle(article, <any>route.params.id)
      }

      ruleForm.title = article.title
      ruleForm.category_id = article.category_id
      ruleForm.tag_id = article.tag_id
      ruleForm.content = article.content
      ruleForm.id = article.id
    })

    let checkSelected = (rule: any, value: any, callback: any) => {
      if (ruleForm.category_id == '' && ruleForm.tag_id == '') {
        return callback(new Error('分类和标签至少选择一项'))
      }
      callback()
    }

    let rules = reactive({
      title: [
        {
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        },
        {
          min: 5,
          message: '请输入至少 5 位字符',
          trigger: 'blur'
        }
      ],
      category_id: [
        {
          validator: checkSelected,
          trigger: 'change',
        }
      ],
      tag_id: [
        {
          trigger: 'change',
          validator: checkSelected
        }
      ],
      content: [
        {
          required: true,
          message: '请输入内容',
          trigger: 'change'
        }
      ],
    })

    let publish = () => {
      form.value.validate().then(() => {
        let method = route.params.id ? 'patch' : 'post'

        axios({
          headers: {
            'Authorization': storage.getExpire('token')
          },
          method: <any>method,
          url: 'articles',
          data: toRaw(ruleForm)
        }).then(res => {
          if (res.status == 200) {
            ElMessage.success('发布成功')
            router.push('/')
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        console.log('校验失败');
      })
    }

    return {
      rules,
      categories,
      ruleForm,
      form,
      tags,
      publish,
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if (!storage.getExpire('token')) {
      next('/')
    }

    next()
  }

})
</script>

<style scoped lang="scss">
.title {
  font-size: 25px;
  font-weight: 400;
  text-align: center;
  color: #606266;
  margin-bottom: 1em;
}

.create {
  margin: 2em 9em;
}

.el-select {
  width: 100%;
}
</style>