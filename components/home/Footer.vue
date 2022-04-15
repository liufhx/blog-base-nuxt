<template>
  <div class="footer">
    <div class="footer-inner">
      <p>{{copyright}}</p>
      <p>博客已运行:{{runtime}}</p>
      <p class="icp" v-if="icp.length>0"><a target="_blank" href="http://beian.miit.gov.cn" >{{icp}}</a></p>
    </div>
  </div>
</template>
<script>
import {page} from '@/config'
import {initDate} from '@/page.json'
export default {
  name:'Footer',
  data() {
    let runtime=this.setDuration()
    return {
      runtime,
      copyright:page.home.copyright,
      icp:page.home.icp,
      initDate:initDate
    }
  },
  created(){
    let timer=setInterval(this.setDuration,1000)
  },
  methods:{
    setDuration(){
      const initDate=this.initDate?this.initDate:'2022-1-1'
      let start=this.$dayjs(initDate).valueOf()
      let now=Date.now()   
      let time=Math.floor((now-start)/1000),
      day=Math.floor(time/(24*3600)),
      hour=Math.floor((time-day*3600*24)/3600),
      minute=Math.floor((time-day*3600*24-hour*3600)/60),
      second=(time-day*3600*24-hour*3600)%60
      this.runtime=`${(day?day+'天':'')+hour}小时${minute}分${second}秒`
    }

  }
}
</script>
<style lang="scss" scoped>
$fHeight:60px;
.footer{
  width: 100%;
  background-color:black ;
  .footer-inner{
    width: 100%;
    text-align: center;   
    padding: 30px 0;
  }
  p{
    font-size:14px;
    color: #ffff;
    line-height: 20px;
    margin: 5px 0;
  }
  a{
    &:hover{
      color: #ff6a00;
    }
  }
}
</style>