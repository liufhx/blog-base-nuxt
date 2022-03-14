<template>
  <div class="aside">
    <div class="menu">
      <div v-for="(item,index) in menu" :key="index">
        <div class="submenu"  v-if="item.children">
          <div class="submenu-title" @click="submenuOpen(index)">
            <i class="el-icon-document"></i>
            <span>{{item.title}}</span>
          </div>
          <transition name="submenu-item">
            <ul v-show="item.open">
              <li @click="select=item1.route" v-for="(item1,index1) in item.children" :key="index1" :class="['submenu-item',item1.route==select?'menu-selected':'']">
                <nuxt-link :to="item1.route">{{item1.title}}</nuxt-link>
              </li>
            </ul>
          </transition>
        </div>
        <div @click="select=item.route" :class="['menu-item',item.route==select?'menu-selected':'']" v-else>
          <nuxt-link :to="item.route">
            <i class="el-icon-document"></i>
            <span>{{item.title}}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Aside',
  data() {
    return {
      select:''
    }
  },
  props:['menu'],
  methods:{
    submenuOpen(i){
      this.menu[i].open=!this.menu[i].open
    }
  },
  created(){
    this.select=this.$route.path
  }

}
</script>
<style lang="scss" scoped>
$menuHeight:48px;
.aside{
  background: #545c64;
  color:#fff;
  cursor:pointer;
  height: 800px;
  width:250px;
  .menu{
    font-size: 20px;
    font-weight: 400;
    .menu-selected{
      background: #126ed1;
    }
    a{
      color:#fff;
      display: block;
      width:100% ;
      padding-left: 2em;
    }
    
    .menu-item,.submenu-title,.submenu-item{
      height: $menuHeight;
      line-height: $menuHeight;
    }
    .menu-item:hover,.submenu-title:hover,.submenu-item:hover{
      background: #126ed1;
    }
    .menu-item,.submenu-title{
      position: relative;
      i{
        position: absolute;
        left:1em;
        top:50%;
        transform:translateY(-50%) ;
        
      }
      span{
        padding-left: 0.5em;
      }
   
    }
    .submenu{
      .submenu-title{
        padding-left:2em;
      }

      a{
        padding-left: 3.2em;
      }
      .submenu-item-enter-active,.submenu-item-leave-active{
        transition: all .5s ease;
      }
      .submenu-item-enter,.submenu-item-leave-to{     
        li{
          height: 0;
          overflow: hidden;
        }    
      }
      ul{
        li{
          transition: all .5s; 
        }
      }
      
    }
  }
}
  
</style>