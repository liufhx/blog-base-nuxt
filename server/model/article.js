const mongoose=require('mongoose')


const articleSchema=new mongoose.Schema({
  title:{
    type:String,
    maxlength:50,
    minlength:1,
    required:true
  },
  uid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  cover:{
    type:String,
    default:null
  },
  content:{
    type:String,
    minlength:1
  },
  abstract:{
    type:String,
    maxlength:1000,
    minlength:1
  },
  category:{
    type:String,
    maxlength:50,
    minlength:1
  }
},{
  timestamps:{
    createdAt:'createDate',
    updatedAt:'updateDate'
  }
})
const Article=mongoose.model('Article',articleSchema)

//文章标签
const tagSchema=new mongoose.Schema({
  aid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Article',
    required:true
  },
  tagname:{
    type:String,
    maxlength:50,
    minlength:1,
    required:true
  }
},{
  timestamps:{
    createdAt:'createDate',
    updatedAt:'updateDate'
  }
})
const Tag=mongoose.model('Tag',tagSchema)



module.exports={
  Article,
  Tag
}