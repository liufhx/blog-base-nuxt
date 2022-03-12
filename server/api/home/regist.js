const {preRes}=require('../../util/preRespone')
const {User,validateUser}=require('../../model/user')
const hash=require('../../util/hash')

module.exports=async(req,res)=>{
  let {name,email,password,verify}=req.body
  if(typeof req.session.verifyCode==='undefined'){
    res.send(preRes('请先获取验证码',400))
    return
  }
  if(req.session.email!==email){
    res.send(preRes('邮箱与验证邮箱不符',400))
    return
  }
  if(req.session.verifyCode!=verify){
    res.send(preRes('验证码错误',400))
    return
  }

  //清除验证码
  req.session.verifyCode=undefined

  let user={
    username:name,
    email,
    password,
    state:0,
    role:'normal'
  }
  try{
    await validateUser(user)
  }catch(e){
    res.send(preRes(e.message,400))
    return
  }

  let userFound=await User.findOne({email})
  if(userFound){
    return res.send(preRes('邮箱已注册',400))
  }else{
    User.create({
      ...user,
      password:hash.hash(password)
    }).then(data=>{
      let {username,_id,email,role,state}=data
      let user={username,_id,email,role,state}
      req.session.username=username
      req.session._id=_id
      req.session.role=role
      req.app.locals.user={
        ...user
      } 
      res.send(preRes('创建成功',200,{user}))
    }).catch(err=>{
      console.log(err)
      res.send(preRes('创建用户失败',500))
    })
  }

}