import { useRealtimeStore } from '../stores/realtimeStore'

export function startRealtimeService() {
  const store = useRealtimeStore()

  setInterval(() => {
    store.vehicles = store.vehicles.map(v => {
      const latOffset = (Math.random() - 0.5) * 0.01
      const lngOffset = (Math.random() - 0.5) * 0.01

      return {
        ...v,
        lat: v.lat + latOffset,
        lng: v.lng + lngOffset,
        speed: Math.random() * 60,
        occupancy: Math.random() * 100
      }
    })
  }, 2000)
}