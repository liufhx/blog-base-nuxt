const {Comment}=require('../../model/comment')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  const _id=req.query._id
  if(!_id)return res.send(preRes('请输入文章id',400))
  let comment=await Comment.findOne({_id})
  if(!comment)return res.send(preRes('用户不存在',400))

  Comment.deleteOne({_id}).then(ret=>{
    res.send(preRes('删除成功',200))
  }).catch(err=>{
    console.log('at comment_delete.js  '+e.message)
    res.send(preRes('删除失败',500))
  })

}