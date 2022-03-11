<template>
  <div id="article" >
    <section v-if="article">
      <div class="article-title"> {{article.title}}</div>
      <div class="article-info">
        <span>
          <i class="el-icon-user-solid"></i>
          {{article.author}}
        </span>
        <span>
          <i class="el-icon-date"></i>
          {{articleDateFormat(article.createDate)}}
        </span>
      </div>
      <div class="article-cover"  v-if="article.cover&&article.cover.length>0">
        <img :src="article.cover" alt="">
      </div>
      <div id="article-content" v-highlight class="article-style" v-html="article.content"></div>

      <div class="article-comment">
        <h4>评论</h4>
        <div class="comment-form">
          <textarea v-model="fatherForm.content" placeholder="发表一条友善的评论"  maxlength="150"></textarea>
        </div>
        <div class="comment-submit">
          <el-checkbox v-model="fatherForm.anony">匿名提交</el-checkbox>
          <el-button size="small" @click="commentAdd()">发布评论</el-button>
        </div>
        <ul v-if="comment">
          <li v-for="(item,index) in comment" :key="index">
            <div class="comment-info">
              <span>{{item.from}}</span>
              <span>{{dateFormat(item.createDate)}}</span>
              <el-button type="mini" @click="showChildForm(index)">回复</el-button>
              <el-button type="mini" v-if="getUser.role==='admin'" @click="commentDelete(item._id,index)">删除</el-button>
              <span>{{`${index+1}楼`}}</span>
            </div>
            <p v-html="item.content"></p>
            <ul class="comment-children" v-if="item.children">
              <li v-for="(item2,index2) in item.children" :key="index2">
                <div class="comment-info" >
                  <span>{{item2.from}}</span>
                  <span>回复@{{item2.to}}</span>
                  <span>{{dateFormat(item2.createDate)}}</span>
                  <el-button type="mini" @click="showChildForm(index,index2)">回复</el-button>
                  <el-button type="mini" v-if="getUser.role==='admin'" @click="commentDelete(item2._id,index,index2)">删除</el-button>
                </div>
                <p v-html="item2.content"></p>
              </li>
            </ul>
            <div class="comment-form" v-show="childForm[index].isShow">
              <textarea :placeholder="childForm[index].placeholder"
              maxlength="150"
              v-model="childForm[index].content">
              </textarea>
              <div class="comment-submit">
                <el-checkbox v-model="childForm[index].anony">匿名提交</el-checkbox>
                <el-button size="small" @click="commentChildAdd(index)">发表评论</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section v-else>
      文章不存在
    </section>
  </div>
  
</template>

<script>
import '@/assets/css/article.css'

export default {
  layout:'home',
  name: 'article_detail',
  data() {
    return {
      comment:[],
      article:{},
      childForm:[],
      fatherForm:{}
    }
  },
  async asyncData({query,$axios,error}) {  
    try{
      let {_id}=query
      let ret=await Promise.all([
        $axios.get(`/api/home/article?_id=${_id}`),
        $axios.get(`/api/home/comment_list?aid=${_id}`)
      ])
      let data={}
      if(ret[0])if(ret[0].data.meta.status==200){
        data.article=ret[0].data.result.article
      }else{
        throw new Error('文章不存在')
      }
      if(ret[1])if(ret[1].data.meta.status==200){
        let comment=ret[1].data.result.commentList
        let father=[],children=[],childForm=[]
        if(comment.length){ 
          //处理评论数据
          for(let i=0;i<comment.length;i++){
            let item=comment[i]
            item.from=item.from?item.from:'匿名'
            item.to=item.to?item.to:'匿名'
            if(!item.cid){
              item.children=[]
              father.push(item);
              //评论回复评论的表单
              childForm.push({
                aid:_id,
                content:'',
                anony:false,
                placeholder:'',
                isShow:false
              })
            }else{
              children.push(item)
            }
          }
          if(children.length){
            for(let i=0;i<children.length;i++){
              let cid=children[i].cid
              let j=father.findIndex(item=>{return item._id===cid})
              if(j>=0)father[j].children.push(children[i])
            }
          }
          data.comment=father
          data.childForm=childForm
        }
      }
      data.fatherForm={
        aid:_id,
        content:'',
        anony:false
      }
      return data
    }catch(e){
      error(e)
    }
  },
  methods:{
    articleDateFormat(date){
      return this.$dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    dateFormat(date){
      return this.$dayjs(date).from(new Date())
    },

    commentAdd(i,j){
      let aid,content,anony,fromId,toId,cid
      let form={}
      let uid=this.getUser._id
      if(typeof i!=='number'){
        // 评论文章
        form=this.fatherForm
      }else if(typeof j==='undefined'){
        //评论 文章的评论
        form=this.childForm[i]
        let {_id,fromId}=this.comment[i]
        toId=fromId
        cid=_id
      }else{
        //评论之间的评论
        form=this.childForm[i]
        let {_id}=this.comment[i]
        let {fromId}=this.comment[i].children[j]
        toId=fromId,cid=_id
      }

      aid=form.aid
      content=form.content
      anony=form.anony

      if(content.trim().length<=0){
        this.$message({type:'warning',showClose:true,message:'评论不能为空'})
        return
      }

      if(!anony&&!uid){
        this.$message({type:'warning',showClose:true,message:'不匿名评论需要登录'})
        return
      }else if(!anony){
        fromId=uid
      }
      
      this.$axios({
        method:'post',
        url:'/api/home/comment_add',
        data:{aid,content,fromId,toId,cid}
      }).then(ret=>{
        if(ret.data.meta.status!=200){
          this.$message({type:'error',showClose:true,message:'发布评论失败'})
          return
        }
        let item=ret.data.result.comment
        item.from=item.from?item.from:'匿名'
        item.to=item.to?item.to:'匿名'
        item.children=[]
        //如果是文章的评论
        if(!item.cid){
          this.comment.push(item)
        }else{
          //如果是评论的评论
          let index=this.comment.findIndex(item=>{return cid===item._id})
          if(i>=0)this.comment[index].children.push(item)
        }
        this.initChildForm()
        this.$message({type:'success',showClose:true,message:'发布评论成功'})
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'发布评论失败'})
      })

    },
    commentChildAdd(i){
      let j=this.childForm[i].childIndex
      if(typeof j==='undefined'){
        this.commentAdd(i)
      }else{
        this.commentAdd(i,j)
      }
    },
    //删除评论
    commentDelete(_id,i,j){
      this.$axios.get(`/api/admin/comment_delete?_id=${_id}`).then(ret=>{
        if(ret.data.meta.status===200){
          if(j>=0){
            this.comment[i].children.splice(j,1)
          }else{
            this.comment.splice(i,1)
            this.childForm.splice(i,1)
          }
          this.initChildForm()
          this.$message({type:'success',showClose:true,message:'删除评论成功'})
        }else{
          this.$message({type:'error',showClose:true,message:'删除评论失败'})
        }
      }).catch(e=>{
        this.$message({type:'error',showClose:true,message:'删除评论失败'})
      })
    },
    //展开子评论评论栏
    showChildForm(i,j){  
      let flag=this.childForm[i].isShow
      this.initChildForm()
      let form=this.childForm[i],comment=this.comment
      if(flag){
        form.isShow=false
        form.content=''
        form.anony=true
        form.childIndex=undefined
      }else if(typeof j==='undefined'){
        form.isShow=true
        form.placeholder='回复@'+comment[i].from
      }else{
        form.childIndex=j
        form.isShow=true
        form.placeholder='回复@'+comment[i].children[j].from
      }
    },
    //初始所有子评论栏
    initChildForm(){
      let i=0,childForm=[]
      while(i<this.comment.length){
        childForm.push({
          aid:this.article._id,
          content:'',
          anony:false,
          placeholder:'',
          isShow:false
        })
        this.childForm=childForm
        i++
      }
    }
  },
  computed:{
    getUser(){
      return this.$store.state.user
    }
  }


}
</script>
<style lang="scss" scoped>
#article{
  padding: 10px 10px;
  background-color: #eeeeee;
  color: #262626;
  ::v-deep.el-button{
    span{
      cursor: pointer;
    }
  }
  &>div{
    padding: 5px 0;
  }
  .article-info{
    margin:10px 0;
    padding-left:10px;
    span{
      display: inline-block;
      &:not(:last-child){
        padding-right: 10px;
        // border-right:1px solid #262626 ;
      }
      &:not(:first-child){
        padding-left: 5px;
      }
      i{
        color:#409EFF;
      }
    }
  }
  .article-title{
    font-size:30px ;
    font-weight: 600;   
  }
  .article-cover{ 
    &>img{
      border-radius:10px;
      width: 100%;
      box-shadow: 0 0 5px 1px #262626;
    }
  }
  #article-content{
    padding: 10px 0 20px;
    border-bottom: 1px solid #262626;
  }
  .article-comment{  
    h4{
      font-size: 20px;
    }
    span{
      font-size: 14px;
    }
    &>ul{  
      ::v-deep.el-button{
        width: fit-content;
        height: fit-content;
        padding: 2px;
        
      }  
      &>li{
        padding: 5px 15px 0;
        margin-bottom: 10px;
        border-radius:10px ;
        box-shadow: 0 0 5px 1px #cce0f3;
        border-bottom: 1px solid #409eef;
        span:nth-last-child(1){
          float: right;
        }
        &>p{
          padding-top: 1px;
        }
        .comment-info{
          border-bottom: 2px dashed #d0e2e7;
        }
        .comment-children{
          margin-left: 40px;
          padding-bottom:10px ;
          
        }
        
      
      }
    }
    .comment-form{
      padding: 5px 0;
      textarea{
        width: 100%;
	      height: 110px;
	      display: block;
        padding: 10px 5px; 
        border-radius:10px ;
        border: 1px #cce0f3 solid;
        &:focus{
          border: 1px #086dcc solid;
        }
      }
    }
  }

}
</style>