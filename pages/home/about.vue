<template>
  <div id="about">
    <div v-if="article">
      
      <div class="article-cover"  v-if="article.cover&&article.cover.length>0">
        <img :src="article.cover" alt="">
      </div>
      <div id="article-content" v-highlight class="article-style" v-html="article.content"></div>
      
    </div>
    <h3 v-else>你若安好，便是晴天</h3>
  </div>
</template>
<script>
import '@/assets/css/article.css'
export default {
  layout:'home',
  name:'about',
  data() {
    return {
      article:null
    }
  },
  async asyncData({$axios,error}) {
    try{
      let page=await require('@/page.json')
      if(page.about){
        let _id=page.about._id
        let ret=await $axios.get(`/api/home/article?_id=${_id}`)
        if(ret.data.meta.status==200){
          let {article}=ret.data.result
          console.log(article)
          return {article}
        }else{
          throw new Error(ret.data.meta.msg)
        }
      }
    }catch(err){
      error(err.message)
    }
  },
}
</script>
<style lang="scss" scoped>
#about{
  padding:20px 5px;
  .article-cover{ 
    &>img{
      border-radius:10px;
      width: 100%;
      box-shadow: 0 0 5px 1px #262626;
    }
  }
  #article-content{
    padding: 10px 0 20px;
    border-bottom: 1px solid #262626;
  }
}
  
</style>