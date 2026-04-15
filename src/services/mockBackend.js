export function startMockBackend(store) {
  const types = ['bus', 'tram', 'trolley']

  function randomType() {
    return types[Math.floor(Math.random() * types.length)]
  }

  function generateVehicles() {
    const vehicles = []

    for (let i = 0; i < 50; i++) {
      const type = randomType()

      vehicles.push({
        id: i,
        type, // <-- ВАЖНО: теперь реально разные типы
        lat: 55.70 + Math.random() * 0.1,
        lng: 37.55 + Math.random() * 0.2,
        speed: Math.random() * 60
      })
    }

    store.setVehicles(vehicles)
  }

  // initial load
  generateVehicles()

  // simulate movement
  setInterval(() => {
    store.vehicles.forEach(v => {
      v.lat += (Math.random() - 0.5) * 0.01
      v.lng += (Math.random() - 0.5) * 0.01
      v.speed = Math.random() * 60
    })
  }, 3000)
}