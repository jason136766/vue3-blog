<template>
  <TheHeader @setCategory="currentCategory" @sendSearch="search"/>

  <el-container>
    <el-main>
      <el-card class="box-card">
        <el-descriptions
            :title="item.title"
            v-for="item in list.result"
            class="article"
            :key="item.id"
            @click="article(item)"
        >
          <el-descriptions-item :label="item.created_at.split(' ', 1).toString()">标签</el-descriptions-item>
        </el-descriptions>

        <el-pagination
            v-model:currentPage="currentPage"
            background
            layout="prev, pager, next"
            :page-count="pageCount"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </el-card>
    </el-main>

    <el-aside width="330px" class="hidden-sm-and-down">
      <Aside/>
    </el-aside>
  </el-container>

</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import helpers from "../utils/helpers";

export default defineComponent({
  name: "Home",
  setup() {
    let router = useRouter()
    let currentPage = ref()
    let list = reactive<any>({})

    onBeforeMount(() => {
      let page = localStorage.getItem('page')
      let val = page ? parseInt(page) : 1

      currentPage.value = val
      helpers.getArticles(list, getParams(val))
    })

    // 总页数
    let pageCount = computed(() => {
      return Math.ceil(list.count / list.page_size)
    })

    let article = (item: any) => {
      router.push(`/articles/${item.id}`)
    }

    // 设置当前分类
    let currentCategory = (id: string) => {
      let params = ''

      if (id) {
        params = `?category_id=${id}`
      }

      localStorage.removeItem('page')
      currentPage.value = 1
      helpers.getArticles(list, params)
    }

    // 设置当前页
    let handleCurrentChange = (val: any) => {
      helpers.getArticles(list, getParams(val))
      currentPage.value = val
      localStorage.setItem('page', val)
    }

    let getParams = (val: any) => {
      let category_id: string | null = localStorage.getItem('category_id')
      let title: string | null = localStorage.getItem('search')
      let params
      if (title) {
        params = category_id ? `?title=${title}&page=${val}` : `?page=${val}`
      } else {
        params = category_id ? `?category_id=${category_id}&page=${val}` : `?page=${val}`
      }

      return params
    }

    let search = (val: string) => {
      helpers.getArticles(list, `?title=${val}`)
    }

    return {
      currentPage,
      list,
      pageCount,
      article,
      handleCurrentChange,
      currentCategory,
      search
    }
  }
})
</script>

<style scoped>
.article {
  margin-bottom: 1em;
  padding: 0.5em 0 0.5em 0;
  border-bottom: 1px solid #E4E7ED;
}

.el-pagination {
  padding: 0.5em 0 0.2em 0 !important;
  margin-left: -0.3em !important;
}

</style>