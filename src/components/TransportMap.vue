<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { useRealtimeStore } from '../stores/realtimeStore'
import { useUiStore } from '../stores/uiStore'

const store = useRealtimeStore()
const ui = useUiStore()

let map = null
let clusterGroup = null

// ----------------------
// ICONS
// ----------------------
const getIcon = (type) => {
  return L.divIcon({
    className: 'icon',
    html:
      type === 'bus' ? '🚌' :
      type === 'tram' ? '🚋' : '🚎',
    iconSize: [20, 20]
  })
}

// ----------------------
// FILTER LOGIC
// ----------------------
import { normalizeTransportType } from '../utils/normalizeTransport'


const filteredVehicles = computed(() => {
  return store.vehicles.filter(v => {

    const type = normalizeTransportType(v.type)

    if (
      ui.mapFilter.vehicleType &&
      type !== ui.mapFilter.vehicleType
    ) return false

    return true
  })
})

// ----------------------
// RENDER WITH CLUSTERING
// ----------------------
const renderMarkers = () => {
  if (!clusterGroup) return

  clusterGroup.clearLayers()

  filteredVehicles.value.forEach(v => {
    const marker = L.marker([v.lat, v.lng], {
      icon: getIcon(v.type)
    })

    marker.bindPopup(`
      <b>ID: ${v.id}</b><br/>
      Тип: ${v.type}<br/>
      Скорость: ${v.speed || 0}
    `)

    clusterGroup.addLayer(marker)
  })
}

// ----------------------
// INIT MAP
// ----------------------
onMounted(() => {
  map = L.map('map').setView([55.75, 37.61], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OSM'
  }).addTo(map)

  clusterGroup = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 60
  })

  map.addLayer(clusterGroup)

  renderMarkers()
})

// ----------------------
// REACTIVE UPDATES
// ----------------------
watch(() => store.vehicles, renderMarkers, { deep: true })
watch(() => ui.mapFilter, renderMarkers, { deep: true })
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}

.icon {
  font-size: 16px;
  text-align: center;
}
</style>