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
  Select,
  Option,
  Message,
  Result,
  Button,
  Checkbox,
  Collapse,
  CollapseItem,
  Container,
  Aside,
  Main,
  Table,
  TableColumn,
  Popconfirm,
  Tag
 
}from 'element-ui'

Vue.use(Pagination)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$message=Message
Vue.use(Result)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popconfirm)
Vue.use(Tag)