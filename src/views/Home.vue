<template>
  <TheHeader @setCategory="currentCategory" @sendSearch="search"/>

  <el-container>
    <el-main>
      <el-card>
        <div v-for="item in list.result"
             class="post"
             :key="item.id"
             @click="article(item)">

          <div class="post-title">{{ item.title }}</div>
          <el-breadcrumb class="post-info">
            <el-breadcrumb-item>{{ item.created_at.split(' ', 1).toString() }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ tagName(item.id) }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>


        <el-pagination
            v-model:currentPage="currentPage"
            layout="prev, pager, next"
            :page-count="pageCount"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </el-card>


    </el-main>

    <el-aside class="hidden-sm-and-down">
      <Aside @setTag="currentTag"/>
    </el-aside>
  </el-container>

</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, reactive, ref, toRaw} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import helpers from "../utils/helpers";

export default defineComponent({
  name: "Home",
  setup() {
    let router = useRouter()
    let store = useStore()
    let currentPage = ref()
    let list = reactive<any>({})
    let tags = computed(() => store.state.tags).value

    let tagName = (id: string) => {


      let item
      for (let key in tags) {
        if (tags[key].id == id) {
          item = toRaw(tags[key])
        }
      }

      if (item) {
        return item.tag_name
      }
    }


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

    // 设置当前标签
    let currentTag = (id: string) => {
      let params = ''

      if (id) {
        params = `?tag_id=${id}`
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
      tagName,
      article,
      handleCurrentChange,
      currentCategory,
      search,
      currentTag
    }
  }
})
</script>

<style lang="scss" scoped>
.post:first-child .post-title {
  margin-top: 0;
}

.post {
  border-bottom: 1px solid #EBEEF5;

  .post-title {
    margin: 1em 0;
    font-size: 18px;
  }


  .post-info {
    margin-bottom: 1em;
  }

  .post-title:hover {
    cursor: pointer;
    color: #409EFF;
  }


  ::v-deep .el-breadcrumb {
    font-size: 12px;
  }

  ::v-deep .el-breadcrumb__separator {
    font-weight: lighter;
    color: #DCDFE6;
  }

  ::v-deep .el-breadcrumb__inner {
    color: #606266;
  }

}

.el-pagination {
  margin-top: 1em;
  margin-left: -1em !important;
}

</style>