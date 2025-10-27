<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()

const router = useRouter()
const store = useMessageStore()

const save = (): void => {
  store.updateMessage('Event data has been updated')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
  <div>
    <p>Edit event here</p>
    <button @click="save">Save and Back to Details</button>
  </div>
</template>