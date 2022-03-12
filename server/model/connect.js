const mongoose=require('mongoose')
const {database}=require('../../config').server

const db={...database}
const dbString='mongodb://'+db.name+':'+db.pwd+'@'+db.host+':'+db.port+'/'+db.database

mongoose.connect(dbString)
.then(()=>{console.log('mongodb connect success')})
.catch(()=>console.log('mongodb connect fail'))
