<template>
  <div>
    文章创建
    
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