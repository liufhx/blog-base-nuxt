const {Article,Tag}=require('../../model/article')
const formidable=require('formidable')
const {preRes}=require('../../util/preRespone')
const path=require('path')
const fs=require('fs')
const mongoose=require('mongoose')
const myxss=require('../../util/myxss')
const trimHtml=require('trim-html')


module.exports=async(req,res)=>{
  const form=new formidable.IncomingForm()
  let imgpath=null
  form.uploadDir=path.join(__dirname,'../../../','public/upload/cover')

  form.on('file',async(name,file)=>{
    let oldpath=file.filepath
    imgpath=oldpath+path.extname(file.originalFilename)
    await fs.rename(oldpath,imgpath,err=>{if(err){console.log(err)}})
  })

  form.parse(req,async(err,fields,files)=>{
    let {_id,title,category,tags,abstract,content,cover}=fields
    cover=cover==='null'?null:cover
    //判断是否删除旧封面
    let coverFlag=cover===null?true:false
    
    if(typeof cover==='undefined'){
      cover=imgpath===null?null:imgpath.split('public')[1]
    }
    
    
    if(!_id)return res.send(preRes('需要_id',400))


    try{
      let article=await Article.findOne({_id})
      if(!article){
        res.send(preRes('_id错误，请求非法',400))
        return
      }
      let oldCover=article.cover

      tags=JSON.parse(tags)
      content=myxss.process(content)
      abstract=abstract&&abstract.length>0?myxss.process(abstract):trimHtml(content,{limit:250}).html
      let newArticle={
        title,
        category,
        abstract,
        content
      }
      if(cover&&cover!==oldCover){
        newArticle.cover=cover
      }else if(coverFlag){
        newArticle.cover=null
      }

      const session=await mongoose.startSession()
      session.startTransaction();

      await Article.findOneAndUpdate({_id},newArticle,{session})
      await Tag.deleteMany({aid:_id},{session})
      if(tags.length>0){
        let length=tags.length,i=0,taglist=[]
        while(i<length){
          taglist.push({
            aid:_id,
            tagname:myxss.process(tags[i])
          })
          i++
        }
        await Tag.create(taglist,{session})
      }

      //如果更改封面，删除旧封面
      if(oldCover){
        let deletePath=path.join(__dirname,'../../../public',oldCover)
        if(cover&&oldCover&&cover!==oldCover)fs.unlinkSync(deletePath) 
        if(coverFlag&&oldCover)fs.unlinkSync(deletePath) 
      }
      

      await session.commitTransaction()
      session.endSession()

      res.send(preRes('修改文章成功',200))




    }catch(e){
      res.send(preRes('修改文章失败'+e.message,400))
      //如果更改失败，删除上传的图片
      if(imgpath)fs.unlink(imgpath,err=>{    
        if(err)console.log('删除图片失败，图片地址为'+imgpath,err)        
      })
    }

  })

}