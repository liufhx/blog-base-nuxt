<template>
  <div class="user-add">
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