<template>
  <div class="article-list">
    <h3>文章列表</h3>
    <el-table :data="articleList">
      <el-table-column prop="createDate" label="创建日期">
        <template slot-scope="scope">
          <span>{{dateFormat(scope.row.createDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.category}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm @confirm="articleDelete(scope.row._id)" :title="`确定删除文章${scope.row.title}吗?`">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
          <el-button type="text" size="small" @click="articleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      v-if="pageInfo"
      layout="prev,pager,next"
      :total="pageInfo.count"
      :current-page="pageInfo.page"
      @current-change="pageChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  layout:'admin',
  name:'article_list',
  async asyncData({app:{$axios},error,query}) {
    let {page}=query
    page=page||1
    try{
      let ret=await $axios.get(`/api/home/article_list?page=${page}`)
      let {meta,result}=ret.data
      if(meta.status==200){
        let {articleList,pageInfo}=result
        return {articleList,pageInfo}
      }else{
        throw(new Error('获取用户列表失败'))
      }
    }catch(err){
      error(err)
    }
  },
  methods:{
    dateFormat(date){
      return this.$dayjs(date).format('YYYY-MM-DD')
    },
    pageChange(page){
      this.$route.query.page=page
      this.getArticleList()
    },
     //更新文章列表
    getArticleList(){
      let {page}=this.$route.query
      page=page||1
      this.$axios.get(`/api/home/article_list?page=${page}`).then(ret=>{
        let {meta,result}=ret.data
        if(meta.status==200){
          let {articleList,pageInfo}=result
          this.articleList=articleList
          this.pageInfo=pageInfo
        }else{
          this.$message({type:'error',showClose:true,message:'更新文章列表失败'})
        }
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'更新文章列表失败'})
      })
    },
    articleDelete(_id){
      this.$axios.get(`/api/admin/article_delete?_id=${_id}`).then(ret=>{
        let {meta}=ret.data
        if(meta.status==200){
          this.$message({type:'success',showClose:true,message:'删除文章成功'})
          this.getArticleList()
        }else{
          this.$message({type:'error',showClose:true,message:'删除文章失败'})
        }
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'删除文章失败'})
      })
    },
    articleEdit(article){
      this.$router.push({
        name:'admin-article_edit',
        query:{_id:article._id}
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.article-list{
  ::v-deep.el-button{
    span:hover{
      cursor: pointer;
    }
  }
}
</style>