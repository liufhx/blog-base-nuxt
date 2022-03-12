const mongoose=require('mongoose')
const Joi=require('joi')

const commentSchema=new mongoose.Schema({
  aid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Article',
    default:null
  },
  cid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment',
    default:null
  },
  fromId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    default:null
  },
  toId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    default:null
  },
  content:{
    type:String,
    minlength:1
  }
},{
  timestamps:{
    createdAt:'createDate',
    updatedAt:'updateDate'
  }
})

const Comment=mongoose.model('Comment',commentSchema)

const validateComment=comment=>{
  const schema=Joi.object({
    content:Joi.string().min(1).required().error(new Error('评论内容不符合要求'))
  })
  return schema.validateAsync(comment)
}



module.exports={
  Comment,
  validateComment
}