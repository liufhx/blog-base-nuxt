import Vue from 'vue'
import util from '@/assets/js/util'
import hljs from 'highlight.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjsZh from 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

Vue.prototype.$util=util
dayjs.locale(dayjsZh) 
dayjs.extend(relativeTime)

Vue.prototype.$dayjs=dayjs
//代码高亮
Vue.directive('highlight',function(el){
  hljs.configure({useBR: true,ignoreUnescapedHTML:true})
  let blocks = el.querySelectorAll('pre')
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
})