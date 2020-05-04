<template>
  <b-row class="game">

    <b-col cols="12" lg="7" class="game-playing-section">
      <div class="d-flex justify-content-center mx-2">
        <GameControls
          :mode-list="getModeNameList"
          :btn-name="buttonName"
          @start-game="handleStartGame"/>
      </div>

    <div class="d-flex justify-content-center py-4">
      <span class="game-winner">{{ getWinnerText }}</span></div>

    <div class="d-flex justify-content-center">
      <PlayingField
       :mode="gameMode"
       :player-name="userName"
       :game-should-start="shouldGameStart"
       @end-game="handleEndGame"/>
    </div>

    </b-col>

    <b-col cols="12" lg="5" class="game-leader-section">
      <GameLeaderBoard
        :leader-list="getLeaderList"/>
    </b-col>

  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import GameControls from '@/components/GameInDot/GameControls'
import PlayingField from '@/components/GameInDot/PlayingField'
import GameLeaderBoard from '@/components/GameInDot/GameLeaderBoard'

import { convertDate } from '../utils'

export default {
  name: 'GameInDot',
  components: {
    GameControls,
    PlayingField,
    GameLeaderBoard
  },
  data: function () {
    return {
      userName: '',
      defaultMode: 'easyMode',
      gameMode: {},
      winner: '',
      buttonName: 'play',
      shouldGameStart: false,
      forcedRenderFlag: false
    }
  },

  computed: {
    ...mapGetters('game', ['getLeaderList', 'getModeNameList', 'getModeConfig']),

    getWinnerText () {
      return this.winner ? `${this.winner} won!` : ''
    }
  },

  beforeMount() {
    this.init()
  },

  methods: {
    ...mapActions('game', ['fetchModeList', 'fetchLeaderList', 'sendWinner']),

    handleStartGame (gameConfig) {
      const { mode, name } = gameConfig

      // this.toogleFieldForcedRender()
      this.setUserName(name)
      this.setGameMod(mode)
      this.toogleGameState(true)
      this.resetWinner()
    },

    handleEndGame (winnerName) {
      const date = convertDate(new Date(), 'HH:mm; DD MMMM YYYY') 
      this.sendWinner({
        winner: winnerName,
        date
      })
      this.setWinnerName(winnerName)
      this.buttonName = 'play again'
      this.toogleGameState(false)
    },

    setUserName (name) {
      this.userName = name
    },

    setGameMod (mode) {
      this.gameMode = this.getModeConfig[mode]
    },

    setWinnerName (name) {
      this.winner = name
    }, 

    resetWinner () {
      this.winner = ''
    },

    toogleGameState (state) {
      this.shouldGameStart = state
    },

    toogleFieldForcedRender () {
      this.forcedRenderFlag = !this.forcedRenderFlag
    },

    async init () {
      await this.fetchModeList()
      await this.fetchLeaderList()
      this.setGameMod(this.defaultMode)
    }
  }
}
</script>

<style lang="scss">
.game {
  padding: 15px;

  &-playing-section {
    padding: 35px;
    border: 1px solid #ddd;
  }

  &-leader-section {
    padding: 35px;
    border: 1px solid #ddd;
  }

  &-winner {
    min-height: 30px;
  }
}
</style>
