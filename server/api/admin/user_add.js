const{User,validateUser}=require('../../model/user')
const hash=require('../../util/hash')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{

  let user=req.body
  let {email,state,role,password}=user
  user.state=state||0
  user.role=role||'normal'
  try{
    await validateUser(req.body)
  }catch(e){
    res.send(preRes(e.message,400))
    return
  }

  let userFound=await User.findOne({email})
  if(userFound){
    return res.send(preRes('用户已存在',400))
  }else{
    await User.create({
      ...user,
      password:hash.hash(password)
    }).then(data=>{
      res.send(preRes('创建成功',200))
    }).catch(err=>{
      console.log(err)
      res.send(preRes('创建用户失败',500))
    })
  }
}


