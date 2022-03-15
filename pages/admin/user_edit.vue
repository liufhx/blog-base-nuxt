<template>
  <div class="user-edit">
    <div v-if="$route.query._id&&userInfo">
      <UserEditor :_id="$route.query._id" :user="userInfo"></UserEditor>
    </div>
    <el-result v-else icon="error" title="错误提示" subTitle="更改用户需要从用户列表跳转">
      <template slot="extra">
        <nuxt-link to="/admin/user_list"><el-button type="primary" size="medium">回到用户列表</el-button></nuxt-link>
      </template>
    </el-result>
  </div>
</template>
<script>
import UserEditor from '@admin/UserEditor'
export default {
  layout:'admin',
  name:'user_edit',
  components:{
    UserEditor
  },
  data() {
    return {
      userInfo:false
    }
  },
  created() {
    let {_id}=this.$route.query
    let {userInfo}=this.$route.params
    if(_id&&userInfo){
      let{username,email,role,state}=userInfo
      this.userInfo={
        _id,username,email,role,state,
        password:'',
        oldPwd:''
      }
    }
  },
  
}
</script>