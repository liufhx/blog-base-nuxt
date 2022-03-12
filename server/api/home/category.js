const {Article}=require('../../model/article')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  const category=await Article.aggregate([
    {$group:{
      _id:"$category",
      count:{$sum:1}
    }}
  ])
  res.send(preRes('获取分类成功',200,{category}))
}