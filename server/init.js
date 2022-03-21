const path=require('path')
const fs=require('fs')
const {User}=require('./model/user')
const {admin}=require('../config').server.user
const hash=require('./util/hash')


  
//创建图片上传文件夹
let dir=path.join(__dirname,'../','public','upload','cover')
if(!fs.existsSync(dir)){
  fs.mkdir(dir,err=>{
    if(err!=null){
      console.log(err)
    }
  })
}

//创建页面数据文件
let pageDir=path.join(__dirname,'../','page.json')
if(!fs.existsSync(pageDir)){
  let initDate=Date()
  let page=JSON.stringify({initDate})
  fs.writeFile(pageDir,page,err=>{
    if(err!=null){
      console.log(err)
    }
  })
}


//创建初始管理员账户
User.findOne({email:admin.email})
.then(ret=>{
  if(ret){
    console.log('管理员已存在')
  }else{
    admin.password=hash.hash(admin.password)
    User.create({...admin})
    console.log('创建管理员成功')
  }
})
.catch(err=>{
  console.log('connect error'+err)
})
