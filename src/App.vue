<template>
  <b-container fluid>
    <GameInDot />
  </b-container>
</template>

<script>
import GameInDot from './views/GameInDot'

export default {
  name: 'App',
  components: {
    GameInDot
  }
}
</script>

<style lang="scss">
  body {
    min-height: 100vh;
    min-width: 320px;
    width: 100%;
  }
</style>
