<template>
  <TheHeader/>

  <el-container>
    <el-main>
      <el-card class="article">

        <div class="title">
          {{ article.title }}
        </div>

        <div class="describe">
          <el-breadcrumb class="post-info">
            <el-breadcrumb-item>{{ created_at }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ article.read_minutes }} min read</el-breadcrumb-item>
          </el-breadcrumb>

          <Edit v-if="isLogin" class="edit"/>
        </div>

        <div class="divider"></div>

        <v-md-editor v-model="article.content" mode="preview"/>
      </el-card>

    </el-main>

    <el-aside class="hidden-sm-and-down">
      <Aside/>
    </el-aside>
  </el-container>
</template>

<script>
import {computed, defineComponent, onBeforeMount, reactive} from "vue";
import helpers from "../../utils/helpers";
import {useRoute} from "vue-router";
import {Edit} from "@element-plus/icons"
import {useStore} from "vuex";


export default defineComponent({
  name: "Article",
  components: {Edit},
  setup() {
    let route = useRoute()
    let store = useStore()
    let article = reactive({})
    let isLogin = computed(() => store.state.isLogin)


    let created_at = computed(() => {
      if (article.created_at) {
        return article.created_at.split(' ', 1).toString()
      }
    })

    onBeforeMount(() => {
      helpers.getArticle(article, route.params.id)
    })

    return {
      article,
      created_at,
      isLogin
    }
  }
})
</script>

<style scoped lang="scss">
.article {
  padding: 1em;

  .title {
    margin-bottom: 1em;
    font-size: 18px;
  }

  .describe {
    height: 12px;

    .post-info, .edit {
      display: inline-block;
    }

    .post-info {
      font-size: 12px;
      float: left;
    }

    .edit {
      :hover {
        cursor: pointer;
      }

      width: 12px;
      height: 12px;
      color: #7c8087;
      float: right;
    }
  }


  ::v-deep .el-breadcrumb__inner {
    color: #7c8087;
  }

  .divider {
    margin: 10px 0 20px 0;
    border-bottom: 1px solid #EBEEF5;
  }

  ::v-deep .vuepress-markdown-body:not(.custom) {
    padding: 0;
  }

}


.nav-bottom {
  .prev {
    float: left
  }

  .next {
    float: right;
  }
}
</style>