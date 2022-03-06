<template>
  <header id="header">
    <div class="header-inner">
      <nav class="header-inner-left">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/home/archive">归档</nuxt-link>
        <nuxt-link to="/home/timeline">时间轴</nuxt-link>
        <nuxt-link to="/home/about">关于</nuxt-link>
      </nav>
    </div> 
  </header>
  
</template>
<script>
export default {
  name:'Header'
}
</script>
<style lang="scss" scoped>
$hHeight:60px;

#header{
  width: 100%;
  height:$hHeight;
  background-color: #0f161cce;
  .header-inner{
    height:100%;
    margin:0 auto;
    a{
      display: inline-block;
      color: #ffffff;
      line-height:$hHeight;
      padding:0 5px;
      &:hover{
        background-color: #66b1ff;
      }
    }
  }
}



@media screen and (min-width:1080px){
  #header{
    .header-inner{
      width: 1080px;
    }
  }
}



 
  
</style>