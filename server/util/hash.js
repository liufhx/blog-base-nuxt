const md5=require('blueimp-md5')

const {user}=require('../../config').server

//加密
function hash(pwd) {
  let salt=user.salt,ret=pwd,saltTimes=user.saltTimes
  while(saltTimes){
    ret=md5(ret,salt)
    saltTimes--
  }
  return ret  
}
function compare(dbPwd,clientPwd) {
  return this.hash(clientPwd)===dbPwd
}
module.exports={
  salt:user.salt,
  hash,
  compare
}