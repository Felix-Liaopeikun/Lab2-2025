<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <h1>Oops!</h1>
  <h3>The {{ props.resource }} you're looking for is not here.</h3>
  <RouterLink :to="{ name: 'home' }">Back to the home page</RouterLink>
</template>

<style scoped>
.not-found { text-align: center; }
.not-found h1 { color: #c0392b; }
</style>