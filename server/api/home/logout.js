const {preRes}=require('../../util/preRespone')
module.exports=(req,res)=>{
  req.session.destroy(()=>{
    res.clearCookie('connect.sid')
    res.send(preRes('ιεΊζε',200))
  })

}