const {User,validateUser}=require('../../model/user')
const hash=require('../../util/hash')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{

  const {oldPwd,_id,password,role,username,email,state}=req.body
  
  try{
    await validateUser({password,role,username,email,state})
  }catch(e){
    res.send(preRes(e.message,400))
    return
  }
  
  if(!_id)return res.send(preRes('需要_id',400))

 
  let user=await User.findOne({_id})
  if(!user)return res.send(preRes('_id错误，请求非法',400))
  if(!hash.compare(user.password,oldPwd))return res.send(preRes('密码错误',400))
    
  User.updateOne({_id},{
    username,
    email,
    role,
    state,
    password:hash.hash(password)
  }).then(ret=>{
    res.send(preRes('更改成功',200))
  }).catch(err=>{
    res.send(preRes(err,400))
  })
    
  
}