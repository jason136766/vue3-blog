<template>
  <TheHeader/>

  <el-container>
    <el-main>
      <el-card class="box-card">
        <div>
          <div class="title">
            {{ article.title }}
          </div>
          <div class="describe">
            {{ created_at }}
          </div>
        </div>
        <el-divider></el-divider>
        
        <v-md-editor :value="article.content" mode="preview"></v-md-editor>

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

export default defineComponent({
  name: "Article",
  setup() {
    let route = useRoute()
    let article = reactive({})

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
    }
  }
})
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 1em
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