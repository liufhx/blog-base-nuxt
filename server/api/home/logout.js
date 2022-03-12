const {preRes}=require('../../util/preRespone')
module.exports=(req,res)=>{
  req.session.destroy(()=>{
    res.clearCookie('connect.sid')
    res.send(preRes('退出成功',200))
  })

}