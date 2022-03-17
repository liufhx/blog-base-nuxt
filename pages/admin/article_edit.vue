<template>
  <div class="article-edit">
    <h3>文章编辑</h3>
    <div v-if="$route.query._id&&articleInfo">
      <ArticleEditor :_id="$route.query._id" :article="articleInfo"></ArticleEditor>
    </div>
    <el-result v-else icon="error" title="错误提示" subTitle="编辑文章需要从文章列表跳转">
      <template slot="extra">
        <nuxt-link to="/admin/article_list"><el-button type="primary" size="medium">回到文章列表</el-button></nuxt-link>
      </template>
    </el-result>
  </div>
</template>
<script>
import ArticleEditor from '@admin/ArticleEditor'
export default {
  layout:'admin',
  name:'article_edit',
  components:{
    ArticleEditor
  },
  async asyncData({query,app:{$axios},error}) {
    try{
      let {_id}=query
      if(_id){
        let ret=await $axios.get(`/api/home/article?_id=${_id}`)
        let {meta,result}=ret.data
        let articleInfo={}
        if(meta.status==200){
          articleInfo=result.article
            return {articleInfo}
        }else{
          throw new Error('获取文章失败')
        }
      }
    }catch(err){
      error(err)
    }
  },

}
</script>