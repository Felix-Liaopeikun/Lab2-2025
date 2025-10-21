<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const event = ref<Event | null>(null)
const error = ref<string | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await EventService.getEvent(id)
    event.value = data
  } catch (e: unknown) {
    // 根据错误类型导航到相应视图
    if (axios.isAxiosError(e)) {
      const status = e.response?.status
      if (status === 404) {
        router.push({ name: 'not-found', params: { resource: 'event' } })
        return
      }
      router.push({ name: 'network-error' })
      return
    }
    // 非 Axios 错误，保留提示并回退示例数据
    error.value = '无法获取该事件，显示本地示例数据。'
    const fallback: Event[] = [
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
    event.value = fallback.find(e => e.id === id) || null
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="event-view">
    <RouterLink to="/">← Back</RouterLink>

    <p v-if="loading">加载中...</p>
    <div v-else-if="event" class="event-details">
      <h1>{{ event.title }}</h1>
      <p><strong>Category:</strong> {{ event.category }}</p>
      <p><strong>When:</strong> {{ event.date }} {{ event.time }}</p>
      <p><strong>Where:</strong> {{ event.location }}</p>
      <p><strong>Organizer:</strong> {{ event.organizer }}</p>
      <p><strong>Pets Allowed:</strong> {{ event.petsAllowed ? 'Yes' : 'No' }}</p>
      <p class="desc">{{ event.description }}</p>
    </div>
    <div v-else>
      <h2>Event not found (id: {{ id }})</h2>
      <p v-if="error" style="color:#c0392b">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.event-view {
  text-align: left;
}
.event-details h1 {
  margin-bottom: 0.5rem;
}
.desc {
  margin-top: 1rem;
}
</style>