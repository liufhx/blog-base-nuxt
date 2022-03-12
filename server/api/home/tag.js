const {Tag}=require('../../model/article')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  const tag=await Tag.aggregate([
    {$group:{
      _id:"$tagname",
      count:{$sum:1}
    }}
  ])
  res.send(preRes('获取标签成功',200,{tag}))
}