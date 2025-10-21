<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import EventService from '@/services/EventService'
import localEvents from '@/assets/events.json'

const events = ref<Event[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const totalEvents = ref(0)
const perPage = 2

const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)
const hasNextPage = computed(() => page.value * perPage < totalEvents.value)

const fetchEvents = async () => {
  loading.value = true
  try {
    const response = await EventService.getEvents(perPage, page.value)
    events.value = response.data
    // json-server returns total count in header 'x-total-count'
    totalEvents.value = Number(response.headers['x-total-count'] || 0)
    error.value = null
  } catch (e) {
    error.value = '无法获取事件列表，已使用本地示例数据。'
    events.value = localEvents as Event[]
    totalEvents.value = (localEvents as Event[]).length
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvents)
watch(page, fetchEvents)
</script>

<template>
  <div class="home">
    <p v-if="loading">加载中...</p>
    <p v-else-if="error" style="color:#c0392b">{{ error }}</p>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination" style="margin-top: 1rem; display: flex; gap: 1rem;">
      <RouterLink v-if="page > 1" :to="{ name: 'home', query: { page: page - 1 } }">
        ← 上一页
      </RouterLink>
      <RouterLink v-if="hasNextPage" :to="{ name: 'home', query: { page: page + 1 } }">
        下一页 →
      </RouterLink>
    </div>
  </div>
</template>