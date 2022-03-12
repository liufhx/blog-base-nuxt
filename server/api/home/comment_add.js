const {Comment,validateComment}=require('../../model/comment')
const {preRes}=require('../../util/preRespone')
const mongoose=require('mongoose')

module.exports=async(req,res)=>{
  const {aid,cid,fromId,toId,content}=req.body

  try{
    await validateComment({content})
  }catch(e){
    res.send(preRes(e.message,400))
    return 
  }
  
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
  try{
    let comment=await Comment.create({
      aid,
      cid,
      fromId,
      toId,
      content
    })

    comment=await Comment.aggregate([
      {$match:{
        _id:mongoose.Types.ObjectId(comment._id),
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
    

    res.send(preRes('评论成功',200,{comment:comment[0]}))
  }catch(e){
    console.log(e.message)
    res.send(preRes('评论失败'),500)
  }


  
}

