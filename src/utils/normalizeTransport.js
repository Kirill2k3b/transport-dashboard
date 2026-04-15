export function normalizeTransportType(type) {
  if (!type) return 'unknown'

  const t = type.toLowerCase()

  if (t.includes('bus')) return 'bus'
  if (t.includes('tram')) return 'tram'
  if (t.includes('trolley')) return 'trolley'

  return 'unknown'
}