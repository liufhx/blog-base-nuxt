<template>
  <div id="footer">
    <div class="footer-inner">
      <p>©2021  作者</p>
      <p>博客已运行:{{runtime}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name:'Footer',
  data() {
    let runtime=this.setDuration()
    return {
      runtime
    }
  },
  created(){
    let timer=setInterval(this.setDuration,1000)
  },
  methods:{
    setDuration(){
      let start=this.$dayjs('2021-03-12').valueOf()
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
#footer{
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
  }
}
</style>