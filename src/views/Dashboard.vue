<template>
  <div class="dashboard">
    <h3>📊 KPI Панель</h3>

    <div class="card">Всего: {{ total }}</div>
    <div class="card">Автобусы: {{ busCount }}</div>
    <div class="card">Трамваи: {{ tramCount }}</div>
    <div class="card">Троллейбусы: {{ trolleyCount }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRealtimeStore } from '../stores/realtimeStore'
import { normalizeTransportType } from '../utils/normalizeTransport'

const store = useRealtimeStore()

const total = computed(() => store.vehicles.length)

const busCount = computed(() =>
  store.vehicles.filter(v => normalizeTransportType(v.type) === 'bus').length
)

const tramCount = computed(() =>
  store.vehicles.filter(v => normalizeTransportType(v.type) === 'tram').length
)

const trolleyCount = computed(() =>
  store.vehicles.filter(v => normalizeTransportType(v.type) === 'trolley').length
)
</script>

<style>
.dashboard { padding: 10px; }
.card {
  margin: 6px 0;
  padding: 10px;
  background: #eee;
  border-radius: 8px;
}
</style>