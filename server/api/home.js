const express=require('express')
const home=express.Router()


home.post('/login',require('./home/login'))
home.get('/login_confirm',require('./home/login_confirm'))
home.post('/regist',require('./home/regist'))

home.get('/article',require('./home/article'))
home.get('/article_list',require('./home/article_list'))

//获取验证码
home.get('/verifycode',require('./home/verifycode'))
//退出登录
home.get('/logout',require('./home/logout'))

home.get('/category',require('./home/category'))
home.get('/tag',require('./home/tag'))

home.post('/comment_add',require('./home/comment_add'))
home.get('/comment_list',require('./home/comment_list'))

//归档
home.get('/archive',require('./home/archive'))

module.exports=home