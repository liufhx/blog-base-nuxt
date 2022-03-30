const{Article}=require('../../model/article')
const {preRes}=require('../../util/preRespone')
const mongoose=require('mongoose')
const path=require('path')
const fs=require('fs')
const PageDir=path.join(__dirname,'../../../','page.json')

module.exports=(req,res)=>{
  const PAGE=fs.readFileSync(PageDir,'utf-8')
  let page=JSON.parse(PAGE)
  if(!page.about)return res.send(preRes('未设置关于页面',400))

  const {_id}=page.about

  if(!mongoose.Types.ObjectId.isValid(_id))return res.send(preRes('_id非法',400))
  
  Article.aggregate([
    //聚合匹配match匹配id需要将字符串进行处理
    {$match:{_id:mongoose.Types.ObjectId(_id)}},
    {$lookup:{
      from:'users',
      localField:'uid',
      foreignField:'_id',
      as:'author'
    }},
    {$unwind:{
      path:'$author'
    }},
    {$lookup:{
      from:'tags',
      localField:'_id',
      foreignField:'aid',
      as:'tags'
    }},
    {$project:{
      '_id':1,
      'uid':1,
      'title':1,
      'author':'$author.username',
      'tags':'$tags.tagname',
      'createDate':1,
      'cover':1,
      'content':1,
      'category':1,
      'abstract':1,
    }}
  ]) 
  .then(article=>{
    res.send(preRes('获取关于页面成功',200,{article:article[0]}))
  }).catch(err=>{
    res.send(preRes('获取关于页面失败'+err.message,500))
  })

  




}