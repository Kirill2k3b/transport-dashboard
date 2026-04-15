import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

// MOCK ДАННЫЕ
let vehicles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  type: ["bus", "tram", "trolley"][Math.floor(Math.random() * 3)],
  lat: 55.75 + Math.random() * 0.05,
  lng: 37.6 + Math.random() * 0.05,
  speed: Math.random() * 60
}))

// API ДЛЯ ФРОНТА
app.get("/api/vehicles", (req, res) => {
  res.json(vehicles)
})

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000")
})