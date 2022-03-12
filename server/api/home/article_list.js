const {Article,Tag}=require('../../model/article')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  
  try{
    let{page,pagesize,category,tag}=req.query
    let count,total,start,query=[],countQuery={}
    page=parseInt(page)||1
    pagesize=parseInt(pagesize)||10

    

    

    if(category){
      query.push({$match:{category}})
      countQuery.category=category
    }
    if(tag){
      let aids=await Tag.find({tagname:tag})
      if(aids&&aids.length){
        aids=aids.reduce((ret,item)=>{
          ret.push(item.aid)
          return ret
        },[])
        query.push({$match:{_id:{$in:aids}}})
        countQuery._id={$in:aids}
      }
    }

    count=await Article.countDocuments(countQuery)
    total=Math.ceil(count/pagesize)
    start=(page-1)*pagesize

    query.push(...[
      {$skip:start},
      {$limit:pagesize},
      //关联表查询
      {$lookup:{
        from:'users',
        localField:'uid',
        foreignField:'_id',
        as:'author'
      }},
      //数组扁平化
      {$unwind:{
        path:'$author'
      }},
      {$lookup:{
        from:'tags',
        localField:'_id',
        foreignField:'aid',
        as:'tags'
      }},
      //过滤显示的字段
      {$project:{
        '_id':1,
        'title':1,
        'uid':1,
        'cover':1,
        'createDate':1,
        'category':1,
        'author':'$author.username',
        'abstract':1,
        'tags':'$tags.tagname'
      }}
    ])




    let articleList=await Article.aggregate(query)
    res.send(preRes('获取文章列表成功',200,{
      articleList,
      pageInfo:{
        page,
        total,
        count
      }
    }))
  }catch(e){
    res.send(preRes('获取文章列表失败'+e.message,500))
  }

}