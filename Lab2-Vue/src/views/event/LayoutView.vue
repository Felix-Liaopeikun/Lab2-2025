<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import localEvents from '@/assets/events.json'
import { useRouter } from 'vue-router'

const event = ref<Event | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const goToRegister = () => {
  router.push({ name: 'event-register-view' })
}
const goToEdit = () => {
  router.push({ name: 'event-edit-view' })
}

onMounted(() => {
  EventService.getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
       if (error && error.response && error.response.status === 404) {
         router.push({
           name: '404-resource-view',
           params: { resource: 'event' }
         })
       } else {
          router.push({ name: 'network-error-view' })
        }
     })
})
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