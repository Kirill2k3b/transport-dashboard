import { defineStore } from 'pinia'

export const useRealtimeStore = defineStore('realtime', {
  state: () => ({
    vehicles: []
  }),

  actions: {
    init() {
      this.vehicles = []
    },

    setVehicles(list) {
      this.vehicles = list
    }
  }
})