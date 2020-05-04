import { getModeConfig, getLeaderList, sendWinner } from '../services/api/game'

const getTopFour = (playerList) => {
  let topPlayerList = []
  let listLength = playerList.length - 1

  while (topPlayerList.length < 4) {
    topPlayerList.push(playerList[listLength])
    listLength--
  }

  return topPlayerList
}

const initialState = () => ({
  modeConfig: {},
  leaderList: []
})

const game = {
  namespaced: true,
  state: initialState(),
  mutations: {
    SET_GAME_MOD_CONFIG (state, payload) {
      state.modeConfig = payload
    },

    SET_LEADER_LIST (state, payload) {
      state.leaderList = payload
    }
  },
  actions: {
    async fetchModeList({ commit }) {
      const { data } = await getModeConfig()

      commit('SET_GAME_MOD_CONFIG', data)
    },
    async fetchLeaderList({ commit }) {
      const { data } = await getLeaderList()

      commit('SET_LEADER_LIST', getTopFour(data))
    },
    async sendWinner ({ commit }, params) {
      const { data } = await sendWinner(params)

      commit('SET_LEADER_LIST', getTopFour(data))
    }
  },
  getters: {
    getModeNameList: state => Object.keys(state.modeConfig),
    getModeConfig: state => state.modeConfig,
    getLeaderList: state => state.leaderList
  }
}

export default game