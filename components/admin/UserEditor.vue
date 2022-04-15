<template>
  <div class="user-editor">
    <el-form :model="userInfo" :rules="userInfoRules" ref="userForm" label-width="70px"  label-position="left">
      <el-form-item  v-if="_id" label="id:" >
        <el-input v-model="userInfo._id" disabled></el-input>
      </el-form-item>
      <el-form-item  label="用户名:" prop="username">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item  label="邮箱:" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item  :label="userInfo._id?'新密码:':'密码'" prop="password">
        <el-input v-model="userInfo.password" show-password></el-input>
      </el-form-item>
      <el-form-item  v-if="_id" label="旧密码:" prop="oldPwd">
        <el-input v-model="userInfo.oldPwd" show-password></el-input>
      </el-form-item>
      <el-form-item  label="角色:">
        <el-select v-model="userInfo.role" placeholder="请选择">
          <el-option label="普通用户" value="normal"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="状态:">
        <el-select v-model="userInfo.state" placeholder="请选择">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      

      <el-form-item v-if="_id">
        <el-button @click="userModify" type="primary" >更改</el-button>  
      </el-form-item>
      <el-form-item v-else>
        <el-button @click="userAdd" type="primary" >创建</el-button>  
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name:'UserEditor',
  data() {
    return {
      userInfo:{
        username:'',
        email:'',
        password:'',
        role:'normal',
        state:'0'
      },
      userInfoRules:{
        username:[
          {required:true,message:'请输入用户名',trigger: 'blur'},
          {
            type:'string',
            min:2,
            max:16,
            transform(value){
              return value.trim()
            },
            message:'用户名格式错误,用户名长度为2-16字符',
            trigger: 'blur'
          }
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger: 'blur'},
          {type:'email',message:'邮箱格式错误',trigger: 'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {
            type:'string',
            pattern:/^[a-zA-z0-9\.,!@#$%\^&*]{8,30}$/g,
            transform(value) {
              return value.trim()
            },
            message:'密码格式错误,密码长度为8-30的数字或字符',
            trigger:['blur']
          }
        ],
        oldPwd:[
          {required:true,message:'请输入旧密码',trigger:'blur'},
          {
            type:'string',
            pattern:/^[a-zA-z0-9]{8,30}$/g,
            transform(value) {
              return value.trim()
            },
            message:'密码格式错误,密码长度为8-30的字符',
            trigger:['blur']
          }
        ]
  
      }
    }
  },
  props:['_id','user'],
  created(){
    if(this._id&&this.user){
      this.userInfo={...this.user,state:''+this.user.state}
    }
  },
  methods:{
    userAdd(){
      this.$refs.userForm.validate(flag=>{
        if(flag){
          this.$axios({
            method:'post',
            url:'/api/admin/user_add',
            data:this.userInfo
          }).then(ret=>{
            if(ret.data.meta.status==200){
              this.$message({type:'success',showClose:true,message:'创建用户成功'})
              this.$router.push('/admin/user_list')
            }else{
              this.$message({type:'error',showClose:true,message:'创建用户失败'})
            } 
          }).catch(err=>{
            this.$message({type:'error',showClose:true,message:'创建用户失败'})
          })
        }else{
          this.$message({type:'error',showClose:true,message:'请正确填写表单'})
        }
      })
    },
    userModify(){
      this.$refs.userForm.validate(flag=>{
        if(flag){
          this.$axios({
            method:'post',
            url:'/api/admin/user_modify',
            data:this.userInfo
          }).then(ret=>{
            if(ret.data.meta.status==200){
              this.$message({type:'success',showClose:true,message:'更改用户成功'})
              this.$router.push('/admin/user_list')
            }else{
              this.$message({type:'error',showClose:true,message:'更改用户失败'})
            } 
          }).catch(err=>{
            this.$message({type:'error',showClose:true,message:'更改用户失败'})
          })
        }else{
          this.$message({type:'error',showClose:true,message:'请正确填写表单'})
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.user-editor{
  margin-top:10px;
  ::v-deep.el-input{
    width: 60%;
  }
  ::v-deep.el-button{
    span:hover{
      cursor: pointer;
    }
  }
}
  
</style>