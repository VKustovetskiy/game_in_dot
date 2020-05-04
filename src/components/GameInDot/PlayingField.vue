<template>
    <div class="playfield-grid" :key="forcedRenderFlag">
      <div
        v-for="n in mode.field"
        :key="n"
        :id="`row-${n}`"
        class="playfield-row">
        <div
          v-for="n in mode.field"
          :key="n"
          :class="`cell-${n} available`"
          class="playfield-cell"
          @click="handleCellClick"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PlayingField',
  props: {
    mode: {
      type: Object,
      required: true
    },
    playerName: {
      type: String,
      required: true
    },
    gameShouldStart: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      aiPoints: 0,
      playerPoints: 0,
      intervalTimerId: null,
      iterationTimerId: null,
      emptyRowIdList: [],
      forcedRenderFlag: false
    }
  },

  computed: {
    cellCountToWin () {
      return Math.ceil(this.mode.field * this.mode.field / 2)
    },

    gameInterval () {
      return this.mode.delay * 2
    }
  },

  watch: {
    gameShouldStart (newVal) {
      if (newVal) {
        this.clearPlayingField()
        this.startGame(this.mode.delay, this.mode.field)
      }
    }
  },

  methods: {
    emitEndGame (winner) {
      this.$emit('end-game', winner)
    },

    getRandomIndexInRange (max, min = 1) {
      return Math.floor(Math.random() * max) + min
    },

    handleCellClick (e) {
      const { target } = e

      if (this.isCellClickable(target)) {
        this.playerPoints++
        this.resetGameIterationTimer(this.iterationTimerId)
        this.removeCellClass(target, 'active')
        this.setCellClass(target, 'player')
        this.checkWinner()
      }

      return
    },

    handleAiIterationWin (target) {
      this.aiPoints++
      this.removeCellClass(target, 'active')
      this.setCellClass(target, 'computer')
      this.checkWinner()
    },

    checkWinner () {
      if (this.playerPoints >= this.cellCountToWin) {
        this.endGame(this.playerName)
      } else if (this.aiPoints >= this.cellCountToWin) {
        this.endGame('Computer')
      }
    },

    startGame (interval, fieldSize) {
      this.intervalTimerId = setInterval(
        function (interval, fieldSize) {
          this.startGameIteration(interval, fieldSize)
        }.bind(this, interval, fieldSize), this.gameInterval)
    },

    startGameIteration (delay, fieldSize) {
      const cellNode = this.getRandomCell(fieldSize)

      if (cellNode) {
        this.removeCellClass(cellNode, 'available')
        this.setCellClass(cellNode, 'active')
  
        this.iterationTimerId = setTimeout(
          function (cellNode) {
            this.handleAiIterationWin(cellNode)
          }.bind(this, cellNode), delay)
      } else {
        this.checkWinner()
      }
    },

    setCellClass (target, cellClass) {
      target.classList.add(cellClass)
    },

    removeCellClass (target, cellClass) {
      target.classList.remove(cellClass)
    },

    isCellClickable (cell) {
      return cell.classList.contains('active')
    },

    resetGameIterationTimer (timerId) {
      clearTimeout(timerId)
    },

    resetGameIntervalTimer (timerId) {
      clearInterval(timerId)
    },
  
    resetGameState () {
      this.resetGameIterationTimer(this.iterationTimerId)
      this.resetGameIntervalTimer(this.intervalTimerId)
      this.aiPoints = 0,
      this.playerPoints = 0
    },

    getRandomCell (fieldSize) {                              
      if (this.isAvailableCellExists()) {
        const rowId = this.getRandomAvailableRowId(fieldSize)
        const rowNode = document.getElementById(`row-${rowId}`)
        const cellList = rowNode.childNodes
        let availableCellList = []
        let randomCell
        
        for (let i = 0; i < cellList.length; i++) {
           if (cellList[i].classList.contains('available')) {
            availableCellList.push(cellList[i])
          }
        }
    
        if (availableCellList.length) {
          randomCell = availableCellList[this.getRandomIndexInRange(availableCellList.length, 0)]

          if (availableCellList.length <= 1) {
            this.setEmptyRowId(rowId)
          }
        }

        return randomCell
      }
    },


    setEmptyRowId (id) {
      this.emptyRowIdList.push(id)
    },

    isAvailableCellExists () {
      return this.emptyRowIdList.length !== this.mode.field
    },

    endGame (winnerName) {
      this.resetGameState()
      this.emitEndGame(winnerName)
    },
    
    clearPlayingField () {
      const coloredCell = document.querySelector('.player') || document.querySelector('.computer')

      if (coloredCell) {
        this.toggleFieldForcedRender()
      }
    },

    toggleFieldForcedRender () {
      this.forcedRenderFlag = !this.forcedRenderFlag
    },

    getRandomAvailableRowId (fieldSize) {
      let rowId = null

      while (rowId === null || this.emptyRowIdList.includes(rowId)) {
        rowId = this.getRandomIndexInRange(fieldSize)
      }
      
      return rowId
    },

  },

  beforeDestroy() {
    this.resetGameState()
  }
}
</script>

<style lang="scss">
.playfield {
  &-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 50px;
  }

  &-row {
    display: flex;
  }

  &-cell {
    display: flex;
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;

    &.active {
      background-color: #17d6f3;
    }

    &.computer {
      background-color: #f13a59;
    }

    &.player {
      background-color: #a0e637;
    }
  }
}
</style>

