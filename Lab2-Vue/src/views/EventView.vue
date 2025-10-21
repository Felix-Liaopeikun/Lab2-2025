<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import type { Event } from '@/types'

// Get id from route params
const route = useRoute()
const id = Number(route.params.id)

// Sample data lookup (simple demo to 8.7)
const events: Event[] = [
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

const event = computed(() => events.find(e => e.id === id))
</script>

<template>
  <div class="event-view">
    <RouterLink to="/">← Back</RouterLink>

    <div v-if="event" class="event-details">
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