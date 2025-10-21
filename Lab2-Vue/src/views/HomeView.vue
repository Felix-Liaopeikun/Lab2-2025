<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'
import localEvents from '@/assets/events.json'

const events = ref<Event[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const { data } = await EventService.getEvents()
    events.value = data
  } catch (e) {
    error.value = '无法获取事件列表，已使用本地示例数据。'
    events.value = localEvents as Event[]
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