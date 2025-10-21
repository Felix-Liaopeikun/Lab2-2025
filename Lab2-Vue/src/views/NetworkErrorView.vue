<script setup lang="ts">
</script>

<template>
  <div class="network-error">
    <h1>网络错误</h1>
    <p>抱歉，无法连接到服务器。请检查网络并稍后重试。</p>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<style scoped>
.network-error {
  text-align: center;
}
.network-error h1 {
  color: #c0392b;
}
</style>