const {Comment}=require('../../model/comment')
const {preRes}=require('../../util/preRespone')
const mongoose=require('mongoose')

module.exports=async(req,res)=>{
  let {aid}=req.query

  let query={
    from:{
      from:'users',
      localField:'fromId',
      foreignField:'_id',
      as:'from'
    },
    to:{
      from:'users',
      localField:'toId',
      foreignField:'_id',
      as:'to'
    },
    project:{
      '_id':1,
      'aid':1,
      'cid':1,
      'fromId':1,
      'toId':1,
      'createDate':1,
      'content':1,
      'from':'$from.username',
      'to':'$to.username',
    }
  }

  if(aid){
    try{
      let commentList=await Comment.aggregate([
        {$match:{
          aid:mongoose.Types.ObjectId(aid),
        }},
        {$lookup:query.from},
        {$unwind:{
          path:'$from',
          preserveNullAndEmptyArrays:true
        }},
        {$lookup:query.to},
        {$unwind:{
          path:'$to',
          preserveNullAndEmptyArrays:true
        }},
        {$project:query.project}
      ])
  
  
      res.send(preRes('获取评论成功',200,{commentList}))
      return 
    }catch(err){
      res.send(preRes('获取评论失败',500,))
      return 
    }

  }


  res.send(preRes('需要文章id',400))
  
}