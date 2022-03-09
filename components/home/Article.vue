<template>
  <div id="article" >
    <section v-if="article">
      <div class="article-title"> {{article.title}}</div>
      <div class="article-info">
        <span>{{article.author}}</span>
        <span>{{article.createDate}}</span>
      </div>
      <div class="article-cover"  v-if="article.cover&&article.cover.length>0">
        <img :src="article.cover" alt="">
      </div>
      <div id="article-content" v-highlight class="article-style" v-html="article.content"></div>

      <div class="article-comment">comment</div>
    </section>
    <section v-else>
      文章不存在
    </section>
  </div>
  
</template>
<script>
import '@/assets/css/article.css'
export default {
  name:'Article',
  data() {
    return {
      article:null,
      comment:null  
    }
  },
  async fetch(){
    let {_id}=this.$route.query
    await Promise.all([
      this.$axios.get(`/api/home/article?_id=${_id}`),
      this.$axios.get(`/api/home/comment_list?aid=${_id}`)
    ]).then(ret=>{
      if(ret[0])if(ret[0].data.meta.status==200)this.article=ret[0].data.result.article
      if(ret[1])if(ret[1].data.meta.status==200)this.comment=ret[1].data.result.commentList
    })
  }
}
</script>
<style lang="scss" scoped>
#article{
  padding: 10px 10px;
  background-color: #eeeeee;

  color: #262626;
  &>div{
    padding: 5px 0;
  }
  span{
    display: inline-block;
    &:not(:last-child){
      padding-right: 10px;
      // border-right:1px solid #262626 ;
    }
    &:not(:first-child){
      padding-left: 5px;
    }
  }
  .article-title{
    font-size:30px ;
    font-weight: 600;   
  }
  .article-cover{ 
    img{
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