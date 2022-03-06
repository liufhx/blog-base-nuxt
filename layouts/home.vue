<template>
  <div>
    <Header></Header>
    <Banner/>
    <nuxt/>
  </div>
</template>
<script>
import Header from '@home/Header'
import Banner from '@home/Banner'
export default {
  components:{
    Header,Banner
  }
}
</script>