export function formatDate (date) {
  return date.replace(/(.+?);(.+)/g, '$2 $1')
}

