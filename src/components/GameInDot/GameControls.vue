<template>
<b-form
  @submit.stop.prevent="emitStartGame">
  <div class="d-flex game-conrols">
      <div class="d-flex mr-2">
        <b-form-select
          v-model="formData.mode"
          :plain="true"
          required
          class="game-select btn btn-info">

          <b-form-select-option value="" disabled class="select-options">{{ dropdownTitle | capitalize }}</b-form-select-option>

          <b-form-select-option
            v-for="(mode, index) in modeList"
            :key="index"
            :value="mode"
            class="text-capitalize">
            {{ mode | separateCamelCase | capitalize }}
          </b-form-select-option>

        </b-form-select>
      </div>

      <div class="d-flex mr-2 game-input">
        <b-form-input
          v-model.trim="formData.name"
          :formatter="cutNameLength"
          required
          placeholder="Enter your name"></b-form-input>
      </div>

      <div class="d-flex">
        <b-button
          type="submit"
          class="game-button">
          {{ btnName }}
        </b-button>
      </div>
      
    </div>
</b-form>
</template>

<script>
import {
  BForm,
  BButton,
  BFormInput,
  BFormSelect,
  BFormSelectOption
} from 'bootstrap-vue'

export default {
  name: 'GameControls',
  components: {
    'b-form': BForm,
    'b-button': BButton,
    'b-form-input': BFormInput,
    'b-form-select': BFormSelect,
    'b-form-select-option': BFormSelectOption
  },
  props: {
    modeList: {
      type: Array,
      required: false
    },
    btnName: {
      type: String,
      default: 'play'
    }
  },
  data: function () {
    return {
      dropdownTitle: 'pick game mode',
      formData: {
        mode: '',
        name: ''
      }
    }
  },

  methods: {
    emitStartGame () {
      this.$emit('start-game', this.formData)
    },

    cutNameLength (val) {
      let validVal = val

      if (val.length > 25) {
        validVal = val.split('').slice(0, val.length - 1).join('')
      }
        
      return validVal
    }
  }
}
</script>

<style lang="scss">
  .game {
    &-input {
      display: flex;
    }

    &-button {
      min-width: 95px;
      max-height: 40px;
      text-transform: capitalize;
    }
  }
</style>
