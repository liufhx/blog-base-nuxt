function preRes(msg,status,ret) {
  return {
    result:ret,
    meta:{msg,status}
  }
}


module.exports={
  preRes
}