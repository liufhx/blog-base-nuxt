<template>
  <div id="home">
    <Header></Header>
    <Banner/>
    <div class="main clearfix">
      <div class="main-inner clearfix">
        <section class="main-main">
           <Crumb :crumb-list="getCrumbList"></Crumb>
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
import Crumb from '@home/Crumb'
import Footer from '@home/Footer'
export default {
  components:{
    Header,Banner,Aside,Footer,Crumb
  },
  middleware:'crumb',
  computed:{
    getCrumbList(){
      return this.$store.state.crumbList
    }
  },
}
</script>
<style lang="scss" scoped>
#home{
  min-width: 960px;
}
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
    min-height: 400px;
    background-color: #eeeeee;
    box-shadow: 0 -2px 20px 0.5px #868181;
    border-radius: 5px;
    padding: 4px;
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
@media screen and (max-width:900px){
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