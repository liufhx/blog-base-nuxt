const {User}=require('../../model/user')
const {preRes}=require('../../util/preRespone')
module.exports=async(req,res)=>{
  const _id=req.query._id
  if(!_id)return res.send(preRes('请输入_id',400))
  let user=await User.findOne({_id})
  if(!user)return res.send(preRes('用户不存在',400))

  User.updateOne({_id},{isDelete:true}).then(ret=>{
    res.send(preRes('删除成功',200))
  }).catch(err=>{
    res.send(preRes('删除失败',500))
  })
}