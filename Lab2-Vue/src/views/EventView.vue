<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import axios from 'axios'
import localEvents from '@/assets/events.json'

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
        router.push({ name: '404', query: { resource: 'event' } })
        return
      }
      router.push({ name: 'network-error' })
      return
    }
    // 非 Axios 错误，保留提示并回退本地 JSON
    error.value = '无法获取该事件，显示本地示例数据。'
    const fallback = localEvents as Event[]
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