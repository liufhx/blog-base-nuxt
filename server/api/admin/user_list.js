const {User}=require('../../model/user')
const {preRes}=require('../../util/preRespone')

module.exports=async(req,res)=>{
  let page=parseInt(req.query.page)||1,
  pagesize=parseInt(req.query.pagesize)||10,
  count=await User.countDocuments({isDelete:false}),
  total=Math.ceil(count/pagesize),
  start=(page-1)*pagesize,
  userList=await User.find({isDelete:false}).limit(pagesize).skip(start)

  userList.forEach(item=>{
    item.password=undefined
  })
  res.send(preRes('获取用户列表成功',200,
    {userList,
    pageInfo:{page,total,count}}))
  

  
}