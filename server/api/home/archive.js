const {Article}=require('../../model/article')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  let {archiveDate}=req.query 
  let query=[]
  query.push(...[
    {$lookup:{
      from:'users',
      localField:'uid',
      foreignField:'_id',
      as:'author'
    }},
    //数组扁平化
    {$unwind:'$author'},
    {$project:{
      '_id':1,
      'uid':1,
      'title':1,
      'author':'$author.username',
      'createDate':1, 
      'archiveDate':{
        $dateToString:{
          format:'%Y-%m',
          date:{
            //mongoodb存储的数据是按照世界时间存储的，
            // 因此进行分割操作时需要对时间进行时区校正，
            // 使用$add加上时区差8小时(毫秒数)才能得到正确的数据
            "$add":["$createDate", 28800000]
          }
        }
      },
    }}
  ])

  if(archiveDate){
    query.push({$match:{archiveDate}})
  }else{
    query.push(...[
      {$group:{
        _id:'$archiveDate',
        archives:{$push:'$$ROOT'},
        
      }},
      {$sort:{_id:-1}}
    ])
  }

  await Article.aggregate(query).then(ret=>{
    res.send(preRes('获取文章归档成功',200,{archive:ret}))
  }).catch(err=>{
    res.send(preRes('获取文章失败'+err.message,500))
  })
  
}