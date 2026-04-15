import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    mapFilter: {
      vehicleType: null,
      direction: null
    }
  }),

  actions: {
    applyCommand(command) {
      if (!command) return

      this.mapFilter = {
        vehicleType: command.payload.vehicleType,
        direction: command.payload.direction
      }
    },

    resetFilters() {
      this.mapFilter = {
        vehicleType: null,
        direction: null
      }
    }
  }
})