<template>
  <header class="header">
    <div class="header-inner clearfix">
      <nav class="header-inner-left">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/home/archive">归档</nuxt-link>
        <!-- <nuxt-link to="/home/timeline">时间轴</nuxt-link> -->
        <nuxt-link to="/home/about">关于</nuxt-link>
      </nav>
      <nav class="header-inner-right">
        <a v-if="!getUser.username" @click="drawer=true">登录/注册</a>
        <div v-else>
          <a href="javascript:void(0);"><i class="el-icon-user"></i>{{getUser.username}}</a>    
          <ul>
            <li v-if="getUser.role==='admin'"><a @click="$router.push('/admin/user_list')">后台管理</a></li>
            <li><a @click="logout">退出</a></li>    
          </ul>
        </div>     
      </nav>


      <el-drawer title="登录/注册" :visible.sync="drawer" :with-header="false" direction="ttb" size="80%">
        <div class="drawer-box-wrap" @click="drawer=false">
          <div class="drawer-box" @click.stop>
            <div class="form-title">
              <h4 :class="[formSwitch?'title-switch':'']" @click="formSwitch=true">登录</h4>
              <h4 :class="[formSwitch?'':'title-switch']" @click="formSwitch=false">注册</h4>
            </div>
            <transition name="form-login">
              <div class="user-form" v-if="formSwitch">
                <el-form :model="loginForm" :rules="loginRules" label-width="70px" size="small" ref="loginForm" label-position="left">
                  <el-form-item  label="邮箱:" prop="email" >
                    <el-input v-model="loginForm.email" ></el-input>
                  </el-form-item>
                  <el-form-item  label="密码:" prop="password">
                    <el-input v-model="loginForm.password" show-password></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>  
                  </el-form-item>
                </el-form>
                
              </div>
            </transition>
            <transition name="form-regist">
              <div class="user-form" v-if="!formSwitch">
                <el-form :model="registForm" :rules="registRules" label-width="70px" size="small" ref="registForm" label-position="left">
                  <el-form-item label="用户名:" prop="name" >
                    <el-input v-model="registForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱:" prop="email" >
                    <el-input v-model="registForm.email"></el-input>
                  </el-form-item>
                  <el-form-item label="密码:" prop="password">
                    <el-input v-model="registForm.password" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码:" prop="confirm">
                    <el-input v-model="registForm.confirm" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="验证码:" prop="verify">
                    <el-input v-model="registForm.verify"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" :disabled="verifyBtn.disable" @click="getVerifyCode">获取验证码{{verifyBtn.time===0?'':`(${verifyBtn.time})`}}</el-button> 
                        
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="regist" type="primary">注册</el-button> 
                  </el-form-item>
                </el-form>
              </div>
            </transition>

          </div>
        </div>
      </el-drawer>
    </div> 
  </header>
  
</template>
<script>
export default {
  name:'Header',
  data() {
    var confirmPwd=(rule,value,callback)=>{
      if(value!==this.registForm.password){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    }
    return {
      loginForm:{
        email:'',
        password:'',
      },
      loginRules:{
        email:[
          {required:true,message:'请输入邮箱',trigger: 'blur'},
          {type:'email',message:'邮箱格式错误',trigger: 'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {
            type:'string',
            pattern:/^[a-zA-z0-9]{8,30}$/g,
            transform(value) {
              return value.trim()
            },
            message:'密码格式错误，密码长度为8-30的字符',
            trigger:['blur']
          }
        ]

      },
      registForm:{
        name:'',
        email:'',
        password:'',
        confirm:'',
        verify:''
      },
      
      registRules:{
        name:[
          {required:true,message:'请输入邮箱',trigger: 'blur'},
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
            pattern:/^[a-zA-z0-9]{8,30}$/g,
            transform(value) {
              return value.trim()
            },
            message:'密码格式错误,密码长度为8-30的字符',
            trigger:['blur']
          }
        ],
        confirm:[
          {required:true,message:'请输入确认密码',trigger: 'blur'},
          { 
            type:'string',
            validator:confirmPwd,
            trigger:'blur'
          }
        ],
        verify:[
          {required:true,message:'验证码不能为空',trigger: 'blur'},
        ]
      },
      
      //打开关闭注册表单
      drawer:false,

      //注册登录表单切换
      formSwitch:true,
      //获取验证码按钮
      verifyBtn:{
        disable:false,
        time:0
      }
    } 
  },
  created(){
    this.regist=this.$util.debounce(()=>{
      this.$refs.registForm.validate(flag=>{
        if(flag){
          this.$axios({method:'post',url:'/api/home/regist',data:this.registForm}).then(ret=>{
            let {meta,result}=ret.data
            if(meta.status==200){
              this.$message({type:'success',showClose:true,message:'注册成功'})
              this.$store.commit('setUser',result.user)
              this.drawer=false
              console.log(this.drawer)
            }else{
              this.$message({type:'error',showClose:true,message:meta.msg})
            }
          }).catch(err=>{
            this.$message({type:'error',showClose:true,message:'注册失败'})
          })
        }else{
          this.$message({type:'error',showClose:true,message:'请正确填写表单'})
        }
      })
    },5000,true)
    this.login=this.$util.debounce(()=>{
      this.$refs.loginForm.validate(flag=>{
        if(flag){
          this.$axios({method:'post',url:'/api/home/login',data:this.loginForm}).then(ret=>{
            let {meta,result}=ret.data
            if(meta.status==200){
              this.$message({type:'success',showClose:true,message:'登录成功'})
              this.$store.commit('setUser',result.user)
              this.drawer=false
            }else{
              this.$message({type:'error',showClose:true,message:meta.msg})
            }
          }).catch(err=>{
            this.$message({type:'error',showClose:true,message:'登录失败'})
          })
        }else{
          this.$message({type:'error',showClose:true,message:'请正确填写表单'})
        }
      })
    },5000,true)
  },
  computed:{
    getUser(){
      return this.$store.state.user
    }
  },
  methods:{
    getVerifyCode(){
      this.$refs.registForm.validateField('email',err=>{
        if(err){
          this.$message({type:'error',showClose:true,message:err})
        }else{
          this.verifyBtn.time=60
          this.verifyBtn.disable=true
          let timer=setInterval(()=>{
            this.verifyBtn.time-=1
            if(this.verifyBtn.time<=0){
              clearInterval(timer)
              this.verifyBtn.disable=false
            }
          },1000)
          this.$axios.get(`/api/home/verifycode?email=${this.registForm.email}`).then(ret=>{
            if(ret.data.meta.status==200){
              this.$message({type:'success',showClose:true,message:'已向邮箱发送验证码,60s后可重新获取'})
            }else{
              this.$message({type:'error',showClose:true,message:'请求失败,请稍后尝试'})
            }
          }).catch(err=>{
            this.$message({type:'error',showClose:true,message:'请求失败,请刷新页面后尝试'})
          })
        }
      })     
    },
    logout(){
      this.$axios.get('/api/home/logout').then(ret=>{
        let {meta}=ret.data
        if(meta.status==200){
          this.$message({type:'success',showClose:true,message:'退出成功'})
          this.$store.commit('setUser',{})
        }else{this.$message({type:'error',showClose:true,message:'退出失败'})}
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'退出失败'})
      })
    }

  }
}
</script>
<style lang="scss" scoped>
$hHeight:60px;

.header{
  width: 100%;
  height:$hHeight;
  background-color: #0f161cce;
  .header-inner{
    height:100%;
    width: 960px;
    margin:0 auto;
    a{
      display: inline-block;
      color: #ffffff;
      line-height:$hHeight;
      padding:0 5px;
      &:hover{
        background-color: #66b1ff;
      }
    }
    .header-inner-left{
      float: left;
    }
    .header-inner-right{
      float: right;
      &>div{
        position: relative;
        &>a{
          display: block;
          padding: 0 10px;
        }
        &:hover>ul{
          transform: scaleY(1);
        }
        &>ul{
          position: absolute;
          width: fit-content;
          z-index: 10;
          top:$hHeight;
          text-align: center;
          transform: scaleY(0);
          overflow: hidden;
          transform-origin: 0 0;
          transition: all .5s;
         
          a{
            width: 100%;
            white-space: nowrap;
            line-height: 40px;
          }
        }
      }
    }
  }

  ::v-deep .el-drawer__body{
    color: white;
    background-image: url('/img/card_bg.jpg'); 
    background-size: contain;
  }
  ::v-deep .el-form-item__label{
    color:white;
  }
  ::v-deep.el-form-item__label{
    padding-right: 0;
  }
  .drawer-box-wrap{
    width: 100%;
    height: 100%;
  }
  .drawer-box{
    position: relative;
    border: 1px solid black;
    width: 400px;
    height: 400px;
    margin: 10px auto 0;
    background: rgba($color: #000000, $alpha: 0.4);
    .form-title{
      position: absolute;
      z-index: 10;
      top:10px;
      left: 50%;
      transform:translateX(-50%);
      h4{
        display: inline;
        cursor:pointer;
        padding:  10px;
      }
      .title-switch{
        border-bottom: 2px solid brown;
      }
    }

    .user-form{
      position: absolute;
      top:15%;
      left: 50%;
      width: 250px;
      // border: 1px solid black;
      transform: translateX(-50%);
      opacity: 1;
    }
    .form-login-enter-active,.form-login-leave-active{
      transition: all .5s ease;
    }
    .form-login-enter,.form-login-leave-to{
      transform:translate(-200%);
      opacity: 0;
      width:0;
      position: absolute;
    }
    .form-regist-enter-active,.form-regist-leave-active{
      transition: all .5s ease ;
    }
    .form-regist-enter,.form-regist-leave-to{
      transform: translate(100%);
      opacity: 0;
      width:0;
      position: absolute;
    }
    
  }
}



@media screen and (min-width:1100px){
  #header{
    .header-inner{
      width: 1080px;
    }
  }
}



 
  
</style>