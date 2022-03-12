const mongoose=require('mongoose')
const Joi=require('joi')


//创建用户集合规则
const userSchema=new mongoose.Schema({
  username:{
    type:String,
    maxlength:20,
    minlength:2,
    require:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  //admin为管理员，normal为普通用户
  role:{
    type:String,
    required:true
  },
  // 0为启用，1为禁用
  state:{
    type:Number,
    default:0,
  },
  isDelete:{
    type:Boolean,
    default:false
  }
},{
  timestamps:{
    createdAt:'createDate',
    updatedAt:'updateDate'
  }
})

const User=mongoose.model('User',userSchema)


//验证用户信息
const validateUser=user=>{
  const schema=Joi.object({
    username:Joi.string().min(2).max(16).required().error(new Error('用户名不符合要求')),
    email:Joi.string().email().required().error(new Error('邮箱不符合要求')),
    password:Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
    role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
    state:Joi.number().valid(0,1).required().error(new Error('状态值非法'))
  })
  return schema.validateAsync(user)
}
module.exports={
  User,
  validateUser
}
