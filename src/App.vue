<template>
  <div class="app">
    <header class="header">
      <h1>🚍 Transport Control Center</h1>
    </header>

    <div class="layout">
      <!-- ЛЕВАЯ ПАНЕЛЬ: KPI + Дашборд -->
      <div class="left-panel">
        <Dashboard />
      </div>

      <!-- ЦЕНТР: КАРТА -->
      <div class="map-panel">
        <TransportMap />
      </div>

      <!-- ПРАВАЯ: ЧАТ + AI -->
      <div class="chat-panel">
        <ChatWidget />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import Dashboard from './views/Dashboard.vue'
import TransportMap from './components/TransportMap.vue'
import ChatWidget from './components/ChatWidget.vue'

import { useRealtimeStore } from './stores/realtimeStore'
import { startMockBackend } from './services/mockBackend'

const store = useRealtimeStore()

onMounted(() => {
  store.init()
  startMockBackend(store)
})
</script>

<style>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f6f8;
}

/* HEADER */
.header {
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #eaeaea;
}

/* MAIN LAYOUT */
.layout {
  flex: 1;
  display: flex;
  gap: 12px;
  padding: 12px;
  min-height: 0;
}

/* KPI + DASHBOARD */
.left-panel {
  width: 260px;
  background: white;
  border-radius: 12px;
  padding: 10px;
  overflow: auto;
}

/* MAP */
.map-panel {
  flex: 1;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  min-width: 0;
}

/* CHAT */
.chat-panel {
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>