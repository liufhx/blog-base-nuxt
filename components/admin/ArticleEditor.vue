<template>
  <div class="article-editor">
    <el-form>
      <el-form-item  label="标题:" >
        <el-input v-model="articleInfo.title"></el-input>
      </el-form-item>
      <el-form-item  v-if="_id" label="作者:" >
        <el-input v-model="articleInfo.author" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类:" >
        <el-input v-model="articleInfo.category"></el-input>
      </el-form-item>
      <el-form-item label="标签:" >
        <el-tag closable v-for="(tag,index) in articleInfo.tags" :key="index" @close="closeTag(tag)">{{tag}}</el-tag>
        <el-input v-if="tagInput.visible" v-model="tagInput.value" ref="saveTagInput"
        @keyup.enter.native="tagInputConfirm" @blur="tagInputConfirm"></el-input>
        <el-button v-else size="small" @click="showTagInput">+ 添加标签</el-button>
      </el-form-item>
      <el-form-item label="摘要:" >
        <div id="article-abstract">
        </div>
      </el-form-item>
      <el-form-item label="文章封面:" >
        <div class="cover-preview" @click="choiceImg">
          <img v-show="!articleInfo.cover"  src="@/assets/img/add-tag.png" alt="图片加载失败" title="优质封面有助于获得人气">
          <img v-show="articleInfo.cover" :src="articleInfo.cover" alt="图片加载失败" ref="preview" title="优质封面有助于获得人气">
          <div class="cover-cancel" @click="fileClear" @click.stop>
            <span>X</span>
          </div>
          <input type="file" accept=".png,.jpg,.jpeg" ref="fileElem" multiple @change="fileGetImg">
        </div>
        <div class="cover-upload-tip">
          <span>支持jpg、jpeg、png等多种格式，单张图片最大支持5m</span>
        </div>
      </el-form-item>
      <el-form-item label="正文:">
        <div id="article-content">
        </div>       
      </el-form-item>

      <el-form-item>
        <el-button v-if="_id" @click="articleModify" type="primary">更改</el-button>    
        <el-button v-else @click="articleAdd" type="primary">创建</el-button>   
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let WEditor
if(process.client){
  WEditor=require('wangeditor')
}
export default {
  name:'ArticleEditor',
  data() {
    return {
      articleInfo:{
        author:'',
        title:'',
        category:'',
        tags:[],
        abstract:'',
        cover:null,
        content:''
      },
      tagInput:{
        visible:false,
        value:''
      },
      editor1:null,
      editor2:null
    }
  },
  props:['_id','article'],
  methods:{
    //关闭标签
    closeTag(tag){
      let tags=this.articleInfo.tags
      tags.splice(tags.indexOf(tag),1)
    },
    showTagInput(){
      this.tagInput.visible=true
      this.$nextTick(_=>{
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    tagInputConfirm(){
      let value=this.tagInput.value
      if(value.trim().length){
        this.articleInfo.tags.push(value)
      }
      this.tagInput.visible=false,
      this.tagInput.value=''

    },
    //封面图片处理
    choiceImg(){
      this.$refs.fileElem.dispatchEvent(new MouseEvent('click'))
    },
    fileGetImg(){
      let file=this.$refs.fileElem
      let reader=new FileReader()
      try{
        if(typeof file.files[0]!=='undefined'){
          reader.readAsDataURL(file.files[0])
        }
      }catch(err){
        this.$message({type:'error',showClose:true,message:'获取图片失败'})
      }
      reader.onload=()=>{
        if(reader.result.length>5*1024*1024){
          this.$message({type:'error',showClose:true,message:'图片加载失败，图片不能超过5m'})
        }else{
          this.articleInfo.cover=reader.result
        }
      }
    },
    fileClear(){
      this.articleInfo.cover=null
    },

    //格式化文章
    formatArticle(){
      let article=new FormData()
      let {_id,title,category,tags,cover,content,abstract}=this.articleInfo

      abstract=this.editor1.txt.text().trim().length>0?abstract:''
      content=this.editor2.txt.text().trim().length>0?content:''

      let file=this.$refs.fileElem
      article.append('uid',this.$store.state.user._id)
      article.append('title',title)
      article.append('category',category)
      article.append('tags',JSON.stringify(tags))
      article.append('abstract',abstract)
      article.append('content',content)
      if(typeof file.files[0]!=='undefined'){
        article.append('cover',file.files[0])
      }else{
        article.append('cover',cover)
      }
      if(typeof _id!=='undefined'){
        article.append('_id',_id)
      }
      return article
    },

    articleModify(){
      this.$axios({
        method:'post',
        url:'/api/admin/article_modify',
        data:this.formatArticle()
      }).then(ret=>{
        if(ret.data.meta.status==200){
          this.$message({type:'success',showClose:true,message:'更改文章成功'})
          this.$router.push('/admin/article_list')
        }else{
          this.$message({type:'error',showClose:true,message:'更改文章失败'})
        } 
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'更改文章失败'})
      })
    },
    articleAdd(){
      this.$axios({
        method:'post',
        url:'/api/admin/article_add',
        data:this.formatArticle()
      }).then(ret=>{
        if(ret.data.meta.status==200){
          this.$message({type:'success',showClose:true,message:'创建文章成功'})
          this.$router.push('/admin/article_list')
        }else{
          throw new Error(ret.data.meta.msg)
        } 
      }).catch(err=>{
        this.$message({type:'error',showClose:true,message:'创建文章失败'})
      })
    }
    

  },
  mounted(){
     if(this._id){
      this.articleInfo={...this.article}
    }
    const editor1=new WEditor('#article-abstract')
    const config1=editor1.config
    config1.onchange=html=>this.articleInfo.abstract=html
    config1.menus=[]
    config1.showFullScreen =false
    config1.height=150
    config1.zIndex = 500
    this.editor1=editor1
    editor1.create()
    editor1.txt.html(this.articleInfo.abstract)

    const editor2=new WEditor('#article-content')
    const config2=editor2.config
    config2.onchange=html=>this.articleInfo.content=html
    config2.zIndex = 500
    this.editor2=editor2
    // editor2.highlight = hljs
    editor2.create()
    editor2.txt.html(this.articleInfo.content)

   
  },
  beforeDestroy(){
   //销毁编辑器
    this.editor1.destroy()
    this.editor1=null
    this.editor2.destroy()
    this.editor2=null

  }
}
</script>
<style lang="scss" scoped>
.article-editor{
  ::v-deep.el-button{
    span:hover{
      cursor: pointer;
    }
  }
  ::v-deep.el-input{
    width: 50%;
  }
  ::v-deep.el-form-item__label{
    float: unset;
  }
  ::v-deep.el-form-item{
    margin-bottom:0;
  }
  ::v-deep.el-button{
    margin-top:20px
  }


  .cover-preview{
    width:320px;
    height: 180px;
    cursor:pointer;
    border: 2px rgba(34, 14, 14,0.4) dashed;
    position: relative;
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);  
    }
    img:nth-child(2){
      width: 100%;
      height: 100%;
    }
    img:nth-child(2):hover+.cover-cancel{
      display: inline;
      z-index: 10;
    }
    .cover-cancel:hover{
      span{
        cursor: pointer;
      }
      display: inline;
      z-index: 10;
    }
    .cover-cancel{
      display: none;
      width: 40px;
      height: 40px;
      position: absolute;
      top:0;    
      left: 100%;
      transform: translate(-50%,-50%);
      background: #262626;
      text-align: center;
      border-radius:50% ;
      span{
        color: #ffffff;
        font-size:20px ;
        line-height: 40px;
      }
    }
    input{
      width: 0;
      height: 0;
      position: absolute;
      z-index: -10;     
    }
  }


}
  
</style>