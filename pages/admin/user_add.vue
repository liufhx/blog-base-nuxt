<template>
  <div class="user-add">
    <h3>用户创建</h3>
     <UserEditor></UserEditor>
  </div>
</template>
<script>
import UserEditor from '@admin/UserEditor'
export default {
  layout:'admin',
  name:'user_add',
  components:{
    UserEditor
  }
}
</script>