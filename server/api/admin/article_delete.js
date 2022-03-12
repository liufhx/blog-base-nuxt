const {Article,Tag}=require('../../model/article')
const {preRes}=require('../../util/preRespone')
const mongoose=require('mongoose')
const fs=require('fs')
const path=require('path')
module.exports=async(req,res)=>{
  const _id=req.query._id
  if(!_id)return res.send(preRes('请输入_id',400))

  try{
    const session=await mongoose.startSession()
    session.startTransaction();


    let article=await Article.findOneAndRemove({_id},{session})
    await Tag.deleteMany({aid:_id},{session})
    if(article&&article.cover){
      let imgpath=path.join(__dirname,'../../../public/',article.cover)
      if(fs.existsSync(imgpath))fs.unlinkSync(imgpath)
    }
    

    await session.commitTransaction()
    session.endSession()

    res.send(preRes('删除文章成功',200))


  }catch(e){
    res.send(preRes('删除文章失败'+e.message,500))
  }


}