import Vue from 'vue'
// import ElementUI from 'element-ui'

//全局引用
// Vue.use(ElementUI)

import {
  Pagination,
  Drawer,
  Form,
  FormItem,
  Input,
  Message,
  Result,
  Button,
  Checkbox
 
}from 'element-ui'

Vue.use(Pagination)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message=Message
Vue.use(Result)
Vue.use(Button)
Vue.use(Checkbox)
