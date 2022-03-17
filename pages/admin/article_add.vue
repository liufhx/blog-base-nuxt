<template>
  <div class="article-add">
    <h3> 文章创建</h3>
    <ArticleEditor></ArticleEditor>
  </div>
</template>
<script>
import ArticleEditor from '@admin/ArticleEditor'

export default {
  layout:'admin',
  name:'article_add',
  components:{
    ArticleEditor
  },
}
</script>