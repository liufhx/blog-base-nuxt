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
    let {uid,title,category,tags,abstract,content}=fields
    const cover=imgpath===null?null:imgpath.split('public')[1]
    

    try{
      tags=JSON.parse(tags)
      content=myxss.process(content)
      //获取摘要
      abstract=abstract&&abstract.trim().length>0?myxss.process(abstract):trimHtml(content,{limit:250}).html

      const session=await mongoose.startSession()
      session.startTransaction();

      let article=await Article.create([{
        uid,
        title,
        category,
        abstract,
        cover,
        content
      }],{session})

      if(tags.length>0){
        let length=tags.length,i=0,taglist=[]
        while(i<length){
          taglist.push({
            aid:article[0]._id,
            tagname:myxss.process(tags[i])
          })
          i++
        }
        await Tag.create(taglist,{session})
      }

      await session.commitTransaction()
      session.endSession()

      res.send(preRes('创建文章成功',200))

      

    }catch(e){
      res.send(preRes('创建文章失败'+e.message,400))
      //创建文章失败，删除上传的图片
      if(imgpath)fs.unlink(imgpath,err=>{    
        if(err)console.log('删除图片失败，图片地址为'+imgpath,err)        
      })
    }
  })
 

}