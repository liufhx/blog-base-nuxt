import Vue from 'vue'
import util from '@/assets/js/util'
import hljs from 'highlight.js'

Vue.prototype.$util=util
//代码高亮
Vue.directive('highlight',function(el){
  hljs.configure({useBR: true,ignoreUnescapedHTML:true})
  let blocks = el.querySelectorAll('pre')
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
})