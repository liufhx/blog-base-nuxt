<template>
  <div class="admin-page">
    <el-container>
      <el-header>
        <div class="admin-header">
          <h1>博客后台管理</h1>
          <nav class="admin-user">
            <span v-if="!getUser.username">登录/注册</span>
            <div v-else>
              <span><i class="el-icon-user"></i>{{getUser.username}}</span>    
              <ul>
                <li><a @click="$router.push('/')">首页</a></li>
                <li><a @click="logout">退出</a></li>
              </ul>
            </div>     
          </nav>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside :menu="menu" :select="menuSelect"></Aside>
        </el-aside>
        <el-main>
          <nuxt/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from '@admin/Aside'
export default {
  name:'admin',
  data() {
    return {
      menu:[
        {
          title:'用户管理',
          route:'',
          open:true,
          children:[
            {
              title:'用户列表',
              route:'/admin/user_list'
            },
            {
              title:'用户更改',
              route:'/admin/user_edit'
            },
            {
              title:'用户创建',
              route:'/admin/user_add'
            },
          ],
        },
        {
          title:'文章管理',
          route:'',
          open:true,
          children:[
            {
              title:'文章列表',
              route:'/admin/article_list'
            },
            {
              title:'文章更改',
              route:'/admin/article_edit'
            },
            {
              title:'文章创建',
              route:'/admin/article_add'
            },
          ],     
        },
        {
          title:'设置About页面',
          route:'/admin/about_set'
        }
      ],
      menuSelect:''
    }
  },
  components:{
    Aside
  },
  computed:{
    getUser(){
      return this.$store.state.user
    }
  },
  middleware({redirect,store}){
    if(store.state.user.role!=='admin'){
      redirect('/')
    }
  },
  methods:{
    logout(){
      this.$axios.get('/api/home/logout').then(ret=>{
        let {meta}=ret.data
        if(meta.status==200){
          this.$message({type:'success',showClose:true,message:'退出成功'})
          this.$store.commit('setUser',{})
          this.$router.push('/')
        }else{
          throw new Error('退出失败')
        }
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'退出失败'})
      })
    }
  },
  created(){
    this.menuSelect=this.$route.path
  },
  watch:{
    $route(to,from){
      this.menuSelect=to.path
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-page{
  &>.el-container{
    min-height: 100vh;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    padding-right: 0;
    h1{
      display: inline-block;
      width: fit-content;
      line-height: 60px;
    }
    .admin-user{
      float: right;
      line-height: 60px;
      &>div{
        position: relative;
        &:hover>ul{
          transform: scaleY(1);
        }
        &>ul{
          position: absolute;
          width: 100%;
          z-index: 10;
          top:60px;
          line-height: 40px;
          text-align: center;
          transform: scaleY(0);
          overflow: hidden;
          transform-origin: 0 0;
          transition: all .5s;
          li{
            height: 40px;
            background-color: #b3c0d1;
            
            a{
              display: block;
              width: 100%;
              height: 40px;
              &:hover{
                background-color: #126ed1;
                color:white;
              }
            }
          }
        }
      }
    }
  }
}
  
</style>