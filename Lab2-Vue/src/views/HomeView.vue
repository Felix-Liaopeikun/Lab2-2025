<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const { data } = await EventService.getEvents()
    events.value = data
  } catch (e) {
    error.value = '无法获取事件列表，已使用本地示例数据。'
    events.value = [
      {
        id: 5928101,
        category: 'animal welfare',
        title: 'Cat Adoption Day',
        description: 'Find your new feline friend at this event.',
        location: 'Meow Town',
        date: 'January 28, 2022',
        time: '12:00',
        petsAllowed: true,
        organizer: 'Kat Laydee'
      },
      {
        id: 4582797,
        category: 'food',
        title: 'Community Gardening',
        description: 'Join us as we tend to the community edible plants.',
        location: 'Flora City',
        date: 'March 14, 2022',
        time: '10:00',
        petsAllowed: true,
        organizer: 'Fern Pollin'
      },
      {
        id: 8419988,
        category: 'sustainability',
        title: 'Beach Cleanup',
        description: 'Help pick up trash along the shore.',
        location: 'Playa Del Carmen',
        date: 'July 22, 2022',
        time: '11:00',
        petsAllowed: false,
        organizer: 'Carey Wales'
      }
    ]
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="home">
    <p v-if="loading">加载中...</p>
    <p v-else-if="error" style="color:#c0392b">{{ error }}</p>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>