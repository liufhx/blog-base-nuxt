<template>
  <el-result icon="error" title="错误提示" subTitle="请求错误，请稍后重试">
    <template slot="extra">
      <nuxt-link to="/"><el-button type="primary" size="medium">返回首页</el-button></nuxt-link>
    </template>
  </el-result>
</template>

<script>
export default {
  props: ['error'],
  layout: 'home' 
}
</script>
<style lang="scss" scoped>
::v-deep.el-result{
  background-color: #eeeeee;
}
  
</style>