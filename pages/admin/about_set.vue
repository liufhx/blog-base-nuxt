<template>
  <div class="article-list">
    <h3>设置About页面</h3>
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
          <el-popconfirm @confirm="setAbout(scope.row._id)" :title="`确定设置该文章到About页面吗?`">
            <el-button slot="reference" type="text" size="small">设置</el-button>
          </el-popconfirm>
          
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
      let ret=await $axios.get(`/api/admin/article_list?page=${page}`)
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
      this.$axios.get(`/api/admin/article_list?page=${page}`).then(ret=>{
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
    setAbout(_id){
      this.$axios.get(`/api/admin/about_set?_id=${_id}`).then(ret=>{
        if(ret.data.meta.status==200){
           this.$message({type:'success',showClose:true,message:'设置about页面_id成功'})
        }else{
          throw new Error(ret.data.meta.msg)
        }
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'设置about页面_id失败'})
      })
    }
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