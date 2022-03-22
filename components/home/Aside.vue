<template>
  <div class="aside">
    <div class="card">
      <img :src="card_bg" alt="">
      <img :src="avatar_pic" alt="">
      <nuxt-link to="/home/about"><button>联系我</button></nuxt-link>
    </div>
    <div class="aside-category">
      <h3>分类</h3>
      <ul>
        <li v-for="(item,index) in category" :key="index">
          <a @click="getEntry(item._id,null)">{{`${item._id}(${item.count})`}}</a>
        </li>
      </ul>
    </div>
    <div class="aside-tag">
      <h3>标签</h3>
      <ul>
        <li v-for="(item,index) in tag" :key="index">
          <a @click="getEntry(null,item._id)">{{item._id}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {page} from '@/config'
export default {
  name:'Aside',
  data() {
    return {
      category:[],
      tag:[]
    }
  },
  async fetch(){
    await this.$axios.get('/api/home/category').then(ret=>{
      this.category=ret.data.result.category
    })
    await this.$axios.get('/api/home/tag').then(ret=>{
      this.tag=ret.data.result.tag
    })
  },
  methods:{
    getEntry(category,tag){
      this.$router.push({path:'/',query:{category,tag}})
    }
  },
  created(){
    this.avatar_pic=page.home.avatar_pic
    this.card_bg=page.home.card_bg
  }

}
</script>
<style lang="scss" scoped>
.aside{
  width: 100%;
  // background-color: #ffffff;
  box-shadow: 0 -2px 20px 0.5px #868181;

  .card{
    img:nth-child(1){
      width: 100%;
      min-height: 150px;
      border-radius: 2px;
    }
    img:nth-child(2){
      display: block;
      margin: auto;
      margin-top: -60px;
      width: 120px;
      height:120px;
      border-radius:50%;
      box-shadow: 1px 1px 5px 1px black;
      transform: rotate(0deg);
      transition:transform .5s linear;
    }
    img:nth-child(2):hover{
      transition:transform .5s linear;
      transform:rotate(360deg);
    }
    button{
      width: 140px;
      height:40px;
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      background: #262626;
      color: #ffffff;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    button::after{
      content:"";
      z-index:-1;
      position:absolute;
      background: #595959;
      top:-30%;
      left:0;
      width: 10%;
      height: 160%;
      transform: translate(-200%,0) rotate(35deg);
    }
    button:hover::after{
      transition: transform .5s ease-in-out;
      transform:translate(1200%,0) rotate(35deg);
    }
  }


  ul{
    margin: 0 20px;
    border-top:2px solid #cccccc ;
  }
  h3{
    padding: 5px 0 5px 20px;
  }
  .aside-category{
    margin-top:10px;
    ul{
      padding: 5px 0 0 10px;
      li{
        padding: 2px 0;
        a{
          color: #267dcc;
          &:hover{
            text-decoration:underline;
          }
        }

      }
    }
  }
  .aside-tag{
    margin-top:10px;
    ul{
      li{
        display: inline-block;
        margin-top: 5px ;
        a{
          width:fit-content;
          display: block;
          line-height: 20px;
          background-color: #b1d0ee;
          border-radius: 15px;
          padding: 0 0.5em;
          margin-right: 1em;
          &:hover{
            background-color: #267dcc;
            color:#ffffff;
          }
        }
      }
    }

  }
  
}
</style>