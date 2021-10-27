<template>
  <TheHeader/>

  <el-card class="create" :body-style="{padding:'2em'}">
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
                  :value="`${item.id}`"
                  :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="tag">
            <el-select v-model="ruleForm.tag" placeholder="未选择标签">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="content">
        <md-editor v-model="ruleForm.content"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="create">发布</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {computed, defineComponent, reactive, ref, toRaw} from "vue";
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {useStore} from "vuex";
import axios from "../../utils/axios";
import storage from "../../utils/storage"
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Create",
  components: {MdEditor},
  setup() {
    let store = useStore()
    let router = useRouter()
    let categories = computed(() => store.state.categories)
    let form = ref(null)
    let ruleForm = reactive({
      title: '',
      category_id: '',
      tag: '',
      content: ''
    })

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
          required: true,
          message: '请选择分类',
          trigger: 'change'
        }
      ],
      tag: [
        {
          required: true,
          message: '请选择标签',
          trigger: 'change'
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

    let create = () => {
      form.value.validate().then(() => {
        console.log(toRaw(ruleForm))
        axios.post('articles', toRaw(ruleForm), {
          headers: {
            'Authorization': storage.getExpire('token')
          }
        }).then(res => {
          console.log(res)
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
      create
    }
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