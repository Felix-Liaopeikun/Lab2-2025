<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Student } from '@/types'
import StudentService from '@/services/StudentService'
import axios from 'axios'

const students = ref<Student[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const { data } = await StudentService.getStudents()
    students.value = data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error.value = `无法获取学生信息：${e.message}`
    } else {
      error.value = '发生未知错误，无法获取学生信息。'
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="students">
    <h1>学生信息</h1>
    <p v-if="loading">加载中...</p>
    <p v-else-if="error" style="color:#c0392b">{{ error }}</p>

    <div v-else class="cards">
      <div v-for="(stu, idx) in students" :key="idx" class="card">
        <h3>{{ stu.name }} {{ stu.surname }}</h3>
        <p>GPA: {{ stu.gpa }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.students {
  text-align: left;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 12px;
}
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}
.card h3 {
  margin: 0 0 8px 0;
}
</style>