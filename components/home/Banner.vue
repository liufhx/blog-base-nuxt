<template>
  <div class="banner" :style="{backgroundImage:`url(${banner})`}">
    <div class="banner-title">{{title}}</div>
  </div>
</template>
<script>
import {page} from '@/config'
export default {
  name:'Banner',
  data() {
    return {
      title:page.home.title,
    }
  },
  created(){
    this.banner=page.home.banner
  }
 
  
}
</script>
<style lang="scss" scoped>
// $bannerUrl:'@/assets/img/banner.jpg';

.banner{
  width:100%;
  height:320px;
  position: relative;
  // background-image: url($bannerUrl);
  background-repeat: no-repeat;
  background-size: 100%;
  .banner-title{
    font-size: 50px;
    top:50%;
    left:50%;
    position: absolute;
    transform:translate(-50%,-50%);
    color: #fff;
    font-weight: 300;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }
}
</style>