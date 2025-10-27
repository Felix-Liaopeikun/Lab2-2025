<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useEventStore()
const { event } = storeToRefs(store)

const goToRegister = () => {
  router.push({ name: 'event-register-view' })
}
const goToEdit = () => {
  router.push({ name: 'event-edit-view' })
}
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>
    <div style="margin: 8px 0;">
      <button @click="goToRegister">Go to Register</button>
      <button style="margin-left:8px" @click="goToEdit">Go to Edit</button>
    </div>
    <RouterView :event="event" />
  </div>
</template>