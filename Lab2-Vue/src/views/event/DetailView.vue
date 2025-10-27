<script setup lang="ts">
import { toRefs } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div v-if="message" style="margin:8px 0;padding:8px;border:1px dashed #f1c40f;background:#fcf8e3;">
    <h4 style="margin:0;">{{ message }}</h4>
  </div>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>