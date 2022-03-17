<template>
  <div id="archive">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item,index) in archive" :title="`${item._id} (${item.archives.length})`" :key="index" :name="index">
        <ul> 
          <li v-for="(item1,index1) in item.archives" :key="index1">
            <span>{{dateFormat(item1.createDate)}}&nbsp;・&nbsp;</span>
            <span @click="toArticle(item1._id)">{{item1.title}}</span>
          </li>     
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  layout:'home',
  name:'archive',
  data() {
    return {
      archive:[],
      activeName:0
    }
  },
  async asyncData({query,$axios,error}) { 
    try{
      let ret=await $axios.get('/api/home/archive')
      let {meta,result}=ret.data
      let archive=[]
      if(meta.status==200){
        archive=result.archive   
        console.log(archive)
      }else{
        throw new Error('获取文章归档失败')
      }
      return {archive}
    }catch(e){
      error(e)
    }
  },
  mounted(){
    console.log(this.archive)
  },
  methods:{
    dateFormat(date){
      return this.$dayjs(date).format('MM-DD')
    },
    toArticle(_id){
      this.$router.push({path:'/home/article_detail',query:{_id}})
    }
  }
}
</script>
<style lang="scss" scoped>
#archive{
  padding: 20px 5px;
  background-color: #eeeeee;
  ::v-deep.el-collapse-item__header{
    color: #2A7AE2;
    border-left: .5em solid #2A7AE2;
    background-color: #eeeeee;
    padding-left:1em;
    font-size: 18px;
    
  }
  ::v-deep.el-collapse-item__content{
    background-color: #eeeeee;
    padding-bottom: 0;
  }
  ul{
    padding: 5px 0 5px 2.5em;
    font-size:14px;
    &>li{
      span:nth-last-child(1):hover{
        color: #2A7AE2;
        text-decoration: underline #2A7AE2;
        cursor:pointer;
      }
    }
  }
}
</style>