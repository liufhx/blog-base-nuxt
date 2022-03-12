const sendMail=require('./mail')

let left=`<p>您好,</p>
<p>我们收到了一个使用您的电子邮箱注册的请求。 这是您的验证码:</p><br>
<p style="width: 200px; font-size: 1.6rem; 
font-weight: 600; 
padding: 10px; 
letter-spacing: 1px; 
text-align:center;
margin: 0 auto 24px auto; 
background: #e8e8e8; 
border-radius: 4px;">`
let right=`</p><br><br><p>这是一封自动生成的电子邮件。</p>
<p>如果这项操作不是由您本人进行的，请您忽视。</p>`
let verifyCode='123456'
let html=left+verifyCode+right


sendMail('2814482535@qq.com','请验证您的邮箱地址',html,()=>{console.log('发送成功')})