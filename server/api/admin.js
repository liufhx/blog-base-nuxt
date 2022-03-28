const express=require('express')
const admin=express.Router()



//增加加权限验证
admin.use('/',require('./admin/role_auth'))

admin.get('/user_list',require('./admin/user_list'))
admin.post('/user_add',require('./admin/user_add'))
admin.post('/user_modify',require('./admin/user_modify'))
admin.get('/user_delete',require('./admin/user_delete'))


admin.get('/article_list',require('./admin/article_list'))
admin.post('/article_add',require('./admin/article_add'))
admin.post('/article_modify',require('./admin/article_modify'))
admin.get('/article_delete',require('./admin/article_delete'))

admin.get('/comment_delete',require('./admin/comment_delete'))

admin.get('/about_set',require('./admin/about_set'))



module.exports=admin