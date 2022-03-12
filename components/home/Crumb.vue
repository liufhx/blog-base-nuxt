<template>
  <div class="crumb">
    <span v-for="(item,index) in crumbList" :key="index">
      <span class="crumb-name" @click="[item.active?crumbRoute(item.route):null]">
        {{item.name}}
      </span>
      <i v-if="speratorClass" :class="[speratorClass]">
      </i>
      <span v-else class="crumb-sperator">
        {{sperator?sperator:'/'}}
      </span>
      
    </span>
  </div>
</template>
<script>
export default {
  name:'Crumb',

  props:['sperator','crumb-list','sperator-class'],
  mounted(){
   
  },
  methods: {
    crumbRoute(route){
      this.$router.push(route)
    }
  },

}
</script>
<style lang="scss" scoped>
.crumb{
  padding: 20px;
  font-size:16px ;
  border-bottom: 2px solid #ebebeb;
  border-radius:5px;
  box-shadow: 0 0 5px 0.5px rgba(48, 24, 24, 0.493);;
  .crumb-name{
    cursor:pointer;
    &:hover{
      color: #1147ab;
    }
  }
  
}
</style>