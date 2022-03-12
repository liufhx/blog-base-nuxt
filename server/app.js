const express=require('express')
const bodyParser=require('body-parser')
const session=require('express-session')
const path=require('path')
require('./model/connect')
require('./init')
const {server}=require('../config')


const app=express()



//处理post请求数据，但不能处理二进制数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(session({
  secret:server.session.secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:server.session.cookie.maxAge
  }
}))

app.use('/api/admin',require('./api/admin'))
app.use('/api/home',require('./api/home'))
app.use('/public',express.static(path.join(__dirname,'../public')))



//错误处理
app.use((err,req,res,next)=>{
  console.log(err.message)
  next()
})

app.listen(3000,()=>{
  console.log('server is running...')
})
