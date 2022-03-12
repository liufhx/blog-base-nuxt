const {preRes}=require('../../util/preRespone')
module.exports=async(req,res)=>{
  if(req.session.username){
    let user=req.app.locals.user
    res.send(preRes('用户已登录',200,{user}))
  }else{
    res.send(preRes('用户未登录',300))
  }
}