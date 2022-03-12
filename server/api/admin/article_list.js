const {Article}=require('../../model/article')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  try{
    let page=parseInt(req.query.page)||1,
    pagesize=parseInt(req.query.pagesize)||10,
    count=await Article.countDocuments({}),
    total=Math.ceil(count/pagesize),
    start=(page-1)*pagesize,
    articleList=await Article.aggregate([
      {$skip:start},
      {$limit:pagesize},
      //关联表查询
      {$lookup:{
        from:'users',
        localField:'uid',
        foreignField:'_id',
        as:'author'
      }},
      //过滤显示的字段
      {$project:{
        '_id':1,
        'title':1,
        'uid':1,
        'createDate':1,
        'category':1,
        'author.username':1
      }}
    ])

    res.send(preRes('获取文章列表成功',200,{
      articleList,
      pageInfo:{
        page,
        total,
        count
      }
    }))
  }catch(e){
    res.send(preRes('获取文章列表成功'+e.message,500))
  }

}