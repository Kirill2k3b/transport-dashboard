<template>
  <div class="chart-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js'

import { useRealtimeStore } from '../../stores/realtimeStore'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

const store = useRealtimeStore()
const canvas = ref(null)

let chart = null

// ----------------------
// генерация стартовых данных
// ----------------------
const generateData = () => {
  const labels = Array.from({ length: 10 }, (_, i) => `T-${10 - i}`)

  const data = labels.map(() =>
    Math.floor(Math.random() * 100)
  )

  return { labels, data }
}

// ----------------------
// INIT CHART
// ----------------------
onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const { labels, data } = generateData()

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Пассажиропоток',
          data,
          borderWidth: 2,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})

// ----------------------
// LIVE UPDATE (реакция на транспорт)
// ----------------------
watch(
  () => store.vehicles,
  () => {
    if (!chart) return

    chart.data.datasets[0].data = chart.data.datasets[0].data.map(() =>
      Math.floor(Math.random() * 100)
    )

    chart.update()
  },
  { deep: true }
)
</script>

<style>
.chart-wrapper {
  height: 200px;
  padding: 10px;
}
</style>