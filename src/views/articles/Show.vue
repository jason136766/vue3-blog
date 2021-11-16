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

          <Edit v-if="isLogin" class="edit" @click="articleEdit"/>
        </div>

        <div class="divider"></div>

        <v-md-editor v-model="article.content" mode="preview" ref="preview"/>
      </el-card>

    </el-main>
    <el-aside class="hidden-sm-and-down">
      <el-card class="anchor" :class="{isFixed:isFixed}">
        <div
            v-for="(item, index) in anchors"
            :style="{ padding: `5px 0 5px ${item.indent * 20}px` }"
            @click="handleAnchorClick(item)"
        >
          <a style="cursor: pointer" :class="{isActive: isActive==index}">{{ item.title }}</a>
        </div>
      </el-card>

    </el-aside>
  </el-container>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect
} from "vue";
import helpers from "../../utils/helpers";
import {useRoute, useRouter} from "vue-router";
import {Edit} from "@element-plus/icons"
import {useStore} from "vuex";
import Aside from "../../components/Aside.vue";


export default defineComponent({
  name: "Article",
  components: {Aside, Edit},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const aside = ref<any>('')
    let article = reactive<any>({});
    let isLogin = computed(() => store.state.isLogin);
    let preview = ref<any>(null);
    let anchors = reactive<any>({});
    let isActive = ref<number>(0)
    let isFixed = ref(false)

    let created_at = computed(() => {
      if (article.created_at) {
        return article.created_at.split(' ', 1).toString()
      }
    })

    onBeforeMount(() => {
      helpers.getArticle(article, <any>route.params.id)
    })

    onDeactivated(() => {
      window.removeEventListener('scroll', onScroll)
    })

    watchEffect(() => {
      if (article.content) {
        nextTick(() => {
          getAnchors()

          window.addEventListener('scroll', onScroll, false)
        })
      }
    })

    const getAnchors = () => {
      const hDomes = preview.value.$el.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let titles = Array.from(hDomes).filter((title: any) => !!title.innerText.trim());

      if (!titles.length) {
        return;
      }

      const hTags = Array.from(new Set(titles.map((title: any) => title.tagName))).sort();

      titles = titles.map((el: any) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));

      Object.assign(anchors, titles)
    }

    const handleAnchorClick = (anchor: any) => {
      let {lineIndex} = anchor;
      let heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      if (heading) {
        window.scrollTo({
          top: heading.offsetTop + 200,
          behavior: "smooth",
        });
      }

    }

    const articleEdit = () => {
      localStorage.setItem('article', JSON.stringify(article))
      router.push(`/articles/edit/${article.id}`)
    }

    const onScroll = () => {
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      if (scrollTop > 90) {
        isFixed.value = true
      } else {
        isFixed.value = false
      }

      if (scrollTop == 0) {
        isActive.value = 0
      }

      // 获取所有锚点元素
      const hDomes = preview.value.$el.querySelectorAll('h1, h2, h3, h4, h5, h6')
      // 所有锚点元素的 offsetTop
      const offsetTopArr: any[] = []
      hDomes.forEach((item: { offsetTop: any; }) => {
        offsetTopArr.push(item.offsetTop)
      })

      // 定义当前点亮的导航下标
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop >= offsetTopArr[n] + 200) {
          isActive.value = n
        }
      }

    }

    return {
      article,
      created_at,
      isLogin,
      preview,
      anchors,
      isActive,
      aside,
      isFixed,
      onScroll,
      articleEdit,
      handleAnchorClick,
    }
  }
})
</script>

<style scoped lang="scss">
.article {
  padding: 0.5em 1em;

  .title {
    margin-bottom: 1em;
    font-size: 22px;
    color: #434343;
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
    color: #606266;
  }

  .divider {
    margin: 10px 0 20px 0;
    border-bottom: 1px solid #EBEEF5;
  }

  ::v-deep .github-markdown-body:not(.custom) {
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

.isActive {
  color: #409EFF;
  font-weight: bold;
}


.isFixed {
  position: fixed;
  width: 254px;
  top: 0;
  z-index: 100;
}

.anchor {
  width: 240px;
  color: #7c8087;
  font-size: 14px;
}

::v-deep .github-markdown-body {
  color: #606266;


  h2, h3, h4, h5, h6 {
    color: #555555;
  }

  letter-spacing: 0.06em;

  p, li {
    margin: 0.5em 0;
    line-height: 25px;
  }
}

</style>