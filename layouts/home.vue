<template>
  <div id="home">
    <Header></Header>
    <Banner/>
    <div class="main clearfix">
      <div class="main-inner">
        <section class="main-main">
          <nuxt/>
        </section>
        <section class="main-aside is-show">
          <Aside></Aside>
        </section>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@home/Header'
import Banner from '@home/Banner'
import Aside from '@home/Aside'
import Footer from '@home/Footer'
export default {
  components:{
    Header,Banner,Aside,Footer
  }
}
</script>
<style lang="scss" scoped>

.main{
  width: 100%;
  background-color: #eeeeee;
  .main-inner{
    width:100%;
    padding: 60px 10px 20px 10px;
    margin: 0 auto;
    background: #eeeeee;
  }
  .main-main{
    float: left;
    width: 60%;
    background-color: #ffffff;
  }
  .main-aside{
    width: 35%;
    float: right;
  }
}


@media screen and (min-width:980px){
  #home{
    .main{
      .main-inner{
        width: 960px;
      }
    }
  }
}
@media screen and (max-width:720px){
  #home{
    .main{
      .main-inner{
        .main-main{
          width: 80%;
          margin:0 auto;
          float: unset;
        }
      }
      .is-show{
        display: none;
      }
    }
  }
}
  
</style>