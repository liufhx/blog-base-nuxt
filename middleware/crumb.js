export default function({route,store}){
  let {name,fullPath}=route
  let crumbList=[
    {
      name:'首页',
      route:'/',
      active:true
    },
  ]
  let crumbNameList={
    'home-archive':'归档',
    'home-timeline':'时间轴',
    'home-about':'关于',
    'home-article_detail':'文章详情'
  }

  let {category,tag}=route.query
  if(name==='index'){
    if(category||tag){
      crumbList.push({name:category||tag,route:fullPath,active:false})
    }else{
      crumbList[0].active=false
    }
  }else{
    crumbList.push({
      name:crumbNameList[name],
      route:fullPath,
      active:false
    })
  }
  
  store.commit('crumbList',crumbList)
}