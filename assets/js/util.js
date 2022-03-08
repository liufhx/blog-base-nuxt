export default {
  debounce(fn,wait,immediate=false){
    let timer,ret
    let finalFn=function(){
      let args=arguments
      clearTimeout(timer)
        
      if(immediate){
        if(!timer) ret=fn.apply(this,args)
        timer=setTimeout(()=>{
          timer=null
        },wait)
      }else{
        timer=setTimeout(fn.bind(this,...args),wait)
      }
      return ret
    }
    finalFn.cancel=()=>{
      clearTimeout(timer)
      timer=null
    }

    return finalFn
  },

  throttle(fn,wait=0,options={leading:false,trailing:true}){
    //之前的时间戳
    let old=0
    let timer
    return function(){
      let args=arguments
      let leading=options.leading,trailing=options.trailing
      let now=new Date().valueOf()
        
  //{leading:true,trailing:false}第一次触发事件，函数立即执行，最后一次触发事件，到达指定时间不执行
  //默认值{leading:false,trailing:true}第一次触发事件，函数不立即执行，最后一次触发事件，到达指定时间执行
  //{leading:true,trailing:true}第一次触发事件，函数立即执行，最后一次触发事件，到达指定时间执行
  //{leading:false,trailing:false}按默认值执行
      if(!leading&&!trailing){
          trailing=true
      }
      
      if(options.leading===false){
          old=now
      }
        
      if(now-old>wait){
          if(timer){
              clearTimeout(timer)
              timer=null
          }
          fn.apply(this,args)
          old=now
      }else if(!timer&&trailing){
          timer=setTimeout(()=>{
              old=new Date().valueOf()
              fn.apply(this,args)
              timer=null
          },wait)
      }
    }
  },
  

}