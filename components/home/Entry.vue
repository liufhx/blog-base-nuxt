<template>
  <div id="entry-wrap">
    <div class="entry" v-for="(item,index) in entries" :key="index">
      <div class="entry-left">
        <h1>{{item.title}}</h1>
        <div class="entry-category">
          <span>分类:</span>
          <a href="">{{item.category}}</a>
        </div>
        <div class="entry-content" v-html="item.abstract"></div>

        
      </div>
      <div class="entry-right">
        <img :src="item.cover">
        <ul>
          <li>标签:</li>
          <li v-for="(item1,index1) in item.tags" :key="index1">
            <a href="">{{item1}}</a>
          </li>
        </ul>
      </div>
      <div class="entry-bottom">
        <ul>
          <li>{{item.author}}</li>
          <li>{{item.createDate}}</li>
        </ul>
      </div>

    </div>
    <el-pagination
      layout="prev,pager,next"
      :total="pageInfo.count"
      :current-page="pageInfo.page"
      @current-change="pageChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'Entry',
  data() {
    return {
      entries:[],
      pageInfo:{}
    }
  },
  async fetch(){
    let page=this.$route.query.page||1
    await this.$axios.get(`/api/home/article_list?page=${page}`)
    .then(ret=>{
      this.entries=ret.data.result.articleList
      this.pageInfo=ret.data.result.pageInfo
    })
  },
  
  methods:{
    getEntry(page){
      this.$axios.get(`/api/home/article_list?page=${page}`)
      .then(ret=>{
        this.entries=ret.data.result.articleList
        this.pageInfo=ret.data.result.pageInfo
      })
    },
    pageChange(page){
      this.getEntry(page)
    }
  }
}
</script>
<style lang="scss" scoped>
#entry-wrap{
  background:#eeeeee;
  padding-top: 5px;
  font-size: 14px;
  .entry{
    cursor:pointer;
    margin-bottom:15px ;
    overflow: hidden;
    border-radius: 10px;
    padding-top: 5px;
    background: white;
    box-shadow: 1px 1px 5px 1px rgba(48, 24, 24, 0.493);
    &:hover{
      background: #fafafa;
      box-shadow: 2px 2px 5px 1px rgba(48, 24, 24, 0.493);
    }
    a{   
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
      display: inline-block;
      background-color: #b1d0ee;
      border-radius: 15px;
      padding: 0 0.5em;
      vertical-align:middle;
      &:hover{
        background-color: #267dcc;
        color:#ffffff;
      }
    }
    .entry-left{
      width: 60%;
      display: inline-block;
      height: 200px;
      h1{
        border-left: 5px solid #27a6cb;
        text-indent: 1em;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .entry-category{
        padding: 5px 0 5px 2em;
        border-bottom:0.5px solid   #dadada;
      
      }
      .entry-content{
        height:140px;
        overflow: hidden;
        padding: 5px 0 0 2em;
      }
    }
    .entry-right{
      width: 35%;
      float: right;
      img{
        display: block;
        margin: 10px auto;
        width: 80%;
        border-radius: 5%;
      }
      ul{
        height: 140px;
        overflow: hidden;
        padding-right: 4px;
        margin-left:20px;
       
        li{
          display: inline-block;    
          margin-bottom: 5px;
        }
      }
    }
    .entry-bottom{
      border-top:0.5px solid   #dadada;
      padding: 5px 0 5px 2em;
      ul{
        li{
          display: inline-block;
        }
      }
    } 
  }


}
  
</style>