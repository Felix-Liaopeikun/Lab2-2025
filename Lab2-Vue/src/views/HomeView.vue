<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import localEvents from '@/assets/events.json'

const events = ref<Event[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const totalEvents = ref(0)
const perPage = 3

const props = defineProps<{ page: number }>()
const page = computed(() => Number(props.page) || 1)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage)
  return page.value < totalPages
})

watchEffect(async () => {
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
})
</script>

<template>
  <div class="home">
    <p v-if="loading">加载中...</p>
    <p v-else-if="error" style="color:#c0392b">{{ error }}</p>
    <div class="flex flex-col items-center">
      <EventCard v-for="event in events" :key="event.id" :event="event" />

      <div class="pagination">
        <RouterLink
          id="page-prev"
          :to="{ name: 'home', query: { page: page - 1 } }"
          rel="prev"
          v-if="page > 1"
        >
          ‹ 上一页
        </RouterLink>
        <RouterLink
          id="page-next"
          :to="{ name: 'home', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >
          下一页 ›
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
  margin-top: 1rem;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>