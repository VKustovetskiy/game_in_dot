export function separateCamelCase (value) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function capitalize (value) {
  return value.replace(/(\b[a-z](?!\s))/g, l => l.toUpperCase())
}
