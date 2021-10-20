<template>
  <TheHeader/>

  <el-container>
    <el-main>
      <el-card class="box-card">
        <el-descriptions
            :title="item.title"
            v-for="item in articles"
            class="article"
            :key="item.id"
            @click="article(item)"
        >
          <el-descriptions-item :label="item.created_at.split(' ', 1).toString()">标签</el-descriptions-item>
        </el-descriptions>

        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </el-card>
    </el-main>

    <el-aside width="350px" class="hidden-sm-and-down">
      <Aside/>
    </el-aside>
  </el-container>

</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Home",
  setup() {
    let store = useStore()
    let router = useRouter()
    let articles = computed(() => store.getters.getArticles);

    let article = (item: any) => {
      router.push(`/articles/${item.id}`)
    }

    return {
      articles,
      article
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