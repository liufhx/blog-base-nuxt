export const state=()=>({
  user:{}
})

export const mutations={
  setUser(state,obj){
    state.user={...obj}
  }
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