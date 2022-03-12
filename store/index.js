export const state=()=>({
  user:{},
  //面包屑
  crumbList:[
    {
      name:'首页',
      route:'/',
      active:false,
    },
  ],
})

export const mutations={
  setUser(state,obj){
    state.user={...obj}
  },
  crumbList(state,arr){
    state.crumbList=[...arr]
  },
}
export const actions={
  async nuxtServerInit ({commit}, {$axios}) {
    await $axios.get('/api/home/login_confirm').then(ret=>{
      if(ret.data.meta.status==200){
        commit('setUser',{...ret.data.result.user})
      }
    })
  }
}