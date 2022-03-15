<template>
  <div class="user-list">
    <el-table :data="userList">
      <el-table-column prop="createDate" label="创建日期">
        <template slot-scope="scope">
          <span>{{dateFormat(scope.row.createDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色">
        <template slot-scope="scope">
          <span>{{scope.row.role==='admin'?'管理员':'普通用户'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.state==0?'启用':'禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm @confirm="userDelete(scope.row._id)" :title="`确定删除用户${scope.row.username}吗?`">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
          <el-button type="text" size="small" @click="userEdit(scope.row)">编辑</el-button>
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
  name:'user_list',
  async asyncData({app:{$axios},error,query}) {
    let {page}=query
    page=page||1
    try{
      let ret=await $axios.get(`/api/admin/user_list?page=${page}`)
      let {meta,result}=ret.data
      if(meta.status==200){
        let {userList,pageInfo}=result
        return {userList,pageInfo}
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
    //用户删除
    userDelete(_id){
      this.$axios.get(`/api/admin/user_delete?_id=${_id}`).then(ret=>{
        let {meta}=ret.data
        if(meta.status==200){
          this.$message({type:'success',showClose:true,message:'删除用户成功'})
          this.getUserList()
        }else{
          this.$message({type:'error',showClose:true,message:'删除用户失败'})
        }
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'删除用户失败'})
      })
    },
    userEdit(user){
      this.$router.push({
        name:'admin-user_edit',
        query:{_id:user._id},
        params:{userInfo:user}})
    },
    //更新用户列表
    getUserList(){
      let {page}=this.$route.query
      page=page||1
      this.$axios.get(`/api/admin/user_list?page=${page}`).then(ret=>{
        let {meta,result}=ret.data
        if(meta.status==200){
          let {userList,pageInfo}=result
          this.userList=userList
          this.pageInfo=pageInfo
        }else{
          this.$message({type:'error',showClose:true,message:'更新用户列表失败'})
        }
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'更新用户列表失败'})
      })
    },
    pageChange(page){
      this.$route.query.page=page
      this.getUserList()
    },


  }
}
</script>