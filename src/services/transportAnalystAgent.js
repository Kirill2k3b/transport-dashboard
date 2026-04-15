export function analyzeTransportMessage(message) {
  const text = message.toLowerCase()

  const command = {
    type: 'UPDATE_MAP_FILTER',
    payload: {
      vehicleType: null,
      direction: null
    }
  }

  let response = ''

  if (text.includes('автоб')) command.payload.vehicleType = 'bus'
  if (text.includes('трам')) command.payload.vehicleType = 'tram'
  if (text.includes('трол')) command.payload.vehicleType = 'trolley'

  const n = text.includes('север')
  const s = text.includes('юг')
  const w = text.includes('запад')
  const e = text.includes('восток')

  if (n && w) command.payload.direction = 'northwest'
  else if (n && e) command.payload.direction = 'northeast'
  else if (s && w) command.payload.direction = 'southwest'
  else if (s && e) command.payload.direction = 'southeast'
  else if (n) command.payload.direction = 'north'
  else if (s) command.payload.direction = 'south'
  else if (w) command.payload.direction = 'west'
  else if (e) command.payload.direction = 'east'

  response = 'Фильтр применён'

  return { command, response }
}