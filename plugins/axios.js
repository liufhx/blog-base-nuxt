export default function({$axios,redirect}){
  $axios.onError(err=>{
    console.log(err)
  })


}