const fs=require('fs')
const path=require('path')
const {preRes}=require('../../util/preRespone')

module.exports=(req,res)=>{
  try{
    let {_id}=req.query
    const PageDir=path.join(__dirname,'../../../','page.json')
    const PAGE=fs.readFileSync(PageDir,'utf-8')
    let page=JSON.parse(PAGE)
    page=JSON.stringify({...page,about:{_id}})
    fs.writeFileSync('../page.json',page)
    res.send(preRes('设置about页面_id成功',200))
  }catch(err){
    res.send(preRes('设置about页面_id失败,因为'+err.message,500))
  }
 
}