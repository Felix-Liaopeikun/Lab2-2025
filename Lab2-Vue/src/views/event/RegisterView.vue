<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)

const router = useRouter()
const store = useMessageStore()
const { message } = storeToRefs(store)

const register = (): void => {
  store.updateMessage('You are successfully registered for ' + (event.value?.title || 'this event'))
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
  <div>
    <p>Register event here</p>
    <button @click="register">Register Me!</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>