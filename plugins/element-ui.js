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
  Alert,
  Button
 
}from 'element-ui'

Vue.use(Pagination)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message=Message
Vue.use(Alert)
Vue.use(Button)
