<template>
  <div class="leader-board">
    <h4 class="text-capitalize text-secondary">{{ title }}</h4>
    <div class="leader-list">
      <div
        v-for="{ winner, id, date} in leaderList"
        :key="id"
        class="leader-row">
        <span class="leader-name">{{ winner }}</span>
        <span class="leader-date">{{ date | formatDate | convertDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameLeaderBoard',
  props: {
    leaderList: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      title: 'leader board'
    }
  }
}
</script>

<style lang="scss">
.leader {
  &-board {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 35px;
  }

  &-list {
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    padding: 10px 0;
  }

  &-row {
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    background-color: #e2edf3;
    margin: 3px 0;
    max-width: 350px;
    color: #6c757d;
    font-weight: 500;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &-name {
    display: flex;
    padding: 15px;
  }

  &-date {
    display: flex;
    padding: 15px;
  }
}
</style>
