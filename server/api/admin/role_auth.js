const {preRes}=require('../../util/preRespone')

module.exports=(req,res,next)=>{
  if(req.session.username&&req.session.role==='admin'){
    next()
  }else{
    res.send(preRes('没有权限操作',400))
    let ip=req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
   
    console.log('无权限用户执行敏感操作,ip为'+ip)
  }
}