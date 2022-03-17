<template>
<div class="error">
<el-result icon="error" title="错误提示" subTitle="请求错误，请稍后重试">
  <!-- <el-result icon="error" title="错误提示" :subTitle="`请求错误，请稍后重试,${error.message}`"> -->
    <template slot="extra">
      <nuxt-link to="/"><el-button type="primary" size="medium">返回首页</el-button></nuxt-link>
    </template>
  </el-result>
</div>
</template>

<script>
export default {
  props: ['error'],
  // layout: 'home' 
}
</script>