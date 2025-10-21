<script setup lang="ts">
const props = defineProps<{ resource?: string }>()
</script>

<template>
  <div class="not-found">
    <h1>404 未找到</h1>
    <p>
      抱歉，
      <strong>{{ props.resource || '资源' }}</strong>
      不存在或已被删除。
    </p>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<style scoped>
.not-found { text-align: center; }
.not-found h1 { color: #c0392b; }
</style>