const {email}=require('../../config').server
const nodemailer=require('nodemailer')
const smtpTransport=require('nodemailer-smtp-transport')



module.exports=sendMail=function(recipient,subject,html,successCb,failCb){
  let smtp=nodemailer.createTransport(smtpTransport({
    service:email.service,
    auth:{
      user:email.user,
      pass:email.pass
    }
  }))
  smtp.sendMail({
    from:email.user,
    to:recipient,
    subject:subject,
    html:html
  },(err,res)=>{
    if(err){
      if(typeof failCb==='function'){
        failCb(err)
      }
    }else{
      if(typeof successCb==='function'){
        successCb()
      }
    }  
  })
}
