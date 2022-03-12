const {User}=require('../../model/user')
const hash=require('../../util/hash')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  const {email,password}=req.body
  
  if(email&&password&&[email.trim().length,password.trim().length].includes(0)){
    return res.send(preRes('格式错误',400))   
  }

  let user=await User.findOne({email,isDelete:false})
  if(user && hash.compare(user.password,password)){
    // 保存用户信息到session
    let {username,email,_id,role,state}=user
    if(state!==0){
      return res.send(preRes('用户被禁用',400))  
    }
    req.session.username=username
    req.session._id=_id
    req.session.role=role
    req.app.locals.user={
      _id,
      username,
      email,
      role,
      state
    }

    //过滤密码
    user.password=undefined
    res.send(preRes('登录成功',200,{user}))
  }else{
    res.send(preRes('用户信息错误',400)) 
  }
  
}

