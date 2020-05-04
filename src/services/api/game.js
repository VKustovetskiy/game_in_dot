import api from './api'

export function getModeConfig () {
  return api.get('game-settings')
}

export function getLeaderList () {
  return api.get('winners')
}

export function sendWinner (payload) {
  return api.post('winners', payload)
}
