module.exports={
  server:{
    //配置后台服务器数据库，必填
    database:{
      host:'',
      port:'',
      database:'',
      name:'',
      pwd:''
    },
    user:{
      //密码加密密匙，和加密次数
      salt:'salt',
      saltTimes:2,
      //配置初始管理员，必填
      admin:{
        username:'',
        password:'',
        email:'',
        role:''
      }
    },
    session:{
      //session加密字符串
      secret:'secret key',
      cookie:{
        maxAge:24*60*60*1000
      }
    },
    //用于发送验证码的邮箱,需要先向qq邮箱官网开启POP3/SMTP/IMAP，必填
    email:{
      service:'QQ',
      user:'',
      pass: '',
    }
  },
  page:{

  }
}

